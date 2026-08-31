'use client';

import React, { useEffect, useState } from 'react';
import { List, Typography, Avatar, Card, Tag, Empty } from 'antd';
import {
    UserOutlined,
    BookOutlined,
    DollarCircleOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';
import { io, Socket } from 'socket.io-client';

const { Text, Title } = Typography;

export default function ActivityFeed() {
    const [activities, setActivities] = useState<any[]>([]);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        // Pre-load mock activities immediately
        setActivities([
            { id: 1, title: 'Học viên mới', content: 'Nguyễn Văn A vừa đăng ký khóa học CME 2024', type: 'user', time: '5 phút trước' },
            { id: 2, title: 'Thanh toán thành công', content: 'Đơn hàng #12345 đã được thanh toán', type: 'payment', time: '10 phút trước' },
            { id: 3, title: 'Báo cáo mới', content: 'Báo cáo doanh thu tháng 12 đã sẵn sàng', type: 'system', time: '1 giờ trước' },
        ]);

        let newSocket: Socket | null = null;
        try {
            const SOCKET_URL = process.env.NEXT_PUBLIC_FRAPPE_URL?.replace(':8000', ':9000') || 'http://localhost:9000';
            newSocket = io(SOCKET_URL, { transports: ['websocket'], timeout: 3000 });
            setSocket(newSocket);

            newSocket.on('notification', (activity) => {
                setActivities((prev) => [activity, ...prev].slice(0, 10));
            });

            newSocket.on('connect_error', () => {
                newSocket?.disconnect();
            });
        } catch {
            // Socket is optional
        }

        return () => {
            newSocket?.disconnect();
        };
    }, []);

    const getIcon = (type: string) => {
        switch (type) {
            case 'user': return <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />;
            case 'payment': return <Avatar icon={<DollarCircleOutlined />} style={{ backgroundColor: '#52c41a' }} />;
            case 'course': return <Avatar icon={<BookOutlined />} style={{ backgroundColor: '#722ed1' }} />;
            default: return <Avatar icon={<ClockCircleOutlined />} style={{ backgroundColor: '#fa8c16' }} />;
        }
    };

    return (
        <Card title={<Title level={4} style={{ margin: 0 }}>Hoạt động trực tuyến</Title>} variant="outlined" style={{ height: '100%' }}>
            {activities.length > 0 ? (
                <List
                    itemLayout="horizontal"
                    dataSource={activities}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={getIcon(item.type)}
                                title={<Text strong>{item.title}</Text>}
                                description={
                                    <div>
                                        <div style={{ fontSize: '13px', color: '#595959' }}>{item.content}</div>
                                        <div style={{ fontSize: '11px', color: '#bfbfbf', marginTop: '4px' }}>{item.time || 'Vừa xong'}</div>
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
            ) : (
                <Empty description="Chưa có hoạt động nào" />
            )}
        </Card>
    );
}
