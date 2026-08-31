"use client";
import { Card, Space, Row, Col, Typography, Avatar, Statistic, Tag, Progress, Button, message, Table, Select } from "antd";
const { Title, Text, Paragraph } = Typography;
import { VideoCameraOutlined, SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, PlayCircleOutlined, UserOutlined, TeamOutlined } from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";
import { useState } from "react";

const DATA_INIT = [{ "id": 1, "title": "Hội chẩn Tim mạch trực tiếp", "host": "Dr. Nguyễn Tấn Tới", "status": "Active" }, { "id": 2, "title": "Webinar Nhi khoa", "host": "Dr. Lê Hoàng Nam", "status": "Inactive" }];

const FIELDS: CrudField[] = [
  { name: "title", label: "Tiêu đề buổi live", type: "text", placeholder: "Nhập Tiêu đề buổi live...", required: true, span: 2 },
  { name: "host", label: "Chủ trì", type: "text", placeholder: "Nhập Chủ trì..." },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "Active", label: "Hoạt động" }, { value: "Inactive", label: "Không hoạt động" }] },
];

export default function Page() {
  const [data, setData] = useState(DATA_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now() }, ...p]); setAddOpen(false); message.success("Đã thêm Buổi Live mới!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật Buổi Live thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xoá Buổi Live!"); };

  const stats = [
    { label: "Buổi live dự kiến", value: "12", icon: <VideoCameraOutlined /> },
    { label: "Người xem trung bình", value: "250", color: "#0050b3" },
    { label: "Giờ phát", value: "48", color: "#52c41a" },
    { label: "Tương tác", value: "1.5k", color: "#faad14" }
  ];

  const columns = [
    {
      title: <Text strong style={{ fontSize: 11 }}>TIÊU ĐỀ BUỔI LIVE</Text>,
      render: (_: any, r: any) => (
        <Space size={12}>
          <div style={{ width: 32, height: 32, borderRadius: 4, background: '#fff1f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff4d4f' }}>
            <PlayCircleOutlined />
          </div>
          <Text strong style={{ fontSize: 13 }}>{r.title}</Text>
        </Space>
      ),
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>CHỦ TRÌ</Text>,
      render: (_: any, r: any) => (
        <Space size={8}>
          <UserOutlined style={{ color: '#8c8c8c' }} />
          <Text style={{ fontSize: 12 }}>{r.host}</Text>
        </Space>
      )
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>,
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.status === "Active" ? "green" : "default"} style={{ fontSize: 10, fontWeight: 700 }}>
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
        title="Live & Broadcast Management"
        subtitle="Quản lý buổi phát trực tiếp y khoa, hội chẩn từ xa và hệ thống streaming chuyên nghiệp"
        primaryAction={{
          label: "Thêm buổi live",
          icon: <PlusOutlined />,
          onClick: () => setAddOpen(true)
        }}
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm kiếm buổi live, chủ trì..." />

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

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Buổi Live" fields={FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.title} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}