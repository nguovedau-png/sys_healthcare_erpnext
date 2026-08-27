"use client";
import React, { useState } from "react";
import { Tag, Button, Input, Select, Badge, Progress, Table, message, Tooltip, Card, Row, Col, Typography, Space, Statistic } from "antd";
const { Title, Text, Paragraph } = Typography;
import { SearchOutlined, FilterOutlined, PlusOutlined, BarcodeOutlined, InboxOutlined, MoreOutlined, AlertFilled, EditOutlined, DeleteOutlined, RocketOutlined } from "@ant-design/icons";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import inventoryService, { InventoryItem } from "@/services/inventory.service";

const INV_FIELDS: CrudField[] = [
  { name: "name", label: "Tên sản phẩm", type: "text", placeholder: "Panadol Extra", required: true, span: 2 },
  { name: "sku", label: "Mã SKU", type: "text", placeholder: "PAN-500", required: true },
  { name: "category", label: "Phân loại", type: "select", required: true, options: [{ value: "Thuốc giảm đau", label: "Thuốc giảm đau" }, { value: "Kháng sinh", label: "Kháng sinh" }, { value: "Vitamin", label: "Vitamin" }, { value: "Thiết bị y tế", label: "Thiết bị y tế" }] },
  { name: "manufacturer", label: "Nhà sản xuất", type: "text", placeholder: "GSK Global" },
  { name: "price", label: "Giá nhập (₫)", type: "price", placeholder: "150000", required: true },
  { name: "stock", label: "Tồn kho", type: "number", placeholder: "120" },
  { name: "minStock", label: "Tối thiểu", type: "number", placeholder: "50" },
  { name: "expiry", label: "Hạn dùng", type: "text", placeholder: "12/2025" },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "In Stock", label: "Còn hàng" }, { value: "Low Stock", label: "Sắp hết" }, { value: "Out of Stock", label: "Hết hàng" }] },
];

export default function InventoryPage() {
  const [data, setData] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
        const items = await inventoryService.getInventoryItems();
        setData(items);
    } catch (e) {
        message.error("Không thể tải danh sách kho!");
    } finally {
        setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (v: any) => { 
    try {
        await inventoryService.createInventoryItem(v);
        message.success("Đã nhập kho thành công!");
        setAddOpen(false);
        fetchData();
    } catch (e) { message.error("Lỗi khi thêm sản phẩm!"); }
  };

  const handleEdit = async (v: any) => { 
    try {
        await inventoryService.updateInventoryItem(editRecord.id, v);
        message.success("Cập nhật sản phẩm thành công!");
        setEditRecord(null);
        fetchData();
    } catch (e) { message.error("Lỗi khi cập nhật sản phẩm!"); }
  };

  const handleDelete = async () => { 
    try {
        await inventoryService.deleteInventoryItem(deleteRecord.id);
        message.success("Đã xóa sản phẩm!");
        setDeleteRecord(null);
        fetchData();
    } catch (e) { message.error("Lỗi khi xóa sản phẩm!"); }
  };

  const stats = [
    { label: "Giá trị tồn kho", value: "1.2B ₫", icon: <InboxOutlined /> },
    { label: "Sắp hết hàng", value: "12", color: "#d97706" },
    { label: "Hết hạn/Sắp hết hạn", value: "02", color: "#f43f5e" },
    { label: "Lô hàng đang về", value: "05", color: "#0050b3" }
  ];

  const columns = [
    {
      title: <Text strong style={{ fontSize: 11 }}>SẢN PHẨM / SKU</Text>,
      render: (_: any, r: any) => (
        <Space size={12}>
          <div style={{ width: 32, height: 32, borderRadius: 4, background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0050b3' }}>
            <InboxOutlined />
          </div>
          <div>
            <Text strong style={{ fontSize: 13, display: 'block' }}>{r.name}</Text>
            <Text type="secondary" style={{ fontSize: 11 }}>{r.sku} • {r.manufacturer}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>MỨC TỒN KHO</Text>,
      render: (_: any, r: any) => (
        <div style={{ width: 150 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={{ fontSize: 11, fontWeight: 700 }}>{r.stock} SP</Text>
            <Text style={{ fontSize: 10, fontWeight: 700, color: r.stock <= r.min ? '#f43f5e' : '#52c41a' }}>{Math.min(100, Math.round((r.stock / 200) * 100))}%</Text>
          </div>
          <Progress percent={(r.stock / 200) * 100} showInfo={false} strokeColor={r.stock === 0 ? "#f43f5e" : r.stock <= r.min ? "#faad14" : "#0050b3"} strokeWidth={6} />
        </div>
      ),
    },
    { title: <Text strong style={{ fontSize: 11 }}>ĐƠN GIÁ</Text>, render: (_: any, r: any) => <Text strong style={{ fontSize: 13 }}>{Number(r.price).toLocaleString("vi-VN")} ₫</Text> },
    { 
      title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>, 
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.status === "In Stock" ? "green" : r.status === "Low Stock" ? "orange" : "red"} style={{ fontSize: 10, fontWeight: 700 }}>
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
        title="Quản lý Kho Dược & Vật tư" 
        subtitle="Hệ thống quản trị cung ứng y tế, kiểm soát tồn kho và dự báo nhu cầu"
        primaryAction={{
            label: "Nhập kho mới",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
        extra={<Button icon={<BarcodeOutlined />}>Quét mã</Button>}
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm kiếm tên sản phẩm, SKU, nhà cung cấp...">
        <Select placeholder="Danh mục" style={{ width: 150 }} options={[{ value: "pharma", label: "Dược phẩm" }, { value: "consumable", label: "Vật tư tiêu hao" }]} />
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

      <Card bordered={false} style={{ background: '#001529', backgroundImage: 'linear-gradient(135deg, #001529 0%, #003a8c 100%)', borderRadius: 4 }} bodyStyle={{ padding: 40 }}>
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} lg={16}>
            <Space direction="vertical" size={20}>
              <Space align="center" size={12}>
                <AlertFilled style={{ color: '#faad14', fontSize: 32 }} />
                <Title level={4} style={{ color: 'white', margin: 0, fontWeight: 700 }}>AI Supply Chain Forecasting</Title>
              </Space>
              <Paragraph style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, margin: 0 }}>
                Hệ thống đang phân tích tốc độ tiêu thụ thuốc thiết yếu để dự báo thời điểm nhập hàng. Hiện có 8 mặt hàng sắp chạm ngưỡng an toàn.
              </Paragraph>
              <Space size="middle">
                <Button type="primary" style={{ height: 40, padding: '0 24px', fontWeight: 600 }}>XEM GỢI Ý NHẬP HÀNG</Button>
                <Button ghost style={{ height: 40, padding: '0 24px', fontWeight: 600, borderColor: 'rgba(255,255,255,0.2)' }}>LỊCH SỬ CUNG ỨNG</Button>
              </Space>
            </Space>
          </Col>
          <Col xs={24} lg={8}>
            <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.05)', padding: 32, borderRadius: 4 }}>
               <Statistic value={8} title={<Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, fontWeight: 700 }}>CẦN NHẬP HÀNG</Text>} valueStyle={{ color: '#fff', fontSize: 48, fontWeight: 700 }} />
               <Progress percent={75} showInfo={false} strokeColor="#faad14" trailColor="rgba(255,255,255,0.1)" strokeWidth={8} style={{ marginTop: 16 }} />
            </div>
          </Col>
        </Row>
      </Card>

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Sản phẩm kho" fields={INV_FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.name} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}