'use client';

import React, { useState, useEffect } from 'react';
import {
    Card,
    Upload,
    Button,
    Image,
    Typography,
    Space,
    Tabs,
    Input,
    message,
    Modal,
    Empty,
    Tooltip
} from 'antd';
import {
    UploadOutlined,
    DeleteOutlined,
    LinkOutlined,
    SearchOutlined,
    FileImageOutlined,
    FileTextOutlined
} from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

interface MediaItem {
    id: string;
    filename: string;
    url: string;
    thumbnailUrl?: string;
    type: string;
    size: number;
    uploadedAt: string;
    userId: string;
}

const MediaLibraryPage = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('images');

    // Load mock data
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            const mockData: MediaItem[] = [
                { id: '1', filename: 'banner-hero.jpg', url: 'https://placehold.co/800x400/1677ff/white?text=Banner+Hero', thumbnailUrl: 'https://placehold.co/200x100/1677ff/white?text=Thumb', type: 'image/jpeg', size: 1024000, uploadedAt: new Date().toISOString(), userId: 'admin-1' },
                { id: '2', filename: 'avatar-doc-1.png', url: 'https://placehold.co/400x400/png?text=Avatar', thumbnailUrl: 'https://placehold.co/100x100/png?text=Thumb', type: 'image/png', size: 512000, uploadedAt: new Date(Date.now() - 3600000).toISOString(), userId: 'admin-1' },
                { id: '3', filename: 'policy.pdf', url: '#', type: 'application/pdf', size: 204800, uploadedAt: new Date(Date.now() - 7200000).toISOString(), userId: 'admin-1' },
            ];
            setMediaItems(mockData);
            setLoading(false);
        }, 1000);
    }, []);

    const handleUpload: UploadProps['customRequest'] = async (options) => {
        const { file, onSuccess, onError } = options;
        setLoading(true);

        // Simulate upload delay
        setTimeout(() => {
            const newMedia: MediaItem = {
                id: Math.random().toString(36).substr(2, 9),
                filename: (file as File).name,
                url: URL.createObjectURL(file as File),
                type: (file as File).type,
                size: (file as File).size,
                uploadedAt: new Date().toISOString(),
                userId: 'current-user'
            };

            setMediaItems(prev => [newMedia, ...prev]);
            onSuccess?.(newMedia);
            message.success(`${(file as File).name} uploaded successfully`);
            setLoading(false);
            setFileList([]); // Clear upload list
        }, 1500);
    };

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: 'Xóa tập tin?',
            content: 'Bạn có chắc chắn muốn xóa tập tin này không? Hành động này không thể hoàn tác.',
            onOk: () => {
                setMediaItems(prev => prev.filter(item => item.id !== id));
                message.success('Đã xóa tập tin');
            }
        });
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        message.success('Đã sao chép đường dẫn');
    };

    const filteredItems = mediaItems.filter(item => {
        const matchesSearch = item.filename.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === 'all'
            ? true
            : activeTab === 'images'
                ? item.type.startsWith('image/')
                : !item.type.startsWith('image/');
        return matchesSearch && matchesTab;
    });

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Thư viện Media</Title>
                    <Text type="secondary">Quản lý tập trung hình ảnh, tài liệu và các tập tin khác</Text>
                </div>
                <Upload
                    customRequest={handleUpload}
                    fileList={fileList}
                    onChange={({ fileList }) => setFileList(fileList)}
                    showUploadList={false}
                    multiple
                >
                    <Button type="primary" icon={<UploadOutlined />} size="large" loading={loading}>
                        Tải lên tập tin
                    </Button>
                </Upload>
            </div>

            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <Tabs activeKey={activeTab} onChange={setActiveTab} style={{ marginBottom: 0 }}>
                        <TabPane tab="Tất cả" key="all" />
                        <TabPane tab={<span><FileImageOutlined /> Hình ảnh</span>} key="images" />
                        <TabPane tab={<span><FileTextOutlined /> Tài liệu</span>} key="documents" />
                    </Tabs>

                    <Input
                        placeholder="Tìm kiếm tập tin..."
                        prefix={<SearchOutlined />}
                        style={{ width: 300 }}
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>

                {filteredItems.length === 0 ? (
                    <Empty description="Không tìm thấy tập tin nào" />
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '16px'
                    }}>
                        {filteredItems.map(item => (
                            <Card
                                key={item.id}
                                hoverable
                                cover={
                                    item.type.startsWith('image/') ? (
                                        <div style={{ height: '150px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
                                            <Image
                                                alt={item.filename}
                                                src={item.thumbnailUrl || item.url}
                                                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                                preview={{ src: item.url }}
                                            />
                                        </div>
                                    ) : (
                                        <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafafa', fontSize: '48px', color: '#ccc' }}>
                                            <FileTextOutlined />
                                        </div>
                                    )
                                }
                                actions={[
                                    <Tooltip title="Sao chép URL" key="link">
                                        <LinkOutlined onClick={() => copyToClipboard(item.url)} />
                                    </Tooltip>,
                                    <Tooltip title="Xóa" key="delete">
                                        <DeleteOutlined onClick={() => handleDelete(item.id)} style={{ color: '#ff4d4f' }} />
                                    </Tooltip>
                                ]}
                            >
                                <Card.Meta
                                    title={
                                        <Tooltip title={item.filename}>{item.filename}</Tooltip>
                                    }
                                    description={
                                        <Space direction="vertical" size={0} style={{ fontSize: '12px' }}>
                                            <Text type="secondary">{(item.size / 1024).toFixed(1)} KB</Text>
                                            <Text type="secondary">{new Date(item.uploadedAt).toLocaleDateString()}</Text>
                                        </Space>
                                    }
                                />
                            </Card>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
};

export default MediaLibraryPage;
