"use client";
import { Card, Space, Row, Col, Typography, Avatar, Statistic, Tag, Progress, Button, message, Table, Select } from "antd";
const { Title, Text, Paragraph } = Typography;
import { BookOutlined, SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, ReadOutlined, GlobalOutlined, HistoryOutlined } from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";
import { useState } from "react";

const DATA_INIT = [{"id":1,"title":"Hiệu quả điều trị Metformin trong ĐTĐ Type 2","authors":"Nguyễn Văn A, Trần Thị B","status":"Active"},{"id":2,"title":"Phác đồ mới trong điều trị suy tim","authors":"Lê Văn C","status":"Active"}];

const FIELDS: CrudField[] = [
  { name: "title", label: "Tiêu đề bài báo", type: "text", placeholder: "Nhập Tiêu đề bài báo...", required: true, span: 2 },
  { name: "authors", label: "Tác giả", type: "text", placeholder: "Nhập Tác giả..." },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "Active", label: "Hoạt động" }, { value: "Inactive", label: "Không hoạt động" }] },
];

export default function Page() {
  const [data, setData] = useState(DATA_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now() }, ...p]); setAddOpen(false); message.success("Đã thêm Bài báo mới!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật Bài báo thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xoá Bài báo!"); };

  const stats = [
    { label: "Bài báo xuất bản", value: "245", icon: <BookOutlined /> },
    { label: "Chỉ số Impact", value: "4.8", color: "#0050b3" },
    { label: "Lượt trích dẫn", value: "1.2k", color: "#52c41a" },
    { label: "Tác giả hợp tác", value: "85", color: "#faad14" }
  ];

  const columns = [
    {
      title: <Text strong style={{ fontSize: 11 }}>TIÊU ĐỀ BÀI BÁO / TÁC GIẢ</Text>,
      render: (_: any, r: any) => (
        <Space size={12}>
           <div style={{ width: 32, height: 32, borderRadius: 4, background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0050b3' }}>
            <ReadOutlined />
          </div>
          <div>
            <Text strong style={{ fontSize: 13, display: 'block' }}>{r.title}</Text>
            <Text type="secondary" style={{ fontSize: 11 }}>{r.authors}</Text>
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
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => setEditRecord(r)} />
          <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => setDeleteRecord(r)} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader 
        title="Medical Journal & Publications" 
        subtitle="Quản lý bài báo y học, nghiên cứu lâm sàng và hệ thống xuất bản khoa học chuyên ngành"
        primaryAction={{
            label: "Gửi bản thảo",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
      />

      <EhrStatCards stats={stats} />

      <EhrFilterBar placeholder="Tìm tiêu đề, tác giả, chuyên khoa..." />

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

      <Card bordered={false} style={{ background: '#1e1b4b', borderRadius: 4 }} bodyStyle={{ padding: 40 }}>
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} lg={16}>
            <Title level={4} style={{ color: 'white', margin: 0, fontWeight: 700 }}>AI Research Assistant</Title>
            <Paragraph style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, margin: '16px 0' }}>
                Hệ thống AI hỗ trợ tóm tắt bài báo, kiểm tra đạo văn và gợi ý các tài liệu tham khảo phù hợp dựa trên cơ sở dữ liệu PubMed.
            </Paragraph>
            <Space size="middle">
                <Button type="primary" style={{ height: 40, padding: '0 24px', fontWeight: 600 }}>BẮT ĐẦU PHÂN TÍCH</Button>
                <Button ghost icon={<GlobalOutlined />} style={{ height: 40, padding: '0 24px', fontWeight: 600, borderColor: 'rgba(255,255,255,0.2)' }}>TÌM KIẾM TOÀN CẦU</Button>
            </Space>
          </Col>
          <Col xs={24} lg={8} style={{ textAlign: 'center' }}>
             <div style={{ color: 'white' }}>
                <Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 2 }}>Cơ sở dữ liệu</Text>
                <div style={{ fontSize: 48, fontWeight: 900, lineHeight: 1, margin: '8px 0' }}>25M+</div>
                <Text strong style={{ fontSize: 14 }}>BÀI BÁO Y KHOA</Text>
             </div>
          </Col>
        </Row>
      </Card>

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Bài báo" fields={FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.title} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}
