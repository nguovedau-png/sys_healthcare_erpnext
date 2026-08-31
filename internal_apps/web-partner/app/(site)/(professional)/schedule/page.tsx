"use client";
import React, { useState } from "react";
import { Tag, Button, Input, Select, Avatar, Table, message, Tooltip, Card, Row, Col, Typography, Space, Statistic, Divider, Calendar, Badge } from "antd";
const { Title, Text, Paragraph } = Typography;
import { CalendarOutlined, SearchOutlined, FilterOutlined, PlusOutlined, EditOutlined, DeleteOutlined, ClockCircleOutlined, CheckCircleFilled, VerifiedOutlined, AppstoreFilled, UnorderedListOutlined, ThunderboltFilled, InteractionFilled, VideoCameraOutlined, EnvironmentOutlined, VideoCameraFilled, GlobalOutlined, TeamOutlined, DashboardOutlined, SyncOutlined, HistoryOutlined } from "@ant-design/icons";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";

const APPOINTMENTS_INIT = [
  { id: 1, patient: "Nguyễn Văn A", time: "08:00", day: "MONDAY", type: "online", status: "confirmed", avatar: "A" },
  { id: 2, patient: "Trần Thị B", time: "09:00", day: "MONDAY", type: "offline", status: "pending", avatar: "B" },
  { id: 3, patient: "Lê Văn C", time: "10:00", day: "TUESDAY", type: "online", status: "completed", avatar: "C" },
];

const HOURS = ["07:00", "08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];
const DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

const SCH_FIELDS: CrudField[] = [
  { name: "patient", label: "Tên bệnh nhân", type: "text", placeholder: "Nguyễn Văn A", required: true, span: 2 },
  { name: "day", label: "Ngày trong tuần", type: "select", required: true, options: DAYS.map((d) => ({ value: d, label: d })) },
  { name: "time", label: "Giờ khám", type: "select", required: true, options: HOURS.map((h) => ({ value: h, label: h })) },
  { name: "type", label: "Hình thức", type: "select", required: true, options: [{ value: "online", label: "Video Call (Online)" }, { value: "offline", label: "Trực tiếp (Offline)" }] },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "confirmed", label: "Đã xác nhận" }, { value: "pending", label: "Chờ xác nhận" }, { value: "completed", label: "Hoàn tất" }] },
];

export default function SchedulePage() {
  const [view, setView] = useState<"calendar" | "list">("list");
  const [data, setData] = useState(APPOINTMENTS_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now(), avatar: v.patient?.[0] ?? "?" }, ...p]); setAddOpen(false); message.success("Đã thêm lịch trực!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật lịch trực thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xóa lịch trực!"); };

  const stats = [
    { label: "Lịch hôm nay", value: "24", icon: <CalendarOutlined /> },
    { label: "Lịch tuần này", value: "156", color: "#0050b3" },
    { label: "Tư vấn Online", value: "85", color: "#52c41a" },
    { label: "Khám trực tiếp", value: "71", color: "#faad14" }
  ];

  const columns = [
    {
      title: <Text strong style={{ fontSize: 11 }}>GIỜ KHÁM / NGÀY</Text>,
      render: (_: any, r: any) => (
        <Space size={12}>
           <div style={{ width: 40, height: 40, borderRadius: 4, background: '#f0f5ff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#0050b3' }}>
            <Text strong style={{ fontSize: 12 }}>{r.time}</Text>
          </div>
          <div>
            <Text strong style={{ fontSize: 13, display: 'block' }}>{r.day}</Text>
            <Text type="secondary" style={{ fontSize: 11 }}>27 Tháng 04, 2026</Text>
          </div>
        </Space>
      ),
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>BỆNH NHÂN</Text>,
      render: (_: any, r: any) => (
        <Space size={12}>
          <Avatar size="small" style={{ backgroundColor: '#f0f5ff', color: '#0050b3', fontWeight: 700 }}>{r.avatar}</Avatar>
          <Text strong style={{ fontSize: 13 }}>{r.patient}</Text>
        </Space>
      ),
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>HÌNH THỨC</Text>,
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.type === "online" ? "blue" : "default"} style={{ fontSize: 10, fontWeight: 700 }}>
          {r.type === "online" ? "VIDEO CONSULT" : "PHYSICAL VISIT"}
        </Tag>
      ),
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>, 
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.status === "confirmed" ? "green" : r.status === "pending" ? "orange" : "default"} style={{ fontSize: 10, fontWeight: 700 }}>
          {r.status.toUpperCase()}
        </Tag>
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
        title="Clinical Schedule Orchestration" 
        subtitle="Hệ thống điều phối lịch khám lâm sàng, quản lý ca trực và tối ưu hóa thời gian chuyên gia"
        primaryAction={{
            label: "Thêm lịch",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
        extra={
            <div style={{ background: '#f0f2f5', padding: 2, borderRadius: 4, display: 'flex' }}>
                <Button size="small" type={view === "list" ? "text" : "text"} style={view === "list" ? { background: 'white', fontWeight: 700 } : {}} onClick={() => setView("list")}>Agenda</Button>
                <Button size="small" type={view === "calendar" ? "text" : "text"} style={view === "calendar" ? { background: 'white', fontWeight: 700 } : {}} onClick={() => setView("calendar")}>Calendar</Button>
            </div>
        }
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm bệnh nhân, bác sĩ...">
        <Select placeholder="Ngày" style={{ width: 150 }} options={DAYS.map(d => ({ value: d, label: d }))} />
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

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Lịch trực" fields={SCH_FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.patient} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}