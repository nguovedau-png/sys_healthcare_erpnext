"use client";
import React, { useState } from "react";
import { Card, Space, Row, Col, Typography, Avatar, Statistic, Tag, Button, Table, message, Select } from "antd";
const { Title, Text, Paragraph } = Typography;
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EnvironmentOutlined, HistoryOutlined, GlobalOutlined, CarOutlined, PhoneOutlined } from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

const DATA_INIT = [
    {"id":1,"name":"Phòng khám Quận 1","address":"123 Nguyễn Huệ, Q.1, TP.HCM","status":"Active", "type": "Main Branch", "phone": "028 1234 5678"},
    {"id":2,"name":"Chi nhánh Bình Dương","address":"45 Đại lộ Bình Dương, BD","status":"Active", "type": "Satellite", "phone": "027 4321 8765"}
];

const FIELDS: CrudField[] = [
  { name: "name", label: "Tên địa điểm", type: "text", placeholder: "Nhập Tên địa điểm...", required: true, span: 2 },
  { name: "address", label: "Địa chỉ chi tiết", type: "text", placeholder: "Nhập Địa chỉ chi tiết..." },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "Active", label: "Hoạt động" }, { value: "Inactive", label: "Không hoạt động" }] },
];

export default function AddressesPage() {
  const [data, setData] = useState(DATA_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now() }, ...p]); setAddOpen(false); message.success("Đã thêm Địa chỉ mới!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r: any) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật Địa chỉ thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r: any) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xoá Địa chỉ!"); };

  const stats = [
    { label: "Tổng chi nhánh", value: "08", icon: <GlobalOutlined /> },
    { label: "Phủ sóng", value: "03 Tỉnh", color: "#52c41a" },
    { label: "Hỗ trợ vận chuyển", value: "Active", color: "#0050b3" },
    { label: "Điểm dịch vụ", value: "12", color: "#faad14" }
  ];

  const columns = [
    { 
      title: <Text strong style={{ fontSize: 11 }}>ĐỊA ĐIỂM / CHI NHÁNH</Text>, 
      render: (_: any, r: any) => (
        <Space size={12}>
           <div style={{ width: 32, height: 32, borderRadius: 4, background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0050b3' }}>
            <EnvironmentOutlined />
          </div>
          <div>
            <Text strong style={{ fontSize: 13, display: 'block' }}>{r.name}</Text>
            <Text type="secondary" style={{ fontSize: 11 }}>{r.type}</Text>
          </div>
        </Space>
      ) 
    },
    { 
        title: <Text strong style={{ fontSize: 11 }}>ĐỊA CHỈ</Text>, 
        render: (_: any, r: any) => <Text style={{ fontSize: 12 }}>{r.address}</Text> 
    },
    { 
        title: <Text strong style={{ fontSize: 11 }}>LIÊN HỆ</Text>, 
        render: (_: any, r: any) => (
            <Space size={4}>
                <PhoneOutlined style={{ fontSize: 12, color: '#8c8c8c' }} />
                <Text type="secondary" style={{ fontSize: 11 }}>{r.phone}</Text>
            </Space>
        ) 
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
          <Button type="text" size="small" icon={<CarOutlined />} />
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => setEditRecord(r)} />
          <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => setDeleteRecord(r)} />
        </Space>
      ) 
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader 
        title="Address & Location Registry" 
        subtitle="Quản lý mạng lưới chi nhánh, phòng khám và hệ thống định vị dịch vụ y tế toàn hệ thống"
        primaryAction={{
            label: "Thêm địa điểm",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
        extra={<Button icon={<HistoryOutlined />}>Lịch sử hoạt động</Button>}
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm chi nhánh, địa chỉ, tỉnh thành...">
        <Select placeholder="Loại chi nhánh" style={{ width: 150 }} options={[{ value: "main", label: "Trụ sở chính" }]} />
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

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Địa chỉ" fields={FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.name} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}