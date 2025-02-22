import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../Api/Context.jsx';
import { Form, Input, Button, Card, Typography, Space, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

function Login() {
    const navigate = useNavigate();
    const { login } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null); 

        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error.message);
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex justify-center py-5 items-center max-h-screen'>
            <Card className='w-96 drop-shadow-2xl'
                title={
                    <Typography.Title level={3} className='text-center m-0'>
                        Welcome Back
                    </Typography.Title>
                }
            >
                <Form layout="vertical" onSubmitCapture={handleLogin}>
                    <Form.Item label="Email" name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item label="Password" name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            size="large"
                        />
                    </Form.Item>
                    
                    {errorMessage && <Alert message={errorMessage} type="error" showIcon className="mb-4" />}

                    <Form.Item>
                        <Space direction="vertical" className='w-full'>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                loading={loading}
                                size="large"
                                className='my-2'
                            >
                                Log in
                            </Button>
                            <Typography.Text className='block text-center'>
                                <Link to="/forget-password">Reset Your Password</Link>
                            </Typography.Text>
                        </Space>
                    </Form.Item>
                </Form>

                <div className="text-center mt-4">
                    <Button type="link" onClick={() => navigate('/signup')}>
                        Don't have an account? Sign Up
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default Login;