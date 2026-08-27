"use client";
import React, { useState } from "react";
import { Tag, Button, Input, Select, Table, Badge, Progress, message, Tooltip, Card, Row, Col, Typography, Space, Statistic } from "antd";
const { Title, Text, Paragraph } = Typography;
import { MedicineBoxOutlined, SearchOutlined, FilterOutlined, PlusOutlined, EditOutlined, DeleteOutlined, BarcodeOutlined, AlertFilled, SafetyCertificateOutlined } from "@ant-design/icons";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";

const PHM_FIELDS: CrudField[] = [
  { name: "name", label: "Tên thuốc", type: "text", placeholder: "Amoxicillin 500mg", required: true, span: 2 },
  { name: "sku", label: "Mã SKU", type: "text", placeholder: "AMX-500", required: true },
  { name: "category", label: "Phân loại", type: "select", required: true, options: [{ value: "Kháng sinh", label: "Kháng sinh" }, { value: "Tiểu đường", label: "Tiểu đường" }, { value: "Tiêu hóa", label: "Tiêu hóa" }, { value: "Thuốc giảm đau", label: "Thuốc giảm đau" }, { value: "Vitamin", label: "Vitamin" }] },
  { name: "price", label: "Giá bán lẻ (₫)", type: "price", placeholder: "85000", required: true },
  { name: "stock", label: "Tồn kho hiện tại", type: "number", placeholder: "240" },
  { name: "min", label: "Mức tối thiểu an toàn", type: "number", placeholder: "50" },
  { name: "expiry", label: "Hạn sử dụng", type: "text", placeholder: "08/2025" },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "In Stock", label: "Còn hàng" }, { value: "Low Stock", label: "Sắp hết" }, { value: "Out of Stock", label: "Hết hàng" }] },
];

const PHM_INIT = [
  { id: 1, name: "Amoxicillin 500mg", sku: "AMX-500", category: "Kháng sinh", price: 85000, stock: 240, min: 50, expiry: "08/2025", status: "In Stock" },
  { id: 2, name: "Metformin 850mg", sku: "MET-850", category: "Tiểu đường", price: 120000, stock: 30, min: 40, expiry: "03/2025", status: "Low Stock" },
  { id: 3, name: "Omeprazole 20mg", sku: "OMP-020", category: "Tiêu hóa", price: 65000, stock: 0, min: 30, expiry: "11/2024", status: "Out of Stock" },
];

export default function PharmacyPage() {
  const [data, setData] = useState(PHM_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now() }, ...p]); setAddOpen(false); message.success("Đã nhập thuốc vào kho!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xóa sản phẩm!"); };

  const stats = [
    { label: "Tổng danh mục thuốc", value: "1,284", icon: <MedicineBoxOutlined /> },
    { label: "Sắp hết hàng", value: "18", color: "#faad14" },
    { label: "Thuốc hết hạn", value: "04", color: "#f5222d" },
    { label: "Giá trị kho thuốc", value: "850M ₫", color: "#52c41a" }
  ];

  const columns = [
    {
      title: <Text strong style={{ fontSize: 11 }}>TÊN THUỐC / SKU</Text>,
      render: (_: any, r: any) => (
        <Space size={12}>
          <div style={{ width: 32, height: 32, borderRadius: 4, background: '#f6ffed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#389e0d' }}>
            <MedicineBoxOutlined />
          </div>
          <div>
            <Text strong style={{ fontSize: 13, display: 'block' }}>{r.name}</Text>
            <Text type="secondary" style={{ fontSize: 11 }}>{r.sku} • {r.category}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>TỒN KHO</Text>,
      render: (_: any, r: any) => (
        <div style={{ width: 140 }}>
          <Progress percent={(r.stock / 300) * 100} showInfo={false} strokeColor={r.stock === 0 ? "#f5222d" : r.stock <= r.min ? "#faad14" : "#52c41a"} strokeWidth={6} />
          <Text style={{ fontSize: 10, fontWeight: 700 }}>{r.stock} / 300 UNITS</Text>
        </div>
      ),
    },
    { title: <Text strong style={{ fontSize: 11 }}>ĐƠN GIÁ</Text>, render: (_: any, r: any) => <Text strong style={{ fontSize: 13 }}>{Number(r.price).toLocaleString("vi-VN")} ₫</Text> },
    { title: <Text strong style={{ fontSize: 11 }}>HẠN DÙNG</Text>, render: (_: any, r: any) => <Tag bordered={false} color="blue" style={{ fontSize: 10, fontWeight: 700 }}>{r.expiry}</Tag> },
    { 
      title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>, 
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.status === "In Stock" ? "green" : r.status === "Low Stock" ? "orange" : "red"} style={{ fontSize: 10, fontWeight: 700 }}>
          {r.status?.toUpperCase()}
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
        title="Quản lý Kho Dược & Nhà thuốc" 
        subtitle="Quản lý danh mục thuốc, tồn kho an toàn và hệ thống cảnh báo tương tác dược lý chuyên sâu"
        primaryAction={{
            label: "Nhập thuốc mới",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
        extra={<Button icon={<BarcodeOutlined />}>Quét mã vạch</Button>}
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm tên thuốc, mã SKU, hoạt chất...">
        <Select placeholder="Phân loại" style={{ width: 150 }} options={[{ value: "antibiotic", label: "Kháng sinh" }]} />
      </EhrFilterBar>

      <Card className="ehr-card" bodyStyle={{ padding: 0 }} style={{ marginBottom: 24 }}>
        <Table 
            className="ehr-table-compact"
            dataSource={data} 
            rowKey="id" 
            pagination={false} 
            columns={columns} 
            size="small"
        />
      </Card>

      <Card bordered={false} style={{ background: '#001529', backgroundImage: 'linear-gradient(135deg, #001529 0%, #004d40 100%)', borderRadius: 4 }} bodyStyle={{ padding: 40 }}>
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} lg={16}>
            <Space direction="vertical" size={20}>
              <Space align="center" size={12}>
                <AlertFilled style={{ color: '#faad14', fontSize: 32 }} />
                <Title level={4} style={{ color: 'white', margin: 0, fontWeight: 700 }}>Drug Interaction Alert & e-Prescription</Title>
              </Space>
              <Paragraph style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, margin: 0 }}>
                Hệ thống AI tích hợp cơ sở dữ liệu dược thư quốc gia, tự động phát hiện tương tác thuốc và cảnh báo liều dùng an toàn.
              </Paragraph>
              <Space size="middle">
                <Button type="primary" style={{ height: 40, padding: '0 24px', fontWeight: 600, background: '#00695c', border: 'none' }}>KIỂM TRA TƯƠNG TÁC</Button>
                <Button ghost style={{ height: 40, padding: '0 24px', fontWeight: 600, borderColor: 'rgba(255,255,255,0.2)' }}>ĐƠN THUỐC ĐIỆN TỬ</Button>
              </Space>
            </Space>
          </Col>
          <Col xs={24} lg={8}>
             <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.05)', padding: 32, borderRadius: 4 }}>
                <Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, fontWeight: 700, display: 'block', marginBottom: 16 }}>DRUG SAFETY SCORE</Text>
                <div style={{ fontSize: 64, fontWeight: 700, color: 'white', marginBottom: 20 }}>99.8%</div>
                <Progress percent={99.8} showInfo={false} strokeColor="#52c41a" trailColor="rgba(255,255,255,0.1)" strokeWidth={8} />
             </div>
          </Col>
        </Row>
      </Card>

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Dược phẩm / Thuốc" fields={PHM_FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.name} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}