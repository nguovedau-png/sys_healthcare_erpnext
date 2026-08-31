"use client";
import React, { useState } from "react";
import { Card, Space, Row, Col, Typography, Tag, Button, Table, message, Select, Switch, Badge, Timeline, Avatar } from "antd";
const { Title, Text, Paragraph } = Typography;
import {
  MedicineBoxOutlined, PlusOutlined, EditOutlined, DeleteOutlined,
  BellFilled, ClockCircleOutlined, CheckCircleFilled, WarningFilled,
  PhoneOutlined, NotificationOutlined, HistoryOutlined
} from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

const DATA_INIT = [
  { id: 1, patient: "Nguyễn Văn A", medication: "Metformin 850mg", schedule: "Sáng 7h, Tối 19h", frequency: "2 lần/ngày", duration: "30 ngày", compliance: 92, smsEnabled: true, appEnabled: true, status: "Active", nextDose: "19:00 Hôm nay" },
  { id: 2, patient: "Trần Thị B", medication: "Amlodipine 5mg + Losartan 50mg", schedule: "Sáng 8h", frequency: "1 lần/ngày", duration: "60 ngày", compliance: 78, smsEnabled: true, appEnabled: false, status: "Active", nextDose: "08:00 Ngày mai" },
  { id: 3, patient: "Lê Văn C", medication: "Aspirin 81mg", schedule: "Tối 21h sau ăn", frequency: "1 lần/ngày", duration: "Dài hạn", compliance: 55, smsEnabled: false, appEnabled: true, status: "Warning", nextDose: "21:00 Hôm nay" },
];

const FIELDS: CrudField[] = [
  { name: "patient", label: "Bệnh nhân", type: "text", placeholder: "Nguyễn Văn A", required: true, span: 2 },
  { name: "medication", label: "Tên thuốc & hàm lượng", type: "text", placeholder: "Metformin 850mg", required: true, span: 2 },
  { name: "schedule", label: "Lịch uống (giờ cụ thể)", type: "text", placeholder: "Sáng 7h, Tối 19h", required: true },
  { name: "frequency", label: "Tần suất", type: "select", required: true, options: [
    { value: "1 lần/ngày", label: "1 lần/ngày" }, { value: "2 lần/ngày", label: "2 lần/ngày" },
    { value: "3 lần/ngày", label: "3 lần/ngày" }, { value: "Trước ăn sáng", label: "Trước ăn sáng" },
  ]},
  { name: "duration", label: "Thời gian điều trị", type: "text", placeholder: "30 ngày" },
  { name: "status", label: "Trạng thái", type: "select", options: [
    { value: "Active", label: "Đang nhắc" }, { value: "Paused", label: "Tạm dừng" }, { value: "Completed", label: "Hoàn thành" },
  ]},
];

