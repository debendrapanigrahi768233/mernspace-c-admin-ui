import { Breadcrumb, Button, Drawer, Flex, Form, Image, Space, Spin, Table, Tag, Typography, theme } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { RightOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ProductsFilter from './ProductsFilter';
import { FieldData, Product } from '../../types';
import { PER_PAGE } from '../../constants';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createProduct, getProducts, updateProduct } from '../../http/api';
import { format } from 'date-fns';
import { debounce } from 'lodash';
import { userAuthStore } from '../../store';
import ProductForm from './forms/ProductForm';
import { makeFormData } from './helpers';

const columns = [
    {
      title: 'Product Name',
      dataIndex : 'name',
      key: 'name',
      render: (_text: string, record : Product)=> {
        return(
            <div>
                <Space direction='horizontal'>
                    <Image src={record.image} style={{width:'2rem', height:'2rem'}}/>
                    <Typography.Text>{record.name}</Typography.Text>
                </Space>
            </div>
        )
      }
    },
    {
      title: 'Description',
      dataIndex : 'description',
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex : 'isPublish',
      key: 'isPublish',
      render: (_text: string, record : Product)=> {
        return(
            <Typography.Text>{record.isPublish == true? <Tag color='green'>Published</Tag>: <Tag color='red'> Unpublished</Tag>}</Typography.Text>
        )
      }
    },
    {
      title: 'CreatedAt',
      dataIndex : 'createdAt',
      key: 'createdAt',
      render: (text: string,)=> {
        return(
            <Typography.Text>{format(new Date(text), 'dd/MM/yyyy HH:mm')}</Typography.Text>
        )
      }
    }
  ]

