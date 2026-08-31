"use client";
import { Card, Space, Row, Col, Typography, Avatar, Statistic, Tag, Progress, Button, message, Select, Table } from "antd";
const { Title, Text, Paragraph } = Typography;
import { TrophyOutlined, SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, SafetyCertificateFilled, HistoryOutlined, BankOutlined } from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";
import { useState } from "react";

const CERTS_INIT = [
  { id: 1, name: "Chứng chỉ hành nghề Bác sĩ", holder: "Dr. Nguyễn Văn A", issuer: "Bộ Y tế Việt Nam", issueDate: "15/06/2018", expiry: "15/06/2028", status: "Valid" },
  { id: 2, name: "Board Certification Cardiology", holder: "Dr. Trần Thị B", issuer: "American Board of Internal Medicine", issueDate: "20/09/2020", expiry: "20/09/2030", status: "Valid" },
  { id: 3, name: "CME Certificate 2023", holder: "Điều dưỡng Lê Thị C", issuer: "Hội Điều dưỡng Việt Nam", issueDate: "10/12/2023", expiry: "10/12/2025", status: "Expiring" },
];

const CERT_FIELDS: CrudField[] = [
  { name: "name", label: "Tên chứng chỉ", type: "text", placeholder: "Chứng chỉ hành nghề Bác sĩ", required: true, span: 2 },
  { name: "holder", label: "Người sở hữu", type: "text", placeholder: "Dr. Nguyễn Văn A", required: true },
  { name: "issuer", label: "Cơ quan cấp phép", type: "text", placeholder: "Bộ Y tế Việt Nam", required: true, span: 2 },
  { name: "issueDate", label: "Ngày cấp", type: "text", placeholder: "15/06/2018", required: true },
  { name: "expiry", label: "Ngày hết hạn", type: "text", placeholder: "15/06/2028", required: true },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "Valid", label: "Còn hiệu lực" }, { value: "Expiring", label: "Sắp hết hạn" }, { value: "Expired", label: "Đã hết hạn" }] },
];

const titleStyle: React.CSSProperties = { fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", paddingLeft: "16px", paddingRight: "16px" };

export default function CertificationsPage() {
  const [data, setData] = useState(CERTS_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now() }, ...p]); setAddOpen(false); message.success("Đã thêm chứng chỉ!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r: any) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r: any) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xoá chứng chỉ!"); };

  const stats = [
    { label: "Tổng chứng chỉ", value: "584", icon: <TrophyOutlined /> },
    { label: "Còn hiệu lực", value: "542", color: "#52c41a" },
    { label: "Sắp hết hạn", value: "18", color: "#faad14" },
    { label: "Đã hết hạn", value: "24", color: "#ff4d4f" }
  ];

  const columns = [
    {
      title: <Text strong style={{ fontSize: 11 }}>CHỨNG CHỈ / NHÂN SỰ</Text>,
      render: (_: any, r: any) => (
        <Space size={12}>
           <div style={{ width: 32, height: 32, borderRadius: 4, background: '#fff7e6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#faad14' }}>
            <TrophyOutlined />
          </div>
          <div>
            <Text strong style={{ fontSize: 13, display: 'block' }}>{r.name}</Text>
            <Text type="secondary" style={{ fontSize: 11 }}>{r.holder}</Text>
          </div>
        </Space>
      ),
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>CƠ QUAN CẤP</Text>, 
      render: (_: any, r: any) => (
        <Space size={8}>
          <BankOutlined style={{ color: '#8c8c8c' }} />
          <Text style={{ fontSize: 12 }}>{r.issuer}</Text>
        </Space>
      ) 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>HẠN DÙNG</Text>, 
      render: (_: any, r: any) => (
        <div>
          <Text style={{ fontSize: 12, display: 'block' }}>{r.expiry}</Text>
          <Text type="secondary" style={{ fontSize: 10 }}>Cấp ngày {r.issueDate}</Text>
        </div>
      ) 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>, 
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.status === "Valid" ? "green" : r.status === "Expiring" ? "orange" : "red"} style={{ fontSize: 10, fontWeight: 700 }}>
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
        title="Credential & Certification Registry" 
        subtitle="Quản lý toàn bộ chứng chỉ hành nghề, bằng cấp chuyên môn và hệ thống cảnh báo hết hạn"
        primaryAction={{
            label: "Thêm chứng chỉ",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
        extra={<Button icon={<SafetyCertificateFilled />}>Xác thực chứng chỉ</Button>}
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm chứng chỉ, nhân sự, cơ quan cấp...">
        <Select placeholder="Trạng thái" style={{ width: 150 }} options={[{ value: "valid", label: "Hiệu lực" }]} />
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

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Chứng chỉ hành nghề" fields={CERT_FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.name} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}