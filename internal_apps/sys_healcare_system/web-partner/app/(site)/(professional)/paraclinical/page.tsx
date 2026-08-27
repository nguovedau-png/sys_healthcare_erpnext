"use client";
import React, { useState } from "react";
import { Card, Space, Row, Col, Typography, Avatar, Statistic, Table, message, Select, Button, Tag } from "antd";
const { Title, Text, Paragraph } = Typography;
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, MedicineBoxOutlined, FileSearchOutlined, HistoryOutlined } from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

const DATA_INIT = [
  {"id":1,"testName":"Siêu âm ổ bụng","patient":"Nguyễn Văn A","status":"Active", "date": "10:30 Hôm nay"},
  {"id":2,"testName":"X-Quang ngực","patient":"Trần Thị B","status":"Inactive", "date": "Hôm qua"}
];

const FIELDS: CrudField[] = [
  { name: "testName", label: "Tên CLS", type: "text", placeholder: "Nhập Tên CLS...", required: true, span: 2 },
  { name: "patient", label: "Bệnh nhân", type: "text", placeholder: "Nhập Bệnh nhân..." },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "Active", label: "Hoạt động" }, { value: "Inactive", label: "Không hoạt động" }] },
];

export default function ParaclinicalPage() {
  const [data, setData] = useState(DATA_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now() }, ...p]); setAddOpen(false); message.success("Đã thêm Kết quả CLS mới!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật Kết quả CLS thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xoá Kết quả CLS!"); };

  const stats = [
    { label: "Chỉ định CLS", value: "85", icon: <FileSearchOutlined /> },
    { label: "Chờ thực hiện", value: "12", color: "#faad14" },
    { label: "Đã có kết quả", value: "68", color: "#52c41a" },
    { label: "Báo cáo lỗi", value: "0", color: "#f5222d" }
  ];

  const columns = [
    { 
      title: <Text strong style={{ fontSize: 11 }}>DỊCH VỤ CẬN LÂM SÀNG</Text>, 
      render: (_: any, r: any) => (
        <Space size={12}>
           <div style={{ width: 32, height: 32, borderRadius: 4, background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0050b3' }}>
            <FileSearchOutlined />
          </div>
          <Text strong style={{ fontSize: 13 }}>{r.testName}</Text>
        </Space>
      ) 
    },
    { title: <Text strong style={{ fontSize: 11 }}>BỆNH NHÂN</Text>, render: (_: any, r: any) => <Text style={{ fontSize: 12 }}>{r.patient}</Text> },
    { 
      title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>, 
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.status === "Active" ? "green" : "default"} style={{ fontSize: 10, fontWeight: 700 }}>
          {r.status?.toUpperCase() || "ACTIVE"}
        </Tag>
      ) 
    },
    { title: <Text strong style={{ fontSize: 11 }}>THỜI GIAN</Text>, render: (_: any, r: any) => <Text type="secondary" style={{ fontSize: 11 }}>{r.date}</Text> },
    { title: "", render: (_: any, r: any) => (
      <Space size={8}>
        <Button type="text" size="small" icon={<EditOutlined />} onClick={() => setEditRecord(r)} />
        <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => setDeleteRecord(r)} />
      </Space>
    )},
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader 
        title="Paraclinical & Imaging Hub" 
        subtitle="Quản lý kết quả cận lâm sàng, chẩn đoán hình ảnh và hệ thống lưu trữ PACS tập trung"
        primaryAction={{
            label: "Thêm CLS",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
        extra={<Button icon={<HistoryOutlined />}>Lịch sử kết quả</Button>}
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm dịch vụ, bệnh nhân...">
         <Select placeholder="Phân loại" style={{ width: 150 }} options={[{ value: "ultrasound", label: "Siêu âm" }, { value: "xray", label: "X-Quang" }]} />
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

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Kết quả CLS" fields={FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.testName} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}
