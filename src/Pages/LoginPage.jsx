import React from 'react';
import Login from '../Components/Login';
import { Layout, Typography, Button } from 'antd';

const { Content } = Layout;
const { Title } = Typography;

function LoginPage() {
  return (
    <Layout className="min-h-[95vh] bg-[#f0f2f5]">
      <Content className="max-w-4xl mx-auto p-6 w-full">
        <div className="text-center mb-8">
          <Title level={1} className="text-5xl text-red-300">
            Login Here
          </Title>
        </div>

        <Login />

      </Content>
    </Layout>
  );
}

export default LoginPage;