"use client";
import React, { useState } from "react";
import { Tag, Button, Input, Select, Table, Badge, message, Tooltip, Card, Row, Col, Typography, Space, Statistic, Avatar, Divider } from "antd";
const { Title, Text, Paragraph } = Typography;
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, MedicineBoxOutlined, FileProtectOutlined, SafetyCertificateOutlined, CheckCircleFilled, WarningFilled, ThunderboltFilled, EyeOutlined, PrinterOutlined, FilterOutlined, HistoryOutlined, InteractionOutlined } from "@ant-design/icons";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";

const DATA_INIT = [
  { id: 1, patientName: "Nguyễn Văn A", patientId: "BN-001", medication: "Metformin 850mg", dosage: "1 viên/ngày", status: "Active", doctor: "BS. Nguyễn Văn A", date: "25/04/2026", risk: "Low" },
  { id: 2, patientName: "Trần Thị B", patientId: "BN-042", medication: "Amoxicillin 500mg", dosage: "2 viên/ngày", status: "Completed", doctor: "BS. Lê Thị C", date: "20/04/2026", risk: "Moderate" },
  { id: 3, patientName: "Lê Văn C", patientId: "BN-015", medication: "Amlodipine 5mg", dosage: "1 viên/sáng", status: "Active", doctor: "BS. Phạm Văn D", date: "24/04/2026", risk: "Low" },
];

const FIELDS: CrudField[] = [
  { name: "patientName", label: "Họ tên bệnh nhân", type: "text", placeholder: "Nguyễn Văn A", required: true, span: 2 },
  { name: "medication", label: "Tên thuốc & Hàm lượng", type: "text", placeholder: "Metformin 850mg", required: true },
  { name: "dosage", label: "Liều dùng", type: "text", placeholder: "1 viên/ngày" },
  { name: "doctor", label: "Bác sĩ chỉ định", type: "text", placeholder: "BS. Nguyễn Văn A" },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "Active", label: "Đang dùng" }, { value: "Completed", label: "Đã xong" }, { value: "Cancelled", label: "Đã hủy" }] },
];

export default function PrescriptionsPage() {
  const [data, setData] = useState(DATA_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now(), patientId: "BN-" + Math.floor(Math.random()*900), risk: "Low", date: new Date().toLocaleDateString('vi-VN') }, ...p]); setAddOpen(false); message.success("Đã thêm đơn thuốc mới!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật đơn thuốc thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xóa đơn thuốc!"); };

  const stats = [
    { label: "Đơn thuốc tháng", value: "1,428", icon: <FileProtectOutlined /> },
    { label: "Đang điều trị", value: "842", color: "#52c41a" },
    { label: "Cảnh báo an toàn", value: "12", color: "#faad14" },
    { label: "Tỷ lệ tuân thủ", value: "94.2%", color: "#0050b3" }
  ];

  const columns = [
    { 
      title: <Text strong style={{ fontSize: 11 }}>BỆNH NHÂN / ID</Text>, 
      render: (_: any, r: any) => (
        <Space size={12}>
          <Avatar size="small" style={{ backgroundColor: '#f0f5ff', color: '#0050b3', fontWeight: 700 }}>{r.patientName[0]}</Avatar>
          <div>
            <Text strong style={{ fontSize: 13, display: 'block' }}>{r.patientName}</Text>
            <Text type="secondary" style={{ fontSize: 11 }}>{r.patientId}</Text>
          </div>
        </Space>
      ) 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>ĐƠN THUỐC & LIỀU DÙNG</Text>, 
      render: (_: any, r: any) => (
        <div>
          <Text strong style={{ fontSize: 13, display: 'block' }}>{r.medication}</Text>
          <Text type="secondary" style={{ fontSize: 11 }}>{r.dosage}</Text>
        </div>
      ) 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>BÁC SĨ & NGÀY</Text>, 
      render: (_: any, r: any) => (
        <div>
          <Text strong style={{ fontSize: 12, display: 'block' }}>{r.doctor}</Text>
          <Text type="secondary" style={{ fontSize: 11 }}>{r.date}</Text>
        </div>
      ) 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>AN TOÀN</Text>, 
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.risk === "Low" ? "green" : "orange"} style={{ fontSize: 10, fontWeight: 700 }}>
          {r.risk.toUpperCase()} RISK
        </Tag>
      ) 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>, 
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.status === "Active" ? "blue" : "default"} style={{ fontSize: 10, fontWeight: 700 }}>
          {r.status.toUpperCase()}
        </Tag>
      ) 
    },
    { 
      title: "", 
      render: (_: any, r: any) => (
        <Space size={8}>
          <Button type="text" size="small" icon={<PrinterOutlined />} />
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => setEditRecord(r)} />
          <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => setDeleteRecord(r)} />
        </Space>
      ) 
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader 
        title="Electronic Prescriptions (eRx)" 
        subtitle="Hệ thống quản lý đơn thuốc điện tử, theo dõi tuân thủ điều trị và lịch sử dược lý bệnh nhân"
        primaryAction={{
            label: "Kê đơn mới",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
        extra={<Button icon={<HistoryOutlined />}>Lịch sử kê đơn</Button>}
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm đơn thuốc, bệnh nhân, thuốc...">
        <Select placeholder="Loại thuốc" style={{ width: 150 }} options={[{ value: "antibiotic", label: "Kháng sinh" }]} />
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

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Đơn thuốc" fields={FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.medication} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}