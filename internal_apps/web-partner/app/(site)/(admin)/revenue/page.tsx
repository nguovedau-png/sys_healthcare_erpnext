"use client";
import React, { useState } from "react";
import { Tag, Button, Input, Select, Table, Badge, message, Tooltip, Card, Row, Col, Typography, Space, Statistic, Tabs, Progress } from "antd";
const { Title, Text, Paragraph } = Typography;
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, RiseOutlined, FallOutlined, DollarOutlined, CalendarOutlined, FilterOutlined, FileExcelOutlined, TransactionOutlined, BarChartOutlined, LineChartOutlined, ThunderboltFilled, SafetyCertificateOutlined, CloudSyncOutlined } from "@ant-design/icons";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";

const REVENUE_DATA = [
    { name: 'T10', revenue: 3200, profit: 1200 },
    { name: 'T11', revenue: 2800, profit: 900 },
    { name: 'T12', revenue: 4500, profit: 2100 },
    { name: 'T1', revenue: 3800, profit: 1500 },
    { name: 'T2', revenue: 5200, profit: 2800 },
    { name: 'T3', revenue: 4800, profit: 2400 },
    { name: 'T4', revenue: 6100, profit: 3200 },
];

const DATA_INIT = [
  { id: 1, period: "Tháng 04/2024", amount: 4250000000, growth: "+12.5%", status: "Finalized", categories: { medicine: "45%", service: "35%", lab: "20%" } },
  { id: 2, period: "Tháng 03/2024", amount: 3980000000, growth: "+8.2%", status: "Finalized", categories: { medicine: "42%", service: "38%", lab: "20%" } },
  { id: 3, period: "Tháng 02/2024", amount: 3120000000, growth: "-4.5%", status: "Archived", categories: { medicine: "50%", service: "30%", lab: "20%" } },
];

const FIELDS: CrudField[] = [
  { name: "period", label: "Kỳ báo cáo", type: "text", placeholder: "Tháng MM/YYYY", required: true, span: 2 },
  { name: "amount", label: "Doanh thu (₫)", type: "number", placeholder: "Nhập doanh thu" },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "Finalized", label: "Đã chốt" }, { value: "Draft", label: "Bản nháp" }, { value: "Archived", label: "Lưu trữ" }] },
];

export default function RevenuePage() {
  const [data, setData] = useState(DATA_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now(), growth: "0%", categories: { medicine: "33%", service: "33%", lab: "34%" } }, ...p]); setAddOpen(false); message.success("Đã thêm Doanh thu mới!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật Doanh thu thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xóa Doanh thu!"); };

  const stats = [
    { label: "Doanh thu tháng", value: "6.1B", icon: <DollarOutlined /> },
    { label: "Lợi nhuận gộp", value: "3.2B", color: "#52c41a" },
    { label: "Biên lợi nhuận", value: "52.4%", color: "#0050b3" },
    { label: "Tăng trưởng YoY", value: "+28%", color: "#faad14" }
  ];

  const columns = [
    { 
      title: <Text strong style={{ fontSize: 11 }}>KỲ BÁO CÁO</Text>, 
      render: (_: any, r: any) => (
        <Space size={12}>
           <div style={{ width: 32, height: 32, borderRadius: 4, background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0050b3' }}>
            <CalendarOutlined />
          </div>
          <Text strong style={{ fontSize: 13 }}>{r.period}</Text>
        </Space>
      ) 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>TỔNG DOANH THU</Text>, 
      render: (_: any, r: any) => (
        <div>
          <Text strong style={{ fontSize: 13, display: 'block' }}>{r.amount.toLocaleString()} ₫</Text>
          <Text type={r.growth.startsWith("+") ? "success" : "danger"} style={{ fontSize: 11 }}>{r.growth}</Text>
        </div>
      ) 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>PHÂN BỔ NGUỒN</Text>, 
      render: (_: any, r: any) => (
        <div style={{ width: 150 }}>
          <Progress percent={100} showInfo={false} strokeColor="#0050b3" size="small" />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Text type="secondary" style={{ fontSize: 10 }}>Med: {r.categories.medicine}</Text>
            <Text type="secondary" style={{ fontSize: 10 }}>Srv: {r.categories.service}</Text>
          </div>
        </div>
      ) 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>, 
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.status === "Finalized" ? "green" : "default"} style={{ fontSize: 10, fontWeight: 700 }}>
          {r.status.toUpperCase()}
        </Tag>
      ) 
    },
    { 
      title: "", 
      render: (_: any, r: any) => (
        <Space size={8}>
          <Button type="text" size="small" icon={<FileExcelOutlined />} />
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => setEditRecord(r)} />
          <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => setDeleteRecord(r)} />
        </Space>
      ) 
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader 
        title="Financial Revenue Analytics" 
        subtitle="Phân tích doanh thu bệnh viện, theo dõi lợi nhuận gộp và tối ưu hóa hiệu quả tài chính"
        primaryAction={{
            label: "Thêm doanh thu",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
        extra={<Button icon={<TransactionOutlined />}>Lịch sử giao dịch</Button>}
      />

      <EhrStatCards stats={stats} />

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={24}>
            <Card className="ehr-card" title={<Text strong>Biểu đồ phân tích doanh thu 7 tháng</Text>} extra={<Select defaultValue="revenue" size="small" style={{ width: 150 }} options={[{ value: 'revenue', label: 'Doanh thu' }]} />}>
                <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={REVENUE_DATA}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                        <RechartsTooltip />
                        <Area type="monotone" dataKey="revenue" stroke="#0050b3" fill="rgba(0,80,179,0.1)" strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            </Card>
        </Col>
      </Row>

      <EhrFilterBar placeholder="Tìm kiếm kỳ báo cáo...">
        <Select placeholder="Phân loại" style={{ width: 150 }} options={[{ value: "med", label: "Dược phẩm" }]} />
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

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Doanh thu" fields={FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.period} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}