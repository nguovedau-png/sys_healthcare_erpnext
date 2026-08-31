import React, { useState } from 'react';
import { Avatar, Badge, Popover, Button, Space, Typography, Tag, Divider, message } from 'antd';
import { UserOutlined, UserAddOutlined, MessageOutlined, CheckOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Text, Title } = Typography;

export type BadgeTier = 'diamond' | 'gold' | 'silver' | 'bronze' | 'none';

interface HubAvatarProps {
    src?: string;
    name: string;
    role?: string;
    hospital?: string;
    tier?: BadgeTier;
    size?: number | 'small' | 'default' | 'large';
    points?: number;
    showPopover?: boolean;
}

const TIER_CONFIG = {
    diamond: { color: '#b9f2ff', borderColor: '#13c2c2', label: 'Kim Cương', icon: '💎' },
    gold: { color: '#fffb8f', borderColor: '#faad14', label: 'Vàng', icon: '🏆' },
    silver: { color: '#f5f5f5', borderColor: '#bfbfbf', label: 'Bạc', icon: '🥈' },
    bronze: { color: '#ffd8bf', borderColor: '#d46b08', label: 'Đồng', icon: '🥉' },
    none: { color: 'transparent', borderColor: 'transparent', label: '', icon: '' },
};

export default function HubAvatar({ src, name, role = 'Thành viên', hospital, tier = 'none', size = 40, points = 0, showPopover = true }: HubAvatarProps) {
    const router = useRouter();
    const [friendStatus, setFriendStatus] = useState<'none' | 'pending' | 'friends'>('none');
    const config = TIER_CONFIG[tier];

    const handleAddFriend = () => {
        setFriendStatus('pending');
        message.success(`Đã gửi lời mời kết bạn đến ${name}`);
    };

    const handleMessage = () => {
        router.push(`/messages`);
    };

    const AvatarComponent = (
        <div style={{ position: 'relative', display: 'inline-block', cursor: showPopover ? 'pointer' : 'default' }}>
            <Avatar 
                src={src} 
                icon={!src ? <UserOutlined /> : undefined} 
                size={size}
                style={{ 
                    border: tier !== 'none' ? `2px solid ${config.borderColor}` : 'none',
                    boxShadow: tier !== 'none' ? `0 0 8px ${config.color}` : 'none'
                }}
            />
            {tier !== 'none' && (
                <div style={{
                    position: 'absolute',
                    bottom: -4,
                    right: -4,
                    background: '#fff',
                    borderRadius: '50%',
                    padding: 2,
                    fontSize: typeof size === 'number' ? size / 3 : 12,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 1
                }}>
                    {config.icon}
                </div>
            )}
        </div>
    );

    if (!showPopover) return AvatarComponent;

    const popoverContent = (
        <div style={{ width: 280, padding: 8 }}>
            <Space align="start" size="middle">
                <Avatar src={src} icon={!src ? <UserOutlined /> : undefined} size={64} style={{ border: `2px solid ${config.borderColor}` }} />
                <div>
                    <Title level={5} style={{ margin: 0 }}>{name}</Title>
                    <Text type="secondary" style={{ fontSize: 12 }}>{role}</Text>
                    {hospital && <div style={{ fontSize: 12, marginTop: 4, color: '#595959' }}>{hospital}</div>}
                    
                    {tier !== 'none' && (
                        <Tag color={config.borderColor} style={{ marginTop: 8, borderRadius: 12 }}>
                            {config.icon} Hạng {config.label}
                        </Tag>
                    )}
                </div>
            </Space>
            
            <Divider style={{ margin: '12px 0' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, textAlign: 'center' }}>
                <div>
                    <Text strong style={{ display: 'block', fontSize: 16 }}>{points.toLocaleString()}</Text>
                    <Text type="secondary" style={{ fontSize: 11 }}>Điểm Hub</Text>
                </div>
                <div>
                    <Text strong style={{ display: 'block', fontSize: 16 }}>142</Text>
                    <Text type="secondary" style={{ fontSize: 11 }}>Kết nối</Text>
                </div>
                <div>
                    <Text strong style={{ display: 'block', fontSize: 16 }}>15</Text>
                    <Text type="secondary" style={{ fontSize: 11 }}>Bài đăng</Text>
                </div>
            </div>

            <Space style={{ width: '100%', justifyContent: 'center' }}>
                {friendStatus === 'none' && (
                    <Button type="primary" icon={<UserAddOutlined />} onClick={handleAddFriend} style={{ borderRadius: 20 }}>
                        Kết bạn
                    </Button>
                )}
                {friendStatus === 'pending' && (
                    <Button disabled icon={<CheckOutlined />} style={{ borderRadius: 20 }}>
                        Đã gửi lời mời
                    </Button>
                )}
                <Button icon={<MessageOutlined />} onClick={handleMessage} style={{ borderRadius: 20 }}>
                    Nhắn tin
                </Button>
            </Space>
        </div>
    );

    return (
        <Popover content={popoverContent} trigger="hover" placement="rightTop" overlayInnerStyle={{ borderRadius: 12 }}>
            {AvatarComponent}
        </Popover>
    );
}
