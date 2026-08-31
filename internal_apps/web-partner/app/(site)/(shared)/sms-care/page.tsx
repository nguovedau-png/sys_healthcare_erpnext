"use client";
import React, { useState } from "react";
import { Card, Space, Row, Col, Typography, Tag, Button, Table, message, Select, Statistic, Progress, Input } from "antd";
const { Title, Text, Paragraph } = Typography;
import {
  MessageOutlined, PlusOutlined, EditOutlined, DeleteOutlined,
  SendOutlined, PhoneOutlined, CheckCircleFilled, HistoryOutlined,
  UserOutlined, BarChartOutlined, BellFilled, CloudOutlined
} from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

const CAMPAIGNS_INIT = [
  { id: 1, name: "Nhắc lịch tái khám - Nhóm tiểu đường Q2/2024", type: "Appointment Reminder", recipients: 4500, sent: 4498, opened: 3240, status: "Completed", date: "25/04/2024", openRate: 72 },
  { id: 2, name: "Thông báo kết quả xét nghiệm - Nhóm CA125 bất thường", type: "Lab Result Alert", recipients: 128, sent: 128, opened: 122, status: "Completed", date: "24/04/2024", openRate: 95 },
  { id: 3, name: "Khuyến mãi gói khám sức khỏe tổng quát 5/2024", type: "Health Promotion", recipients: 12000, sent: 11850, opened: 5420, status: "Sending", date: "26/04/2024", openRate: 46 },
  { id: 4, name: "Nhắc lịch uống thuốc - Bệnh nhân tăng huyết áp", type: "Medication Reminder", recipients: 2200, sent: 0, opened: 0, status: "Scheduled", date: "27/04/2024", openRate: 0 },
];

const FIELDS: CrudField[] = [
  { name: "name", label: "Tên chiến dịch SMS", type: "text", placeholder: "Nhắc lịch tái khám...", required: true, span: 2 },
  { name: "type", label: "Loại tin nhắn", type: "select", required: true, options: [
    { value: "Appointment Reminder", label: "Nhắc lịch khám" },
    { value: "Medication Reminder", label: "Nhắc uống thuốc" },
    { value: "Lab Result Alert", label: "Thông báo kết quả XN" },
    { value: "Health Promotion", label: "Khuyến mãi / Sức khỏe" },
    { value: "Emergency Alert", label: "Cảnh báo khẩn" },
  ]},
  { name: "recipients", label: "Số lượng người nhận", type: "number", placeholder: "5000", required: true },
  { name: "date", label: "Ngày gửi (dd/mm/yyyy)", type: "text", placeholder: "27/04/2024", required: true },
  { name: "status", label: "Trạng thái", type: "select", options: [
    { value: "Scheduled", label: "Đã lên lịch" }, { value: "Sending", label: "Đang gửi" },
    { value: "Completed", label: "Hoàn tất" }, { value: "Paused", label: "Tạm dừng" },
  ]},
];

