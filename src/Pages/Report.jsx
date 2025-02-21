import React from 'react';
import { Typography, Layout } from 'antd';
import { useUser } from '../Api/Context';
import { useNavigate } from 'react-router-dom';
import Reportcard from '../Components/Reportcard';

const { Title } = Typography;
const { Content } = Layout;

function Report() {
    const { loginData } = useUser();
    const navigator = useNavigate();

    if (!loginData) {
        navigator('/login');
        return null;
    }
    
    return (
        <Layout className="h-[90vh] bg-[#EFEBE0]">
            <Content className="p-6">
                <div className="text-center mb-8">
                    <Title level={2} className="text-[#4169e1] mb-2">
                        Have Some Problem?
                    </Title>
                    <Title level={3} className="text-[#4169e1] opacity-80">
                        Write here to get public attention
                    </Title>
                </div>
                <Reportcard />
            </Content>
        </Layout>
    );
}

export default Report;