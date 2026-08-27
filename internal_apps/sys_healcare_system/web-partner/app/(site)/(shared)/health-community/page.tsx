"use client";
import { Card, Space, Row, Col, Typography, Avatar, Statistic, Tag, Progress, Button, List, message, Select } from "antd";
const { Title, Text, Paragraph } = Typography;
import { TeamOutlined, SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, MessageOutlined, GlobalOutlined, FireFilled, ThunderboltFilled, StarFilled, EyeOutlined, LikeOutlined, HistoryOutlined } from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";
import { useState } from "react";

const TOPICS_INIT = [
  { id: 1, title: "Kinh nghiệm sống chung với bệnh tiểu đường type 2", author: "Nguyễn Văn A", category: "Tiểu đường", replies: 48, likes: 124, views: 2840, status: "Active" },
  { id: 2, title: "Hỏi về chế độ ăn sau phẫu thuật dạ dày", author: "Trần Thị B", category: "Dinh dưỡng", replies: 22, likes: 56, views: 1200, status: "Active" },
  { id: 3, title: "Trao đổi phác đồ điều trị tăng huyết áp mới nhất", author: "BS. Lê Văn C", category: "Tim mạch", replies: 35, likes: 89, views: 3100, status: "Pinned" },
];

const TOPIC_FIELDS: CrudField[] = [
  { name: "title", label: "Tiêu đề chủ đề", type: "text", placeholder: "Kinh nghiệm sống chung với...", required: true, span: 2 },
  { name: "author", label: "Tác giả", type: "text", placeholder: "Nguyễn Văn A", required: true },
  { name: "category", label: "Chuyên mục", type: "select", required: true, options: [{ value: "Tiểu đường", label: "Tiểu đường" }, { value: "Tim mạch", label: "Tim mạch" }, { value: "Dinh dưỡng", label: "Dinh dưỡng" }, { value: "Ung thư", label: "Ung thư" }] },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "Active", label: "Đang hoạt động" }, { value: "Pinned", label: "Được ghim" }, { value: "Closed", label: "Đã đóng" }] },
];

export default function HealthCommunityPage() {
  const [data, setData] = useState(TOPICS_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now(), replies: 0, likes: 0, views: 0 }, ...p]); setAddOpen(false); message.success("Đã tạo chủ đề mới!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xóa chủ đề!"); };

  const stats = [
    { label: "Thành viên", value: "24.5k", icon: <TeamOutlined /> },
    { label: "Chủ đề", value: "1,284", color: "#0050b3" },
    { label: "Bài đăng hôm nay", value: "128", color: "#ff4d4f" },
    { label: "Đang online", value: "342", color: "#faad14" }
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader 
        title="Healthcare Community Forum" 
        subtitle="Nền tảng kết nối bệnh nhân, người nhà và bác sĩ trong một cộng đồng y tế đáng tin cậy"
        primaryAction={{
            label: "Tạo chủ đề",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
        extra={<Button icon={<MessageOutlined />}>Kiểm duyệt</Button>}
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm chủ đề, tác giả...">
        <Select placeholder="Chuyên mục" style={{ width: 150 }} options={[{ value: "all", label: "Tất cả" }]} />
      </EhrFilterBar>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {data.map((t) => (
          <Card key={t.id} className="ehr-card" bodyStyle={{ padding: 16 }}>
            <Row gutter={16} align="middle">
              <Col flex="64px">
                <Avatar size={48} style={{ background: '#f0f5ff', color: '#0050b3' }}>{t.author[0]}</Avatar>
              </Col>
              <Col flex="auto">
                <Space direction="vertical" size={2}>
                  <Space size={8}>
                    {t.status === "Pinned" && <Tag bordered={false} color="orange" icon={<StarFilled />} style={{ fontSize: 10 }}>PINNED</Tag>}
                    <Tag bordered={false} color="blue" style={{ fontSize: 10 }}>{t.category.toUpperCase()}</Tag>
                    <Text type="secondary" style={{ fontSize: 11 }}>by {t.author} • 2 hours ago</Text>
                  </Space>
                  <Text strong style={{ fontSize: 14, color: '#001529' }}>{t.title}</Text>
                  <Space size={16} style={{ marginTop: 4 }}>
                    <Space size={4}><MessageOutlined style={{ color: '#8c8c8c' }} /><Text type="secondary" style={{ fontSize: 11 }}>{t.replies}</Text></Space>
                    <Space size={4}><LikeOutlined style={{ color: '#8c8c8c' }} /><Text type="secondary" style={{ fontSize: 11 }}>{t.likes}</Text></Space>
                    <Space size={4}><EyeOutlined style={{ color: '#8c8c8c' }} /><Text type="secondary" style={{ fontSize: 11 }}>{t.views >= 1000 ? `${(t.views/1000).toFixed(1)}k` : t.views}</Text></Space>
                  </Space>
                </Space>
              </Col>
              <Col>
                <Space size={8}>
                  <Button type="text" size="small" icon={<EditOutlined />} onClick={() => setEditRecord(t)} />
                  <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => setDeleteRecord(t)} />
                </Space>
              </Col>
            </Row>
          </Card>
        ))}
      </div>

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Chủ đề cộng đồng" fields={TOPIC_FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.title} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}