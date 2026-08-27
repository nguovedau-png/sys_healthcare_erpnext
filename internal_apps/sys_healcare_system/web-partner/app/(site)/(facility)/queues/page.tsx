"use client";
import React, { useState, useEffect } from "react";
import { Card, Space, Row, Col, Typography, Tag, Button, Table, Progress, message, Select, Badge, Statistic, Avatar } from "antd";
const { Title, Text, Paragraph } = Typography;
import {
  TeamOutlined, ClockCircleOutlined, SoundOutlined, PlusOutlined,
  EditOutlined, DeleteOutlined, ArrowUpOutlined, HistoryOutlined,
  CheckCircleFilled, ThunderboltFilled, ReloadOutlined
} from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

const QUEUES_INIT = [
  { id: 1, ticketNo: "A-001", patientName: "Nguyễn Văn A", purpose: "Khám tổng quát", department: "Khoa Nội", status: "Called", waitTime: 0, priority: "Normal" },
  { id: 2, ticketNo: "A-002", patientName: "Trần Thị B", purpose: "Xét nghiệm máu", department: "Khoa CLS", status: "Waiting", waitTime: 8, priority: "Normal" },
  { id: 3, ticketNo: "A-003", patientName: "Lê Văn C", purpose: "Tái khám Tim mạch", department: "Khoa Tim mạch", status: "Waiting", waitTime: 15, priority: "Priority" },
  { id: 4, ticketNo: "B-001", patientName: "Phạm Thu D", purpose: "Chụp X-Quang", department: "Khoa CĐHA", status: "Waiting", waitTime: 22, priority: "Normal" },
  { id: 5, ticketNo: "C-001", patientName: "Hoàng Minh E", purpose: "Khám cấp cứu", department: "Khoa Cấp cứu", status: "Waiting", waitTime: 3, priority: "Emergency" },
];

const FIELDS: CrudField[] = [
  { name: "patientName", label: "Họ tên bệnh nhân", type: "text", placeholder: "Nguyễn Văn A", required: true, span: 2 },
  { name: "purpose", label: "Mục đích khám", type: "text", placeholder: "Khám tổng quát", required: true },
  { name: "department", label: "Khoa / Phòng", type: "select", required: true, options: [
    { value: "Khoa Nội", label: "Khoa Nội" }, { value: "Khoa CLS", label: "CLS / Xét nghiệm" },
    { value: "Khoa Tim mạch", label: "Tim mạch" }, { value: "Khoa CĐHA", label: "Chẩn đoán hình ảnh" },
    { value: "Khoa Cấp cứu", label: "Cấp cứu" },
  ]},
  { name: "priority", label: "Ưu tiên", type: "select", options: [
    { value: "Normal", label: "Thường" }, { value: "Priority", label: "Ưu tiên" }, { value: "Emergency", label: "Cấp cứu" },
  ]},
];

