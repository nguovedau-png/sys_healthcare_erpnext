"use client";
import { Card, Space, Row, Col, Typography, Avatar, Statistic, Tag, Progress, Button, message, Table } from "antd";
const { Title, Text, Paragraph } = Typography;
import { SolutionOutlined, SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, HistoryOutlined, BankOutlined } from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";
import { useState } from "react";

const DATA_INIT = [{ "id": 1, "position": "Senior Cardiologist", "organization": "Bệnh viện Đa khoa", "status": "Active" }, { "id": 2, "position": "Head Nurse", "organization": "Phòng khám VIP", "status": "Inactive" }];

const FIELDS: CrudField[] = [
  { name: "position", label: "Vị trí ứng tuyển", type: "text", placeholder: "Nhập Vị trí ứng tuyển...", required: true, span: 2 },
  { name: "organization", label: "Tổ chức", type: "text", placeholder: "Nhập Tổ chức..." },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "Active", label: "Hoạt động" }, { value: "Inactive", label: "Không hoạt động" }] },
];

export default function Page() {
  const [data, setData] = useState(DATA_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now() }, ...p]); setAddOpen(false); message.success("Đã thêm Đơn ứng tuyển mới!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật Đơn ứng tuyển thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xoá Đơn ứng tuyển!"); };

  const stats = [
    { label: "Đang ứng tuyển", value: "02", icon: <SolutionOutlined /> },
    { label: "Phản hồi", value: "01", color: "#0050b3" },
    { label: "Phỏng vấn", value: "00", color: "#52c41a" },
    { label: "Đã đóng", value: "05", color: "#8c8c8c" }
  ];

  const columns = [
    {
      title: <Text strong style={{ fontSize: 11 }}>VỊ TRÍ ỨNG TUYỂN</Text>,
      render: (_: any, r: any) => (
        <Space size={12}>
          <div style={{ width: 32, height: 32, borderRadius: 4, background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0050b3' }}>
            <SolutionOutlined />
          </div>
          <Text strong style={{ fontSize: 13 }}>{r.position}</Text>
        </Space>
      ),
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>TỔ CHỨC</Text>,
      render: (_: any, r: any) => (
        <Space size={8}>
          <BankOutlined style={{ color: '#8c8c8c' }} />
          <Text style={{ fontSize: 12 }}>{r.organization}</Text>
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
      ),
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader
        title="My Job Applications"
        subtitle="Theo dõi và quản lý hồ sơ ứng tuyển cá nhân và tiến trình xem xét của nhà tuyển dụng"
        primaryAction={{
          label: "Thêm đơn ứng tuyển",
          icon: <PlusOutlined />,
          onClick: () => setAddOpen(true)
        }}
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm kiếm đơn ứng tuyển..." />

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

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Đơn ứng tuyển" fields={FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.position} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}
