"use client";
import { useState, useEffect } from "react";
import { Table, Tag, Space, Button, Typography, message, Progress, Popconfirm } from "antd";
import { ReloadOutlined, DeleteOutlined } from "@ant-design/icons";
import jobService, { BackgroundJob } from "@/services/job.service";

const { Text } = Typography;

const formatDate = (v: string | undefined) => {
    if (!v) return '-';
    const d = new Date(v);
    return d.toLocaleDateString('vi-VN') + ' ' + d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

export default function CronJobsView() {
    const [data, setData] = useState<BackgroundJob[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const res = await jobService.getJobs();
            setData(Array.isArray(res) ? res : []);
        } catch (error) {
            message.error("Lỗi khi tải danh sách tiến trình ngầm");
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
        const interval = setInterval(fetchJobs, 10000);
        return () => clearInterval(interval);
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await jobService.deleteJob(id);
            message.success("Đã xóa tiến trình");
            fetchJobs();
        } catch (error) {
            message.error("Lỗi khi xóa tiến trình");
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'COMPLETED': return 'green';
            case 'FAILED': return 'red';
            case 'PROCESSING': return 'blue';
            case 'RETRYING': return 'orange';
            case 'PENDING':
            default: return 'default';
        }
    };

    const columns = [
        {
            title: <Text strong style={{ fontSize: 11 }}>TÊN / MÃ JOB</Text>,
            render: (_: any, r: BackgroundJob) => (
                <div>
                    <Text strong style={{ fontSize: 13, display: 'block' }}>{r.name}</Text>
                    <Text type="secondary" style={{ fontSize: 11, fontFamily: 'monospace' }}>{r.jobId}</Text>
                </div>
            )
        },
        {
            title: <Text strong style={{ fontSize: 11 }}>PHÂN LOẠI</Text>,
            dataIndex: 'jobType',
            render: (v: string) => <Tag style={{ fontSize: 10 }}>{v}</Tag>,
            width: 130
        },
        {
            title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI & TIẾN ĐỘ</Text>,
            render: (_: any, r: BackgroundJob) => (
                <div style={{ minWidth: 160 }}>
                    <Tag bordered={false} color={getStatusColor(r.status)} style={{ fontSize: 10, fontWeight: 700, marginBottom: 4 }}>
                        {r.status}
                    </Tag>
                    {r.status === 'PROCESSING' && <Progress percent={r.progress} size="small" status="active" />}
                    {r.status === 'COMPLETED' && <Progress percent={100} size="small" />}
                    {r.status === 'FAILED' && r.error && (
                        <Text type="danger" style={{ fontSize: 11, display: 'block' }}>{r.error.substring(0, 60)}</Text>
                    )}
                </div>
            ),
            width: 200
        },
        {
            title: <Text strong style={{ fontSize: 11 }}>THỜI GIAN</Text>,
            render: (_: any, r: BackgroundJob) => (
                <div style={{ fontSize: 11, color: '#8c8c8c' }}>
                    <div>Bắt đầu: {formatDate(r.startedAt)}</div>
                    <div>Kết thúc: {formatDate(r.completedAt)}</div>
                </div>
            ),
            width: 180
        },
        {
            title: "",
            render: (_: any, r: BackgroundJob) => (
                <Popconfirm title="Xóa tiến trình này?" okText="Xóa" cancelText="Hủy" onConfirm={() => handleDelete(r.id)}>
                    <Button type="text" size="small" danger icon={<DeleteOutlined />} />
                </Popconfirm>
            ),
            width: 50
        }
    ];

    return (
        <div style={{ padding: '24px 32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                <div>
                    <Typography.Title level={4} style={{ margin: 0 }}>Quản lý Tiến trình ngầm (Cron Jobs)</Typography.Title>
                    <Text type="secondary">Theo dõi trạng thái và tiến độ xử lý của các tác vụ chạy ngầm. Tự động làm mới mỗi 10 giây.</Text>
                </div>
                <Button icon={<ReloadOutlined />} onClick={fetchJobs}>Làm mới</Button>
            </div>

            <Table 
                className="ehr-table-compact"
                dataSource={data} 
                loading={loading}
                rowKey="id" 
                pagination={{ pageSize: 15 }} 
                columns={columns} 
                size="small"
                locale={{ emptyText: "Không có tiến trình nào đang chạy." }}
            />
        </div>
    );
}
