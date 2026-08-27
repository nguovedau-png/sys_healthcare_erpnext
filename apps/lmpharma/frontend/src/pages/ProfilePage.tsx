import React, { useState } from 'react';
import { Card, Avatar, Row, Col, Descriptions, Tag, Button, Upload, message, Spin, Statistic } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  EditOutlined,
  UploadOutlined,
  CalendarOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
import type { UploadFile } from 'antd';
import { useAuth } from '../context/AuthContext';
import { useFrappeGetDoc, useFrappeUpdateDoc } from 'frappe-react-sdk';

const ProfilePage: React.FC = () => {
  const { user, currentUser } = useAuth();
  const [editing, setEditing] = useState(false);
  
  // Get user document from Frappe
  const { data: userDoc, isLoading, error } = useFrappeGetDoc('User', currentUser || '');

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Spin size="large" tip="Loading profile..." />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <div style={{ textAlign: 'center', color: '#ff4d4f' }}>
          <p>Error loading profile: {error.message}</p>
        </div>
      </Card>
    );
  }

  const handleAvatarChange = (info: { file: UploadFile }) => {
    if (info.file.status === 'done') {
      message.success('Avatar updated successfully');
    } else if (info.file.status === 'error') {
      message.error('Failed to update avatar');
    }
  };

  const userImage = userDoc?.user_image || user?.user_image;
  const fullName = userDoc?.full_name || user?.full_name || currentUser;
  const email = userDoc?.email || user?.email;
  const phone = userDoc?.phone;
  const mobileNo = userDoc?.mobile_no;
  const location = userDoc?.location;
  const bio = userDoc?.bio;
  const userType = userDoc?.user_type;
  const lastLogin = userDoc?.last_login;
  const enabled = userDoc?.enabled;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Profile Header Card */}
      <Card
        style={{
          marginBottom: 24,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        }}
        bodyStyle={{ padding: '40px 24px' }}
      >
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} sm={8} md={4} style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <Avatar
                size={120}
                src={userImage}
                icon={<UserOutlined />}
                style={{
                  border: '4px solid white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}
              />
              <Upload
                showUploadList={false}
                onChange={handleAvatarChange}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                }}
              >
                <Button
                  type="primary"
                  shape="circle"
                  icon={<UploadOutlined />}
                  size="small"
                  style={{
                    background: 'white',
                    color: '#667eea',
                    border: '2px solid white',
                  }}
                />
              </Upload>
            </div>
          </Col>
          <Col xs={24} sm={16} md={20}>
            <h1 style={{ margin: '0 0 8px 0', fontSize: 32, fontWeight: 'bold' }}>
              {fullName}
            </h1>
            <p style={{ margin: '0 0 16px 0', opacity: 0.9, fontSize: 16 }}>
              {userType || 'User'}
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Tag color="green" style={{ fontSize: 14, padding: '4px 12px' }}>
                {enabled ? 'Active' : 'Inactive'}
              </Tag>
              {email && (
                <Tag icon={<MailOutlined />} style={{ fontSize: 14, padding: '4px 12px' }}>
                  {email}
                </Tag>
              )}
            </div>
          </Col>
        </Row>
      </Card>

      {/* Profile Information */}
      <Row gutter={[24, 24]}>
        {/* Main Information */}
        <Col xs={24} lg={16}>
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <IdcardOutlined />
                <span>Personal Information</span>
              </div>
            }
            extra={
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => setEditing(!editing)}
              >
                {editing ? 'Cancel' : 'Edit'}
              </Button>
            }
          >
            <Descriptions
              column={{ xs: 1, sm: 2 }}
              bordered
              size="middle"
            >
              <Descriptions.Item label={<><UserOutlined /> Full Name</>} span={2}>
                {fullName || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label={<><MailOutlined /> Email</>} span={2}>
                {email || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label={<><PhoneOutlined /> Phone</>}>
                {phone || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label={<><PhoneOutlined /> Mobile</>}>
                {mobileNo || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label={<><EnvironmentOutlined /> Location</>} span={2}>
                {location || 'N/A'}
              </Descriptions.Item>
              {bio && (
                <Descriptions.Item label="Bio" span={2}>
                  {bio}
                </Descriptions.Item>
              )}
            </Descriptions>
          </Card>

          {/* Additional Information */}
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CalendarOutlined />
                <span>Account Information</span>
              </div>
            }
            style={{ marginTop: 24 }}
          >
            <Descriptions
              column={{ xs: 1, sm: 2 }}
              bordered
              size="middle"
            >
              <Descriptions.Item label="Username">
                {currentUser}
              </Descriptions.Item>
              <Descriptions.Item label="User Type">
                {userType || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Last Login" span={2}>
                {lastLogin ? new Date(lastLogin).toLocaleString() : 'Never'}
              </Descriptions.Item>
              <Descriptions.Item label="Account Status" span={2}>
                <Tag color={enabled ? 'green' : 'red'}>
                  {enabled ? 'Enabled' : 'Disabled'}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Sidebar */}
        <Col xs={24} lg={8}>
          {/* Quick Stats */}
          <Card title="Activity" style={{ marginBottom: 24 }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic
                  title="Last Login"
                  value={lastLogin ? new Date(lastLogin).getDate() : '-'}
                  suffix={lastLogin ? new Date(lastLogin).toLocaleString('default', { month: 'short' }) : ''}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Status"
                  value={enabled ? 'Active' : 'Inactive'}
                  valueStyle={{ color: enabled ? '#52c41a' : '#ff4d4f' }}
                />
              </Col>
            </Row>
          </Card>

          {/* Contact Information */}
          <Card title="Contact Details">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar icon={<MailOutlined />} style={{ background: '#1890ff' }} />
                  <div>
                    <div style={{ fontSize: 12, color: '#999' }}>Email</div>
                    <div>{email}</div>
                  </div>
                </div>
              )}
              {phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar icon={<PhoneOutlined />} style={{ background: '#52c41a' }} />
                  <div>
                    <div style={{ fontSize: 12, color: '#999' }}>Phone</div>
                    <div>{phone}</div>
                  </div>
                </div>
              )}
              {mobileNo && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar icon={<PhoneOutlined />} style={{ background: '#722ed1' }} />
                  <div>
                    <div style={{ fontSize: 12, color: '#999' }}>Mobile</div>
                    <div>{mobileNo}</div>
                  </div>
                </div>
              )}
              {location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar icon={<EnvironmentOutlined />} style={{ background: '#fa8c16' }} />
                  <div>
                    <div style={{ fontSize: 12, color: '#999' }}>Location</div>
                    <div>{location}</div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