const Products = () => {
    const [form] = Form.useForm()
    const [filterForm]= Form.useForm()
    const {user} = userAuthStore()
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [currentProduct, setCurrentProduct]= useState<Product | null>(null)

    useEffect(()=>{
        if(currentProduct){
            setDrawerOpen(true)
            const priceConfiguration = Object.entries(currentProduct.priceConfiguration).reduce((acc,[key,value])=>{
                const stringifiedKey = JSON.stringify({
                    configurationKey : key,
                    priceType: value.priceType
                })
                return {
                    ...acc,
                    [stringifiedKey]: value.availableOptions
                }
            },{})
            
            const attributes= currentProduct.attributes.reduce((acc,item)=>{
                return {
                    ...acc,
                    [item.name]: item.value
                }
            },{})
            console.log({currentProductPriceConfig: currentProduct['priceConfiguration'],priceConfiguration,currentProductAttribute: currentProduct['attributes'],attributes})
            form.setFieldsValue({
                ...currentProduct,
                priceConfiguration,
                attributes,
                categoryId: currentProduct.category._id
            })
        }
    }, [currentProduct,form])


    const [queryParams, setQueryParams] = useState({
        limit: PER_PAGE,
        page: 1,
        tenantId : user?.role === 'manager'? user?.tenant?.id : undefined
    })
    const {
        token: { colorBgLayout },                         //Do ctrl + Space tp see all predefined options
      } = theme.useToken();


    const {data: products, isFetching, isError, error} = useQuery({
        queryKey: ['products',queryParams],
        queryFn:()=>{
          const filterParams = Object.fromEntries(Object.entries(queryParams).filter((item)=>!!item[1]))
          // const queryString = `currentPage=${queryParams?.currentPage}&perPage=${queryParams?.perPage}`
          const queryString = new URLSearchParams(filterParams as unknown as Record<string,string>).toString()
          return getProducts(queryString).then(response=>response.data)
        },
        placeholderData: keepPreviousData
      })
      const queryClient = useQueryClient()
      const { mutate: productMutate, isPending: isCreateLoading } = useMutation({
        mutationKey: ['product'],
        mutationFn: async (data: FormData) => {
            if(currentProduct){
                //edit mode
                return updateProduct(data,currentProduct._id).then((res) => res.data);
            }else{
                //create mode
                return createProduct(data).then((res) => res.data);
            }
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            form.resetFields();
            setDrawerOpen(false);
            return;
        },
    });

      //It will not call on keystrokes, but as soon we stop typing then it will be called
    const debounceQUpdate = useMemo(()=>{
        return debounce((value: string | undefined)=>{
            setQueryParams((prev)=> ({...prev, q: value, page: 1}))
        },500)
    },[])

    const onFilterChange=(changedFields : FieldData[])=>{
        const changedFilterFields = changedFields.map((item)=>({
            [item.name[0]] : item.value
        })).reduce((acc, item)=>({...acc,...item}),{})
        if('q' in changedFilterFields){
          debounceQUpdate(changedFilterFields.q)
        }else{
          setQueryParams((prev)=> ({...prev, ...changedFilterFields, page: 1}))
        }
    }

    const onHandleSubmit=async()=>{
        // const dummy = {
        //     Size: { priceType: 'base', availableOptions: { Small: 400, Medium: 600, Large: 800 } },
        //     Crust: { priceType: 'aditional', availableOptions: { Thin: 50, Thick: 100 } },
        // };

        // const currentData = {
        //     '{"configurationKey":"Size","priceType":"base"}': {
        //         Small: 100,
        //         Medium: 200,
        //         Large: 400,
        //     },
        //     '{"configurationKey":"Crust","priceType":"aditional"}': {
        //         Thin: 0,
        //         Thick: 50,
        //     },
        // };

        await form.validateFields();

        const priceConfiguration = form.getFieldValue('priceConfiguration');
        const pricing = Object.entries(priceConfiguration).reduce((acc, [key, value]) => {
            const parsedKey = JSON.parse(key);
            return {
                ...acc,
                [parsedKey.configurationKey]: {
                    priceType: parsedKey.priceType,
                    availableOptions: value,
                },
            };
        }, {});        
        const categoryId =form.getFieldValue('categoryId')
        // const currentAttrs = {
        //     isHit: 'No',
        //     Spiciness: 'Less',
        // };

        // const attrs = [
        //     { name: 'Is Hit', value: true },
        //     { name: 'Spiciness', value: 'Hot' },
        // ];

        const attributes = Object.entries(form.getFieldValue('attributes')).map(([key, value]) => {
            return {
                name: key,
                value: value,
            };
        });
        

        const postData = {
            ...form.getFieldsValue(),
            tenantId: user!.role === 'manager' ? user?.tenant?.id : form.getFieldValue('tenantId'),
            isPublish: form.getFieldValue('isPublish') ? true : false,
            image: form.getFieldValue('image'),
            categoryId,
            priceConfiguration: pricing,
            attributes,
        };
        const formData = makeFormData(postData);
        await productMutate(formData)
        // console.log(form.getFieldsValue(), postData)
    }

  return (
    <Space size={'large'} direction='vertical' style={{width: '100%'}}>
      <Flex justify='space-between'>
        <Breadcrumb separator={<RightOutlined />} items={[{ title: <Link to='/'>Dashboard</Link> }, { title: 'Products' }]} />
        {isFetching && <><Spin/></>}
        {isError && <Typography.Text type='danger'>{error?.message}</Typography.Text>}
      </Flex>
      <Form form={filterForm} onFieldsChange={onFilterChange}>
        <ProductsFilter>
          <Button type="primary" icon={<PlusOutlined />} onClick={()=>{setDrawerOpen(true)}}>
              Add Product
              </Button>
        </ProductsFilter>
      </Form>
      <Table 
        dataSource={products?.data} 
        columns={[...columns,{
            title: 'Action',
            dataIndex : 'action',
            key: 'action',
            render: (_:string, record : Product)=>{
                console.log(record,_)
                return (
                    <Space>
                        <Button type="link" onClick={()=>{setCurrentProduct(record)}}>Edit</Button>
                    </Space>
                )
            }
        }]} 
        rowKey={(product)=>product._id}
        pagination={{
            total: products?.total,
            pageSize: queryParams.limit,
            current: queryParams?.page,
            showTotal:(total: number, range: [number, number])=>{
            return `Showing ${range[0]}- ${range[1]} of ${total} records`
            },
            onChange:(page)=>{
            setQueryParams((prev)=>{
                return {
                ...prev,
                page: page
                }
            })
            }
        }}
      />
      <Drawer 
        styles={{body:{background: colorBgLayout} }}
        title={currentProduct? 'Edit Product': 'Add Product'} 
        width={720} 
        destroyOnClose={true} 
        open={drawerOpen} 
        onClose={()=>{
        //   setCurrentEditingUser(null)
          form.resetFields()
          setCurrentProduct(null)
          setDrawerOpen(false)
        }}
        extra={
          <Space>
            <Button onClick={()=>{
                form.resetFields();
                setDrawerOpen(false);
                setCurrentProduct(null)
            }}>Cancel</Button>
            <Button type="primary" onClick={onHandleSubmit} loading={isCreateLoading}>
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout='vertical' form={form}>
          <ProductForm form={form}/>
        </Form>
      </Drawer>
    </Space>
  )
}

export default Products