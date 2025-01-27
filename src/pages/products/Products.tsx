import { Breadcrumb, Button, Drawer, Flex, Form, Image, Space, Spin, Table, Tag, Typography, theme } from 'antd'
import React, { useMemo, useState } from 'react'
import { RightOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ProductsFilter from './ProductsFilter';
import { FieldData, Product } from '../../types';
import { PER_PAGE } from '../../constants';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getProducts } from '../../http/api';
import { format } from 'date-fns';
import { debounce } from 'lodash';
import { userAuthStore } from '../../store';
import ProductForm from './forms/ProductForm';

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
    const [queryParams, setQueryParams] = useState({
        limit: PER_PAGE,
        page: 1,
        tenantId : user?.role === 'manager'? user?.tenant?.id : undefined
    })
    const {
        token: { colorBgLayout },                         //Do ctrl + Space tp see all predefined options
      } = theme.useToken();
    const [drawerOpen, setDrawerOpen] = useState(false)


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

    const onHandleSubmit=()=>{

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
              Add Product</Button>
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
                        <Button type="link" onClick={()=>{}}>Edit</Button>
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
        title={'Add Product'} 
        width={720} 
        destroyOnClose={true} 
        open={drawerOpen} 
        onClose={()=>{
        //   setCurrentEditingUser(null)
          setDrawerOpen(false)
        }}
        extra={
          <Space>
            <Button onClick={()=>setDrawerOpen(false)}>Cancel</Button>
            <Button type="primary" onClick={onHandleSubmit}>
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout='vertical' form={form}>
          <ProductForm/>
        </Form>
      </Drawer>
    </Space>
  )
}

export default Products