"use client";
import React, { useState } from "react";
import { Tag, Button, Input, Select, Table, Badge, Progress, message, Tooltip, Card, Row, Col, Typography, Space, Statistic, Avatar, Divider } from "antd";
const { Title, Text, Paragraph } = Typography;
import { MedicineBoxOutlined, SearchOutlined, FilterOutlined, PlusOutlined, EditOutlined, DeleteOutlined, HomeOutlined, InteractionOutlined, DashboardOutlined, TeamOutlined, GlobalOutlined, ThunderboltFilled, SafetyCertificateFilled, EnvironmentFilled, InfoCircleFilled } from "@ant-design/icons";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";

const BEDS_INIT = [
  { id: 1, bedNo: "A-101", ward: "Khoa Nội tổng quát", patient: "Nguyễn Văn A", admitDate: "20/04/2024", diagnosis: "Đái tháo đường Type 2", status: "Occupied" },
  { id: 2, bedNo: "B-205", ward: "Khoa Tim mạch", patient: "", admitDate: "", diagnosis: "", status: "Available" },
  { id: 3, bedNo: "C-312", ward: "Khoa Nhi", patient: "Trần Thị B", admitDate: "22/04/2024", diagnosis: "Viêm phổi cấp", status: "Occupied" },
  { id: 4, bedNo: "D-418", ward: "Khoa Ngoại", patient: "", admitDate: "", diagnosis: "", status: "Maintenance" },
];

const BED_FIELDS: CrudField[] = [
  { name: "bedNo", label: "Số giường", type: "text", placeholder: "A-101", required: true },
  { name: "ward", label: "Khoa", type: "select", required: true, options: [{ value: "Khoa Nội tổng quát", label: "Khoa Nội" }, { value: "Khoa Tim mạch", label: "Tim mạch" }, { value: "Khoa Nhi", label: "Nhi" }, { value: "Khoa Ngoại", label: "Ngoại" }, { value: "Khoa ICU", label: "ICU" }] },
  { name: "patient", label: "Tên bệnh nhân (nếu có)", type: "text", placeholder: "Nguyễn Văn A", span: 2 },
  { name: "admitDate", label: "Ngày nhập viện", type: "text", placeholder: "20/04/2024" },
  { name: "diagnosis", label: "Chẩn đoán", type: "text", placeholder: "Đái tháo đường Type 2" },
  { name: "status", label: "Trạng thái giường", type: "select", required: true, options: [{ value: "Occupied", label: "Đang sử dụng" }, { value: "Available", label: "Trống" }, { value: "Maintenance", label: "Bảo trì" }] },
];

export default function BedsPage() {
  const [data, setData] = useState(BEDS_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now() }, ...p]); setAddOpen(false); message.success("Đã thêm giường bệnh!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xóa giường bệnh!"); };

  const occupied = data.filter((d) => d.status === "Occupied").length;

  const stats = [
    { label: "Tổng giường", value: data.length, icon: <HomeOutlined /> },
    { label: "Đang sử dụng", value: occupied, color: "#f5222d" },
    { label: "Giường trống", value: data.length - occupied, color: "#52c41a" },
    { label: "Tỷ lệ lấp đầy", value: Math.round((occupied / data.length) * 100) + "%", color: "#faad14" }
  ];

  const columns = [
    {
      title: <Text strong style={{ fontSize: 11 }}>GIƯỜNG / KHOA</Text>,
      render: (_: any, r: any) => (
        <Space size={12}>
          <div style={{ 
            width: 32, height: 32, borderRadius: 4, 
            background: r.status === 'Occupied' ? '#fff1f0' : r.status === 'Available' ? '#f6ffed' : '#f5f5f5',
            border: `1px solid ${r.status === 'Occupied' ? '#ffa39e' : r.status === 'Available' ? '#b7eb8f' : '#d9d9d9'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            color: r.status === 'Occupied' ? '#cf1322' : r.status === 'Available' ? '#389e0d' : '#8c8c8c',
            fontWeight: 700, fontSize: 12
          }}>
            {r.bedNo}
          </div>
          <div>
            <Text strong style={{ fontSize: 13, display: 'block' }}>{r.ward}</Text>
            <Text type="secondary" style={{ fontSize: 11 }}>FLOOR 0{r.bedNo[0]}</Text>
          </div>
        </Space>
      ),
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>BỆNH NHÂN</Text>, 
      render: (_: any, r: any) => r.patient ? (
        <Space size={8}>
          <Avatar size="small" icon={<TeamOutlined />} style={{ backgroundColor: '#f0f5ff', color: '#0050b3' }} />
          <Text style={{ fontSize: 13, fontWeight: 600 }}>{r.patient}</Text>
        </Space>
      ) : <Text type="secondary" style={{ fontSize: 12 }}>—</Text>
    },
    { title: <Text strong style={{ fontSize: 11 }}>CHẨN ĐOÁN</Text>, render: (_: any, r: any) => <Text style={{ fontSize: 12 }}>{r.diagnosis || "—"}</Text> },
    { 
      title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>, 
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.status === "Occupied" ? "red" : r.status === "Available" ? "green" : "default"} style={{ fontSize: 10, fontWeight: 700 }}>
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
        title="Quản lý Giường bệnh & Nội trú" 
        subtitle="Theo dõi tình trạng giường bệnh thời gian thực, điều phối nhập viện và tối ưu công suất"
        primaryAction={{
            label: "Thêm giường",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
        extra={<Button icon={<EnvironmentFilled />}>Sơ đồ tầng</Button>}
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm số giường, khoa, bệnh nhân...">
        <Select placeholder="Khoa phòng" style={{ width: 150 }} options={[{ value: "all", label: "Tất cả" }]} />
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

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Giường bệnh" fields={BED_FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.bedNo} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}