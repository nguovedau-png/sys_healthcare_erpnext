"use client";
import { Card, Space, Row, Col, Typography, Avatar, Statistic, Tag, Progress, Button, message, Table, Select } from "antd";
const { Title, Text, Paragraph } = Typography;
import { GlobalOutlined, SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, ReadOutlined, EyeOutlined, ShareAltOutlined } from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";
import { useState } from "react";

const DATA_INIT = [{"id":1,"title":"WHO cập nhật hướng dẫn điều trị COVID-19","source":"WHO Official","status":"Active"},{"id":2,"title":"Phát hiện mới về vaccine cúm 2024","source":"CDC","status":"Active"}];

const FIELDS: CrudField[] = [
  { name: "title", label: "Tiêu đề tin tức", type: "text", placeholder: "Nhập Tiêu đề tin tức...", required: true, span: 2 },
  { name: "source", label: "Nguồn", type: "text", placeholder: "Nhập Nguồn..." },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "Active", label: "Hoạt động" }, { value: "Inactive", label: "Không hoạt động" }] },
];

export default function Page() {
  const [data, setData] = useState(DATA_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now() }, ...p]); setAddOpen(false); message.success("Đã thêm Tin tức mới!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật Tin tức thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xoá Tin tức!"); };

  const stats = [
    { label: "Tổng tin tức", value: "2,840", icon: <ReadOutlined /> },
    { label: "Tin nổi bật", value: "15", color: "#0050b3" },
    { label: "Lượt xem/ngày", value: "45.2k", color: "#52c41a" },
    { label: "Chia sẻ", value: "1.2k", color: "#faad14" }
  ];

  const columns = [
    {
      title: <Text strong style={{ fontSize: 11 }}>TIÊU ĐỀ TIN TỨC / NGUỒN</Text>,
      render: (_: any, r: any) => (
        <Space size={12}>
           <div style={{ width: 32, height: 32, borderRadius: 4, background: '#e6f7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1890ff' }}>
            <ReadOutlined />
          </div>
          <div>
            <Text strong style={{ fontSize: 13, display: 'block' }}>{r.title}</Text>
            <Text type="secondary" style={{ fontSize: 11 }}>{r.source}</Text>
          </div>
        </Space>
      ),
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
        title="Health News & Media" 
        subtitle="Quản lý tin tức y tế, thông cáo sức khỏe và hệ thống phát tán thông tin y tế chính xác"
        primaryAction={{
            label: "Thêm tin tức",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm kiếm tin tức, nguồn..." />

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

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Tin tức" fields={FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.title} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}