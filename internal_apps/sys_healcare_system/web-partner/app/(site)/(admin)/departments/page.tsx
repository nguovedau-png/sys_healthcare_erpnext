"use client";
import React, { useState } from "react";
import { Tag, Button, Input, Select, Divider, Avatar, Progress, message, Tooltip, Card, Row, Col, Typography, Space, Statistic } from "antd";
const { Title, Text, Paragraph } = Typography;
import { SearchOutlined, FilterOutlined, PlusOutlined, ArrowRightOutlined, VerifiedOutlined, InteractionOutlined, EditOutlined, DeleteOutlined, HomeOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";

const DEPT_FIELDS: CrudField[] = [
  { name: "name", label: "Tên khoa / phòng", type: "text", placeholder: "Nhập tên khoa", required: true, span: 2 },
  { name: "head", label: "Trưởng khoa / phòng", type: "text", placeholder: "BS. Nguyễn Văn A", required: true },
  { name: "staff", label: "Nhân sự", type: "number", placeholder: "45" },
];

const DEPTS_INIT = [
  { id: 1, name: "Khoa Nội tổng quát", head: "BS. CKII Nguyễn Văn A", staff: 45, beds: 120, occupancy: 85, color: "blue" },
  { id: 2, name: "Khoa Ngoại chấn thương", head: "BS. CKI Trần Thị B", staff: 32, beds: 80, occupancy: 92, color: "rose" },
  { id: 3, name: "Khoa Nhi & Sơ sinh", head: "ThS. BS Lê Văn C", staff: 28, beds: 50, occupancy: 60, color: "emerald" },
];

export default function DepartmentsPage() {
  const [data, setData] = useState(DEPTS_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now() }, ...p]); setAddOpen(false); message.success("Đã thêm khoa mới!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xóa khoa!"); };

  const stats = [
    { label: "Tổng số khoa", value: "18", icon: <HomeOutlined /> },
    { label: "Tỷ lệ lấp đầy TB", value: "78%", color: "#0050b3" },
    { label: "Nhân sự trực tuyến", value: "142", color: "#52c41a" },
    { label: "Phòng chức năng", value: "24" }
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader 
        title="Cấu trúc Tổ chức Khoa/Phòng" 
        subtitle="Quản lý hệ thống chuyên môn, hạ tầng giường bệnh và điều phối nhân sự tập trung"
        primaryAction={{
            label: "Thêm khoa mới",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
        extra={<Button icon={<InteractionOutlined />}>Sơ đồ tổ chức</Button>}
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm khoa phòng, trưởng khoa hoặc mã số...">
        <Select placeholder="Phân loại" style={{ width: 150 }} options={[{ value: "clinical", label: "Lâm sàng" }, { value: "lab", label: "Cận lâm sàng" }]} />
      </EhrFilterBar>

      <Row gutter={[16, 16]}>
        {data.map((d) => (
          <Col key={d.id} xs={24} md={12} xl={8}>
            <Card hoverable className="ehr-card" bodyStyle={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ width: 40, height: 40, borderRadius: 4, background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0050b3' }}>
                    <HomeOutlined />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#001529' }}>{d.name}</div>
                  <div style={{ fontSize: 11, color: '#8c8c8c', fontWeight: 600 }}>{d.head.toUpperCase()}</div>
                </div>
                <Space>
                  <Button type="text" size="small" icon={<EditOutlined />} onClick={() => setEditRecord(d)} />
                  <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => setDeleteRecord(d)} />
                </Space>
              </div>
              
              <Row gutter={16}>
                <Col span={8}>
                    <Text type="secondary" style={{ fontSize: 10, fontWeight: 700, display: 'block' }}>NHÂN SỰ</Text>
                    <Text strong style={{ fontSize: 18 }}>{d.staff}</Text>
                </Col>
                <Col span={8}>
                    <Text type="secondary" style={{ fontSize: 10, fontWeight: 700, display: 'block' }}>GIƯỜNG</Text>
                    <Text strong style={{ fontSize: 18 }}>{d.beds}</Text>
                </Col>
                <Col span={8}>
                    <Text type="secondary" style={{ fontSize: 10, fontWeight: 700, display: 'block' }}>LẤP ĐẦY</Text>
                    <Text strong style={{ fontSize: 18, color: d.occupancy > 80 ? '#f5222d' : '#52c41a' }}>{d.occupancy}%</Text>
                </Col>
              </Row>
              <Progress percent={d.occupancy} showInfo={false} strokeColor={d.occupancy > 80 ? "#f5222d" : "#0050b3"} strokeWidth={6} style={{ marginTop: 12 }} />
            </Card>
          </Col>
        ))}
      </Row>

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Khoa/Phòng" fields={DEPT_FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.name} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}