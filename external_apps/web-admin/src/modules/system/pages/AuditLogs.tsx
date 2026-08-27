import React, { useEffect, useState } from 'react';
import { Table, Typography, Tag, Input, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import api from '../../../services/api';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { RangePicker } = DatePicker;

interface AuditLog {
    id: string;
    action: string;
    resource: string;
    userId: string;
    user: { fullName: string; email: string };
    ipAddress: string;
    method: string;
    path: string;
    after: any;
    createdAt: string;
}

const AuditLogs: React.FC = () => {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 20, total: 0 });
    const [filters, setFilters] = useState<{ search: string; dateRange: string[] }>({ search: '', dateRange: [] });

    const fetchLogs = async (page = 1) => {
        setLoading(true);
        try {
            const params: any = {
                page,
                limit: pagination.pageSize
            };

            if (filters.search) params.search = filters.search;
            if (filters.dateRange.length === 2) {
                params.startDate = filters.dateRange[0];
                params.endDate = filters.dateRange[1];
            }

            const res = await api.get('/audit-logs', { params });
            if (res.data.success) {
                // Backend returns { success: true, data: [...], pagination: { ... } }
                // Note: controller spreads result, which is { data, pagination }
                // So res.data has { success, data, pagination }
                // Wait, controller does: res.json({ success: true, ...result })
                // result = { data: logs, pagination: {...} }
                // So res.data = { success: true, data: logs, pagination: {...} }

                setLogs(res.data.data);

                if (res.data.pagination) {
                    setPagination({
                        ...pagination,
                        current: page,
                        total: res.data.pagination.total || 0
                    });
                }
            }
        } catch (error) {
            console.error('Failed to fetch audit logs', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, [filters]);

    const getActionColor = (action: string) => {
        switch (action) {
            case 'CREATE': return 'green';
            case 'UPDATE': return 'blue';
            case 'DELETE': return 'red';
            default: return 'default';
        }
    };

    const columns: ColumnsType<AuditLog> = [
        {
            title: 'Timestamp',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 180,
            render: (date) => new Date(date).toLocaleString(),
        },
        {
            title: 'User',
            dataIndex: ['user', 'fullName'],
            key: 'user',
            width: 150,
            render: (text, record) => text || record.userId || 'System',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 100,
            render: (action) => <Tag color={getActionColor(action)}>{action}</Tag>,
        },
        {
            title: 'Resource',
            dataIndex: 'resource',
            key: 'resource',
            width: 120,
            render: (text) => <Tag>{text}</Tag>
        },
        {
            title: 'Path',
            dataIndex: 'path',
            key: 'path',
            width: 200,
            ellipsis: true,
        },
        {
            title: 'Details',
            dataIndex: 'after',
            key: 'after',
            render: (after) => {
                if (!after) return '-';
                return (
                    <pre style={{ margin: 0, fontSize: 11, maxHeight: 100, overflow: 'auto' }}>
                        {JSON.stringify(after, null, 2)}
                    </pre>
                );
            },
        },
    ];

    return (
        <div>
            <Title level={2}>Audit Logs</Title>

            <div style={{ marginBottom: 16, display: 'flex', gap: 16 }}>
                <Input
                    placeholder="Search by action or resource"
                    prefix={<SearchOutlined />}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    style={{ width: 300 }}
                />
                <RangePicker
                    onChange={(dates: any) => {
                        setFilters({
                            ...filters,
                            dateRange: dates ? [dates[0]?.toISOString(), dates[1]?.toISOString()] : []
                        });
                    }}
                />
            </div>

            <Table
                columns={columns}
                dataSource={logs}
                rowKey="id"
                loading={loading}
                pagination={{
                    ...pagination,
                    onChange: (page) => fetchLogs(page)
                }}
            />
        </div>
    );
};

export default AuditLogs;
