"use client";
import { useState, useEffect } from "react";
import { Table, Tag, Space, Button, Select, Typography, message } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import logService, { Log } from "@/services/log.service";

const { Text } = Typography;

const formatDate = (v: string) => {
    if (!v) return '-';
    const d = new Date(v);
    return d.toLocaleDateString('vi-VN') + ' ' + d.toLocaleTimeString('vi-VN');
};

export default function SystemLogsView() {
    const [data, setData] = useState<Log[]>([]);
    const [loading, setLoading] = useState(false);
    const [filterLevel, setFilterLevel] = useState<string | null>(null);

    const fetchLogs = async () => {
        try {
            setLoading(true);
            const res = await logService.getLogs(filterLevel ? { level: filterLevel } : {});
            setData(Array.isArray(res) ? res : []);
        } catch (error) {
            message.error("Lỗi khi tải nhật ký hệ thống");
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, [filterLevel]);

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'ERROR': return 'red';
            case 'WARN': return 'orange';
            case 'DEBUG': return 'default';
            case 'INFO':
            default: return 'blue';
        }
    };

    const columns = [
        {
            title: <Text strong style={{ fontSize: 11 }}>THỜI GIAN</Text>,
            dataIndex: 'timestamp',
            render: (v: string) => <Text style={{ fontSize: 12 }}>{formatDate(v)}</Text>,
            width: 160
        },
        {
            title: <Text strong style={{ fontSize: 11 }}>MỨC ĐỘ</Text>,
            dataIndex: 'level',
            render: (v: string) => <Tag color={getLevelColor(v)} style={{ fontSize: 10, fontWeight: 700 }}>{v}</Tag>,
            width: 100
        },
        {
            title: <Text strong style={{ fontSize: 11 }}>PHÂN LOẠI</Text>,
            dataIndex: 'category',
            render: (v: string) => <Text style={{ fontSize: 12, color: '#8c8c8c' }}>{v}</Text>,
            width: 150
        },
        {
            title: <Text strong style={{ fontSize: 11 }}>NỘI DUNG</Text>,
            dataIndex: 'message',
            render: (v: string) => <Text style={{ fontSize: 13 }}>{v}</Text>
        }
    ];

    return (
        <div style={{ padding: '24px 32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                <div>
                    <Typography.Title level={4} style={{ margin: 0 }}>Nhật ký hệ thống & Kiểm toán</Typography.Title>
                    <Text type="secondary">Theo dõi các sự kiện, lỗi và hoạt động của hệ thống theo thời gian thực.</Text>
                </div>
                <Space>
                    <Select
                        placeholder="Lọc theo mức độ"
                        allowClear
                        style={{ width: 160 }}
                        onChange={setFilterLevel}
                        options={[
                            { value: 'INFO', label: 'INFO' },
                            { value: 'WARN', label: 'WARNING' },
                            { value: 'ERROR', label: 'ERROR' },
                            { value: 'DEBUG', label: 'DEBUG' }
                        ]}
                    />
                    <Button icon={<ReloadOutlined />} onClick={fetchLogs}>Làm mới</Button>
                </Space>
            </div>

            <Table 
                className="ehr-table-compact"
                dataSource={data} 
                loading={loading}
                rowKey="id" 
                pagination={{ pageSize: 15 }} 
                columns={columns} 
                size="small"
                locale={{ emptyText: "Chưa có nhật ký nào được ghi nhận." }}
            />
        </div>
    );
}