export default function QueuesPage() {
  const [data, setData] = useState(QUEUES_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);
  const [currentCalled, setCurrentCalled] = useState("A-001");

  const handleAdd = (v: any) => {
    const prefix = v.department === "Khoa Cấp cứu" ? "C" : v.department === "Khoa CLS" ? "B" : "A";
    const no = `${prefix}-${String(data.length + 1).padStart(3, "0")}`;
    setData((p) => [...p, { ...v, id: Date.now(), ticketNo: no, status: "Waiting", waitTime: data.length * 7 }]);
    setAddOpen(false);
    message.success(`Đã cấp số thứ tự: ${no}`);
  };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xóa khỏi hàng chờ!"); };

  const callNext = () => {
    const waiting = data.filter(d => d.status === "Waiting").sort((a, b) => {
      const pScore = (p: string) => p === 'Emergency' ? 0 : p === 'Priority' ? 1 : 2;
      return pScore(a.priority) - pScore(b.priority);
    });
    if (waiting.length === 0) { message.info("Hàng chờ trống!"); return; }
    const next = waiting[0];
    setData(p => p.map(r => r.id === next.id ? { ...r, status: "Called" } : r.status === "Called" ? { ...r, status: "Completed" } : r));
    setCurrentCalled(next.ticketNo);
    message.success(`📢 Mời số ${next.ticketNo} — ${next.patientName}`);
  };

  const stats = [
    { label: "Đang chờ", value: data.filter(d => d.status === "Waiting").length, icon: <TeamOutlined /> },
    { label: "Đã gọi / Đang khám", value: data.filter(d => d.status === "Called").length, color: "#0050b3" },
    { label: "Hoàn thành hôm nay", value: data.filter(d => d.status === "Completed").length + 48, color: "#52c41a" },
    { label: "Thời gian chờ TB", value: "12 phút", color: "#faad14" },
  ];

  const columns = [
    {
      title: <Text strong style={{ fontSize: 11 }}>SỐ THỨ TỰ</Text>,
      render: (_: any, r: any) => (
        <div style={{
          width: 56, height: 56, borderRadius: 4,
          background: r.priority === "Emergency" ? "#fff1f0" : r.priority === "Priority" ? "#fff7e6" : "#f0f5ff",
          border: `2px solid ${r.priority === "Emergency" ? "#ff4d4f" : r.priority === "Priority" ? "#faad14" : "#91caff"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 900, fontSize: 18,
          color: r.priority === "Emergency" ? "#cf1322" : r.priority === "Priority" ? "#d46b08" : "#0050b3",
        }}>{r.ticketNo}</div>
      ),
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>BỆNH NHÂN / MỤC ĐÍCH</Text>,
      render: (_: any, r: any) => (
        <div>
          <Text strong style={{ fontSize: 13 }}>{r.patientName}</Text>
          <div style={{ fontSize: 11, color: "#8c8c8c" }}>{r.purpose}</div>
        </div>
      ),
    },
    { title: <Text strong style={{ fontSize: 11 }}>KHOA / PHÒNG</Text>, dataIndex: "department", render: (v: string) => <Text style={{ fontSize: 12 }}>{v}</Text> },
    {
      title: <Text strong style={{ fontSize: 11 }}>ƯU TIÊN</Text>,
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.priority === "Emergency" ? "red" : r.priority === "Priority" ? "orange" : "default"} style={{ fontSize: 10, fontWeight: 700 }}>
          {r.priority.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>THỜI GIAN CHỜ</Text>,
      render: (_: any, r: any) => (
        r.status === "Waiting"
          ? <Space><ClockCircleOutlined style={{ color: r.waitTime > 15 ? "#f5222d" : "#faad14" }} /><Text style={{ fontSize: 12 }}>{r.waitTime} phút</Text></Space>
          : r.status === "Called" ? <Badge status="processing" text="Đang gọi" />
          : <Badge status="success" text="Hoàn thành" />
      ),
    },
    {
      title: "",
      render: (_: any, r: any) => (
        <Space size={8}>
          <Button type="text" size="small" icon={<SoundOutlined />} onClick={() => message.info(`📢 Mời bệnh nhân ${r.ticketNo} vào khám`)} />
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => setEditRecord(r)} />
          <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => setDeleteRecord(r)} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader
        title="Queue Management — Hệ thống Xếp số"
        subtitle="Điều phối hàng chờ thông minh, ưu tiên phân loại theo mức độ khẩn cấp và tối ưu thời gian chờ đợi"
        primaryAction={{ label: "Cấp số mới", icon: <PlusOutlined />, onClick: () => setAddOpen(true) }}
        extra={
          <Space>
            <Button icon={<ReloadOutlined />} onClick={() => message.info("Đã đồng bộ màn hình bảng số!")}>Sync màn hình</Button>
            <Button type="primary" icon={<SoundOutlined />} onClick={callNext}>Gọi số kế tiếp</Button>
          </Space>
        }
      />

      <EhrStatCards stats={stats} />

      {/* Current called ticket banner */}
      <Card bordered={false} style={{ background: "#001529", borderRadius: 4, marginBottom: 24 }} bodyStyle={{ padding: 24 }}>
        <Row align="middle" gutter={32}>
          <Col flex="1">
            <Text style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, textTransform: "uppercase", fontWeight: 700 }}>ĐANG GỌI VÀO KHÁM</Text>
            <div style={{ fontSize: 64, fontWeight: 900, color: "#fadb14", lineHeight: 1.1 }}>{currentCalled}</div>
          </Col>
          <Col>
            <div style={{ textAlign: "right" }}>
              <Text style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>MÀNG HÌNH BẢNG SỐ</Text>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#52c41a" }} />
                <Text style={{ color: "#52c41a", fontWeight: 700 }}>KẾT NỐI ỔN ĐỊNH</Text>
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      <EhrFilterBar placeholder="Tìm số thứ tự, bệnh nhân...">
        <Select placeholder="Khoa / Phòng" style={{ width: 160 }} options={[{ value: "all", label: "Tất cả khoa" }]} />
        <Select placeholder="Trạng thái" style={{ width: 150 }} options={[{ value: "waiting", label: "Đang chờ" }, { value: "called", label: "Đã gọi" }]} />
      </EhrFilterBar>

      <Card className="ehr-card" bodyStyle={{ padding: 0 }}>
        <Table className="ehr-table-compact" dataSource={data} rowKey="id" pagination={false} columns={columns} size="small"
          rowClassName={(r) => r.priority === "Emergency" ? "ant-table-row-danger" : ""} />
      </Card>

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Số thứ tự / Bệnh nhân" fields={FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.patientName} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}
