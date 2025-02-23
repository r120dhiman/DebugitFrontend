import React, { useState } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  message, 
  Typography, 
  Row, 
  Col,
  Space
} from 'antd';
import { 
  MailOutlined, 
  EnvironmentOutlined, 
  SendOutlined, 
} from '@ant-design/icons';

const { Title, Text} = Typography;
const { TextArea } = Input;

const ContactUs = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form values:', values);
      message.success('Your message has been sent! We will contact you soon.');
      form.resetFields();
    } catch (error) {
      message.error('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Title className="text-3xl text-gray-600 mt-3  mx-auto">
            Have questions? Write us below.
          </Title>
        </div>

        <Row gutter={[32, 32]} className="items-start">
          <Col xs={24} md={10} lg={8}>
            <Card className="h-full shadow-md hover:shadow-lg transition-shadow">
              <Title level={3} className="text-center mb-6">
                Contact Us Directly At
              </Title>
              
              <Space direction="vertical" size="large" className="w-full">
                <div className="flex items-start">
                  <MailOutlined className="text-blue-500 text-xl mt-1 mr-4" />
                  <div>
                    <Text strong className="block mb-1">Write us on Email</Text>
                    <a href="mailto:r120dhiman+debugit@gmail.com" className="text-blue-500 hover:text-blue-700">
                    r120dhiman+debugit@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <EnvironmentOutlined className="text-blue-500 text-xl mt-1 mr-4" />
                  <div>
                    <Text strong className="block mb-1">Our Office</Text>
                    <Text className="text-gray-700">
                      Civic Portal<br />
                     IIT BHU, Varanasi
                    </Text>
                  </div>
                </div>
              </Space>
            </Card>
          </Col>

          <Col xs={24} md={14} lg={16}>
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <Title level={3} className="mb-6">
                Write us your Query
              </Title>
              
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                requiredMark={false}
              >
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="name"
                      label="Your Name"
                      rules={[{ required: true, message: 'Please enter your name' }]}
                    >
                      <Input placeholder="John Doe" size="large" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="email"
                      label="Email Address"
                      rules={[
                        { required: true, message: 'Please enter your email' },
                        { type: 'email', message: 'Please enter a valid email' }
                      ]}
                    >
                      <Input 
                        placeholder="johndoe@example.com" 
                        size="large"
                        prefix={<MailOutlined className="text-gray-400" />} 
                      />
                    </Form.Item>
                  </Col>
                </Row>
                
                <Form.Item
                  name="Subject"
                  label="Subject"
                  rules={[{ required: true, message: 'Please enter Subject' }]}
                >
                  <Input 
                placeholder='Having problem in Login'
                  />
                </Form.Item>
                <Form.Item
                  name="message"
                  label="Describe Here"
                  rules={[{ required: true, message: 'Please enter in detail' }]}
                >
                  <TextArea 
                    placeholder="Please write in detail" 
                    rows={6}
                    showCount
                    maxLength={500}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SendOutlined />}
                    size="large"
                    loading={loading}
                    className="w-full md:w-auto"
                  >
                    Send Message
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ContactUs;