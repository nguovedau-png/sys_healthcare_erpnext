"use client";
import React, { useState } from "react";
import { Tag, Button, Input, Select, Table, Badge, message, Tooltip, Card, Row, Col, Typography, Space, Statistic, Avatar, Divider, Progress } from "antd";
const { Title, Text, Paragraph } = Typography;
import { BellOutlined, SearchOutlined, FilterOutlined, PlusOutlined, EditOutlined, DeleteOutlined, InteractionOutlined, ClockCircleOutlined, ThunderboltFilled, PlayCircleFilled, DashboardOutlined, TeamOutlined, GlobalOutlined, SendOutlined, WhatsAppOutlined, MailOutlined, MessageOutlined, CustomerServiceOutlined, HeartFilled, HistoryOutlined } from "@ant-design/icons";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";

const DATA_INIT = [
  { id: 1, campaign: "Nhắc khám tiểu đường định kỳ", target: "1,240 bệnh nhân", channel: "Zalo/SMS", conversion: 68, status: "Active" },
  { id: 2, campaign: "Chiến dịch Tiêm vaccine Cúm", target: "850 bệnh nhân", channel: "Email/App", conversion: 45, status: "Active" },
  { id: 3, campaign: "Khảo sát hài lòng nội trú", target: "240 bệnh nhân", channel: "App Push", conversion: 92, status: "Paused" },
];

const FIELDS: CrudField[] = [
  { name: "campaign", label: "Tên chiến dịch", type: "text", placeholder: "Nhắc khám tiểu đường", required: true, span: 2 },
  { name: "target", label: "Đối tượng (số lượng)", type: "text", placeholder: "1,240 bệnh nhân" },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "Active", label: "Đang chạy" }, { value: "Paused", label: "Tạm dừng" }, { value: "Completed", label: "Đã hoàn thành" }] },
];

export default function EngagementPage() {
  const [data, setData] = useState(DATA_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now(), channel: "Zalo", conversion: 0 }, ...p]); setAddOpen(false); message.success("Đã kích hoạt chiến dịch tương tác mới!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật chiến dịch thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã huỷ chiến dịch!"); };

  const stats = [
    { label: "Tin nhắn đã gửi", value: "85.2k", icon: <MessageOutlined /> },
    { label: "Bệnh nhân phản hồi", value: "12.4k", color: "#52c41a" },
    { label: "Tỷ lệ tái khám", value: "+28%", color: "#0050b3" },
    { label: "Chiến dịch chạy", value: "05", color: "#faad14" }
  ];

  const columns = [
    { 
      title: <Text strong style={{ fontSize: 11 }}>CHIẾN DỊCH / KÊNH</Text>, 
      render: (_: any, r: any) => (
        <Space size={12}>
           <div style={{ width: 32, height: 32, borderRadius: 4, background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0050b3' }}>
            <SendOutlined />
          </div>
          <div>
            <Text strong style={{ fontSize: 13, display: 'block' }}>{r.campaign}</Text>
            <Text type="secondary" style={{ fontSize: 11 }}>{r.channel}</Text>
          </div>
        </Space>
      ) 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>ĐỐI TƯỢNG MỤC TIÊU</Text>, 
      render: (_: any, r: any) => <Text style={{ fontSize: 12 }}>{r.target}</Text> 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>CHUYỂN ĐỔI</Text>, 
      render: (_: any, r: any) => (
        <div style={{ width: 150 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
            <Text type="secondary" style={{ fontSize: 10 }}>Success Rate</Text>
            <Text strong style={{ fontSize: 10 }}>{r.conversion}%</Text>
          </div>
          <Progress percent={r.conversion} size="small" strokeColor="#0050b3" showInfo={false} />
        </div>
      ) 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>, 
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.status === "Active" ? "green" : "orange"} style={{ fontSize: 10, fontWeight: 700 }}>
          {r.status.toUpperCase()}
        </Tag>
      ) 
    },
    { 
      title: "", 
      render: (_: any, r: any) => (
        <Space size={8}>
          <Button type="text" size="small" icon={<PlayCircleFilled />} />
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => setEditRecord(r)} />
          <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => setDeleteRecord(r)} />
        </Space>
      ) 
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader 
        title="Patient Engagement Hub" 
        subtitle="Hệ thống tương tác bệnh nhân đa kênh, nhắc nhở điều trị tự động và tăng cường tuân thủ y tế bằng AI"
        primaryAction={{
            label: "Tạo chiến dịch",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
        extra={<Button icon={<BellOutlined />}>Cấu hình thông báo</Button>}
      />

      <EhrStatCards stats={stats} />

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={24}>
            <Card bordered={false} style={{ background: '#1e1b4b', borderRadius: 8, color: 'white' }}>
                <Row gutter={[24, 24]} align="middle">
                    <Col flex="1">
                        <Title level={4} style={{ color: 'white', margin: 0 }}><CustomerServiceOutlined style={{ color: '#818cf8' }} /> AI Patient Care Orchestrator</Title>
                        <Paragraph style={{ color: 'rgba(255,255,255,0.6)', margin: '8px 0 0 0' }}>
                            Hệ thống AI tự động phân loại mức độ rủi ro của bệnh nhân để đưa ra lịch trình nhắc nhở cá nhân hóa.
                        </Paragraph>
                    </Col>
                    <Col>
                        <div style={{ textAlign: 'right' }}>
                            <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, textTransform: 'uppercase' }}>Loyalty Index</Text>
                            <div style={{ fontSize: 32, fontWeight: 900, color: '#818cf8' }}>8.8</div>
                        </div>
                    </Col>
                </Row>
            </Card>
        </Col>
      </Row>

      <EhrFilterBar placeholder="Tìm chiến dịch, nhóm bệnh nhân...">
        <Select placeholder="Kênh tương tác" style={{ width: 150 }} options={[{ value: "sms", label: "SMS" }]} />
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

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Chiến dịch tương tác" fields={FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.campaign} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}