export default function MedicationRemindersPage() {
  const [data, setData] = useState(DATA_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now(), compliance: 100, smsEnabled: true, appEnabled: true, nextDose: "Chưa cài" }, ...p]); setAddOpen(false); message.success("Đã thiết lập lịch nhắc thuốc!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật lịch nhắc thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xóa lịch nhắc!"); };

  const stats = [
    { label: "Lịch nhắc đang chạy", value: data.filter(d => d.status === "Active").length, icon: <BellFilled /> },
    { label: "Tuân thủ tốt (>80%)", value: data.filter(d => d.compliance >= 80).length, color: "#52c41a" },
    { label: "Cần can thiệp (<60%)", value: data.filter(d => d.compliance < 60).length, color: "#f5222d" },
    { label: "Nhắc qua SMS hôm nay", value: "1,284", color: "#0050b3" },
  ];

  const columns = [
    {
      title: <Text strong style={{ fontSize: 11 }}>BỆNH NHÂN / THUỐC</Text>,
      render: (_: any, r: any) => (
        <Space size={12}>
          <Avatar size={36} style={{ backgroundColor: "#0050b3" }}>{r.patient[0]}</Avatar>
          <div>
            <Text strong style={{ fontSize: 13, display: "block" }}>{r.patient}</Text>
            <Text type="secondary" style={{ fontSize: 11 }}>{r.medication}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>LỊCH NHẮC</Text>,
      render: (_: any, r: any) => (
        <div>
          <Space><ClockCircleOutlined style={{ color: "#0050b3" }} /><Text strong style={{ fontSize: 12 }}>{r.schedule}</Text></Space>
          <div style={{ fontSize: 11, color: "#8c8c8c" }}>{r.frequency} · {r.duration}</div>
        </div>
      ),
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>TUÂN THỦ ĐIỀU TRỊ</Text>,
      render: (_: any, r: any) => {
        const color = r.compliance >= 80 ? "#52c41a" : r.compliance >= 60 ? "#faad14" : "#f5222d";
        return (
          <div style={{ width: 140 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <Text type="secondary" style={{ fontSize: 10 }}>Compliance</Text>
              <Text strong style={{ fontSize: 10, color }}>{r.compliance}%</Text>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: "#f5f5f5", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${r.compliance}%`, background: color, borderRadius: 3, transition: "width 0.5s" }} />
            </div>
          </div>
        );
      },
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>KÊNH NHẮC</Text>,
      render: (_: any, r: any) => (
        <Space direction="vertical" size={4}>
          <Space size={8}>
            <Tag bordered={false} color={r.smsEnabled ? "green" : "default"} style={{ fontSize: 10, fontWeight: 700 }}>SMS {r.smsEnabled ? "✓" : "✗"}</Tag>
            <Tag bordered={false} color={r.appEnabled ? "blue" : "default"} style={{ fontSize: 10, fontWeight: 700 }}>App {r.appEnabled ? "✓" : "✗"}</Tag>
          </Space>
          <Text type="secondary" style={{ fontSize: 10 }}>Kế tiếp: {r.nextDose}</Text>
        </Space>
      ),
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>,
      render: (_: any, r: any) => (
        r.status === "Warning"
          ? <Space><WarningFilled style={{ color: "#f5222d" }} /><Text style={{ color: "#f5222d", fontWeight: 700, fontSize: 11 }}>CẢNH BÁO KHÔNG TUÂN THỦ</Text></Space>
          : <Tag bordered={false} color={r.status === "Active" ? "green" : "default"} style={{ fontSize: 10, fontWeight: 700 }}>{r.status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "",
      render: (_: any, r: any) => (
        <Space size={8}>
          <Button type="text" size="small" icon={<NotificationOutlined />} onClick={() => message.success(`Đã gửi nhắc ngay cho ${r.patient}!`)} />
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => setEditRecord(r)} />
          <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => setDeleteRecord(r)} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader
        title="Medication Reminder System"
        subtitle="Hệ thống nhắc lịch uống thuốc tự động qua SMS/App, theo dõi tuân thủ điều trị và cảnh báo bệnh nhân bỏ thuốc"
        primaryAction={{ label: "Thêm lịch nhắc", icon: <PlusOutlined />, onClick: () => setAddOpen(true) }}
        extra={<Button icon={<HistoryOutlined />}>Lịch sử nhắc thuốc</Button>}
      />

      <EhrStatCards stats={stats} />

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={16}>
          <EhrFilterBar placeholder="Tìm bệnh nhân, tên thuốc...">
            <Select placeholder="Kênh nhắc" style={{ width: 140 }} options={[{ value: "sms", label: "SMS" }, { value: "app", label: "App" }]} />
            <Select placeholder="Tuân thủ" style={{ width: 150 }} options={[{ value: "good", label: "Tốt (>80%)" }, { value: "warning", label: "Cần theo dõi" }]} />
          </EhrFilterBar>
          <Card className="ehr-card" bodyStyle={{ padding: 0 }}>
            <Table className="ehr-table-compact" dataSource={data} rowKey="id" pagination={false} columns={columns} size="small" />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card className="ehr-card" title={<Space><BellFilled style={{ color: "#faad14" }} />Nhắc thuốc hôm nay</Space>} style={{ height: "100%" }}>
            <Timeline items={[
              { color: "green", children: <><Text strong>07:00</Text> — Metformin 850mg (Nguyễn Văn A) <CheckCircleFilled style={{ color: "#52c41a" }} /></> },
              { color: "blue", children: <><Text strong>08:00</Text> — Amlodipine 5mg (Trần Thị B) <CheckCircleFilled style={{ color: "#52c41a" }} /></> },
              { color: "orange", children: <><Text strong>19:00</Text> — Metformin 850mg (Nguyễn Văn A) <Tag color="orange">Sắp đến</Tag></> },
              { color: "red", children: <><Text strong>21:00</Text> — Aspirin 81mg (Lê Văn C) <Tag color="red">Bỏ lịch hôm qua!</Tag></> },
            ]} />
          </Card>
        </Col>
      </Row>

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Lịch nhắc uống thuốc" fields={FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.patient} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}
