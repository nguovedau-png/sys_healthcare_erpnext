"use client";
import React, { useState } from "react";
import { Card, Space, Row, Col, Typography, Avatar, Statistic, Tag, Progress, Button, Table, message, Select } from "antd";
const { Title, Text, Paragraph } = Typography;
import { UserOutlined, SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, TeamOutlined, GlobalOutlined, SolutionOutlined, FileSearchOutlined, VerifiedOutlined, TrophyFilled, HistoryOutlined } from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

const DATA_INIT = [
  { id: 1, name: "Nguyễn Văn Hưng", position: "Bác sĩ Nội khoa", experience: "8 years", status: "Reviewing", score: 85 },
  { id: 2, name: "Trần Thị Lan", position: "Điều dưỡng trưởng", experience: "12 years", status: "Interview", score: 92 },
  { id: 3, name: "Lê Minh Tuấn", position: "Dược sĩ lâm sàng", experience: "5 years", status: "Pending", score: 78 },
];

const FIELDS: CrudField[] = [
  { name: "name", label: "Họ tên ứng viên", type: "text", placeholder: "Nguyễn Văn A", required: true, span: 2 },
  { name: "position", label: "Vị trí ứng tuyển", type: "text", placeholder: "Bác sĩ Nội khoa" },
  { name: "status", label: "Trạng thái hồ sơ", type: "select", options: [{ value: "Pending", label: "Chờ duyệt" }, { value: "Reviewing", label: "Đang xem xét" }, { value: "Interview", label: "Phỏng vấn" }, { value: "Rejected", label: "Từ chối" }] },
];

export default function ApplicantsPage() {
  const [data, setData] = useState(DATA_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now(), experience: "New", score: 0 }, ...p]); setAddOpen(false); message.success("Đã thêm hồ sơ ứng viên mới!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật hồ sơ thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xóa hồ sơ ứng viên!"); };

  const stats = [
    { label: "Tổng ứng viên", value: "128", icon: <TeamOutlined /> },
    { label: "Phỏng vấn", value: "24", color: "#0050b3" },
    { label: "Tuyển dụng", value: "08", color: "#52c41a" },
    { label: "Tỷ lệ đạt", value: "68%", color: "#faad14" }
  ];

  const columns = [
    { 
      title: <Text strong style={{ fontSize: 11 }}>ỨNG VIÊN / KINH NGHIỆM</Text>, 
      render: (_: any, r: any) => (
        <Space size={12}>
           <Avatar size={32} icon={<UserOutlined />} src={r.avatar} />
          <div>
            <Text strong style={{ fontSize: 13, display: 'block' }}>{r.name}</Text>
            <Text type="secondary" style={{ fontSize: 11 }}>{r.experience} Experience</Text>
          </div>
        </Space>
      ) 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>VỊ TRÍ ỨNG TUYỂN</Text>, 
      render: (_: any, r: any) => (
        <Space size={8}>
          <SolutionOutlined style={{ color: '#8c8c8c' }} />
          <Text style={{ fontSize: 12 }}>{r.position}</Text>
        </Space>
      ) 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>CHỈ SỐ PHÙ HỢP</Text>, 
      render: (_: any, r: any) => (
        <div style={{ width: 120 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
            <Text type="secondary" style={{ fontSize: 10 }}>Score</Text>
            <Text strong style={{ fontSize: 10 }}>{r.score}%</Text>
          </div>
          <Progress percent={r.score} size="small" strokeColor={r.score >= 80 ? "#52c41a" : "#1890ff"} showInfo={false} />
        </div>
      ) 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>, 
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.status === "Interview" ? "blue" : r.status === "Reviewing" ? "orange" : "default"} style={{ fontSize: 10, fontWeight: 700 }}>
          {r.status.toUpperCase()}
        </Tag>
      ) 
    },
    { 
      title: "", 
      render: (_: any, r: any) => (
        <Space size={8}>
          <Button type="text" size="small" icon={<FileSearchOutlined />} />
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => setEditRecord(r)} />
          <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => setDeleteRecord(r)} />
        </Space>
      ) 
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader 
        title="Talent Acquisition Hub" 
        subtitle="Quản lý hồ sơ ứng viên, quy trình tuyển dụng và đánh giá năng lực nhân sự y tế toàn diện"
        primaryAction={{
            label: "Thêm ứng viên",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
        extra={<Button icon={<HistoryOutlined />}>Lịch sử tuyển dụng</Button>}
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm ứng viên, vị trí, kỹ năng...">
        <Select placeholder="Vị trí" style={{ width: 150 }} options={[{ value: "doc", label: "Bác sĩ" }]} />
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

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Ứng viên" fields={FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.name} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}