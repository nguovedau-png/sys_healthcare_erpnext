'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Input, Tag, Row, Col, Statistic, Breadcrumb, Tabs, Progress, message } from 'antd';
import { SearchOutlined, BarChartOutlined, TagOutlined, EyeOutlined, EyeInvisibleOutlined, InfoCircleOutlined, RiseOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import analyticService, { SearchKeyword, SearchHashtag } from '@/services/analytic.service';

const { Title, Text } = Typography;

export default function SearchAnalyticsPage() {
    const [keywords, setKeywords] = useState<SearchKeyword[]>([]);
    const [hashtags, setHashtags] = useState<SearchHashtag[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    const fetchData = async () => {
        setLoading(true);
        try {
            const [kData, hData] = await Promise.all([
                analyticService.getKeywords(),
                analyticService.getHashtags()
            ]);
            setKeywords(kData);
            setHashtags(hData);
        } catch (error) {
            console.error('Failed to fetch analytics data:', error);
            message.error('Không thể tải dữ liệu phân tích');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleStatusUpdate = async (id: number, type: 'keyword' | 'hashtag', currentStatus: boolean) => {
        try {
            if (type === 'keyword') {
                await analyticService.updateKeywordStatus(id, !currentStatus);
            } else {
                await analyticService.updateHashtagStatus(id, !currentStatus);
            }
            message.success('Cập nhật trạng thái thành công');
            fetchData();
        } catch (error) {
            message.error('Lỗi khi cập status');
        }
    };

    const formatCount = (count: number): string => {
        if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
        if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
        return count.toString();
    };

    const totalSearches = keywords.reduce((sum, k) => sum + k.times, 0) + hashtags.reduce((sum, h) => sum + h.times, 0);

    const keywordColumns: ColumnsType<SearchKeyword> = [
        {
            title: 'Hạng',
            key: 'rank',
            width: 80,
            render: (_, __, index) => <Text strong>{index + 1}</Text>,
        },
        {
            title: 'Từ khóa (VN)',
            dataIndex: 'keywordVN',
            key: 'keywordVN',
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: 'Từ khóa (Gốc)',
            dataIndex: 'keyword',
            key: 'keyword',
            render: (text) => <Text type="secondary">{text}</Text>,
        },
        {
            title: 'Lượt tìm kiếm',
            dataIndex: 'times',
            key: 'times',
            render: (times) => <Text strong style={{ color: '#1890ff' }}>{formatCount(times)}</Text>,
            sorter: (a, b) => a.times - b.times,
            defaultSortOrder: 'descend',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status ? 'success' : 'default'}>
                    {status ? 'HIỆN' : 'ẨN'}
                </Tag>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button icon={<InfoCircleOutlined />} type="link">Chi tiết</Button>
                    <Button
                        icon={record.status ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        type="link"
                        danger={record.status}
                        onClick={() => handleStatusUpdate(record.id, 'keyword', record.status)}
                    >
                        {record.status ? 'Ẩn' : 'Hiện'}
                    </Button>
                </Space>
            ),
        },
    ];

    const hashtagColumns: ColumnsType<SearchHashtag> = [
        {
            title: 'Hạng',
            key: 'rank',
            width: 80,
            render: (_, __, index) => <Text strong>{index + 1}</Text>,
        },
        {
            title: 'Hashtag (VN)',
            dataIndex: 'hashtagVN',
            key: 'hashtagVN',
            render: (text) => <Text strong>#{text}</Text>,
        },
        {
            title: 'Hashtag (Gốc)',
            dataIndex: 'hashtag',
            key: 'hashtag',
            render: (text) => <Text type="secondary">#{text}</Text>,
        },
        {
            title: 'Lượt sử dụng',
            dataIndex: 'times',
            key: 'times',
            render: (times) => <Text strong style={{ color: '#722ed1' }}>{formatCount(times)}</Text>,
            sorter: (a, b) => a.times - b.times,
            defaultSortOrder: 'descend',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status ? 'success' : 'default'}>
                    {status ? 'HIỆN' : 'ẨN'}
                </Tag>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button icon={<InfoCircleOutlined />} type="link">Chi tiết</Button>
                    <Button
                        icon={record.status ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        type="link"
                        danger={record.status}
                        onClick={() => handleStatusUpdate(record.id, 'hashtag', record.status)}
                    >
                        {record.status ? 'Ẩn' : 'Hiện'}
                    </Button>
                </Space>
            ),
        },
    ];

    const filteredKeywords = keywords.filter(k =>
        k.keyword.toLowerCase().includes(searchText.toLowerCase()) ||
        k.keywordVN.toLowerCase().includes(searchText.toLowerCase())
    );

    const filteredHashtags = hashtags.filter(h =>
        h.hashtag.toLowerCase().includes(searchText.toLowerCase()) ||
        h.hashtagVN.toLowerCase().includes(searchText.toLowerCase())
    );

    const tabItems = [
        {
            key: 'keywords',
            label: `Từ khóa (${keywords.length})`,
            children: (
                <Table
                    columns={keywordColumns}
                    dataSource={filteredKeywords}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                />
            )
        },
        {
            key: 'hashtags',
            label: `Hashtags (${hashtags.length})`,
            children: (
                <Table
                    columns={hashtagColumns}
                    dataSource={filteredHashtags}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                />
            )
        }
    ];

    return (
        <div style={{ padding: '0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>Phân tích</Breadcrumb.Item>
                <Breadcrumb.Item>Tìm kiếm</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ marginBottom: '24px' }}>
                <Title level={2} style={{ margin: 0 }}>Phân tích Tìm kiếm</Title>
                <Text type="secondary">Theo dõi từ khóa và hashtag phổ biến nhất trên hệ thống</Text>
            </div>

            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Tổng tìm kiếm" value={totalSearches} prefix={<SearchOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Từ khóa" value={keywords.length} valueStyle={{ color: '#3f8600' }} prefix={<BarChartOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Hashtags" value={hashtags.length} valueStyle={{ color: '#722ed1' }} prefix={<TagOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic title="Hôm nay" value="2.5K" valueStyle={{ color: '#faad14' }} prefix={<RiseOutlined />} />
                    </Card>
                </Col>
            </Row>

            <Card style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <Input
                        placeholder="Tìm kiếm từ khóa hoặc hashtag..."
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        style={{ width: 400 }}
                        allowClear
                    />
                </div>
                <Tabs items={tabItems} />
            </Card>

            <Row gutter={24}>
                <Col span={12}>
                    <Card title="Xu hướng Từ khóa">
                        <div style={{ padding: '8px 0' }}>
                            {keywords.slice(0, 5).map((k) => (
                                <div key={k.id} style={{ marginBottom: '16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                        <Text>{k.keywordVN}</Text>
                                        <Text type="secondary">{formatCount(k.times)}</Text>
                                    </div>
                                    <Progress
                                        percent={(k.times / (keywords[0]?.times || 1)) * 100}
                                        showInfo={false}
                                        strokeColor="#1890ff"
                                    />
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Xu hướng Hashtags">
                        <div style={{ padding: '8px 0' }}>
                            {hashtags.slice(0, 5).map((h) => (
                                <div key={h.id} style={{ marginBottom: '16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                        <Text>#{h.hashtagVN}</Text>
                                        <Text type="secondary">{formatCount(h.times)}</Text>
                                    </div>
                                    <Progress
                                        percent={(h.times / (hashtags[0]?.times || 1)) * 100}
                                        showInfo={false}
                                        strokeColor="#722ed1"
                                    />
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
