"use client";
import { Card, Space, Row, Col, Typography, Avatar, Statistic, Tag, Progress, Button, message, Select, Table } from "antd";
const { Title, Text, Paragraph } = Typography;
import { ToolOutlined, SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, QrcodeOutlined, HistoryOutlined, AlertOutlined, SafetyCertificateOutlined, AppstoreOutlined, ThunderboltOutlined } from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";
import { useState } from "react";

const EQ_INIT = [
  { id: 1, name: "Máy MRI 3.0T Siemens", code: "MRI-001", department: "Khoa Chẩn đoán hình ảnh", status: "Active", condition: 95, nextMaintenance: "15/06/2024", manufacturer: "Siemens" },
  { id: 2, name: "Máy thở Hamilton C6", code: "VNT-012", department: "Khoa ICU", status: "In Use", condition: 88, nextMaintenance: "01/06/2024", manufacturer: "Hamilton Medical" },
  { id: 3, name: "Máy siêu âm GE Logiq", code: "USG-047", department: "Khoa Sản", status: "Maintenance", condition: 72, nextMaintenance: "25/04/2024", manufacturer: "GE Healthcare" },
];

const EQ_FIELDS: CrudField[] = [
  { name: "name", label: "Tên thiết bị", type: "text", placeholder: "Máy MRI 3.0T Siemens", required: true, span: 2 },
  { name: "code", label: "Mã thiết bị", type: "text", placeholder: "MRI-001", required: true },
  { name: "manufacturer", label: "Hãng sản xuất", type: "text", placeholder: "Siemens" },
  { name: "department", label: "Khoa phụ trách", type: "select", required: true, options: [{ value: "Khoa Chẩn đoán hình ảnh", label: "Chẩn đoán hình ảnh" }, { value: "Khoa ICU", label: "ICU" }, { value: "Khoa Sản", label: "Khoa Sản" }, { value: "Khoa Nội", label: "Khoa Nội" }] },
  { name: "condition", label: "Tình trạng (%)", type: "number", placeholder: "95" },
  { name: "nextMaintenance", label: "Ngày bảo trì tới", type: "text", placeholder: "15/06/2024" },
  { name: "status", label: "Trạng thái hoạt động", type: "select", required: true, options: [{ value: "Active", label: "Hoạt động" }, { value: "In Use", label: "Đang sử dụng" }, { value: "Maintenance", label: "Bảo trì" }, { value: "Inactive", label: "Ngưng hoạt động" }] },
];

export default function EquipmentPage() {
  const [data, setData] = useState(EQ_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now() }, ...p]); setAddOpen(false); message.success("Đã thêm thiết bị mới!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật thiết bị thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xóa thiết bị!"); };

  const stats = [
    { label: "Tổng thiết bị", value: "248", icon: <AppstoreOutlined /> },
    { label: "IoT Online", value: "142", color: "#0050b3" },
    { label: "Cần bảo trì", value: "24", color: "#faad14" },
    { label: "Đã xác thực", value: "100%", color: "#52c41a" }
  ];

  const columns = [
    {
      title: <Text strong style={{ fontSize: 11 }}>THIẾT BỊ / MÃ</Text>,
      render: (_: any, r: any) => (
        <Space size={12}>
           <div style={{ width: 32, height: 32, borderRadius: 4, background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0050b3' }}>
            <ToolOutlined />
          </div>
          <div>
            <Text strong style={{ fontSize: 13, display: 'block' }}>{r.name}</Text>
            <Text type="secondary" style={{ fontSize: 11 }}>{r.code} • {r.manufacturer}</Text>
          </div>
        </Space>
      ),
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>KHOA PHỤ TRÁCH</Text>, 
      render: (_: any, r: any) => <Text style={{ fontSize: 12 }}>{r.department}</Text> 
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>TÌNH TRẠNG</Text>,
      render: (_: any, r: any) => (
        <div style={{ width: 150 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
            <Text type="secondary" style={{ fontSize: 10 }}>Health Index</Text>
            <Text strong style={{ fontSize: 10 }}>{r.condition}%</Text>
          </div>
          <Progress percent={r.condition} showInfo={false} strokeColor={r.condition > 85 ? "#52c41a" : "#faad14"} size="small" />
        </div>
      ),
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>BẢO TRÌ KẾ TIẾP</Text>, 
      render: (_: any, r: any) => (
        <Tag bordered={false} color="blue" style={{ fontSize: 10, fontWeight: 700 }}>
          {r.nextMaintenance}
        </Tag>
      ) 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>, 
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.status === "Active" ? "green" : r.status === "Maintenance" ? "orange" : "default"} style={{ fontSize: 10, fontWeight: 700 }}>
          {r.status.toUpperCase()}
        </Tag>
      ) 
    },
    {
      title: "",
      render: (_: any, r: any) => (
        <Space size={8}>
          <Button type="text" size="small" icon={<QrcodeOutlined />} />
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => setEditRecord(r)} />
          <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => setDeleteRecord(r)} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader 
        title="Medical Equipment Asset Hub" 
        subtitle="Quản lý vòng đời thiết bị y tế, lịch bảo trì phòng ngừa và hệ thống giám sát IoT"
        primaryAction={{
            label: "Đăng ký thiết bị",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
        extra={<Button icon={<HistoryOutlined />}>Lịch sử bảo trì</Button>}
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm thiết bị, mã, khoa...">
        <Select placeholder="Khoa phụ trách" style={{ width: 150 }} options={[{ value: "all", label: "Tất cả" }]} />
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

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Thiết bị y tế" fields={EQ_FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.name} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}