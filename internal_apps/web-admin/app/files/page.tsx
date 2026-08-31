'use client';

import React, { useEffect, useState } from 'react';
import {
    Table,
    Typography,
    Card,
    Space,
    Button,
    Upload,
    message,
    Popconfirm,
    Image,
} from 'antd';
import {
    UploadOutlined,
    DeleteOutlined,
    DownloadOutlined,
    FileOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { UploadProps } from 'antd';
import { useAuth } from '@/providers/AuthProvider';

const { Title } = Typography;
const { Dragger } = Upload;

interface FileRecord {
    id: number;
    filename: string;
    path: string;
    mimetype: string;
    size: number;
    userId: string;
    createdAt: string;
}

export default function FilesPage() {
    const { user } = useAuth();
    const userId = user?.userId;
    const [files, setFiles] = useState<FileRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const fetchFiles = () => {
        if (!userId) return;
        setLoading(true);
        fetch(`http://localhost:3000/files?userId=${userId}`)
            .then((res) => res.json())
            .then((data) => {
                setFiles(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to fetch files:', err);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (userId) fetchFiles();
    }, [userId]);

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/files/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                message.success('File deleted successfully');
                fetchFiles();
            } else {
                message.error('Failed to delete file');
            }
        } catch (error) {
            console.error('Error deleting file:', error);
            message.error('An error occurred');
        }
    };

    const handleDownload = (file: FileRecord) => {
        window.open(`http://localhost:3000/files/${file.id}/download`, '_blank');
    };

    const uploadProps: UploadProps = {
        name: 'file',
        multiple: true,
        action: 'http://localhost:3000/files',
        headers: {
            'x-user-id': userId || '',
        },
        onChange(info) {
            const { status } = info.file;
            if (status === 'uploading') {
                setUploading(true);
            }
            if (status === 'done') {
                setUploading(false);
                message.success(`${info.file.name} uploaded successfully`);
                fetchFiles();
            } else if (status === 'error') {
                setUploading(false);
                message.error(`${info.file.name} upload failed`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const isImage = (mimetype: string) => {
        return mimetype.startsWith('image/');
    };

    const columns: ColumnsType<FileRecord> = [
        {
            title: 'Preview',
            key: 'preview',
            width: 80,
            render: (_, record) => (
                isImage(record.mimetype) ? (
                    <Image
                        src={`http://localhost:3000/files/${record.id}/download`}
                        alt={record.filename}
                        width={50}
                        height={50}
                        style={{ objectFit: 'cover' }}
                    />
                ) : (
                    <FileOutlined style={{ fontSize: 32 }} />
                )
            ),
        },
        {
            title: 'Filename',
            dataIndex: 'filename',
            key: 'filename',
        },
        {
            title: 'Type',
            dataIndex: 'mimetype',
            key: 'mimetype',
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
            render: (size) => formatFileSize(size),
        },
        {
            title: 'Uploaded At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => new Date(text).toLocaleString(),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        icon={<DownloadOutlined />}
                        onClick={() => handleDownload(record)}
                    >
                        Download
                    </Button>
                    <Popconfirm
                        title="Delete file"
                        description="Are you sure you want to delete this file?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger icon={<DeleteOutlined />}>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Space orientation="vertical" style={{ width: '100%' }} size="large">
                <Card>
                    <Title level={2}>File Upload</Title>
                    <Dragger {...uploadProps} disabled={uploading}>
                        <p className="ant-upload-drag-icon">
                            <UploadOutlined style={{ fontSize: 48 }} />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag files to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                            Support for single or bulk upload. Strictly prohibited from uploading
                            company data or other banned files.
                        </p>
                    </Dragger>
                </Card>

                <Card>
                    <Title level={2}>My Files</Title>
                    <Table
                        columns={columns}
                        dataSource={files}
                        rowKey="id"
                        loading={loading}
                        pagination={{ pageSize: 10 }}
                    />
                </Card>
            </Space>
        </div>
    );
}
