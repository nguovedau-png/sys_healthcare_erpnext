"use client";
import { Card, Space, Row, Col, Typography, Avatar, Statistic, Tag, Progress, Button, message, Table } from "antd";
const { Title, Text, Paragraph } = Typography;
import { UserOutlined, SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, TeamOutlined, GlobalOutlined } from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";
import { useState } from "react";

const DATA_INIT = [{"id":1,"name":"Dr. Nguyễn Văn A","specialty":"Tim mạch","status":"Active"},{"id":2,"name":"Dr. Trần Thị B","specialty":"Nội tổng quát","status":"Active"}];

const FIELDS: CrudField[] = [
  { name: "name", label: "Tên chuyên gia", type: "text", placeholder: "Nhập Tên chuyên gia...", required: true, span: 2 },
  { name: "specialty", label: "Chuyên khoa", type: "text", placeholder: "Nhập Chuyên khoa..." },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "Active", label: "Hoạt động" }, { value: "Inactive", label: "Không hoạt động" }] },
];

export default function Page() {
  const [data, setData] = useState(DATA_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now() }, ...p]); setAddOpen(false); message.success("Đã thêm Chuyên gia mới!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật Chuyên gia thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xoá Chuyên gia!"); };

  const stats = [
    { label: "Tổng chuyên gia", value: "1,248", icon: <TeamOutlined /> },
    { label: "Mạng lưới vùng", value: "15", color: "#0050b3" },
    { label: "Kết nối quốc tế", value: "240", color: "#52c41a" },
    { label: "Tư vấn/tháng", value: "3.2k", color: "#faad14" }
  ];

  const columns = [
    {
      title: <Text strong style={{ fontSize: 11 }}>TÊN CHUYÊN GIA / DANH HIỆU</Text>,
      render: (_: any, r: any) => (
        <Space size={12}>
           <Avatar size={32} icon={<UserOutlined />} />
          <Text strong style={{ fontSize: 13 }}>{r.name}</Text>
        </Space>
      ),
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>CHUYÊN KHOA</Text>, 
      render: (_: any, r: any) => (
        <Space size={8}>
          <GlobalOutlined style={{ color: '#8c8c8c' }} />
          <Text style={{ fontSize: 12 }}>{r.specialty}</Text>
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
        title="Professional Network & Credentials" 
        subtitle="Mạng lưới chuyên gia y tế, hồ sơ năng lực và hệ thống kết nối bác sĩ toàn cầu"
        primaryAction={{
            label: "Thêm chuyên gia",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm kiếm chuyên gia, chuyên khoa..." />

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

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Chuyên gia" fields={FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.name} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}
