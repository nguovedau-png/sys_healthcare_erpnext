import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Typography, Space, Input, Modal, message, Popconfirm, Drawer, Descriptions } from 'antd';
import { ReloadOutlined, DeleteOutlined, EyeOutlined, ClearOutlined, SearchOutlined } from '@ant-design/icons';
import api from '../../../services/api';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;

const CacheManager: React.FC = () => {
    const [keys, setKeys] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedKey, setSelectedKey] = useState<string | null>(null);
    const [keyDetail, setKeyDetail] = useState<any>(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);

    const fetchKeys = async (pattern = '*') => {
        setLoading(true);
        try {
            const res = await api.get('/cache/keys', { params: { pattern } });
            if (res.data.success) {
                setKeys(res.data.data);
            }
        } catch (error) {
            message.error('Failed to fetch cache keys');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchKeys();
    }, []);

    const handleSearch = (value: string) => {
        const pattern = value ? `*${value}*` : '*';
        setSearch(pattern);
        fetchKeys(pattern);
    };

    const handleView = async (key: string) => {
        setSelectedKey(key);
        setDrawerVisible(true);
        setDetailLoading(true);
        try {
            // Use query param 'key' instead of path
            const res = await api.get('/cache/item', { params: { key } });
            if (res.data.success) {
                setKeyDetail(res.data.data);
            }
        } catch (error) {
            message.error('Failed to load key detail');
        } finally {
            setDetailLoading(false);
        }
    };

    const handleDelete = async (key: string) => {
        try {
            await api.delete('/cache/item', { params: { key } });
            message.success('Key deleted');
            fetchKeys(search); // Refresh
            if (selectedKey === key) setDrawerVisible(false);
        } catch (error) {
            message.error('Failed to delete key');
        }
    };

    const handleClearAll = async () => {
        try {
            await api.delete('/cache/clear');
            message.success('All cache cleared');
            fetchKeys();
        } catch (error) {
            message.error('Failed to clear cache');
        }
    };

    const columns = [
        {
            title: 'Key',
            dataIndex: 'key',
            key: 'key',
            render: (text: string) => <Text copyable>{text}</Text>
        },
        {
            title: 'Action',
            key: 'action',
            width: 150,
            render: (_: any, record: string) => (
                <Space>
                    <Button icon={<EyeOutlined />} size="small" onClick={() => handleView(record)} />
                    <Popconfirm title="Delete this key?" onConfirm={() => handleDelete(record)}>
                        <Button icon={<DeleteOutlined />} size="small" danger />
                    </Popconfirm>
                </Space>
            )
        }
    ];

    const dataSource = keys.map(k => ({ key: k }));

    return (
        <Card>
            <Space style={{ marginBottom: 16, justifyContent: 'space-between', width: '100%' }}>
                <Title level={4}>Cache Management</Title>
                <Space>
                    <Input.Search
                        placeholder="Search keys..."
                        onSearch={handleSearch}
                        style={{ width: 300 }}
                        allowClear
                    />
                    <Button icon={<ReloadOutlined />} onClick={() => fetchKeys(search)}>Refresh</Button>
                    <Popconfirm title="Clear ALL cache? This cannot be undone." onConfirm={handleClearAll} okText="Yes, Clear All" okButtonProps={{ danger: true }}>
                        <Button icon={<ClearOutlined />} danger type="primary">Clear All</Button>
                    </Popconfirm>
                </Space>
            </Space>

            <Table
                dataSource={dataSource}
                columns={columns}
                rowKey="key"
                loading={loading}
                pagination={{ pageSize: 20 }}
            />

            <Drawer
                title="Key Detail"
                placement="right"
                width={600}
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
            >
                {detailLoading ? <p>Loading...</p> : keyDetail && (
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Descriptions layout="vertical" bordered column={1}>
                            <Descriptions.Item label="Key">{keyDetail.key}</Descriptions.Item>
                            <Descriptions.Item label="TTL (seconds)">{keyDetail.ttl === -1 ? 'Persist' : keyDetail.ttl}</Descriptions.Item>
                        </Descriptions>
                        <div>
                            <Text strong>Value:</Text>
                            <div style={{
                                marginTop: 8,
                                padding: 12,
                                background: '#f5f5f5',
                                borderRadius: 4,
                                overflowX: 'auto',
                                fontFamily: 'monospace',
                                whiteSpace: 'pre-wrap'
                            }}>
                                {typeof keyDetail.value === 'object' ? JSON.stringify(keyDetail.value, null, 2) : String(keyDetail.value)}
                            </div>
                        </div>
                    </Space>
                )}
            </Drawer>
        </Card>
    );
};

export default CacheManager;
