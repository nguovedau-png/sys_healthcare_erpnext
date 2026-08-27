"use client";
import React, { useState } from "react";
import { Card, Space, Row, Col, Typography, Tag, Button, Table, message, Select, Avatar, Badge, Statistic, Input } from "antd";
const { Title, Text, Paragraph } = Typography;
import {
  PhoneOutlined, PlusOutlined, EditOutlined, DeleteOutlined,
  CustomerServiceOutlined, ClockCircleOutlined, CheckCircleFilled,
  HistoryOutlined, SoundOutlined, UserOutlined, BarChartOutlined
} from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

const CALLS_INIT = [
  { id: 1, callerName: "Nguyễn Văn A", phone: "0909 123 456", topic: "Hỏi về tác dụng phụ của thuốc huyết áp", specialist: "BS. Lê Thu Hà (Tim mạch)", duration: "8 phút", status: "Completed", callTime: "10:32 Hôm nay", outcome: "Đã tư vấn, khuyên tái khám" },
  { id: 2, callerName: "Trần Thị B", phone: "0988 777 666", topic: "Con 3 tuổi sốt cao 39°C, hỏi xử lý tại nhà", specialist: "BS. Minh Châu (Nhi khoa)", duration: "12 phút", status: "Completed", callTime: "09:15 Hôm nay", outcome: "Hướng dẫn hạ sốt, theo dõi 4h" },
  { id: 3, callerName: "Lê Văn C", phone: "0912 345 678", topic: "Cần đặt lịch khám chuyên khoa Thần kinh", specialist: "Đang kết nối...", duration: "", status: "In Queue", callTime: "Vừa gọi", outcome: "" },
];

const FIELDS: CrudField[] = [
  { name: "callerName", label: "Tên người gọi", type: "text", placeholder: "Nguyễn Văn A", required: true },
  { name: "phone", label: "Số điện thoại", type: "phone", placeholder: "0909 123 456", required: true },
  { name: "topic", label: "Nội dung tư vấn", type: "text", placeholder: "Hỏi về...", required: true, span: 2 },
  { name: "specialist", label: "Chuyên khoa cần tư vấn", type: "select", options: [
    { value: "Nội khoa", label: "Nội khoa" }, { value: "Tim mạch", label: "Tim mạch" },
    { value: "Nhi khoa", label: "Nhi khoa" }, { value: "Sản phụ khoa", label: "Sản phụ khoa" },
    { value: "Thần kinh", label: "Thần kinh" }, { value: "Chung", label: "Tư vấn chung" },
  ]},
  { name: "status", label: "Trạng thái", type: "select", options: [
    { value: "Completed", label: "Hoàn tất" }, { value: "In Queue", label: "Trong hàng chờ" }, { value: "Missed", label: "Không nghe máy" },
  ]},
];

