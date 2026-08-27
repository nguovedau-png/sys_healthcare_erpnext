"use client";
import React, { useState } from "react";
import { Tag, Button, Input, Select, Table, message, Tooltip, Progress, Card, Space, Typography } from "antd";
const { Text } = Typography;
import { MedicineBoxOutlined, SearchOutlined, FilterOutlined, PlusOutlined, InteractionOutlined, EditOutlined, DeleteOutlined, MedicineBoxFilled, DollarCircleFilled, ThunderboltFilled, SafetyCertificateFilled, AppstoreFilled, FireFilled } from "@ant-design/icons";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";

const SERVICES_INIT = [
  { id: 1, name: "Khám Nội tổng quát", code: "SRV-INT-001", category: "CLINICAL CARE", price: 450000, insurance: true, popularity: "HIGH", status: "ACTIVE" },
  { id: 2, name: "Xét nghiệm máu (HbA1c)", code: "SRV-LAB-428", category: "DIAGNOSTICS", price: 1200000, insurance: true, popularity: "NORMAL", status: "ACTIVE" },
  { id: 3, name: "Nội soi dạ dày gây mê", code: "SRV-END-990", category: "IMAGING", price: 3500000, insurance: false, popularity: "HOT", status: "ACTIVE" },
];

const SVC_FIELDS: CrudField[] = [
  { name: "name", label: "Tên dịch vụ", type: "text", placeholder: "Khám Nội tổng quát", required: true, span: 2 },
  { name: "code", label: "Mã dịch vụ", type: "text", placeholder: "SRV-INT-001", required: true },
  { name: "category", label: "Phân loại", type: "select", required: true, options: [{ value: "CLINICAL CARE", label: "Clinical Care" }, { value: "DIAGNOSTICS", label: "Diagnostics" }, { value: "IMAGING", label: "Imaging" }, { value: "SURGERY", label: "Surgery" }] },
  { name: "price", label: "Đơn giá (₫)", type: "price", placeholder: "450000", required: true },
  { name: "insurance", label: "Hỗ trợ bảo hiểm", type: "switch" },
  { name: "popularity", label: "Mức phổ biến", type: "select", options: [{ value: "HOT", label: "🔥 HOT" }, { value: "HIGH", label: "HIGH" }, { value: "NORMAL", label: "Normal" }] },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "ACTIVE", label: "Đang hoạt động" }, { value: "INACTIVE", label: "Ngưng" }] },
];

export default function ServicesPage() {
  const [data, setData] = useState(SERVICES_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now() }, ...p]); setAddOpen(false); message.success("Đã thêm dịch vụ mới!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r: any) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật dịch vụ thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r: any) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xoá dịch vụ!"); };

  const stats = [
    { label: "Tổng dịch vụ", value: "124", icon: <MedicineBoxFilled /> },
    { label: "Hỗ trợ BHYT", value: "82", color: "#059669" },
    { label: "Lượt khám tháng", value: "4.2k", color: "#4f46e5" },
    { label: "Doanh thu TB", value: "1.2M", color: "#d97706" },
  ];

  const columns = [
    {
      title: <Text strong style={{ fontSize: 11 }}>DỊCH VỤ</Text>,
      render: (_: any, r: any) => (
        <Space size={12}>
          <div style={{ width: 32, height: 32, borderRadius: 4, background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0050b3' }}>
            <MedicineBoxFilled />
          </div>
          <div>
            <Text strong style={{ fontSize: 13, display: 'block' }}>{r.name}</Text>
            <Text type="secondary" style={{ fontSize: 11 }}>{r.code}</Text>
          </div>
        </Space>
      ),
    },
    { title: <Text strong style={{ fontSize: 11 }}>PHÂN LOẠI</Text>, dataIndex: "category", render: (v: string) => <Text style={{ fontSize: 12, fontWeight: 600 }}>{v}</Text> },
    { 
      title: <Text strong style={{ fontSize: 11 }}>ĐƠN GIÁ</Text>, 
      render: (_: any, r: any) => (
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0050b3' }}>{Number(r.price).toLocaleString("vi-VN")} ₫</div>
          <div style={{ fontSize: 10, color: r.insurance ? '#52c41a' : '#8c8c8c', fontWeight: 700 }}>{r.insurance ? "CÓ BHYT" : "KHÔNG BHYT"}</div>
        </div>
      ),
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>, 
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.status === "ACTIVE" ? "green" : "default"} style={{ fontSize: 10, fontWeight: 700 }}>
          {r.status}
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
        title="Danh mục Dịch vụ Y tế" 
        subtitle="Quản lý danh mục kỹ thuật, dịch vụ khám chữa bệnh và cấu hình bảng giá"
        primaryAction={{
            label: "Thêm dịch vụ",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
        extra={<Button icon={<InteractionOutlined />}>Bảng giá</Button>}
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm kiếm tên dịch vụ, mã DV, chuyên khoa...">
        <Select placeholder="Phân loại" style={{ width: 150 }} options={[{ value: "CLINICAL CARE", label: "Clinical Care" }, { value: "DIAGNOSTICS", label: "Diagnostics" }]} />
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

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Dịch vụ y tế" fields={SVC_FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.name} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}