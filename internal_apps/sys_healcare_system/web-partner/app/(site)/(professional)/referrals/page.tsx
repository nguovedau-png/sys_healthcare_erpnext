"use client";
import React, { useState } from "react";
import { Card, Space, Row, Col, Typography, Avatar, Statistic, Tag, Table, message, Select, Button } from "antd";
const { Title, Text, Paragraph } = Typography;
import { 
  SwapOutlined, 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  BankOutlined, 
  InteractionOutlined,
  HistoryOutlined,
  CheckCircleFilled,
  ClockCircleOutlined
} from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

const DATA_INIT = [
  { id: 1, patient: "Nguyễn Văn A", fromHospital: "BV Đa khoa Tỉnh", toHospital: "BV Chợ Rẫy", status: "Accepted", date: "08:30 Hôm nay", priority: "High" },
  { id: 2, patient: "Trần Thị B", fromHospital: "Phòng khám Đa khoa VIP", toHospital: "BV Đại học Y Dược", status: "Pending", date: "09:15 Hôm nay", priority: "Normal" },
  { id: 3, patient: "Lê Văn C", fromHospital: "BV Quận 1", toHospital: "BV Chấn thương Chỉnh hình", status: "Reviewing", date: "Hôm qua", priority: "Emergency" },
];

const FIELDS: CrudField[] = [
  { name: "patient", label: "Bệnh nhân", type: "text", placeholder: "Nguyễn Văn A", required: true, span: 2 },
  { name: "fromHospital", label: "Nơi chuyển đi", type: "text", placeholder: "Bệnh viện A" },
  { name: "toHospital", label: "Nơi tiếp nhận", type: "text", placeholder: "Bệnh viện B" },
  { name: "priority", label: "Độ ưu tiên", type: "select", options: [{ value: "Emergency", label: "Cấp cứu" }, { value: "High", label: "Cao" }, { value: "Normal", label: "Bình thường" }] },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "Pending", label: "Chờ duyệt" }, { value: "Reviewing", label: "Đang xem xét" }, { value: "Accepted", label: "Đã tiếp nhận" }, { value: "Completed", label: "Đã hoàn thành" }] },
];

export default function ReferralsPage() {
  const [data, setData] = useState(DATA_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now(), date: "Vừa xong" }, ...p]); setAddOpen(false); message.success("Đã tạo yêu cầu chuyển viện!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật yêu cầu thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xóa yêu cầu!"); };

  const stats = [
    { label: "Yêu cầu mới", value: "08", icon: <SwapOutlined /> },
    { label: "Đã tiếp nhận", value: "142", color: "#52c41a" },
    { label: "Đang xử lý", value: "12", color: "#faad14" },
    { label: "Hội chẩn liên viện", value: "24", color: "#0050b3" }
  ];

  const columns = [
    { 
      title: <Text strong style={{ fontSize: 11 }}>BỆNH NHÂN / ĐỘ ƯU TIÊN</Text>, 
      render: (_: any, r: any) => (
        <Space size={12}>
           <div style={{ width: 32, height: 32, borderRadius: 4, background: r.priority === 'Emergency' ? '#fff1f0' : '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: r.priority === 'Emergency' ? '#f5222d' : '#0050b3' }}>
            <InteractionOutlined />
          </div>
          <div>
            <Text strong style={{ fontSize: 13, display: 'block' }}>{r.patient}</Text>
            <Tag color={r.priority === 'Emergency' ? 'red' : r.priority === 'High' ? 'orange' : 'blue'} bordered={false} style={{ fontSize: 9, fontWeight: 700 }}>{r.priority.toUpperCase()}</Tag>
          </div>
        </Space>
      ) 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>LUỒNG CHUYỂN TUYẾN</Text>, 
      render: (_: any, r: any) => (
        <div style={{ fontSize: 12 }}>
          <Text type="secondary">{r.fromHospital}</Text>
          <SwapOutlined style={{ margin: '0 8px', color: '#8c8c8c' }} />
          <Text strong>{r.toHospital}</Text>
        </div>
      ) 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>, 
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.status === "Accepted" ? "green" : r.status === "Reviewing" ? "orange" : "default"} style={{ fontSize: 10, fontWeight: 700 }}>
          {r.status.toUpperCase()}
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
        title="Tele-referral & Consultation" 
        subtitle="Hệ thống điều phối chuyển tuyến và hội chẩn liên viện kỹ thuật số theo đề án 2628"
        primaryAction={{
            label: "Tạo yêu cầu chuyển tuyến",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
        extra={<Button icon={<HistoryOutlined />}>Lịch sử hội chẩn</Button>}
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm bệnh nhân, đơn vị chuyển đi/đến...">
         <Select placeholder="Độ ưu tiên" style={{ width: 150 }} options={[{ value: "emergency", label: "Cấp cứu" }, { value: "high", label: "Cao" }]} />
         <Select placeholder="Trạng thái" style={{ width: 150 }} options={[{ value: "pending", label: "Chờ duyệt" }]} />
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

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Yêu cầu hội chẩn/chuyển tuyến" fields={FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.patient} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}