export default function HotlinePage() {
  const [data, setData] = useState(CALLS_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now(), duration: "", callTime: "Vừa xong", outcome: "" }, ...p]); setAddOpen(false); message.success("Đã thêm cuộc gọi vào lịch!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xóa!"); };

  const stats = [
    { label: "Cuộc gọi hôm nay", value: "248", icon: <PhoneOutlined /> },
    { label: "Đang trong hàng chờ", value: data.filter(d => d.status === "In Queue").length, color: "#faad14" },
    { label: "Thời gian chờ TB", value: "3 phút", color: "#0050b3" },
    { label: "Tỷ lệ giải quyết", value: "94.2%", color: "#52c41a" },
  ];

  const AGENTS = [
    { name: "BS. Lê Thu Hà", specialty: "Tim mạch", status: "Available", callsToday: 32 },
    { name: "BS. Minh Châu", specialty: "Nhi khoa", status: "On Call", callsToday: 28 },
    { name: "BS. Hùng Anh", specialty: "Nội khoa", status: "Available", callsToday: 41 },
    { name: "BS. Thu Trang", specialty: "Sản phụ khoa", status: "Break", callsToday: 19 },
  ];

  const columns = [
    {
      title: <Text strong style={{ fontSize: 11 }}>NGƯỜI GỌI / SỐ ĐIỆN THOẠI</Text>,
      render: (_: any, r: any) => (
        <Space size={12}>
          <Avatar size={32} icon={<UserOutlined />} style={{ backgroundColor: "#0050b3" }} />
          <div>
            <Text strong style={{ fontSize: 13 }}>{r.callerName}</Text>
            <div style={{ fontSize: 11, color: "#8c8c8c" }}>{r.phone}</div>
          </div>
        </Space>
      ),
    },
    { title: <Text strong style={{ fontSize: 11 }}>NỘI DUNG TƯ VẤN</Text>, dataIndex: "topic", render: (v: string) => <Text style={{ fontSize: 12 }}>{v}</Text> },
    { title: <Text strong style={{ fontSize: 11 }}>BÁC SĨ TIẾP NHẬN</Text>, dataIndex: "specialist", render: (v: string) => <Text style={{ fontSize: 12 }}>{v}</Text> },
    { title: <Text strong style={{ fontSize: 11 }}>THỜI LƯỢNG</Text>, dataIndex: "duration", render: (v: string) => <Text style={{ fontSize: 12, color: "#0050b3", fontWeight: 600 }}>{v || "—"}</Text> },
    {
      title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>,
      render: (_: any, r: any) => (
        <Tag bordered={false}
          color={r.status === "Completed" ? "green" : r.status === "In Queue" ? "orange" : "red"}
          style={{ fontSize: 10, fontWeight: 700 }}
        >{r.status.toUpperCase()}</Tag>
      ),
    },
    { title: <Text strong style={{ fontSize: 11 }}>GIỜ GỌI</Text>, dataIndex: "callTime", render: (v: string) => <Text type="secondary" style={{ fontSize: 11 }}>{v}</Text> },
    {
      title: "",
      render: (_: any, r: any) => (
        <Space size={8}>
          <Button type="text" size="small" icon={<PhoneOutlined />} onClick={() => message.info(`Gọi lại cho ${r.callerName}...`)} />
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => setEditRecord(r)} />
          <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => setDeleteRecord(r)} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader
        title="Health Hotline 24/7 — Tổng đài Tư vấn Sức khỏe"
        subtitle="Hệ thống tổng đài tư vấn sức khỏe 24/7, kết nối bệnh nhân với bác sĩ chuyên khoa trong thời gian thực"
        primaryAction={{ label: "Ghi nhận cuộc gọi", icon: <PlusOutlined />, onClick: () => setAddOpen(true) }}
        extra={<Button icon={<HistoryOutlined />}>Lịch sử cuộc gọi</Button>}
      />

      <EhrStatCards stats={stats} />

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Card className="ehr-card" title={<Space><CustomerServiceOutlined />Tình trạng Bác sĩ trực tuyến</Space>}>
            <Row gutter={[12, 12]}>
              {AGENTS.map((a, i) => (
                <Col key={i} xs={12} md={6}>
                  <Card size="small" style={{ borderRadius: 4, borderColor: a.status === "Available" ? "#b7eb8f" : a.status === "On Call" ? "#91caff" : "#d9d9d9" }}>
                    <Space>
                      <Badge status={a.status === "Available" ? "success" : a.status === "On Call" ? "processing" : "default"} />
                      <div>
                        <Text strong style={{ fontSize: 12, display: "block" }}>{a.name}</Text>
                        <Text type="secondary" style={{ fontSize: 10 }}>{a.specialty} · {a.callsToday} cuộc</Text>
                      </div>
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>

      <EhrFilterBar placeholder="Tìm người gọi, số điện thoại...">
        <Select placeholder="Chuyên khoa" style={{ width: 150 }} options={[{ value: "all", label: "Tất cả" }]} />
        <Select placeholder="Trạng thái" style={{ width: 150 }} options={[{ value: "completed", label: "Hoàn tất" }, { value: "queue", label: "Trong hàng chờ" }]} />
      </EhrFilterBar>

      <Card className="ehr-card" bodyStyle={{ padding: 0 }}>
        <Table className="ehr-table-compact" dataSource={data} rowKey="id" pagination={false} columns={columns} size="small" />
      </Card>

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Cuộc gọi tư vấn sức khỏe" fields={FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.callerName} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}
