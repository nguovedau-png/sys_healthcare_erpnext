"use client";
import React, { useState } from "react";
import { Tag, Button, Input, Select, Table, Badge, message, Tooltip, Card, Row, Col, Typography, Space, Statistic } from "antd";
const { Title, Text, Paragraph } = Typography;
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, FileProtectOutlined, FilterOutlined, SafetyCertificateOutlined, HistoryOutlined, LockOutlined } from "@ant-design/icons";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";

const FIELDS: CrudField[] = [
  { name: "patientName", label: "Tên bệnh nhân", type: "text", placeholder: "Nhập Tên bệnh nhân...", required: true, span: 2 },
  { name: "diagnosis", label: "Chẩn đoán", type: "text", placeholder: "Nhập Chẩn đoán..." },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "Active", label: "Hoạt động" }, { value: "Inactive", label: "Không hoạt động" }] },
];

const DATA_INIT = [
  { id: 1, patientName: "Nguyễn Văn A", patientId: "BN-4281", diagnosis: "Đái tháo đường Type 2", status: "Active", lastUpdate: "10:30 Hôm nay" },
  { id: 2, patientName: "Trần Thị B", patientId: "BN-9902", diagnosis: "Tăng huyết áp", status: "Active", lastUpdate: "09:15 Hôm nay" },
  { id: 3, patientName: "Lê Văn C", patientId: "BN-1105", diagnosis: "Viêm dạ dày cấp", status: "Inactive", lastUpdate: "Hôm qua" },
];

export default function EMRPage() {
  const [data, setData] = useState(DATA_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now() }, ...p]); setAddOpen(false); message.success("Đã thêm Hồ sơ EMR mới!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật Hồ sơ EMR thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xóa Hồ sơ EMR!"); };

  const stats = [
    { label: "Tổng hồ sơ EMR", value: "12,450", icon: <FileProtectOutlined /> },
    { label: "Hồ sơ tháng này", value: "1,284", color: "#0050b3" },
    { label: "Truy cập hôm nay", value: "856", color: "#52c41a" },
    { label: "Bác sĩ trực tuyến", value: "42" }
  ];

  const columns = [
    {
      title: <Text strong style={{ fontSize: 11 }}>BỆNH NHÂN / MÃ BN</Text>,
      render: (_: any, r: any) => (
        <Space size={12}>
          <div style={{ width: 32, height: 32, borderRadius: 4, background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0050b3' }}>
            <FileProtectOutlined />
          </div>
          <div>
            <Text strong style={{ fontSize: 13, display: 'block' }}>{r.patientName}</Text>
            <Text type="secondary" style={{ fontSize: 11 }}>{r.patientId}</Text>
          </div>
        </Space>
      ),
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>CHẨN ĐOÁN CHÍNH</Text>, 
      render: (_: any, r: any) => <Text style={{ fontSize: 12, fontWeight: 600 }}>{r.diagnosis}</Text> 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>, 
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.status === "Active" ? "green" : "default"} style={{ fontSize: 10, fontWeight: 700 }}>
          {r.status?.toUpperCase() || "INACTIVE"}
        </Tag>
      ) 
    },
    { title: <Text strong style={{ fontSize: 11 }}>CẬP NHẬT</Text>, render: (_: any, r: any) => <Text style={{ fontSize: 11, color: '#8c8c8c' }}>{r.lastUpdate}</Text> },
    {
      title: "",
      render: (_: any, r: any) => (
        <Space size={8}>
          <Button type="text" size="small" icon={<HistoryOutlined />} />
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => setEditRecord(r)} />
          <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => setDeleteRecord(r)} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader 
        title="Electronic Medical Records (EMR)" 
        subtitle="Quản lý hồ sơ bệnh án điện tử tập trung, lịch sử lâm sàng và tài liệu y khoa số hóa"
        primaryAction={{
            label: "Tạo hồ sơ",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
        extra={<Button icon={<SafetyCertificateOutlined />}>Bảo mật & Phân quyền</Button>}
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm hồ sơ bệnh án, mã BN, chẩn đoán...">
        <Select placeholder="Trạng thái" style={{ width: 150 }} options={[{ value: "all", label: "Tất cả" }, { value: "Active", label: "Hoạt động" }]} />
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

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Hồ sơ EMR" fields={FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.patientName} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}