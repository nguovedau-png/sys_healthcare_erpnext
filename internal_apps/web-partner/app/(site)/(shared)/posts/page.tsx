"use client";
import React, { useState } from "react";
import { Card, Space, Row, Col, Typography, Avatar, Statistic, Tag, Progress, Button, List, message, Select, Table } from "antd";
const { Title, Text, Paragraph } = Typography;
import { FileTextOutlined, SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, LikeFilled, ThunderboltFilled, UserOutlined, ClockCircleOutlined, LikeOutlined } from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

const POSTS_INIT = [
  { id: 1, title: "10 thói quen giúp kiểm soát đường huyết hiệu quả", author: "BS. Nguyễn Văn A", category: "Sức khỏe tiểu đường", views: 12400, likes: 824, status: "Published", date: "25/04/2024" },
  { id: 2, title: "Tầm quan trọng của việc tiêm vaccine cho trẻ em", author: "BS. Trần Thị B", category: "Nhi khoa", views: 8900, likes: 612, status: "Published", date: "20/04/2024" },
  { id: 3, title: "Hướng dẫn chăm sóc vết thương hậu phẫu tại nhà", author: "BS. Lê Văn C", category: "Phẫu thuật", views: 5200, likes: 310, status: "Draft", date: "18/04/2024" },
];

const POST_FIELDS: CrudField[] = [
  { name: "title", label: "Tiêu đề bài viết", type: "text", placeholder: "Nhập tiêu đề...", required: true, span: 2 },
  { name: "author", label: "Tác giả", type: "text", placeholder: "BS. Nguyễn Văn A", required: true },
  { name: "category", label: "Chuyên mục", type: "select", required: true, options: [{ value: "Sức khỏe tiểu đường", label: "Sức khỏe tiểu đường" }, { value: "Nhi khoa", label: "Nhi khoa" }, { value: "Phẫu thuật", label: "Phẫu thuật" }, { value: "Tim mạch", label: "Tim mạch" }, { value: "Dinh dưỡng", label: "Dinh dưỡng" }] },
  { name: "date", label: "Ngày đăng", type: "text", placeholder: "25/04/2024" },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "Published", label: "Đã đăng" }, { value: "Draft", label: "Bản nháp" }, { value: "Archived", label: "Lưu trữ" }] },
];

export default function PostsPage() {
  const [data, setData] = useState(POSTS_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now(), views: 0, likes: 0 }, ...p]); setAddOpen(false); message.success("Đã tạo bài viết mới!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật bài viết thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xoá bài viết!"); };

  const stats = [
    { label: "Bài viết đã đăng", value: "284", icon: <FileTextOutlined /> },
    { label: "Lượt xem/tháng", value: "1.2M", color: "#0050b3" },
    { label: "Tương tác", value: "48.2k", color: "#52c41a" },
    { label: "Bản nháp", value: "12", color: "#faad14" }
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader 
        title="Health Knowledge & Content Hub" 
        subtitle="Quản lý nội dung giáo dục sức khỏe, bài viết chuyên khoa và hệ thống phân phối tri thức y tế"
        primaryAction={{
            label: "Viết bài mới",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
        extra={<Button icon={<EyeOutlined />}>Phân tích</Button>}
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm bài viết, tác giả, chuyên mục...">
        <Select placeholder="Chuyên mục" style={{ width: 150 }} options={[{ value: "diabetes", label: "Tiểu đường" }]} />
      </EhrFilterBar>

      <Row gutter={[16, 16]}>
        {data.map((p) => (
          <Col key={p.id} xs={24} md={12} lg={8}>
            <Card className="ehr-card" bodyStyle={{ padding: 16, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Space direction="vertical" size={12} style={{ width: '100%', flex: 1 }}>
                    <Space size={8}>
                        <Tag bordered={false} color="blue" style={{ fontSize: 10 }}>{p.category.toUpperCase()}</Tag>
                        <Tag bordered={false} color={p.status === "Published" ? "green" : "orange"} style={{ fontSize: 10 }}>{p.status.toUpperCase()}</Tag>
                    </Space>
                    <Text strong style={{ fontSize: 14, color: '#001529', display: 'block', height: 40, overflow: 'hidden' }}>{p.title}</Text>
                    <Space size={8}>
                        <Avatar size={24} icon={<UserOutlined />} />
                        <div>
                            <Text strong style={{ fontSize: 11, display: 'block' }}>{p.author}</Text>
                            <Text type="secondary" style={{ fontSize: 10 }}>{p.date}</Text>
                        </div>
                    </Space>
                </Space>
                <div style={{ borderTop: '1px solid #f0f0f0', marginTop: 12, paddingTop: 12, display: 'flex', justifyContent: 'space-between' }}>
                    <Space size={16}>
                        <Space size={4}><EyeOutlined style={{ color: '#8c8c8c' }} /><Text type="secondary" style={{ fontSize: 11 }}>{p.views.toLocaleString()}</Text></Space>
                        <Space size={4}><LikeOutlined style={{ color: '#8c8c8c' }} /><Text type="secondary" style={{ fontSize: 11 }}>{p.likes.toLocaleString()}</Text></Space>
                    </Space>
                    <Space size={4}>
                        <Button type="text" size="small" icon={<EditOutlined />} onClick={() => setEditRecord(p)} />
                        <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => setDeleteRecord(p)} />
                    </Space>
                </div>
            </Card>
          </Col>
        ))}
      </Row>

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Bài viết sức khỏe" fields={POST_FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.title} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}