"use client";
import React, { useState } from "react";
import { Card, Space, Row, Col, Typography, Avatar, Statistic, Tag, Table, message, Select, Button } from "antd";
const { Title, Text, Paragraph } = Typography;
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, GiftOutlined, HistoryOutlined, TrophyOutlined } from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

const DATA_INIT = [
  {"id":1,"patientName":"Nguyễn Văn A","points":"2,450","status":"Active", "rank": "Platinum"},
  {"id":2,"patientName":"Trần Thị B","points":"1,200","status":"Active", "rank": "Gold"}
];

const FIELDS: CrudField[] = [
  { name: "patientName", label: "Tên bệnh nhân", type: "text", placeholder: "Nhập Tên bệnh nhân...", required: true, span: 2 },
  { name: "points", label: "Điểm tích lũy", type: "text", placeholder: "Nhập Điểm tích lũy..." },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "Active", label: "Hoạt động" }, { value: "Inactive", label: "Không hoạt động" }] },
];

export default function LoyaltyPage() {
  const [data, setData] = useState(DATA_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now() }, ...p]); setAddOpen(false); message.success("Đã thêm Điểm thưởng mới!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật Điểm thưởng thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xoá Điểm thưởng!"); };

  const stats = [
    { label: "Bệnh nhân thân thiết", value: "1,242", icon: <TrophyOutlined /> },
    { label: "Tổng điểm cấp", value: "850k", color: "#0050b3" },
    { label: "Điểm đã đổi", value: "210k", color: "#52c41a" },
    { label: "Hạng Platinum", value: "42", color: "#faad14" }
  ];

  const columns = [
    { 
      title: <Text strong style={{ fontSize: 11 }}>BỆNH NHÂN</Text>, 
      render: (_: any, r: any) => (
        <Space size={12}>
           <div style={{ width: 32, height: 32, borderRadius: 4, background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0050b3' }}>
            <Avatar size="small" style={{ backgroundColor: '#0050b3' }}>{r.patientName.charAt(0)}</Avatar>
          </div>
          <Text strong style={{ fontSize: 13 }}>{r.patientName}</Text>
        </Space>
      ) 
    },
    { title: <Text strong style={{ fontSize: 11 }}>ĐIỂM TÍCH LŨY</Text>, render: (_: any, r: any) => <Text strong style={{ fontSize: 13, color: '#0050b3' }}>{r.points}</Text> },
    { 
        title: <Text strong style={{ fontSize: 11 }}>HẠNG</Text>, 
        render: (_: any, r: any) => (
          <Tag bordered={false} color={r.rank === "Platinum" ? "purple" : "gold"} style={{ fontSize: 10, fontWeight: 700 }}>
            {r.rank.toUpperCase()}
          </Tag>
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
    { title: "", render: (_: any, r: any) => (
      <Space size={8}>
        <Button type="text" size="small" icon={<GiftOutlined />} />
        <Button type="text" size="small" icon={<EditOutlined />} onClick={() => setEditRecord(r)} />
        <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => setDeleteRecord(r)} />
      </Space>
    )},
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader 
        title="Patient Loyalty & Rewards" 
        subtitle="Hệ thống quản lý điểm thưởng, hạng thành viên và các chương trình ưu đãi dành cho bệnh nhân thân thiết"
        primaryAction={{
            label: "Thêm thành viên",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
        extra={<Button icon={<HistoryOutlined />}>Lịch sử đổi điểm</Button>}
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm tên bệnh nhân, mã thẻ...">
         <Select placeholder="Hạng thành viên" style={{ width: 150 }} options={[{ value: "plat", label: "Platinum" }]} />
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

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Điểm thưởng" fields={FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.patientName} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}