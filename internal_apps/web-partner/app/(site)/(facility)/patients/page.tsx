"use client";
import React, { useState } from "react";
import { Tag, Button, Input, Select, Avatar, Card, Row, Col, Typography, Space, Statistic, message } from "antd";
const { Title, Text, Paragraph } = Typography;
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, PhoneOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

const PATIENT_FIELDS: CrudField[] = [
    { name: "name", label: "Họ & tên bệnh nhân", type: "text", placeholder: "Nhập họ tên đầy đủ", required: true, span: 2 },
    { name: "patientId", label: "Mã bệnh nhân", type: "text", placeholder: "BN-XXXX" },
    { name: "age", label: "Tuổi", type: "number", placeholder: "Nhập tuổi" },
    { name: "gender", label: "Giới tính", type: "select", required: true, options: [{ value: "Nam", label: "Nam" }, { value: "Nữ", label: "Nữ" }] },
    { name: "phone", label: "Số điện thoại", type: "phone", placeholder: "0909 123 456", required: true },
    { name: "email", label: "Email", type: "email", placeholder: "email@example.com", span: 2 },
    { name: "risk", label: "Phân loại rủi ro", type: "select", required: true, options: [{ value: "High", label: "Nguy cơ cao" }, { value: "Medium", label: "Trung bình" }, { value: "Low", label: "Thấp" }] },
    { name: "status", label: "Trạng thái", type: "select", options: [{ value: "Active", label: "Đang điều trị" }, { value: "Stable", label: "Ổn định" }, { value: "Inactive", label: "Không hoạt động" }] },
];

const PATIENTS_INIT = [
    { id: 1, name: "Nguyễn Văn A", patientId: "BN-4281", age: 45, gender: "Nam", phone: "0909 123 456", email: "nva@gmail.com", diagnosis: "Đái tháo đường Type 2", visits: 12, lastVisit: "15/04/2024", status: "Active", risk: "High", avatar: "A" },
    { id: 2, name: "Trần Thị B", patientId: "BN-9902", age: 32, gender: "Nữ", phone: "0988 777 666", email: "ttb@gmail.com", diagnosis: "Viêm phế quản mãn tính", visits: 5, lastVisit: "10/04/2024", status: "Active", risk: "Low", avatar: "B" },
    { id: 3, name: "Lê Văn C", patientId: "BN-1105", age: 60, gender: "Nam", phone: "0912 345 678", email: "lvc@gmail.com", diagnosis: "Tăng huyết áp", visits: 24, lastVisit: "01/04/2024", status: "Stable", risk: "Medium", avatar: "C" },
];

