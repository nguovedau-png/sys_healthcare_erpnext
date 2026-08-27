'use client';

import React, { useEffect, useState } from 'react';
import { Badge, Button, Dropdown, List, Avatar, Typography, Empty } from 'antd';
import { BellOutlined, NotificationOutlined } from '@ant-design/icons';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '@/providers/AuthProvider';
import Link from 'next/link';

const { Text } = Typography;

export default function NotificationBell() {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState<any[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (!user) return;

        let newSocket: Socket | null = null;
        try {
            // Frappe socketio runs on port 9000 by default
            const SOCKET_URL = process.env.NEXT_PUBLIC_FRAPPE_URL?.replace(':8000', ':9000') || 'http://localhost:9000';
            newSocket = io(SOCKET_URL, {
                transports: ['websocket'],
                timeout: 5000,
            });
            setSocket(newSocket);

            newSocket.emit('subscribeToNotifications', { userId: (user as any).id || (user as any).userId });

            newSocket.on('notification', (notification) => {
                setNotifications((prev) => [notification, ...prev]);
                setUnreadCount((prev) => prev + 1);

                if (Notification.permission === 'granted') {
                    newSubNotification(notification.title, notification.content);
                }
            });

            newSocket.on('connect_error', () => {
                // Silently fail - notifications are non-critical
                newSocket?.disconnect();
            });
        } catch {
            // Socket connection is optional, don't crash
        }

        return () => {
            newSocket?.disconnect();
        };
    }, [user]);

    const newSubNotification = (title: string, body: string) => {
        new Notification(title, { body });
    };

    const menu = (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 3px 6px -4px rgba(0,0,0,0.12), 0 6px 16px 0 rgba(0,0,0,0.08), 0 9px 28px 8px rgba(0,0,0,0.05)',
            width: '320px',
            maxHeight: '450px',
            overflow: 'auto',
            padding: '12px'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <Text strong style={{ fontSize: '16px' }}>Thông báo mới</Text>
                <Link href="/notifications" style={{ fontSize: '12px' }}>Xem tất cả</Link>
            </div>
            {notifications.length > 0 ? (
                <List
                    itemLayout="horizontal"
                    dataSource={notifications.slice(0, 5)}
                    renderItem={(item) => (
                        <List.Item style={{ padding: '8px 4px', cursor: 'pointer' }}>
                            <List.Item.Meta
                                avatar={<Avatar icon={<NotificationOutlined />} style={{ backgroundColor: '#1677ff' }} />}
                                title={<Text strong size="small">{item.title}</Text>}
                                description={
                                    <div style={{ fontSize: '12px' }}>
                                        <div style={{ color: '#595959' }}>{item.content}</div>
                                        <div style={{ color: '#bfbfbf', marginTop: '4px' }}>Just now</div>
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
            ) : (
                <Empty description="Không có thông báo mới" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
        </div>
    );

    return (
        <Dropdown popupRender={() => menu} placement="bottomRight" trigger={['click']}>
            <Badge count={unreadCount} size="small" offset={[-2, 4]}>
                <Button
                    type="text"
                    icon={<BellOutlined style={{ fontSize: '20px' }} />}
                    onClick={() => setUnreadCount(0)}
                />
            </Badge>
        </Dropdown>
    );
}
