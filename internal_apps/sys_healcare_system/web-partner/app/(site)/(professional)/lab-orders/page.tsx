"use client";
import React, { useState } from "react";
import { Tag, Button, Input, Select, Table, Badge, message, Tooltip, Card, Row, Col, Typography, Space, Statistic } from "antd";
const { Title, Text, Paragraph } = Typography;
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, ExperimentOutlined, FilterOutlined, FilePdfOutlined, HistoryOutlined } from "@ant-design/icons";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";

const FIELDS: CrudField[] = [
  { name: "testName", label: "Tên xét nghiệm", type: "text", placeholder: "Nhập Tên xét nghiệm...", required: true, span: 2 },
  { name: "patient", label: "Bệnh nhân", type: "text", placeholder: "Nhập Bệnh nhân..." },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "Active", label: "Hoạt động" }, { value: "Inactive", label: "Không hoạt động" }] },
];

const DATA_INIT = [
  { id: 1, testName: "HbA1c", patient: "Nguyễn Văn A", patientId: "BN-4281", priority: "Normal", status: "Completed", date: "10:30 Hôm nay" },
  { id: 2, testName: "CBC Complete", patient: "Trần Thị B", patientId: "BN-9902", priority: "Urgent", status: "Processing", date: "09:15 Hôm nay" },
  { id: 3, testName: "Liver Function Test", patient: "Lê Văn C", patientId: "BN-1105", priority: "Normal", status: "Pending", date: "08:45 Hôm nay" },
];

export default function LabOrdersPage() {
  const [data, setData] = useState(DATA_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now() }, ...p]); setAddOpen(false); message.success("Đã thêm Chỉ định XN mới!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật Chỉ định XN thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xóa Chỉ định XN!"); };

  const stats = [
    { label: "Chỉ định hôm nay", value: "48", icon: <ExperimentOutlined /> },
    { label: "Đang xử lý", value: "12", color: "#faad14" },
    { label: "Đã có kết quả", value: "32", color: "#52c41a" },
    { label: "Chỉ số bất thường", value: "04", color: "#f5222d" }
  ];

  const columns = [
    {
      title: <Text strong style={{ fontSize: 11 }}>XÉT NGHIỆM / BỆNH NHÂN</Text>,
      render: (_: any, r: any) => (
        <Space size={12}>
          <div style={{ width: 32, height: 32, borderRadius: 4, background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0050b3' }}>
            <ExperimentOutlined />
          </div>
          <div>
            <Text strong style={{ fontSize: 13, display: 'block' }}>{r.testName}</Text>
            <Text type="secondary" style={{ fontSize: 11 }}>{r.patient} • {r.patientId}</Text>
          </div>
        </Space>
      ),
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>ƯU TIÊN</Text>, 
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.priority === "Urgent" ? "red" : "default"} style={{ fontSize: 10, fontWeight: 700 }}>
          {r.priority?.toUpperCase()}
        </Tag>
      ) 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>, 
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.status === "Completed" ? "green" : r.status === "Processing" ? "blue" : "orange"} style={{ fontSize: 10, fontWeight: 700 }}>
          {r.status?.toUpperCase()}
        </Tag>
      ) 
    },
    { title: <Text strong style={{ fontSize: 11 }}>THỜI GIAN</Text>, render: (_: any, r: any) => <Text style={{ fontSize: 11, color: '#8c8c8c' }}>{r.date}</Text> },
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
        title="Quản lý Chỉ định Xét nghiệm (LIS)" 
        subtitle="Hệ thống quản lý quy trình xét nghiệm, trả kết quả và phân tích chỉ số cận lâm sàng tập trung"
        primaryAction={{
            label: "Chỉ định mới",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
        extra={<Button icon={<HistoryOutlined />}>Lịch sử xét nghiệm</Button>}
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm tên xét nghiệm, bệnh nhân, mã BN...">
        <Select placeholder="Trạng thái" style={{ width: 150 }} options={[{ value: "Completed", label: "Đã hoàn thành" }, { value: "Processing", label: "Đang xử lý" }]} />
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

      <Card bordered={false} style={{ background: '#001529', borderRadius: 4 }} bodyStyle={{ padding: 40 }}>
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} lg={16}>
            <Space direction="vertical" size={20}>
              <Title level={4} style={{ color: 'white', margin: 0, fontWeight: 700 }}>AI Laboratory Analytics</Title>
              <Paragraph style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, margin: 0 }}>
                Hệ thống AI tự động phân tích xu hướng chỉ số xét nghiệm, cảnh báo sớm các nguy cơ bệnh lý tiềm ẩn dựa trên dữ liệu lịch sử.
              </Paragraph>
              <Space size="middle">
                <Button type="primary" style={{ height: 40, padding: '0 24px', fontWeight: 600 }}>XEM PHÂN TÍCH</Button>
                <Button ghost icon={<FilePdfOutlined />} style={{ height: 40, padding: '0 24px', fontWeight: 600, borderColor: 'rgba(255,255,255,0.2)' }}>BÁO CÁO TỔNG HỢP</Button>
              </Space>
            </Space>
          </Col>
          <Col xs={24} lg={8}>
             <div style={{ background: 'rgba(255,255,255,0.05)', padding: 32, borderRadius: 4 }}>
                <Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, fontWeight: 700, display: 'block', marginBottom: 8 }}>ĐỘ CHÍNH XÁC KẾT QUẢ</Text>
                <div style={{ fontSize: 48, fontWeight: 700, color: 'white', marginBottom: 16 }}>99.9%</div>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: '99.9%', height: '100%', background: '#52c41a' }} />
                </div>
                <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }}>Tốc độ trả mẫu</Text>
                    <Text style={{ color: 'white', fontSize: 11, fontWeight: 700 }}>~15 Phút / Mẫu</Text>
                </div>
             </div>
          </Col>
        </Row>
      </Card>

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Chỉ định XN" fields={FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.testName} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}