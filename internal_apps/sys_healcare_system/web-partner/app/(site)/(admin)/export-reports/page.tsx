"use client";
import { Card, Space, Row, Col, Typography, Avatar, Statistic, Tag, Progress, Button, message, Table, Select } from "antd";
const { Title, Text, Paragraph } = Typography;
import { FileExcelOutlined, SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, DownloadOutlined, FilePdfOutlined, FileTextOutlined } from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";
import { useState } from "react";

const DATA_INIT = [{"id":1,"reportName":"Báo cáo doanh thu tháng 04","format":"Excel","status":"Active"},{"id":2,"reportName":"Danh sách bệnh nhân Q1","format":"PDF","status":"Inactive"}];

const FIELDS: CrudField[] = [
  { name: "reportName", label: "Tên báo cáo", type: "text", placeholder: "Nhập Tên báo cáo...", required: true, span: 2 },
  { name: "format", label: "Định dạng", type: "text", placeholder: "Nhập Định dạng..." },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "Active", label: "Hoạt động" }, { value: "Inactive", label: "Không hoạt động" }] },
];

export default function Page() {
  const [data, setData] = useState(DATA_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now() }, ...p]); setAddOpen(false); message.success("Đã thêm Báo cáo xuất mới!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật Báo cáo xuất thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xoá Báo cáo xuất!"); };

  const stats = [
    { label: "Báo cáo đã xuất", value: "1,240", icon: <FileExcelOutlined /> },
    { label: "Lập lịch tự động", value: "12", color: "#0050b3" },
    { label: "Dung lượng lưu trữ", value: "1.2 GB", color: "#52c41a" },
    { label: "Yêu cầu mới", value: "05", color: "#faad14" }
  ];

  const columns = [
    {
      title: <Text strong style={{ fontSize: 11 }}>TÊN BÁO CÁO / ĐỊNH DẠNG</Text>,
      render: (_: any, r: any) => (
        <Space size={12}>
           <div style={{ width: 32, height: 32, borderRadius: 4, background: r.format === 'Excel' ? '#f6ffed' : '#fff1f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: r.format === 'Excel' ? '#52c41a' : '#ff4d4f' }}>
            {r.format === 'Excel' ? <FileExcelOutlined /> : <FilePdfOutlined />}
          </div>
          <div>
            <Text strong style={{ fontSize: 13, display: 'block' }}>{r.reportName}</Text>
            <Text type="secondary" style={{ fontSize: 11 }}>{r.format}</Text>
          </div>
        </Space>
      ),
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
          <Button type="text" size="small" icon={<DownloadOutlined />} />
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => setEditRecord(r)} />
          <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => setDeleteRecord(r)} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader 
        title="Export & Data Reports" 
        subtitle="Xuất dữ liệu báo cáo dưới nhiều định dạng (Excel, PDF, CSV) và lập lịch báo cáo tự động"
        primaryAction={{
            label: "Tạo báo cáo mới",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm báo cáo, định dạng, ngày xuất..." />

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

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Báo cáo xuất" fields={FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.reportName} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}