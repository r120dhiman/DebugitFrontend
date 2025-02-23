import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../Api/Context.jsx';
import { 
  Layout, 
  Typography, 
  List, 
  Card, 
  Alert, 
  Empty, 
  Skeleton, 
  Tag, 
  Space,
  Avatar
} from 'antd';
import { 
  FlagOutlined, 
  ExclamationCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
const API_URL="https://debugitbackend.onrender.com";
const { Content } = Layout;
const { Title,  Paragraph } = Typography;

function LandingPage() {
  const { loginData } = useUser();
  const [showWelcome, setShowWelcome] = useState(true);
  const [allReports, setAllReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/reports/allreports`);
        setAllReports(response.data);
        console.log("Fetching data");
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
        setError("Failed to load reports. Please try again later.");
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleClose = () => {
    setShowWelcome(false);
  };

  const getStatusColor = (status) => {
    const statusMap = {
      'pending': 'orange',
      'resolved': 'green',
      'investigating': 'blue',
      'closed': 'red'
    };
    return statusMap[status?.toLowerCase()] || 'default';
  };

  return (
    <Layout>
      <Content className="site-layout" style={{ padding: '0 50px', minHeight: '90vh' }}>
        <div className="bg-[#ffffff] p-6 min-h-96 rounded-lg mt-5" >
          
          {loginData && showWelcome && (
            <Alert
              message={
                <Space>
                  <Title level={4} className="m-0" >
                    Welcome Back, {loginData.first_name} {loginData.last_name}!
                  </Title>
                </Space>
              }
              type="success"
              showIcon
              closable
              onClose={handleClose}
              className="mb-6"
              banner
            />
          )}

          <div className="text-center mb-6" >
            <Space align="center">
              <FlagOutlined className="text-2xl" />
              <Title level={2} className="m-0" >
                Recent Reports
              </Title>
            </Space>
            <Paragraph type="secondary" className="mt-2">
              View and track the latest reported issues in the system
            </Paragraph>
          </div>

          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              showIcon
              className="mb-6"
            />
          )}

          {loading ? (
            <div>
              {[1, 2, 3].map((item) => (
                <Card key={item} className="mb-4">
                  <Skeleton active avatar paragraph={{ rows: 3 }} />
                </Card>
              ))}
            </div>
          ) : (
            <>
              {allReports.length === 0 ? (
                <Empty
                  description="No reports found"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              ) : (
                <List
                  itemLayout="vertical"
                  size="large"
                  dataSource={allReports}
                  renderItem={(report, index) => (
                    <List.Item
                      key={report.id || index}
                      extra={
                        <div className="text-right" >
                          <Tag color={getStatusColor(report.status)}>
                            {report.status || 'Pending'}
                          </Tag>
                        </div>
                      }
                    >
                      <List.Item.Meta
                        avatar={<Avatar icon={<ExclamationCircleOutlined />} className="bg-[#1575d0]"  />}
                        title={<a href={`/report/${report.id}`}>{report.title}</a>}
                      />
                      <Paragraph
                        ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}
                        className="mb-4"
                      >
                        {report.description}
                      </Paragraph>
                      
                      {report.resolved && (
                        <div className="mt-3" >
                          <Tag icon={<CheckCircleOutlined />} color="success">
                            Resolved
                          </Tag>
                        </div>
                      )}
                    </List.Item>
                  )}
                />
              )}
            </>
          )}
        </div>
      </Content>
    </Layout>
  );
}

export default LandingPage;