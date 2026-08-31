"use client";
import React, { useState } from "react";
import { Tag, Button, Input, Progress, message, Tooltip, Row, Col, Typography, Space, Select, Card } from "antd";
const { Title, Text, Paragraph } = Typography;
import { CalendarOutlined, SearchOutlined, FilterOutlined, PlusOutlined, ArrowRightOutlined, SafetyCertificateOutlined, EditOutlined, DeleteOutlined, EnvironmentOutlined, VerifiedOutlined, GlobalOutlined, HistoryOutlined } from "@ant-design/icons";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";

const EVENTS_INIT = [
  { id: 1, title: "Hội thảo Tim mạch Quốc tế 2024", date: "25/12/2024", location: "Hall A, Bệnh viện Chợ Rẫy", registered: 450, capacity: 500, type: "Offline", speaker: "GS. TS. Nguyễn Văn A", image: "🩺" },
  { id: 2, title: "Webinar: Cập nhật phác đồ điều trị COVID-19", date: "15/01/2025", location: "Zoom Cloud Meeting", registered: 1200, capacity: 2000, type: "Online", speaker: "ThS. BS. Trần Thị B", image: "💻" },
  { id: 3, title: "Đào tạo CME: Kỹ thuật Nội soi can thiệp tiên tiến", date: "20/12/2024", location: "Trung tâm Đào tạo Kỹ thuật", registered: 45, capacity: 50, type: "Hybrid", speaker: "BSCKII. Lê Văn C", image: "🔬" },
];

const EVENT_FIELDS: CrudField[] = [
  { name: "title", label: "Tên sự kiện", type: "text", placeholder: "Hội thảo Tim mạch Quốc tế...", required: true, span: 2 },
  { name: "type", label: "Hình thức", type: "select", required: true, options: [{ value: "Offline", label: "Trực tiếp" }, { value: "Online", label: "Trực tuyến" }, { value: "Hybrid", label: "Kết hợp" }] },
  { name: "date", label: "Ngày tổ chức", type: "text", placeholder: "25/12/2024", required: true },
  { name: "location", label: "Địa điểm / Link", type: "text", placeholder: "Hall A, Bệnh viện Chợ Rẫy", required: true, span: 2 },
  { name: "speaker", label: "Diễn giả chính", type: "text", placeholder: "GS. TS. Nguyễn Văn A", span: 2 },
  { name: "capacity", label: "Sức chứa tối đa", type: "number", placeholder: "500", required: true },
  { name: "image", label: "Icon (emoji)", type: "text", placeholder: "🩺" },
];

export default function EventsPage() {
  const [data, setData] = useState(EVENTS_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now(), registered: 0 }, ...p]); setAddOpen(false); message.success("Đã tạo sự kiện mới!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật sự kiện thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xoá sự kiện!"); };

  const stats = [
    { label: "Sự kiện tổ chức", value: "42", icon: <CalendarOutlined /> },
    { label: "Lượt đăng ký", value: "12.5k", color: "#0050b3" },
    { label: "CME Issued", value: "850", color: "#52c41a" },
    { label: "Rating trung bình", value: "4.9/5", color: "#faad14" }
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader 
        title="CME & Seminar Command Center" 
        subtitle="Trung tâm điều phối hội thảo, sự kiện đào tạo y khoa liên tục và kết nối chuyên gia toàn cầu"
        primaryAction={{
            label: "Tổ chức sự kiện",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
        extra={<Button icon={<SafetyCertificateOutlined />}>Quản lý CME</Button>}
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm hội thảo, chuyên gia...">
        <Select placeholder="Loại sự kiện" style={{ width: 150 }} options={[{ value: "cme", label: "Đào tạo CME" }]} />
      </EhrFilterBar>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        {data.map((e) => (
          <Col key={e.id} xs={24} md={12} lg={8}>
            <Card 
              className="ehr-card" 
              hoverable
              cover={
                <div style={{ height: 160, background: '#001529', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64, position: 'relative' }}>
                    <div style={{ opacity: 0.3 }}>{e.image}</div>
                    <Tag bordered={false} color={e.type === "Online" ? "purple" : "blue"} style={{ position: 'absolute', top: 12, right: 12, margin: 0, fontWeight: 700, fontSize: 10 }}>{e.type.toUpperCase()}</Tag>
                </div>
              }
              actions={[
                <EditOutlined key="edit" onClick={() => setEditRecord(e)} />,
                <DeleteOutlined key="delete" onClick={() => setDeleteRecord(e)} />,
                <ArrowRightOutlined key="go" />
              ]}
            >
              <Card.Meta 
                title={<Text strong style={{ fontSize: 15 }}>{e.title}</Text>}
                description={
                  <Space direction="vertical" size={4} style={{ width: '100%', marginTop: 8 }}>
                    <Text type="secondary" style={{ fontSize: 12 }}><VerifiedOutlined style={{ color: '#1890ff' }} /> {e.speaker}</Text>
                    <Text type="secondary" style={{ fontSize: 12 }}><CalendarOutlined /> {e.date}</Text>
                    <Text type="secondary" style={{ fontSize: 12, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}><EnvironmentOutlined /> {e.location}</Text>
                    
                    <div style={{ marginTop: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                            <Text style={{ fontSize: 10, color: '#8c8c8c' }}>Enrollment</Text>
                            <Text strong style={{ fontSize: 10 }}>{e.registered}/{e.capacity}</Text>
                        </div>
                        <Progress percent={Math.round((e.registered / e.capacity) * 100)} size="small" strokeColor="#0050b3" showInfo={false} />
                    </div>
                  </Space>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Card bordered={false} style={{ background: 'linear-gradient(135deg, #001529 0%, #003a8c 100%)', borderRadius: 8, marginTop: 48, overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', right: -50, top: -50, opacity: 0.1 }}>
            <GlobalOutlined style={{ fontSize: 280, color: 'white' }} />
        </div>
        <Row align="middle" gutter={[32, 32]} style={{ padding: '40px 24px', position: 'relative', zIndex: 1 }}>
            <Col span={16}>
                <Title level={3} style={{ color: 'white', margin: 0 }}>Mở rộng Tầm ảnh hưởng Chuyên môn</Title>
                <Paragraph style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, marginTop: 16 }}>
                    Kết nối với mạng lưới 250k+ bác sĩ toàn cầu. Tổ chức các buổi CME chuyên sâu với hạ tầng 4K và hệ thống tương tác thời gian thực.
                </Paragraph>
                <Space size="middle" style={{ marginTop: 8 }}>
                    <Button size="large" style={{ borderRadius: 4, fontWeight: 700 }}>LIÊN HỆ HỢP TÁC</Button>
                    <Button size="large" ghost style={{ borderRadius: 4, fontWeight: 700 }}>XEM CHỈ SỐ MẠNG LƯỚI</Button>
                </Space>
            </Col>
            <Col span={8} style={{ textAlign: 'center' }}>
                <div style={{ color: 'white' }}>
                    <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 2 }}>Độ phủ chuyên gia</Text>
                    <div style={{ fontSize: 64, fontWeight: 900, lineHeight: 1 }}>120+</div>
                    <Text strong style={{ fontSize: 14 }}>QUỐC GIA</Text>
                </div>
            </Col>
        </Row>
      </Card>

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Sự kiện / Hội thảo" fields={EVENT_FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.title} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}