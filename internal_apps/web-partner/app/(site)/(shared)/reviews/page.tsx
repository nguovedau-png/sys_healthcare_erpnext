"use client";
import { Card, Space, Row, Col, Typography, Avatar, Statistic, Tag, Rate, Button, message, Select, Table } from "antd";
const { Title, Text, Paragraph } = Typography;
import { StarFilled, SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, LikeFilled, CommentOutlined, HistoryOutlined, MessageOutlined } from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";
import { useState } from "react";

const REVIEWS_INIT = [
  { id: 1, reviewer: "Nguyễn Văn A", service: "Khám Nội tổng quát", doctor: "Dr. Nguyễn Tấn Tới", rating: 5, comment: "Bác sĩ rất tận tình, dịch vụ chuyên nghiệp!", date: "25/04/2024", status: "Published" },
  { id: 2, reviewer: "Trần Thị B", service: "Xét nghiệm máu", doctor: "Dr. Lê Hoàng Nam", rating: 4, comment: "Kết quả nhanh, nhân viên thân thiện.", date: "24/04/2024", status: "Published" },
  { id: 3, reviewer: "Lê Văn C", service: "Nội soi dạ dày", doctor: "Dr. Phạm Minh Tuấn", rating: 3, comment: "Thời gian chờ đợi khá lâu.", date: "23/04/2024", status: "Pending" },
];

const REV_FIELDS: CrudField[] = [
  { name: "reviewer", label: "Tên người đánh giá", type: "text", placeholder: "Nguyễn Văn A", required: true },
  { name: "service", label: "Dịch vụ được đánh giá", type: "text", placeholder: "Khám Nội tổng quát", required: true },
  { name: "doctor", label: "Bác sĩ phụ trách", type: "text", placeholder: "Dr. Nguyễn Tấn Tới" },
  { name: "date", label: "Ngày đánh giá", type: "text", placeholder: "25/04/2024" },
  { name: "rating", label: "Điểm đánh giá (1-5)", type: "number", placeholder: "5", required: true },
  { name: "comment", label: "Nội dung nhận xét", type: "textarea", placeholder: "Nhập nội dung đánh giá...", span: 2 },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "Published", label: "Đã công bố" }, { value: "Pending", label: "Chờ duyệt" }, { value: "Hidden", label: "Ẩn" }] },
];

export default function ReviewsPage() {
  const [data, setData] = useState(REVIEWS_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now() }, ...p]); setAddOpen(false); message.success("Đã thêm đánh giá!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật đánh giá thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xoá đánh giá!"); };

  const stats = [
    { label: "Tổng đánh giá", value: "2,841", icon: <StarFilled /> },
    { label: "Điểm TB (5)", value: "4.7", color: "#faad14" },
    { label: "5 sao", value: "78%", color: "#52c41a" },
    { label: "Chờ duyệt", value: "12", color: "#f5222d" }
  ];

  const columns = [
    {
      title: <Text strong style={{ fontSize: 11 }}>NGƯỜI ĐÁNH GIÁ</Text>,
      render: (_: any, r: any) => (
        <Space size={12}>
           <div style={{ width: 32, height: 32, borderRadius: 4, background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0050b3' }}>
            <Avatar size="small" style={{ backgroundColor: '#0050b3' }}>{r.reviewer.charAt(0)}</Avatar>
          </div>
          <div>
            <Text strong style={{ fontSize: 13, display: 'block' }}>{r.reviewer}</Text>
            <Text type="secondary" style={{ fontSize: 11 }}>{r.date}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>DỊCH VỤ / BÁC SĨ</Text>,
      render: (_: any, r: any) => (
        <div>
          <Text strong style={{ fontSize: 12, display: 'block' }}>{r.service}</Text>
          <Text type="secondary" style={{ fontSize: 11 }}>{r.doctor}</Text>
        </div>
      ),
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>ĐIỂM</Text>,
      render: (_: any, r: any) => <Rate disabled defaultValue={r.rating} style={{ fontSize: 12 }} />
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>NHẬN XÉT</Text>,
      render: (_: any, r: any) => <Text style={{ fontSize: 12 }}>{r.comment}</Text>,
      width: 300,
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>, 
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.status === "Published" ? "green" : "orange"} style={{ fontSize: 10, fontWeight: 700 }}>
          {r.status.toUpperCase()}
        </Tag>
      ) 
    },
    {
      title: "",
      render: (_: any, r: any) => (
        <Space size={8}>
          <Button type="text" size="small" icon={<MessageOutlined />} />
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => setEditRecord(r)} />
          <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => setDeleteRecord(r)} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader 
        title="Patient Experience & Reviews" 
        subtitle="Quản lý đánh giá dịch vụ y tế, theo dõi chỉ số NPS và cải thiện trải nghiệm bệnh nhân dựa trên phản hồi thực tế"
        primaryAction={{
            label: "Thêm đánh giá",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
        extra={<Button icon={<HistoryOutlined />}>Lịch sử phản hồi</Button>}
      />

      <EhrStatCards stats={stats} />

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={24}>
            <Card bordered={false} style={{ background: '#431407', borderRadius: 8, color: 'white' }}>
                <Row gutter={[24, 24]} align="middle">
                    <Col flex="1">
                        <Title level={4} style={{ color: 'white', margin: 0 }}><LikeFilled style={{ color: '#faad14' }} /> AI Sentiment & NPS Tracking</Title>
                        <Paragraph style={{ color: 'rgba(255,255,255,0.6)', margin: '8px 0 0 0' }}>
                            Hệ thống AI phân tích cảm xúc bệnh nhân tự động và dự báo chỉ số NPS theo từng khoa phòng.
                        </Paragraph>
                    </Col>
                    <Col>
                        <div style={{ textAlign: 'right' }}>
                            <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, textTransform: 'uppercase' }}>Net Promoter Score</Text>
                            <div style={{ fontSize: 32, fontWeight: 900, color: '#faad14' }}>+72</div>
                        </div>
                    </Col>
                </Row>
            </Card>
        </Col>
      </Row>

      <EhrFilterBar placeholder="Tìm người đánh giá, dịch vụ, bác sĩ...">
        <Select placeholder="Trạng thái" style={{ width: 150 }} options={[{ value: "pub", label: "Đã công bố" }]} />
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

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Đánh giá bệnh nhân" fields={REV_FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.reviewer} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}