export default function PatientsPage() {
    const [data, setData] = useState(PATIENTS_INIT);
    const [addOpen, setAddOpen] = useState(false);
    const [editRecord, setEditRecord] = useState<any | null>(null);
    const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

    const handleAdd = (values: any) => {
        setData((prev) => [{ ...values, id: Date.now(), visits: 0, lastVisit: "-", avatar: values.name?.[0] ?? "?" }, ...prev]);
        setAddOpen(false);
        message.success("Đã tạo hồ sơ bệnh nhân!");
    };

    const handleEdit = (values: any) => {
        setData((prev) => prev.map((r) => (r.id === editRecord.id ? { ...r, ...values } : r)));
        setEditRecord(null);
        message.success("Cập nhật hồ sơ bệnh nhân thành công!");
    };

    const handleDelete = () => {
        setData((prev) => prev.filter((r) => r.id !== deleteRecord.id));
        setDeleteRecord(null);
        message.success("Đã xóa hồ sơ bệnh nhân!");
    };

    const getRiskColor = (risk: string) => {
        if (risk === "High") return "red";
        if (risk === "Medium") return "orange";
        return "green";
    };

    const getStatusColor = (status: string) => {
        if (status === "Active") return "green";
        if (status === "Stable") return "blue";
        return "default";
    };

    const stats = [
        { label: "Tổng bệnh nhân", value: data.length, icon: <UserOutlined /> },
        { label: "Đang điều trị", value: data.filter(p => p.status === "Active").length, color: '#52c41a' },
        { label: "Nguy cơ cao", value: data.filter(p => p.risk === "High").length, color: '#ff4d4f' },
        { label: "Tổng lượt khám", value: data.reduce((sum, p) => sum + (p.visits || 0), 0) },
    ];

    return (
        <div style={{ paddingBottom: 40 }}>
            <EhrPageHeader 
                title="Quản lý định danh Bệnh nhân" 
                subtitle="Hệ thống quản lý thông tin hành chính và hồ sơ bệnh lý tập trung"
                primaryAction={{
                    label: "Thêm bệnh nhân",
                    icon: <PlusOutlined />,
                    onClick: () => setAddOpen(true)
                }}
            />

            <EhrStatCards stats={stats} />

            <EhrFilterBar placeholder="Tìm kiếm theo tên, mã BN, số điện thoại...">
                <Select placeholder="Giới tính" style={{ width: 120 }} options={[{ value: "all", label: "Tất cả" }, { value: "Nam", label: "Nam" }, { value: "Nữ", label: "Nữ" }]} />
                <Select placeholder="Nguy cơ" style={{ width: 150 }} options={[{ value: "all", label: "Tất cả" }, { value: "High", label: "Nguy cơ cao" }, { value: "Medium", label: "Trung bình" }, { value: "Low", label: "Thấp" }]} />
            </EhrFilterBar>

            <Row gutter={[16, 16]}>
                {data.map((patient) => (
                    <Col xs={24} sm={12} lg={8} key={patient.id}>
                        <Card hoverable className="ehr-card" bodyStyle={{ padding: 16 }}>
                            <Space direction="vertical" style={{ width: '100%' }} size={12}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <Avatar size={44} style={{ backgroundColor: '#0050b3' }}>{patient.avatar}</Avatar>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 14, color: '#001529' }}>{patient.name}</div>
                                        <div style={{ fontSize: 11, color: '#8c8c8c', fontWeight: 600 }}>{patient.patientId}</div>
                                    </div>
                                </div>
                                <div style={{ fontSize: 12, color: '#595959' }}>
                                    <Row gutter={[8, 8]}>
                                        <Col span={12}><Text type="secondary">Tuổi/GT:</Text> <Text strong>{patient.age} | {patient.gender}</Text></Col>
                                        <Col span={12}><Text type="secondary">Lượt khám:</Text> <Text strong>{patient.visits}</Text></Col>
                                        <Col span={24}><Text type="secondary">Chẩn đoán:</Text> <Text strong>{patient.diagnosis}</Text></Col>
                                    </Row>
                                </div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <Tag bordered={false} color={getRiskColor(patient.risk)} style={{ fontSize: 10, fontWeight: 700 }}>{patient.risk.toUpperCase()}</Tag>
                                    <Tag bordered={false} color={getStatusColor(patient.status)} style={{ fontSize: 10, fontWeight: 700 }}>{patient.status.toUpperCase()}</Tag>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f0f0f0', paddingTop: 12 }}>
                                    <Text strong style={{ color: '#0050b3', fontSize: 12 }}>{patient.phone}</Text>
                                    <Space>
                                        <Button type="text" size="small" icon={<EditOutlined />} onClick={() => setEditRecord(patient)} />
                                        <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => setDeleteRecord(patient)} />
                                    </Space>
                                </div>
                            </Space>
                        </Card>
                    </Col>
                ))}
            </Row>

            <CrudModal open={addOpen} onClose={() => setAddOpen(false)} onSubmit={handleAdd} title="Thêm bệnh nhân" fields={PATIENT_FIELDS} />
            <CrudModal open={!!editRecord} onClose={() => setEditRecord(null)} onSubmit={handleEdit} record={editRecord} title="Sửa bệnh nhân" fields={PATIENT_FIELDS} />
            <DeleteModal open={!!deleteRecord} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} recordName={deleteRecord?.name} />
        </div>
    );
}