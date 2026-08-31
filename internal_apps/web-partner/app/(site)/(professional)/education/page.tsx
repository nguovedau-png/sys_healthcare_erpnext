"use client";
import QuestionBank from '@/components/education/QuestionBank';
import TestAndSurveyManager from '@/components/education/TestAndSurveyManager';
import { Card, Space, Row, Col, Typography, Avatar, Statistic, Tag, Progress, Button, message, Select, Table, Tabs } from "antd";
const { Title, Text, Paragraph } = Typography;
import { BookOutlined, SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, TeamOutlined, ReadOutlined, ExperimentFilled, SafetyCertificateFilled, RocketFilled, HistoryOutlined, ClockCircleOutlined, DatabaseOutlined, FormOutlined } from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";
import LearnerListDrawer from "@/components/education/LearnerListDrawer";
import { useState } from "react";
import { useRouter } from "next/navigation";

const DATA_INIT = [
    { id: 1, programName: "Đào tạo Bác sĩ Nội trú", department: "Khoa Nội", participants: 24, progress: 75, status: "Active", type: "Full-time" },
    { id: 2, programName: "CME Tim mạch 2024", department: "Khoa Tim mạch", participants: 156, progress: 100, status: "Completed", type: "Workshop" },
    { id: 3, programName: "Năng lực Điều dưỡng 4.0", department: "Khối Điều dưỡng", participants: 85, progress: 30, status: "Active", type: "Digital" },
];

const FIELDS: CrudField[] = [
    { name: "programName", label: "Tên chương trình", type: "text", placeholder: "Đào tạo Bác sĩ Nội trú", required: true, span: 2 },
    { name: "department", label: "Khoa thực hiện", type: "text", placeholder: "Khoa Nội" },
    { name: "status", label: "Trạng thái", type: "select", options: [{ value: "Active", label: "Đang triển khai" }, { value: "Completed", label: "Đã kết thúc" }, { value: "Planned", label: "Đang lập kế hoạch" }] },
];

