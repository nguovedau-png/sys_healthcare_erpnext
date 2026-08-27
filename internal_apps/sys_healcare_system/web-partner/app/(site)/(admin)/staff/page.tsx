"use client";
import React, { useState } from "react";
import { Tag, Button, Input, Select, Avatar, Card, Row, Col, Typography, Space, Statistic, message } from "antd";
const { Title, Text, Paragraph } = Typography;
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, StarFilled } from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";
import staffService, { Staff } from "@/services/staff.service";

const STAFF_FIELDS: CrudField[] = [
    { name: "name", label: "Họ & tên nhân viên", type: "text", placeholder: "Nhập họ tên đầy đủ", required: true, span: 2 },
    { name: "position", label: "Chức vụ / Vị trí", type: "text", placeholder: "Bác sĩ, Điều dưỡng...", required: true },
    { name: "department", label: "Khoa / Phòng ban", type: "select", required: true, options: [{ value: "Khoa Nội", label: "Khoa Nội" }, { value: "Khoa Ngoại", label: "Khoa Ngoại" }, { value: "Khoa Nhi", label: "Khoa Nhi" }] },
    { name: "status", label: "Trạng thái", type: "select", options: [{ value: "On Duty", label: "Đang làm việc" }, { value: "On Break", label: "Đang nghỉ" }, { value: "Off Duty", label: "Đã nghỉ" }] },
];

export default function StaffPage() {
    const [data, setData] = useState<Staff[]>([]);
    const [loading, setLoading] = useState(true);
    const [addOpen, setAddOpen] = useState(false);
    const [editRecord, setEditRecord] = useState<any | null>(null);
    const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const list = await staffService.getStaffList();
            setData(list);
        } catch (e) {
            message.error("Không thể tải danh sách nhân sự!");
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const handleAdd = async (values: any) => {
        try {
            await staffService.createStaff({ ...values, email: `staff${Date.now()}@example.com`, password: 'password123' });
            message.success("Đã thêm nhân sự mới!");
            setAddOpen(false);
            fetchData();
        } catch (e) { message.error("Lỗi khi thêm nhân sự!"); }
    };

    const handleEdit = async (values: any) => {
        try {
            await staffService.updateStaff(editRecord.id, values);
            message.success("Cập nhật nhân sự thành công!");
            setEditRecord(null);
            fetchData();
        } catch (e) { message.error("Lỗi khi cập nhật nhân sự!"); }
    };

    const handleDelete = async () => {
        try {
            await staffService.deleteStaff(deleteRecord.id);
            message.success("Đã xóa nhân sự!");
            setDeleteRecord(null);
            fetchData();
        } catch (e) { message.error("Lỗi khi xóa nhân sự!"); }
    };

    const getStatusColor = (status: string) => {
        if (status === "On Duty") return "green";
        if (status === "On Break") return "orange";
        return "default";
    };

    const stats = [
        { label: "Tổng nhân sự", value: 145, icon: <StarFilled /> },
        { label: "Bác sĩ chuyên khoa", value: 42, color: '#0050b3' },
        { label: "Đang làm việc", value: 36, color: '#52c41a' },
        { label: "Rating TB", value: 4.85, color: '#faad14' },
    ];

    return (
        <div style={{ paddingBottom: 40 }}>
            <EhrPageHeader 
                title="Danh mục Chuyên gia & Nhân sự" 
                subtitle="Quản lý hồ sơ chuyên gia, chứng chỉ hành nghề và phân quyền hệ thống"
                primaryAction={{
                    label: "Thêm nhân sự",
                    icon: <PlusOutlined />,
                    onClick: () => setAddOpen(true)
                }}
            />

            <EhrStatCards stats={stats} />

            <EhrFilterBar placeholder="Tìm kiếm theo tên, chức vụ, khoa phòng...">
                <Select placeholder="Khoa/Phòng" style={{ width: 180 }} options={[{ value: "all", label: "Tất cả" }, { value: "Khoa Nội", label: "Khoa Nội" }]} />
            </EhrFilterBar>

            <Row gutter={[16, 16]}>
                {data.map((staff) => (
                    <Col xs={24} sm={12} lg={8} key={staff.id}>
                        <Card hoverable className="ehr-card" bodyStyle={{ padding: 20 }}>
                            <div style={{ textAlign: 'center' }}>
                                <Avatar size={64} style={{ backgroundColor: '#f0f5ff', color: '#0050b3', fontWeight: 700, fontSize: 24, marginBottom: 12 }}>
                                    {staff.avatar}
                                </Avatar>
                                <div style={{ fontWeight: 700, fontSize: 16, color: '#001529' }}>{staff.name}</div>
                                <div style={{ color: '#8c8c8c', fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{(staff.position || 'Nhân sự').toUpperCase()}</div>
                                <div style={{ fontSize: 12, color: '#595959', marginBottom: 12 }}>{staff.department || 'Chưa phân khoa'}</div>
                                
                                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
                                    <Tag bordered={false} color={getStatusColor(staff.status || 'On Duty')} style={{ fontSize: 10, fontWeight: 700 }}>{(staff.status || 'On Duty').toUpperCase()}</Tag>
                                    <Space size={4}>
                                        <StarFilled style={{ color: '#faad14' }} />
                                        <Text strong style={{ fontSize: 12 }}>{4.5}</Text>
                                    </Space>
                                </div>
                                
                                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', borderTop: '1px solid #f0f0f0', paddingTop: 16 }}>
                                    <Button size="small" type="link" style={{ fontWeight: 600 }} onClick={() => setEditRecord(staff)}>CHỈNH SỬA</Button>
                                    <Button size="small" type="link" danger style={{ fontWeight: 600 }} onClick={() => setDeleteRecord(staff)}>GỠ BỎ</Button>
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            <CrudModal open={addOpen} onClose={() => setAddOpen(false)} onSubmit={handleAdd} title="Thêm nhân sự" fields={STAFF_FIELDS} />
            <CrudModal open={!!editRecord} onClose={() => setEditRecord(null)} onSubmit={handleEdit} record={editRecord} title="Sửa nhân sự" fields={STAFF_FIELDS} />
            <DeleteModal open={!!deleteRecord} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} recordName={deleteRecord?.name} />
        </div>
    );
}