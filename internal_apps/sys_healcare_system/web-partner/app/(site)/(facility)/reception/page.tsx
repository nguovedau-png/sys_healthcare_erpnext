"use client";
import React, { useState } from "react";
import { Tag, Button, Input, Select, Table, Badge, message, Tooltip, Card, Row, Col, Typography, Space, Statistic, Avatar, Divider, Steps } from "antd";
const { Title, Text, Paragraph } = Typography;
import { UserOutlined, SearchOutlined, FilterOutlined, PlusOutlined, EditOutlined, DeleteOutlined, InteractionOutlined, ClockCircleOutlined, ThunderboltFilled, PlayCircleFilled, DashboardOutlined, TeamOutlined, DesktopOutlined, GlobalOutlined, HeartFilled, SolutionOutlined, IdcardOutlined, EnvironmentOutlined } from "@ant-design/icons";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";

const DATA_INIT = [
  { id: 1, patientName: "Nguyễn Văn A", purpose: "Khám tổng quát", status: "Checked-in", time: "08:30 AM", insurance: "Verified" },
  { id: 2, patientName: "Trần Thị B", purpose: "Tái khám định kỳ", status: "Waiting", time: "09:15 AM", insurance: "Pending" },
  { id: 3, patientName: "Lê Văn C", purpose: "Xét nghiệm máu", status: "In-progress", time: "08:45 AM", insurance: "Verified" },
];

const FIELDS: CrudField[] = [
  { name: "patientName", label: "Họ tên bệnh nhân", type: "text", placeholder: "Nguyễn Văn A", required: true, span: 2 },
  { name: "purpose", label: "Mục đích đến", type: "text", placeholder: "Khám tổng quát", required: true },
  { name: "time", label: "Giờ đến", type: "text", placeholder: "08:30 AM" },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "Waiting", label: "Đang chờ" }, { value: "Checked-in", label: "Đã tiếp đón" }, { value: "In-progress", label: "Đang xử lý" }] },
];

export default function ReceptionPage() {
  const [data, setData] = useState(DATA_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now(), insurance: "Verified" }, ...p]); setAddOpen(false); message.success("Đã tiếp đón bệnh nhân mới!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xóa hồ sơ tiếp đón!"); };

  const stats = [
    { label: "Bệnh nhân hôm nay", value: "324", icon: <UserOutlined /> },
    { label: "Đang chờ duyệt", value: "12", color: "#faad14" },
    { label: "Sự hài lòng", value: "99%", color: "#f5222d" },
    { label: "Năng suất bàn", value: "85%", color: "#0050b3" }
  ];

  const columns = [
    { 
      title: <Text strong style={{ fontSize: 11 }}>BỆNH NHÂN / GIỜ ĐẾN</Text>, 
      render: (_: any, r: any) => (
        <Space size={12}>
          <Avatar size="small" style={{ backgroundColor: '#f0f5ff', color: '#0050b3', fontWeight: 700 }}>{r.patientName[0]}</Avatar>
          <div>
            <Text strong style={{ fontSize: 13, display: 'block' }}>{r.patientName}</Text>
            <Text type="secondary" style={{ fontSize: 11 }}>{r.time}</Text>
          </div>
        </Space>
      ) 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>MỤC ĐÍCH</Text>, 
      render: (_: any, r: any) => <Text style={{ fontSize: 12, fontWeight: 600 }}>{r.purpose}</Text> 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>BẢO HIỂM</Text>, 
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.insurance === "Verified" ? "green" : "orange"} style={{ fontSize: 10, fontWeight: 700 }}>{r.insurance.toUpperCase()}</Tag>
      ) 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>, 
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.status === "In-progress" ? "blue" : r.status === "Checked-in" ? "green" : "default"} style={{ fontSize: 10, fontWeight: 700 }}>{r.status.toUpperCase()}</Tag>
      ) 
    },
    { 
      title: "", 
      render: (_: any, r: any) => (
        <Space size={8}>
          <Button type="text" size="small" icon={<IdcardOutlined />} />
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => setEditRecord(r)} />
          <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => setDeleteRecord(r)} />
        </Space>
      ) 
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader 
        title="Tiếp đón & Chăm sóc Khách hàng" 
        subtitle="Hệ thống tiếp nhận bệnh nhân, đăng ký thông tin và điều phối dịch vụ y tế tập trung"
        primaryAction={{
            label: "Tiếp đón mới",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
        extra={<Button icon={<EnvironmentOutlined />}>Sơ đồ viện</Button>}
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm bệnh nhân, mã tiếp đón...">
        <Select placeholder="Trạng thái" style={{ width: 150 }} options={[{ value: "all", label: "Tất cả" }, { value: "Waiting", label: "Đang chờ" }]} />
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

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Tiếp đón bệnh nhân" fields={FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.patientName} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}