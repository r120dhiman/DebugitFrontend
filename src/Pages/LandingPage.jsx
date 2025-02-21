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
  Button, 
  Space,
  Avatar,
  Divider
} from 'antd';
import { 
  CloseOutlined, 
  FlagOutlined, 
  UserOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

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
        const response = await axios.get('http://localhost:3001/reports/allreports');
        setAllReports(response.data);
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
        <div style={{ background: '#fff', padding: 24, minHeight: 380, borderRadius: 4, marginTop: 20 }}>
          
          {loginData && showWelcome && (
            <Alert
              message={
                <Space>
                  <Title level={4} style={{ margin: 0 }}>
                    Welcome Back, {loginData.first_name} {loginData.last_name}!
                  </Title>
                </Space>
              }
              type="success"
              showIcon
              closable
              onClose={handleClose}
              style={{ marginBottom: 24 }}
              banner
            />
          )}

          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Space align="center">
              <FlagOutlined style={{ fontSize: 24 }} />
              <Title level={2} style={{ margin: 0 }}>
                Recent Reports
              </Title>
            </Space>
            <Paragraph type="secondary" style={{ marginTop: 8 }}>
              View and track the latest reported issues in the system
            </Paragraph>
          </div>

          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              showIcon
              style={{ marginBottom: 24 }}
            />
          )}

          {loading ? (
            <div>
              {[1, 2, 3].map((item) => (
                <Card key={item} style={{ marginBottom: 16 }}>
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
                        <div style={{ textAlign: 'right' }}>
                          <Tag color={getStatusColor(report.status)}>
                            {report.status || 'Pending'}
                          </Tag>
                          <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
                            {report.created_at ? new Date(report.created_at).toLocaleDateString() : 'Date unavailable'}
                          </Text>
                        </div>
                      }
                    >
                      <List.Item.Meta
                        avatar={<Avatar icon={<ExclamationCircleOutlined />} style={{ backgroundColor: '#1890ff' }} />}
                        title={<a href={`/report/${report.id}`}>{report.title}</a>}
                        description={
                          <Space>
                            <UserOutlined />
                            <Text type="secondary">
                              Reported by {report.reporter_name || 'Anonymous'}
                            </Text>
                          </Space>
                        }
                      />
                      <Paragraph
                        ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}
                        style={{ marginBottom: 16 }}
                      >
                        {report.description}
                      </Paragraph>
                      
                      {report.resolved && (
                        <div style={{ marginTop: 12 }}>
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