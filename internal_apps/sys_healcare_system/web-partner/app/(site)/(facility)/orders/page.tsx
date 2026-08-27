"use client";
import React, { useState } from "react";
import { Tag, Button, Input, Select, Table, Badge, message, Tooltip, Card, Row, Col, Typography, Space, Statistic } from "antd";
const { Title, Text, Paragraph } = Typography;
import { ShoppingCartOutlined, SearchOutlined, FilterOutlined, PlusOutlined, EditOutlined, DeleteOutlined, FileExcelOutlined, PrinterOutlined, CreditCardOutlined, TransactionOutlined } from "@ant-design/icons";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";

const ORDER_FIELDS: CrudField[] = [
  { name: "code", label: "Mã đơn hàng", type: "text", placeholder: "ORD-XXXX", required: true },
  { name: "customer", label: "Khách hàng / BN", type: "text", placeholder: "Nhập tên khách hàng", required: true },
  { name: "type", label: "Loại đơn", type: "select", options: [{ value: "Thuốc kê đơn", label: "Thuốc kê đơn" }, { value: "Dịch vụ CLS", label: "Dịch vụ CLS" }, { value: "Thiết bị y tế", label: "Thiết bị y tế" }] },
  { name: "amount", label: "Tổng tiền (₫)", type: "text", placeholder: "450,000đ" },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "Completed", label: "Hoàn thành" }, { value: "Processing", label: "Đang xử lý" }, { value: "Pending", label: "Chờ duyệt" }] },
];

const ORDERS_INIT = [
  { id: 1, code: "ORD-8892", customer: "Nguyễn Văn A", type: "Thuốc kê đơn", amount: "450,000đ", items: 4, status: "Completed", date: "10:30 Hôm nay" },
  { id: 2, code: "ORD-8893", customer: "Trần Thị B", type: "Dịch vụ CLS", amount: "1,200,000đ", items: 2, status: "Processing", date: "09:15 Hôm nay" },
  { id: 3, code: "ORD-8894", customer: "Lê Văn C", type: "Thiết bị y tế", amount: "8,500,000đ", items: 1, status: "Pending", date: "08:45 Hôm nay" },
];

export default function OrdersPage() {
  const [data, setData] = useState(ORDERS_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now() }, ...p]); setAddOpen(false); message.success("Đã tạo đơn hàng mới!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật đơn hàng thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xóa đơn hàng!"); };

  const stats = [
    { label: "Đơn hàng mới", value: "24", icon: <ShoppingCartOutlined /> },
    { label: "Chờ xử lý", value: "08", color: "#faad14" },
    { label: "Doanh số hôm nay", value: "18.4M ₫", color: "#52c41a" },
    { label: "Hoàn thành", value: "98.5%", color: "#0050b3" }
  ];

  const columns = [
    {
      title: <Text strong style={{ fontSize: 11 }}>MÃ ĐƠN / KHÁCH HÀNG</Text>,
      render: (_: any, r: any) => (
        <Space size={12}>
           <div style={{ width: 32, height: 32, borderRadius: 4, background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0050b3' }}>
            <ShoppingCartOutlined />
          </div>
          <div>
            <Text strong style={{ fontSize: 13, display: 'block' }}>{r.code}</Text>
            <Text type="secondary" style={{ fontSize: 11 }}>{r.customer}</Text>
          </div>
        </Space>
      ),
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>PHÂN LOẠI</Text>, 
      render: (_: any, r: any) => (
        <Tag bordered={false} style={{ fontSize: 10, fontWeight: 700 }}>
          {r.type.toUpperCase()}
        </Tag>
      ) 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>GIÁ TRỊ</Text>, 
      render: (_: any, r: any) => <Text strong style={{ fontSize: 13 }}>{r.amount}</Text> 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>, 
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.status === "Completed" ? "green" : r.status === "Processing" ? "blue" : "orange"} style={{ fontSize: 10, fontWeight: 700 }}>
          {r.status.toUpperCase()}
        </Tag>
      ) 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>THỜI GIAN</Text>, 
      render: (_: any, r: any) => <Text type="secondary" style={{ fontSize: 11 }}>{r.date}</Text> 
    },
    {
      title: "",
      render: (_: any, r: any) => (
        <Space size={8}>
          <Button type="text" size="small" icon={<PrinterOutlined />} />
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => setEditRecord(r)} />
          <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => setDeleteRecord(r)} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader 
        title="Order & Transaction Hub" 
        subtitle="Quản lý luồng doanh thu từ bán lẻ dược phẩm, vật tư tiêu hao và các dịch vụ y tế trọn gói"
        primaryAction={{
            label: "Tạo đơn mới",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
        extra={<Button icon={<FileExcelOutlined />}>Xuất báo cáo</Button>}
      />

      <EhrStatCards stats={stats} />

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Card bordered={false} style={{ background: '#001529', borderRadius: 8, color: 'white' }}>
            <Row gutter={[24, 24]} align="middle">
                <Col flex="1">
                    <Title level={4} style={{ color: 'white', margin: 0 }}>AI Financial Insights</Title>
                    <Paragraph style={{ color: 'rgba(255,255,255,0.6)', margin: '8px 0 0 0' }}>
                        Hệ thống AI tự động đối soát doanh thu và phát hiện các giao dịch bất thường trong thời gian thực.
                    </Paragraph>
                </Col>
                <Col>
                    <div style={{ textAlign: 'right' }}>
                        <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, textTransform: 'uppercase' }}>Biên lợi nhuận gộp</Text>
                        <div style={{ fontSize: 32, fontWeight: 900, color: '#52c41a' }}>28.5%</div>
                    </div>
                </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <EhrFilterBar placeholder="Tìm mã đơn, tên khách hàng...">
        <Select placeholder="Phân loại đơn" style={{ width: 150 }} options={[{ value: "medicine", label: "Thuốc" }]} />
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

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Đơn hàng" fields={ORDER_FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord ? `${deleteRecord.code} - ${deleteRecord.customer}` : undefined} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}