"use client";

import React, { useState } from 'react';
import { Table, Input, Select, Button, Space, Card, Typography, Pagination, Row, Col, Empty } from 'antd';
import { SearchOutlined, FilterOutlined, ReloadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Text } = Typography;

interface Column {
    key: string;
    label: string;
    render?: (value: any, row: any, index: number) => React.ReactNode;
    width?: string;
    align?: 'left' | 'center' | 'right';
}

interface DataTableProps {
    columns: Column[];
    data: any[];
    actions?: (row: any) => React.ReactNode;
    pagination?: {
        currentPage: number;
        totalPages: number;
        onPageChange: (page: number, pageSize?: number) => void;
        pageSize?: number;
    };
    searchable?: boolean;
    searchPlaceholder?: string;
    onSearch?: (query: string) => void;
    filters?: {
        key: string;
        label: string;
        options: { value: string; label: string }[];
        value: string;
        onChange: (val: string) => void;
    }[];
    loading?: boolean;
    rowSelection?: {
        selectedRowKeys: React.Key[];
        onChange: (selectedRowKeys: React.Key[]) => void;
    };
    bulkActions?: {
        label: string;
        icon?: React.ReactNode;
        type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
        danger?: boolean;
        onClick: (selectedKeys: React.Key[]) => void;
    }[];
}

export default function DataTable({
    columns,
    data,
    actions,
    pagination,
    searchable,
    searchPlaceholder = "Tìm kiếm dữ liệu...",
    onSearch,
    filters,
    loading,
    rowSelection,
    bulkActions
}: DataTableProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        onSearch?.(value);
    };

    // Construct Ant Design columns
    const antdColumns: ColumnsType<any> = columns.map(col => ({
        title: col.label,
        dataIndex: col.key,
        key: col.key,
        width: col.width,
        align: col.align || 'left',
        render: col.render ? (value, record, index) => col.render!(value, record, index) : undefined,
    }));

    // Add actions column if provided
    if (actions) {
        antdColumns.push({
            title: 'Hành động',
            key: 'actions',
            align: 'right',
            render: (_text, record) => (
                <Space size="middle">
                    {actions(record)}
                </Space>
            ),
        });
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-4">
                {(searchable || filters) && (
                    <Row gutter={[16, 16]} align="middle" className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        {searchable && (
                            <Col flex="auto">
                                <Input.Search
                                    placeholder={searchPlaceholder}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onSearch={handleSearch}
                                    enterButton
                                    style={{ maxWidth: 400 }}
                                />
                            </Col>
                        )}
                        {filters?.map((filter) => (
                            <Col key={filter.key} xs={24} md={6}>
                                <Select
                                    placeholder={filter.label}
                                    options={filter.options}
                                    value={filter.value || undefined}
                                    onChange={(val) => filter.onChange(val)}
                                    style={{ width: '100%' }}
                                    allowClear
                                />
                            </Col>
                        ))}
                        <Col>
                            <Space>
                                <Button icon={<ReloadOutlined />} onClick={() => onSearch?.('')}>Làm mới</Button>
                            </Space>
                        </Col>
                    </Row>
                )}

                {/* Bulk Actions Toolbar */}
                {rowSelection && rowSelection.selectedRowKeys.length > 0 && (
                    <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex items-center justify-between animate-in fade-in slide-in-from-top-2">
                        <Space>
                            <Text strong className="text-blue-600">
                                Đã chọn {rowSelection.selectedRowKeys.length} mục
                            </Text>
                            <Button size="small" type="text" onClick={() => rowSelection.onChange([])}>Hủy chọn</Button>
                        </Space>
                        <Space>
                            {bulkActions?.map((action, idx) => (
                                <Button
                                    key={idx}
                                    icon={action.icon}
                                    type={action.type || 'default'}
                                    danger={action.danger}
                                    onClick={() => action.onClick(rowSelection.selectedRowKeys)}
                                >
                                    {action.label}
                                </Button>
                            ))}
                        </Space>
                    </div>
                )}
            </div>

            <Card styles={{ body: { padding: 0 } }} variant="outlined" className="overflow-hidden">
                <Table
                    columns={antdColumns}
                    dataSource={data}
                    rowKey={(record, index) => record.id || index?.toString()}
                    loading={loading}
                    rowSelection={rowSelection ? {
                        selectedRowKeys: rowSelection.selectedRowKeys,
                        onChange: rowSelection.onChange,
                    } : undefined}
                    pagination={pagination ? {
                        current: pagination.currentPage,
                        total: pagination.totalPages * (pagination.pageSize || 10),
                        pageSize: pagination.pageSize || 10,
                        onChange: pagination.onPageChange,
                        showSizeChanger: false,
                        showTotal: (total) => `Tổng cộng ${total} mục`,
                    } : false}
                    locale={{
                        emptyText: <Empty description="Không có dữ liệu hiển thị" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    }}
                    scroll={{ x: 'max-content' }}
                />
            </Card>
        </div>
    );
}
