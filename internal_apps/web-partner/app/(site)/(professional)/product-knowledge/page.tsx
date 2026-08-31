"use client";
import { Card, Space, Row, Col, Typography, Avatar, Statistic, Tag, Progress, Button, message, Table, Select } from "antd";
const { Title, Text, Paragraph } = Typography;
import { BookOutlined, SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, ReadOutlined, MedicineBoxOutlined, GlobalOutlined, HistoryOutlined } from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";
import { useState } from "react";

const DATA_INIT = [{"id":1,"productName":"Metformin 850mg","category":"Tiểu đường","status":"Active"},{"id":2,"productName":"Panadol Extra","category":"Giảm đau","status":"Active"}];

const FIELDS: CrudField[] = [
  { name: "productName", label: "Tên sản phẩm/Thuốc", type: "text", placeholder: "Nhập Tên sản phẩm/Thuốc...", required: true, span: 2 },
  { name: "category", label: "Phân loại", type: "text", placeholder: "Nhập Phân loại..." },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "Active", label: "Hoạt động" }, { value: "Inactive", label: "Không hoạt động" }] },
];

export default function Page() {
  const [data, setData] = useState(DATA_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now() }, ...p]); setAddOpen(false); message.success("Đã thêm Tài liệu mới!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật Tài liệu thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xoá Tài liệu!"); };

  const stats = [
    { label: "Tài liệu kỹ thuật", value: "842", icon: <ReadOutlined /> },
    { label: "Danh mục thuốc", value: "1,2k", color: "#0050b3" },
    { label: "Hướng dẫn sử dụng", value: "450", color: "#52c41a" },
    { label: "Cập nhật mới", value: "12", color: "#faad14" }
  ];

  const columns = [
    {
      title: <Text strong style={{ fontSize: 11 }}>TÊN SẢN PHẨM / THUỐC</Text>,
      render: (_: any, r: any) => (
        <Space size={12}>
           <div style={{ width: 32, height: 32, borderRadius: 4, background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0050b3' }}>
            <MedicineBoxOutlined />
          </div>
          <div>
            <Text strong style={{ fontSize: 13, display: 'block' }}>{r.productName}</Text>
            <Text type="secondary" style={{ fontSize: 11 }}>{r.category}</Text>
          </div>
        </Space>
      ),
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
        title="Product Knowledge Base" 
        subtitle="Quản lý kiến thức sản phẩm, hướng dẫn sử dụng thuốc và tài liệu y khoa chuyên sâu"
        primaryAction={{
            label: "Thêm tài liệu",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm sản phẩm, hoạt chất, hướng dẫn..." />

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

      <Card bordered={false} style={{ background: '#004d40', borderRadius: 4 }} bodyStyle={{ padding: 40 }}>
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} lg={16}>
            <Title level={4} style={{ color: 'white', margin: 0, fontWeight: 700 }}>AI Drug Information Expert</Title>
            <Paragraph style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, margin: '16px 0' }}>
                Tra cứu nhanh thông tin dược lý, chống chỉ định và tương tác thuốc dựa trên dữ liệu chuẩn hóa quốc tế.
            </Paragraph>
            <Space size="middle">
                <Button type="primary" style={{ height: 40, padding: '0 24px', fontWeight: 600, background: '#00796b', border: 'none' }}>TRA CỨU NHANH</Button>
                <Button ghost icon={<HistoryOutlined />} style={{ height: 40, padding: '0 24px', fontWeight: 600, borderColor: 'rgba(255,255,255,0.2)' }}>LỊCH SỬ TRA CỨU</Button>
            </Space>
          </Col>
          <Col xs={24} lg={8} style={{ textAlign: 'center' }}>
             <div style={{ color: 'white' }}>
                <Statistic value={5000} title={<Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, fontWeight: 700 }}>CÂU HỎI ĐÃ GIẢI ĐÁP</Text>} valueStyle={{ color: '#fff', fontSize: 48, fontWeight: 700 }} />
                <div style={{ marginTop: 12 }}>
                    <Tag color="cyan">AI-POWERED</Tag>
                </div>
            </div>
          </Col>
        </Row>
      </Card>

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Tài liệu" fields={FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.productName} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}
    