export default function EducationPage() {
    const router = useRouter();
    const [data, setData] = useState(DATA_INIT);
    const [addOpen, setAddOpen] = useState(false);
    const [editRecord, setEditRecord] = useState<any | null>(null);
    const [deleteRecord, setDeleteRecord] = useState<any | null>(null);
    const [learnerDrawerOpen, setLearnerDrawerOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<string | undefined>(undefined);

    const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now(), participants: 0, progress: 0 }, ...p]); setAddOpen(false); message.success("Đã khởi tạo chương trình đào tạo mới!"); };
    const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật chương trình thành công!"); };
    const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xóa chương trình đào tạo!"); };

    const stats = [
        { label: "Đang triển khai", value: "12", icon: <RocketFilled /> },
        { label: "Tổng học viên", value: "450", color: "#0050b3" },
        { label: "Hoàn thành", value: "08", color: "#52c41a" },
        { label: "Giờ đào tạo", value: "2.4k", color: "#faad14" }
    ];

    const columns = [
        {
            title: <Text strong style={{ fontSize: 11 }}>CHƯƠNG TRÌNH / LOẠI HÌNH</Text>,
            render: (_: any, r: any) => (
                <Space size={12}>
                    <div style={{ width: 32, height: 32, borderRadius: 4, background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0050b3' }}>
                        <ReadOutlined />
                    </div>
                    <div>
                        <Text strong style={{ fontSize: 13, display: 'block' }}>{r.programName}</Text>
                        <Text type="secondary" style={{ fontSize: 11 }}>{r.type.toUpperCase()}</Text>
                    </div>
                </Space>
            )
        },
        {
            title: <Text strong style={{ fontSize: 11 }}>ĐƠN VỊ QUẢN LÝ</Text>,
            render: (_: any, r: any) => (
                <Space size={8}>
                    <TeamOutlined style={{ color: '#8c8c8c' }} />
                    <Text style={{ fontSize: 12 }}>{r.department}</Text>
                </Space>
            )
        },
        {
            title: <Text strong style={{ fontSize: 11 }}>TIẾN ĐỘ ĐÀO TẠO</Text>,
            render: (_: any, r: any) => (
                <div style={{ width: 150 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                        <Text type="secondary" style={{ fontSize: 10 }}>{r.participants} Học viên</Text>
                        <Text strong style={{ fontSize: 10 }}>{r.progress}%</Text>
                    </div>
                    <Progress percent={r.progress} size="small" strokeColor={r.progress === 100 ? "#52c41a" : "#1890ff"} showInfo={false} />
                </div>
            )
        },
        {
            title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>,
            render: (_: any, r: any) => (
                <Tag bordered={false} color={r.status === "Completed" ? "green" : r.status === "Active" ? "blue" : "default"} style={{ fontSize: 10, fontWeight: 700 }}>
                    {r.status.toUpperCase()}
                </Tag>
            )
        },
        {
            title: "",
            render: (_: any, r: any) => (
                <Space size={8}>
                    <Button type="text" size="small" icon={<BookOutlined />} title="Vào lớp (Live)" onClick={() => router.push('/learning/room')} />
                    <Button type="text" size="small" icon={<TeamOutlined />} title="Danh sách học viên" onClick={() => { setSelectedCourse(r.programName); setLearnerDrawerOpen(true); }} />
                    <Button type="text" size="small" icon={<EditOutlined />} onClick={() => setEditRecord(r)} />
                    <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => setDeleteRecord(r)} />
                </Space>
            )
        },
    ];

    return (
        <div style={{ paddingBottom: 40 }}>
            <EhrPageHeader
                title="Hệ thống Giáo dục & Đào tạo"
                subtitle="Quản lý chương trình, kho câu hỏi, khảo sát và đánh giá người học"
                primaryAction={{
                    label: "Tạo chương trình",
                    icon: <PlusOutlined />,
                    onClick: () => setAddOpen(true)
                }}
                extra={<Button icon={<SafetyCertificateFilled />}>CME Auth</Button>}
            />

            <EhrStatCards stats={stats} />

            <div style={{ marginTop: 24, padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                <Tabs 
                    defaultActiveKey="1"
                    size="large"
                    items={[
                        {
                            key: '1',
                            label: <span style={{ fontWeight: 600 }}><ReadOutlined /> Chương trình Đào tạo</span>,
                            children: (
                                <div>
                                    <EhrFilterBar placeholder="Tìm chương trình, giảng viên...">
                                        <Select placeholder="Chuyên khoa" style={{ width: 150 }} options={[{ value: "internal", label: "Khoa Nội" }]} />
                                    </EhrFilterBar>
                                    <Table
                                        className="ehr-table-compact"
                                        dataSource={data}
                                        rowKey="id"
                                        pagination={false}
                                        columns={columns}
                                        size="small"
                                    />
                                </div>
                            )
                        },
                        {
                            key: '2',
                            label: <span style={{ fontWeight: 600 }}><DatabaseOutlined /> Kho Câu hỏi</span>,
                            children: <QuestionBank />
                        },
                        {
                            key: '3',
                            label: <span style={{ fontWeight: 600 }}><FormOutlined /> Bài Test & Khảo sát</span>,
                            children: <TestAndSurveyManager />
                        }
                    ]}
                />
            </div>

            <Card bordered={false} style={{ background: '#001529', borderRadius: 8, marginTop: 48, overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', right: -50, top: -50, opacity: 0.1 }}>
                    <ReadOutlined style={{ fontSize: 320, color: 'white' }} />
                </div>
                <Row align="middle" gutter={[48, 48]} style={{ padding: '48px 24px', position: 'relative', zIndex: 1 }}>
                    <Col span={16}>
                        <Space direction="vertical" size={24}>
                            <Space align="center" size={12}>
                                <Avatar icon={<ExperimentFilled />} style={{ background: '#faad14' }} />
                                <Title level={3} style={{ color: 'white', margin: 0 }}>Academic Excellence Engine</Title>
                            </Space>
                            <Paragraph style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16 }}>
                                Hệ thống quản lý tri thức y tế tập trung. Tự động đề xuất lộ trình đào tạo dựa trên năng lực thực tế và định hướng phát triển của từng nhân sự.
                            </Paragraph>
                            <Space size="middle">
                                <Button size="large" type="primary" style={{ borderRadius: 4, fontWeight: 700 }}>XEM LỘ TRÌNH PHÁT TRIỂN</Button>
                                <Button size="large" ghost style={{ borderRadius: 4, fontWeight: 700 }}>KHO TÀI LIỆU Y KHOA</Button>
                            </Space>
                        </Space>
                    </Col>
                    <Col span={8}>
                        <Card bordered={false} style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ textAlign: 'center' }}>
                                <Text style={{ color: '#faad14', fontSize: 12, textTransform: 'uppercase', letterSpacing: 2 }}>Competency Index</Text>
                                <div style={{ fontSize: 64, fontWeight: 900, color: 'white', lineHeight: 1 }}>92.5%</div>
                                <Progress percent={92.5} showInfo={false} strokeColor="#faad14" trailColor="rgba(255,255,255,0.1)" />
                                <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, marginTop: 12, display: 'block' }}>CONTINUOUS MEDICAL EDUCATION</Text>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Card>

            <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Chương trình đào tạo" fields={FIELDS} />
            <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.programName} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
            <LearnerListDrawer open={learnerDrawerOpen} onClose={() => setLearnerDrawerOpen(false)} courseName={selectedCourse} />
        </div>
    );
}