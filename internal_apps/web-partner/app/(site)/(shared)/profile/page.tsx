"use client";
import { Card, Space, Row, Col, Typography, Avatar, Statistic, Tag, Button, message, Select, Table } from "antd";
const { Title, Text, Paragraph } = Typography;
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, BankOutlined, HistoryOutlined, SafetyCertificateOutlined, TeamOutlined, GlobalOutlined } from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";
import { useState } from "react";

const FIELDS: CrudField[] = [
  { name: "orgName", label: "Tên tổ chức", type: "text", placeholder: "Nhập Tên tổ chức...", required: true, span: 2 },
  { name: "licenseNo", label: "Số GPKD", type: "text", placeholder: "GP-XXX/BYT" },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "Active", label: "Hoạt động" }, { value: "Inactive", label: "Không hoạt động" }] },
];

const DATA_INIT = [{"id":1,"orgName":"Bệnh viện Đa khoa Quốc tế","licenseNo":"GP-001/BYT","status":"Active", "type": "Hospital"},{"id":2,"orgName":"Phòng khám Đa khoa VIP","licenseNo":"GP-002/BYT","status":"Active", "type": "Clinic"}];

export default function ProfilePage() {
  const [data, setData] = useState(DATA_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now() }, ...p]); setAddOpen(false); message.success("Đã thêm Hồ sơ mới!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật Hồ sơ thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xóa Hồ sơ!"); };

  const stats = [
    { label: "Tổ chức đăng ký", value: "02", icon: <BankOutlined /> },
    { label: "Giấy phép xác thực", value: "100%", color: "#52c41a" },
    { label: "Tổng nhân sự", value: "842", color: "#0050b3" },
    { label: "Khu vực phủ", value: "05", color: "#faad14" }
  ];

  const columns = [
    { 
      title: <Text strong style={{ fontSize: 11 }}>TỔ CHỨC / LOẠI HÌNH</Text>, 
      render: (_: any, r: any) => (
        <Space size={12}>
           <div style={{ width: 32, height: 32, borderRadius: 4, background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0050b3' }}>
            <BankOutlined />
          </div>
          <div>
            <Text strong style={{ fontSize: 13, display: 'block' }}>{r.orgName}</Text>
            <Text type="secondary" style={{ fontSize: 11 }}>{r.type}</Text>
          </div>
        </Space>
      ) 
    },
    { 
        title: <Text strong style={{ fontSize: 11 }}>SỐ GIẤY PHÉP</Text>, 
        render: (_: any, r: any) => (
            <Space size={4}>
                <SafetyCertificateOutlined style={{ color: '#52c41a' }} />
                <Text style={{ fontSize: 12 }}>{r.licenseNo}</Text>
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
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => setEditRecord(r)} />
          <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => setDeleteRecord(r)} />
        </Space>
      ) 
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader 
        title="Partner Profile Management" 
        subtitle="Quản lý hồ sơ đối tác y tế, thông tin pháp lý và thiết lập tài khoản tổ chức"
        primaryAction={{
            label: "Thêm tổ chức",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
        extra={<Button icon={<HistoryOutlined />}>Lịch sử hồ sơ</Button>}
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm tổ chức, số giấy phép...">
        <Select placeholder="Loại hình" style={{ width: 150 }} options={[{ value: "hosp", label: "Bệnh viện" }]} />
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

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Hồ sơ đối tác" fields={FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.orgName} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}