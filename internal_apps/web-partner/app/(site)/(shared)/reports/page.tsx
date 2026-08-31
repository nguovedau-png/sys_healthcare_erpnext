"use client";
import React, { useState } from "react";
import { Card, Space, Row, Col, Typography, Avatar, Statistic, Tag, Table, message, Select, Button } from "antd";
const { Title, Text, Paragraph } = Typography;
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, FileTextOutlined, HistoryOutlined, BarChartOutlined } from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

const DATA_INIT = [
  {"id":1,"title":"Báo cáo hoạt động tháng 04","period":"04/2024","status":"Active", "type": "Operational"},
  {"id":2,"title":"Báo cáo tài chính Q1","period":"Q1/2024","status":"Active", "type": "Financial"}
];

const FIELDS: CrudField[] = [
  { name: "title", label: "Tiêu đề báo cáo", type: "text", placeholder: "Nhập Tiêu đề báo cáo...", required: true, span: 2 },
  { name: "period", label: "Kỳ báo cáo", type: "text", placeholder: "Nhập Kỳ báo cáo..." },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "Active", label: "Hoạt động" }, { value: "Inactive", label: "Không hoạt động" }] },
];

export default function ReportsPage() {
  const [data, setData] = useState(DATA_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now() }, ...p]); setAddOpen(false); message.success("Đã thêm Báo cáo mới!"); };
  const handleEdit = (v: any) => { setData((p: any) => p.map((r: any) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật Báo cáo thành công!"); };
  const handleDelete = () => { setData((p: any) => p.filter((r: any) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xoá Báo cáo!"); };

  const stats = [
    { label: "Tổng báo cáo", value: "142", icon: <FileTextOutlined /> },
    { label: "Báo cáo tháng", value: "12", color: "#0050b3" },
    { label: "Đang xử lý", value: "3", color: "#faad14" },
    { label: "Hoàn tất", value: "127", color: "#52c41a" }
  ];

  const columns = [
    { 
      title: <Text strong style={{ fontSize: 11 }}>TIÊU ĐỀ BÁO CÁO</Text>, 
      render: (_: any, r: any) => (
        <Space size={12}>
           <div style={{ width: 32, height: 32, borderRadius: 4, background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0050b3' }}>
            <FileTextOutlined />
          </div>
          <Text strong style={{ fontSize: 13 }}>{r.title}</Text>
        </Space>
      ) 
    },
    { title: <Text strong style={{ fontSize: 11 }}>KỲ BÁO CÁO</Text>, render: (_: any, r: any) => <Text style={{ fontSize: 12 }}>{r.period}</Text> },
    { title: <Text strong style={{ fontSize: 11 }}>LOẠI</Text>, render: (_: any, r: any) => <Text style={{ fontSize: 11 }}>{r.type}</Text> },
    { 
      title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>, 
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.status === "Active" ? "green" : "default"} style={{ fontSize: 10, fontWeight: 700 }}>
          {r.status?.toUpperCase() || "ACTIVE"}
        </Tag>
      ) 
    },
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
        title="Advanced Reports & Analytics" 
        subtitle="Hệ thống báo cáo tổng hợp đa chiều về hoạt động bệnh viện, tài chính và chất lượng điều trị"
        primaryAction={{
            label: "Tạo báo cáo",
            icon: <BarChartOutlined />,
            onClick: () => setAddOpen(true)
        }}
        extra={<Button icon={<HistoryOutlined />}>Lịch sử kết xuất</Button>}
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm tiêu đề báo cáo, kỳ hạn...">
         <Select placeholder="Phân loại" style={{ width: 150 }} options={[{ value: "op", label: "Vận hành" }, { value: "fin", label: "Tài chính" }]} />
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

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Báo cáo" fields={FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.title} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}