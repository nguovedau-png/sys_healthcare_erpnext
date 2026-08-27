import React, { useEffect, useState } from 'react';
import { Card, Upload, Button, Image, List, Typography, message, Modal, Row, Col, Popconfirm } from 'antd';
import { UploadOutlined, DeleteOutlined, FileOutlined, InboxOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import api from '../../../services/api';

const { Title, Text } = Typography;
const { Dragger } = Upload;

interface MediaItem {
    id: string;
    filename: string;
    url: string;
    type: string;
    size: number;
    createdAt: string;
}

const MediaManager: React.FC = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 20, total: 0 });

    const fetchMedia = async (page = 1) => {
        setLoading(true);
        try {
            const response = await api.get('/media', { params: { page, limit: pagination.pageSize } });
            if (response.data.success) {
                setMediaItems(response.data.data);
                setPagination({
                    ...pagination,
                    current: page,
                    total: response.data.pagination.total
                });
            }
        } catch (error) {
            message.error('Failed to load media');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedia();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await api.delete(`/media/${id}`);
            message.success('Media deleted');
            fetchMedia(pagination.current);
        } catch (error) {
            message.error('Failed to delete media');
        }
    };

    const handleUploadChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    // Custom upload request to use our API
    const customRequest = async (options: any) => {
        const { onSuccess, onError, file } = options;

        const formData = new FormData();
        formData.append('file', file);

        try {
            await api.post('/media/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            onSuccess("Ok");
            message.success(`${file.name} uploaded successfully`);
            setFileList([]); // Clear list after successful upload
            setIsUploadModalVisible(false);
            fetchMedia(1);
        } catch (err: any) {
            onError({ err });
            message.error(`${file.name} upload failed.`);
        }
    };

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as any);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <Title level={2}>Media Manager</Title>
                <Button type="primary" icon={<UploadOutlined />} onClick={() => setIsUploadModalVisible(true)}>
                    Upload Media
                </Button>
            </div>

            <List
                grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 6 }}
                dataSource={mediaItems}
                loading={loading}
                pagination={{
                    ...pagination,
                    onChange: (page) => fetchMedia(page),
                }}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            hoverable
                            cover={
                                <div style={{ height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f2f5', overflow: 'hidden' }}>
                                    {item.type === 'image' ? (
                                        <Image
                                            alt={item.filename}
                                            src={`http://localhost:3000${item.url}`} // Hardcoded localhost for now, ideally configured from env
                                            style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                                            height={150}
                                        />
                                    ) : (
                                        <FileOutlined style={{ fontSize: 48, color: '#999' }} />
                                    )}
                                </div>
                            }
                            actions={[
                                <Popconfirm title="Delete this file?" onConfirm={() => handleDelete(item.id)}>
                                    <DeleteOutlined key="delete" style={{ color: 'red' }} />
                                </Popconfirm>
                            ]}
                        >
                            <Card.Meta
                                title={<Text ellipsis={{ tooltip: item.filename }}>{item.filename}</Text>}
                                description={(item.size / 1024).toFixed(2) + ' KB'}
                            />
                        </Card>
                    </List.Item>
                )}
            />

            <Modal
                title="Upload Media (Auto-Crop for Images)"
                open={isUploadModalVisible}
                onCancel={() => setIsUploadModalVisible(false)}
                footer={null}
                width={600}
            >
                <ImgCrop rotationSlider showReset>
                    <Dragger
                        customRequest={customRequest}
                        fileList={fileList}
                        onChange={handleUploadChange}
                        onPreview={onPreview}
                        listType="picture"
                        maxCount={1} // Single file upload for better crop experience
                    >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Dragger>
                </ImgCrop>
            </Modal>
        </div>
    );
};

export default MediaManager;
