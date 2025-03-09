import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_URL="https://debugitbackend.onrender.com";
function Signup() {
  const navigate = useNavigate();
  const [signupResponse, setSignupResponse] = useState(null);
  const [form] = Form.useForm();

  const handleSignup = (values) => {
    const { first_name, last_name, email, password } = values;
    
    axios.post(`${API_URL}/user/signup`, {
      first_name,
      last_name,
      email,
      password
    })
    .then((response) => {
      setSignupResponse(response.data);
      message.success('Signup successful!');
      navigate('/login');
    })
    .catch((error) => {
      console.log(error);
      message.error('Signup failed. Please try again.');
    });
  };
  
  return (
    <div className=' mx-auto min-h-[80vh] my-auto px-0 py-5 flex justify-center bg-[#F8F8FF] w-screen' >
      <Card title="Sign Up" className='min-w-96 max-w-full  mx-auto' >
        <Form
          form={form}
          name="signup"
          onFinish={handleSignup}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            name="first_name"
            label="First Name"
            rules={[
              {
                required: true,
                message: 'Please input your first name!',
              },
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="First Name" 
            />
          </Form.Item>

          <Form.Item
            name="last_name"
            label="Last Name"
            rules={[
              {
                required: true,
                message: 'Please input your last name!',
              },
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Last Name" 
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
              {
                type: 'email',
                message: 'Please enter a valid email!',
              },
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Email" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Password" 
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center mt-4">
          <Button type="link" onClick={() => navigate('/login')}>
            Already have account? Login
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Signup;