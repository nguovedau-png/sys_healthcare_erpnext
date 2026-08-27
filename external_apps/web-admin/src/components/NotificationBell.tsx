import React, { useEffect, useState } from 'react';
import { Badge, Dropdown, List, Button, Empty, Spin } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import api from '../services/api';
import { io, Socket } from 'socket.io-client';

interface Notification {
    id: string;
    title: string;
    message: string;
    createdAt: string;
    read: boolean;
}

const NotificationBell: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(false);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        fetchNotifications();

        // Initialize Socket.IO
        const newSocket = io(import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3000', {
            auth: {
                token: localStorage.getItem('token')
            }
        });

        newSocket.on('notification', (notification: Notification) => {
            setNotifications(prev => [notification, ...prev]);
            setUnreadCount(prev => prev + 1);
        });

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const res = await api.get('/notifications');
            if (res.data.success) {
                setNotifications(res.data.data);
                setUnreadCount(res.data.data.filter((n: Notification) => !n.read).length);
            }
        } catch (error) {
            console.error('Failed to fetch notifications');
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id: string) => {
        try {
            await api.put(`/notifications/${id}/read`);
            setNotifications(prev =>
                prev.map(n => n.id === id ? { ...n, read: true } : n)
            );
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (error) {
            console.error('Failed to mark as read');
        }
    };

    const markAllAsRead = async () => {
        try {
            await api.put('/notifications/read-all');
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
            setUnreadCount(0);
        } catch (error) {
            console.error('Failed to mark all as read');
        }
    };

    const menu = (
        <div style={{ width: 350, maxHeight: 400, overflow: 'auto', background: 'white', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}>Notifications</h3>
                {unreadCount > 0 && (
                    <Button type="link" size="small" onClick={markAllAsRead}>
                        Mark all as read
                    </Button>
                )}
            </div>
            {loading ? (
                <div style={{ textAlign: 'center', padding: 24 }}>
                    <Spin />
                </div>
            ) : notifications.length === 0 ? (
                <Empty description="No notifications" style={{ padding: 24 }} />
            ) : (
                <List
                    dataSource={notifications}
                    renderItem={(item) => (
                        <List.Item
                            key={item.id}
                            style={{
                                padding: '12px 16px',
                                cursor: 'pointer',
                                background: item.read ? 'white' : '#e6f7ff'
                            }}
                            onClick={() => !item.read && markAsRead(item.id)}
                        >
                            <List.Item.Meta
                                title={item.title}
                                description={
                                    <>
                                        <div>{item.message}</div>
                                        <small style={{ color: '#999' }}>
                                            {new Date(item.createdAt).toLocaleString()}
                                        </small>
                                    </>
                                }
                            />
                        </List.Item>
                    )}
                />
            )}
        </div>
    );

    return (
        <Dropdown dropdownRender={() => menu} trigger={['click']} placement="bottomRight">
            <Badge count={unreadCount} offset={[-5, 5]}>
                <Button type="text" icon={<BellOutlined style={{ fontSize: 20 }} />} />
            </Badge>
        </Dropdown>
    );
};

export default NotificationBell;
