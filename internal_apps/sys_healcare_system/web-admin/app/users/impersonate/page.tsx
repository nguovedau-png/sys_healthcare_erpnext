'use client';

import React, { useState } from 'react';
import {
    Card,
    Input,
    Button,
    Table,
    Tag,
    Space,
    Typography,
    Avatar,
    Modal,
    Alert,
    message
} from 'antd';
import {
    SearchOutlined,
    UserSwitchOutlined,
    SafetyCertificateOutlined,
    StopOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

interface UserMock {
    id: string;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'blocked';
    lastActive: string;
}

const ImpersonatePage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<UserMock[]>([]);
    const [impersonatingUser, setImpersonatingUser] = useState<UserMock | null>(null);

    const handleSearch = (value: string) => {
        setLoading(true);
        // Mock search API
        setTimeout(() => {
            setUsers([
                { id: 'usr-1', name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', role: 'PATIENT', status: 'active', lastActive: '2 mins ago' },
                { id: 'doc-1', name: 'BS. Trần Thị B', email: 'tranthib@hospital.vn', role: 'DOCTOR', status: 'active', lastActive: '1 hour ago' },
            ]);
            setLoading(false);
        }, 500);
    };

    const handleImpersonate = (user: UserMock) => {
        Modal.confirm({
            title: 'Xác nhận truy cập',
            icon: <SafetyCertificateOutlined style={{ color: '#faad14' }} />,
            content: (
                <div>
                    <p>Bạn sắp truy cập hệ thống dưới danh nghĩa người dùng <strong>{user.name}</strong>.</p>
                    <p>Mọi hành động của bạn sẽ được ghi lại trong Audit Log với cờ <code>IMPERSONATED_BY_ADMIN</code>.</p>
                </div>
            ),
            okText: 'Truy cập ngay',
            cancelText: 'Hủy',
            onOk: () => {
                setImpersonatingUser(user);
                message.loading('Đang chuyển đổi phiên làm việc...', 1.5).then(() => {
                    message.success(`Đang truy cập với tư cách: ${user.name}`);
                    // In a real app, this would set a special session cookie/token and redirect to the public app
                    // router.push('http://localhost:3001'); // Redirect to Web Public
                });
            }
        });
    };

    const handleStopImpersonation = () => {
        setImpersonatingUser(null);
        message.success('Đã kết thúc phiên làm việc.');
    };

    const columns = [
        {
            title: 'Người dùng',
            key: 'user',
            render: (_: any, record: UserMock) => (
                <Space>
                    <Avatar>{record.name[0]}</Avatar>
                    <div>
                        <div style={{ fontWeight: 'bold' }}>{record.name}</div>
                        <div style={{ fontSize: '12px', color: '#888' }}>{record.email}</div>
                    </div>
                </Space>
            )
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
            render: (role: string) => <Tag color={role === 'DOCTOR' ? 'blue' : 'green'}>{role}</Tag>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => <Tag color={status === 'active' ? 'success' : 'error'}>{status.toUpperCase()}</Tag>
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_: any, record: UserMock) => (
                <Button
                    type="primary"
                    ghost
                    icon={<UserSwitchOutlined />}
                    onClick={() => handleImpersonate(record)}
                    disabled={record.status !== 'active'}
                >
                    Truy cập
                </Button>
            )
        }
    ];

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '24px' }}>
                <Title level={2} style={{ margin: 0 }}>Hỗ trợ khách hàng (Impersonation)</Title>
                <Text type="secondary">Truy cập hệ thống dưới góc nhìn của người dùng để hỗ trợ và xử lý sự cố.</Text>
            </div>

            {impersonatingUser && (
                <Alert
                    message={
                        <Space>
                            <SafetyCertificateOutlined />
                            <strong>Đang trong phiên làm việc của: {impersonatingUser.name}</strong>
                        </Space>
                    }
                    description="Bạn đang xem hệ thống với quyền hạn của người dùng này. Hãy cẩn trọng với các thay đổi dữ liệu."
                    type="warning"
                    showIcon={false}
                    action={
                        <Button size="small" danger icon={<StopOutlined />} onClick={handleStopImpersonation}>
                            Kết thúc phiên
                        </Button>
                    }
                    style={{ marginBottom: '24px', border: '1px solid #ffe58f', background: '#fffbe6' }}
                />
            )}

            <Card title="Tìm kiếm người dùng">
                <Input.Search
                    placeholder="Nhập email, số điện thoại hoặc tên người dùng..."
                    enterButton="Tìm kiếm"
                    size="large"
                    onSearch={handleSearch}
                    loading={loading}
                    style={{ maxWidth: 600, marginBottom: '24px' }}
                />

                <Table
                    columns={columns}
                    dataSource={users}
                    rowKey="id"
                    pagination={false}
                    locale={{ emptyText: 'Nhập thông tin để tìm kiếm người dùng' }}
                />
            </Card>
        </div>
    );
};

export default ImpersonatePage;
