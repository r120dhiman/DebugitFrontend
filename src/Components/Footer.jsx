import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Row, Col, Typography, Space, Divider } from 'antd';
import { 
  GithubOutlined, 
  TwitterOutlined, 
  LinkedinOutlined, 
  HeartOutlined,
  MailOutlined
} from '@ant-design/icons';

const { Footer: AntFooter } = Layout;
const { Text, Title } = Typography;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <AntFooter style={{ background: '#001529', padding: '24px 50px' }}>
      <Row justify="space-between" align="middle">
        <Col xs={24} md={8}>
          <Title level={4} style={{ color: 'white', marginBottom: '12px' }}>
            PollSystem
          </Title>
          <Text style={{ color: '#9CA3AF' }}>
            Creating and managing polls made simple and efficient.
          </Text>
        </Col>
        
        <Col xs={24} md={8} style={{ textAlign: 'center', margin: '16px 0' }}>
          <Space split={<Divider type="vertical" style={{ borderColor: '#4B5563' }} />}>
            <Link to="/privacy-policy" style={{ color: '#9CA3AF', hover: { color: 'white' } }}>
              Privacy Policy
            </Link>
            <Link to="/terms" style={{ color: '#9CA3AF', hover: { color: 'white' } }}>
              Terms of Service
            </Link>
            <Link to="/contact" style={{ color: '#9CA3AF', hover: { color: 'white' } }}>
              Contact
            </Link>
          </Space>
        </Col>
        
        <Col xs={24} md={8} style={{ textAlign: 'right' }}>
          <Space size="middle">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <GithubOutlined style={{ fontSize: '20px', color: '#9CA3AF' }} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <TwitterOutlined style={{ fontSize: '20px', color: '#9CA3AF' }} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <LinkedinOutlined style={{ fontSize: '20px', color: '#9CA3AF' }} />
            </a>
            <a href="mailto:contact@example.com">
              <MailOutlined style={{ fontSize: '20px', color: '#9CA3AF' }} />
            </a>
          </Space>
        </Col>
      </Row>
      
      <Divider style={{ borderColor: '#4B5563', margin: '16px 0' }} />
      
      <Row justify="center">
        <Col>
          <Text style={{ color: '#9CA3AF' }}>
            &copy; {currentYear} PollSystem. All rights reserved.
          </Text>
        </Col>
      </Row>
      
      <Row justify="center" style={{ marginTop: '8px' }}>
        <Col>
          <Text style={{ color: '#6B7280', fontSize: '12px' }}>
            Made with <HeartOutlined style={{ color: '#EF4444' }} /> by Your Company
          </Text>
        </Col>
      </Row>
    </AntFooter>
  );
};

export default Footer;