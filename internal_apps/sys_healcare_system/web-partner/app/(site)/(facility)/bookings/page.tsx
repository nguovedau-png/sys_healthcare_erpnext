"use client";
import React, { useState } from "react";
import { Tag, Button, Input, Select, Divider, Avatar, Table, Progress, message, Tooltip, DatePicker, Badge, Card, Row, Col, Typography, Space, Statistic, List } from "antd";
const { Title, Text, Paragraph } = Typography;
import { CalendarOutlined, SearchOutlined, FilterOutlined, CheckCircleFilled, ThunderboltFilled, UserOutlined, ClockCircleOutlined, PlusOutlined, MoreOutlined, ArrowRightOutlined, PhoneOutlined, EnvironmentOutlined, VerifiedOutlined, DownloadOutlined, EditOutlined, DeleteOutlined, VideoCameraOutlined, MedicineBoxOutlined, SafetyCertificateFilled, CalendarFilled, VideoCameraFilled, CustomerServiceOutlined, SolutionOutlined, CheckCircleOutlined } from "@ant-design/icons";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";

const BOOKINGS = [
  { id: 1, patientName: "Nguyễn Văn A", patientPhone: "0901234567", appointmentDate: "2024-04-25T08:30:00", type: "online", status: "pending", service: "Khám Nội tổng quát", sex: "Nam", dob: "1985-05-12", avatar: "A" },
  { id: 2, patientName: "Trần Thị B", patientPhone: "0912345678", appointmentDate: "2024-04-25T09:15:00", type: "offline", status: "confirmed", service: "Khám Nhi khoa", sex: "Nữ", dob: "1992-08-24", avatar: "B" },
  { id: 3, patientName: "Lê Văn C", patientPhone: "0987654321", appointmentDate: "2024-04-25T10:00:00", type: "online", status: "completed", service: "Tư vấn Dinh dưỡng", sex: "Nam", dob: "1978-11-03", avatar: "C" },
];

const BOOKING_FIELDS: CrudField[] = [
  { name: "patientName", label: "Họ & tên bệnh nhân", type: "text", placeholder: "Nhập họ tên đầy đủ", required: true, span: 2 },
  { name: "patientPhone", label: "Số điện thoại", type: "phone", placeholder: "0901 234 567", required: true },
  { name: "sex", label: "Giới tính", type: "select", options: [{ value: "Nam", label: "Nam" }, { value: "Nữ", label: "Nữ" }, { value: "Khác", label: "Khác" }], required: true },
  { name: "dob", label: "Ngày sinh", type: "date", required: true },
  { name: "appointmentDate", label: "Ngày hẹn khám", type: "date", required: true },
  { name: "service", label: "Dịch vụ / Chuyên khoa", type: "select", placeholder: "Chọn dịch vụ", required: true, options: [{ value: "Khám Nội tổng quát", label: "Khám Nội tổng quát" }, { value: "Khám Nhi khoa", label: "Khám Nhi khoa" }, { value: "Tư vấn Dinh dưỡng", label: "Tư vấn Dinh dưỡng" }, { value: "Khám Da liễu", label: "Khám Da liễu" }] },
  { name: "type", label: "Hình thức khám", type: "select", required: true, options: [{ value: "online", label: "Online (Video call)" }, { value: "offline", label: "Trực tiếp tại phòng khám" }] },
  { name: "status", label: "Trạng thái", type: "select", required: true, options: [{ value: "pending", label: "Chờ xác nhận" }, { value: "confirmed", label: "Đã xác nhận" }, { value: "completed", label: "Hoàn tất" }, { value: "cancelled", label: "Đã huỷ" }] },
];

export default function BookingsPage() {
  const [data, setData] = useState(BOOKINGS);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (values: any) => {
    const newRecord = { ...values, id: Date.now(), avatar: values.patientName?.[0] ?? "?" };
    setData((prev) => [newRecord, ...prev]);
    setAddOpen(false);
    message.success("Tạo lịch hẹn thành công!");
  };

  const handleEdit = (values: any) => {
    setData((prev) => prev.map((r) => (r.id === editRecord.id ? { ...r, ...values } : r)));
    setEditRecord(null);
    message.success("Cập nhật lịch hẹn thành công!");
  };

  const handleDelete = () => {
    setData((prev) => prev.filter((r) => r.id !== deleteRecord.id));
    setDeleteRecord(null);
    message.success("Đã xóa lịch hẹn!");
  };

  const getStatusColor = (status: string) => {
    if (status === "completed") return "success";
    if (status === "confirmed") return "processing";
    if (status === "cancelled") return "error";
    return "warning";
  };

  const stats = [
    { label: "Tổng lượt hẹn", value: "1,250", icon: <CalendarOutlined /> },
    { label: "Chờ xác nhận", value: "45", color: "#d97706" },
    { label: "Đã xác nhận", value: "850", color: "#4f46e5" },
    { label: "Hoàn tất", value: "312", color: "#059669" },
  ];

  const columns = [
    {
      title: <Text strong style={{ fontSize: 11 }}>BỆNH NHÂN</Text>,
      render: (_: any, r: any) => (
        <Space size={12}>
          <Avatar size={32} style={{ backgroundColor: '#0050b3' }}>{r.avatar}</Avatar>
          <div>
            <Text strong style={{ fontSize: 13, display: 'block' }}>{r.patientName}</Text>
            <Text type="secondary" style={{ fontSize: 11 }}>{r.patientPhone}</Text>
          </div>
        </Space>
      ),
    },
    { title: <Text strong style={{ fontSize: 11 }}>NGÀY HẸN</Text>, dataIndex: "appointmentDate", render: (v: string) => <Text style={{ fontSize: 13, fontWeight: 600 }}>{new Date(v).toLocaleDateString('vi-VN')}</Text> },
    { title: <Text strong style={{ fontSize: 11 }}>DỊCH VỤ</Text>, dataIndex: "service", render: (v: string) => <Text style={{ fontSize: 13 }}>{v}</Text> },
    { 
      title: <Text strong style={{ fontSize: 11 }}>HÌNH THỨC</Text>, 
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.type === "online" ? "blue" : "green"} style={{ fontSize: 10, fontWeight: 700 }}>
          {r.type.toUpperCase()}
        </Tag>
      ) 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>, 
      render: (_: any, r: any) => (
        <Badge status={getStatusColor(r.status) as any} text={<Text style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>{r.status}</Text>} />
      ) 
    },
    {
      title: "",
      render: (_: any, r: any) => (
        <Space size={8}>
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => setEditRecord(r)} />
          <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => setDeleteRecord(r)} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader 
        title="Điều phối Lịch hẹn" 
        subtitle="Quản lý và điều phối lịch hẹn khám bệnh trực tuyến và trực tiếp"
        primaryAction={{
            label: "Tạo lịch hẹn",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm kiếm bệnh nhân, số điện thoại, mã lịch hẹn...">
        <DatePicker style={{ width: 150 }} />
        <Select placeholder="Trạng thái" style={{ width: 150 }} options={[{ value: "pending", label: "Chờ xác nhận" }, { value: "confirmed", label: "Đã xác nhận" }]} />
      </EhrFilterBar>

      <Card className="ehr-card" bodyStyle={{ padding: 0 }}>
        <Table 
            className="ehr-table-compact"
            dataSource={data} 
            rowKey="id" 
            pagination={false} 
            columns={columns} 
            size="small"
        />
      </Card>

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Lịch hẹn khám" fields={BOOKING_FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.patientName} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}