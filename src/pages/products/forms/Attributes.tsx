import { Card, Form, Radio, Switch, Typography } from 'antd'
import React from 'react'
import { Attribute, Category } from '../../../types';

type PricingProps={
    selectedCategory : string
}

const Attributes = ({selectedCategory}:PricingProps) => {
    const category: Category | null = selectedCategory? JSON.parse(selectedCategory) : null

  return (
    <Card title={<Typography.Text>Product price</Typography.Text>} bordered={false}>
        {
            category && category.attributes.map((attribute: Attribute)=>{
                return (
                    <div key={attribute.name}>
                        {
                            attribute.widgetType === 'radio'?(
                                <Form.Item label={attribute.name} name={['attributes', attribute.name]} initialValue={attribute.defaultValue} rules={[
                                    {
                                        required:true,
                                        message: 'attribute name is required'
                                    }
                                ]}>
                                    <Radio.Group>
                                        {
                                            attribute.availableOptions.map((option: string)=>{
                                                return(
                                                    <Radio.Button value={option} key={option}>{option}</Radio.Button>
                                                )
                                            })
                                        }
                                    </Radio.Group>
                                </Form.Item>
                            ): attribute.widgetType === 'switch'? (
                                <Form.Item label={attribute.name} name={['attributes', attribute.name]} initialValue={attribute.defaultValue}>
                                    <Switch defaultChecked={false} onChange={()=>{}} checkedChildren='yes' unCheckedChildren='no'/>

                                </Form.Item>
                            ):null
                        }
                    </div>
                )
            })
        }
    </Card>
  )
}

export default Attributes