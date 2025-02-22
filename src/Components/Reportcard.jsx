
import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { FileTextOutlined, FormOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useUser } from '../Api/Context';

const { TextArea } = Input;
const API_URL="https://debugitbackend.onrender.com";
function Reportcard({ onSubmitSuccess }) {

    const { loginData } = useUser();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form] = Form.useForm();

    const handleReport = async (values) => {
        if (!loginData) {
            message.error('Please login to submit a report');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await axios.post(`${API_URL}/reports/newreport`, {
                title: values.title,
                description: values.description,
                userid: loginData.id
            });

            message.success('Report submitted successfully!');
            form.resetFields();
            
            if (onSubmitSuccess) {
                setTimeout(() => {
                    onSubmitSuccess();
                }, 1500); // Give time for success message to be seen
            }
        } catch (error) {
            console.error('Report submission error:', error);
            message.error(
                error.response?.data?.message || 
                'Failed to submit report. Please try again.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card 
            className="shadow-md h-[70vh]"
            bordered={false}
        >
            <Form
                form={form}
                name="report"
                onFinish={handleReport}
                layout="vertical"
                autoComplete="off"
            >
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the report title!',
                        },
                        {
                            max: 100,
                            message: 'Title cannot be longer than 100 characters',
                        }
                    ]}
                >
                    <Input 
                        prefix={<FileTextOutlined />}
                        placeholder="Enter report title"
                        className="text-[#4169e1]"
                    />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the report description!',
                        },
                        {
                            max: 1000,
                            message: 'Description cannot be longer than 1000 characters',
                        }
                    ]}
                >
                    <TextArea
                        prefix={<FormOutlined />}
                        placeholder="Enter report description"
                        rows={4}
                        className="text-[#4169e1]"
                    />
                </Form.Item>

                <Form.Item>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        block
                        loading={isSubmitting}
                    >
                        Submit Report
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default Reportcard;