export default function SmsCarePage() {
  const [data, setData] = useState(CAMPAIGNS_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);
  const [testPhone, setTestPhone] = useState("");

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now(), sent: 0, opened: 0, openRate: 0 }, ...p]); setAddOpen(false); message.success("Đã tạo chiến dịch SMS Brandname!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xóa chiến dịch!"); };

  const stats = [
    { label: "Tin nhắn đã gửi tháng này", value: "248,500", icon: <MessageOutlined /> },
    { label: "Tỷ lệ mở TB", value: "68.4%", color: "#52c41a" },
    { label: "Chiến dịch đang chạy", value: data.filter(d => d.status === "Sending").length, color: "#0050b3" },
    { label: "Lên lịch chờ gửi", value: data.filter(d => d.status === "Scheduled").length, color: "#faad14" },
  ];

  const statusColor = (s: string) => s === "Completed" ? "green" : s === "Sending" ? "blue" : s === "Scheduled" ? "orange" : "default";

  const columns = [
    {
      title: <Text strong style={{ fontSize: 11 }}>CHIẾN DỊCH / LOẠI</Text>,
      render: (_: any, r: any) => (
        <div>
          <Text strong style={{ fontSize: 13, display: "block" }}>{r.name}</Text>
          <Tag bordered={false} color="purple" style={{ fontSize: 10, fontWeight: 700, marginTop: 4 }}>{r.type.toUpperCase()}</Tag>
        </div>
      ),
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>NGƯỜI NHẬN / ĐÃ GỬI</Text>,
      render: (_: any, r: any) => (
        <div>
          <Text strong style={{ fontSize: 13 }}>{r.sent.toLocaleString()} / {r.recipients.toLocaleString()}</Text>
          <Progress percent={r.recipients > 0 ? Math.round((r.sent / r.recipients) * 100) : 0} size="small" showInfo={false} strokeColor="#0050b3" style={{ marginTop: 4 }} />
        </div>
      ),
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>TỶ LỆ MỞ</Text>,
      render: (_: any, r: any) => (
        <div>
          <Text strong style={{ fontSize: 14, color: r.openRate > 60 ? "#52c41a" : r.openRate > 30 ? "#faad14" : "#8c8c8c" }}>{r.openRate}%</Text>
          <Progress percent={r.openRate} size="small" showInfo={false} strokeColor={r.openRate > 60 ? "#52c41a" : "#faad14"} />
        </div>
      ),
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>,
      render: (_: any, r: any) => <Tag bordered={false} color={statusColor(r.status)} style={{ fontSize: 10, fontWeight: 700 }}>{r.status.toUpperCase()}</Tag>,
    },
    { title: <Text strong style={{ fontSize: 11 }}>NGÀY GỬI</Text>, dataIndex: "date", render: (v: string) => <Text type="secondary" style={{ fontSize: 11 }}>{v}</Text> },
    {
      title: "",
      render: (_: any, r: any) => (
        <Space size={8}>
          <Button type="text" size="small" icon={<SendOutlined />} onClick={() => message.success(`Đang gửi chiến dịch: ${r.name}`)} />
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => setEditRecord(r)} />
          <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => setDeleteRecord(r)} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader
        title="SMS Brandname Care — Chăm sóc bệnh nhân tự động"
        subtitle="Hệ thống gửi SMS Brandname chăm sóc bệnh nhân: nhắc lịch khám, kết quả xét nghiệm, lịch uống thuốc tích hợp API nhà mạng"
        primaryAction={{ label: "Tạo chiến dịch SMS", icon: <PlusOutlined />, onClick: () => setAddOpen(true) }}
        extra={<Button icon={<HistoryOutlined />}>Báo cáo SMS</Button>}
      />

      <EhrStatCards stats={stats} />

      {/* Test SMS */}
      <Card className="ehr-card" style={{ marginBottom: 16 }} title={<Space><SendOutlined />Gửi SMS thử nghiệm (Test Brandname)</Space>}>
        <Row gutter={12} align="middle">
          <Col flex="1">
            <Input
              placeholder="Nhập số điện thoại để kiểm tra SMS Brandname..."
              prefix={<PhoneOutlined style={{ color: "#8c8c8c" }} />}
              value={testPhone}
              onChange={e => setTestPhone(e.target.value)}
              size="large"
            />
          </Col>
          <Col>
            <Select size="large" defaultValue="Appointment Reminder" style={{ width: 220 }} options={[
              { value: "Appointment Reminder", label: "Nhắc lịch khám" },
              { value: "Medication Reminder", label: "Nhắc uống thuốc" },
            ]} />
          </Col>
          <Col>
            <Button type="primary" size="large" icon={<SendOutlined />} onClick={() => { if (!testPhone) { message.warning("Nhập số điện thoại!"); return; } message.success(`Đã gửi SMS test đến ${testPhone}`); }}>
              Gửi test
            </Button>
          </Col>
        </Row>
      </Card>

      <EhrFilterBar placeholder="Tìm chiến dịch SMS...">
        <Select placeholder="Loại tin nhắn" style={{ width: 180 }} options={[{ value: "all", label: "Tất cả" }]} />
        <Select placeholder="Trạng thái" style={{ width: 150 }} options={[{ value: "completed", label: "Hoàn tất" }, { value: "scheduled", label: "Đã lên lịch" }]} />
      </EhrFilterBar>

      <Card className="ehr-card" bodyStyle={{ padding: 0 }}>
        <Table className="ehr-table-compact" dataSource={data} rowKey="id" pagination={false} columns={columns} size="small" />
      </Card>

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Chiến dịch SMS Brandname" fields={FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.name} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}
