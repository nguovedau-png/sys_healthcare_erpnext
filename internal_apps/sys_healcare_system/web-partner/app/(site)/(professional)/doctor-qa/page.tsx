"use client";
import React, { useState } from "react";
import { Card, Space, Row, Col, Typography, Tag, Button, Table, message, Select, Avatar, Input, Badge } from "antd";
const { Title, Text, Paragraph, TextArea } = Typography;
import {
  QuestionCircleOutlined, PlusOutlined, EditOutlined, DeleteOutlined,
  CheckCircleFilled, ClockCircleOutlined, MedicineBoxOutlined,
  HeartOutlined, LikeOutlined, EyeOutlined, SendOutlined
} from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

const QA_INIT = [
  { id: 1, question: "Bệnh nhân tiểu đường type 2 có thể ăn trái cây không?", category: "Dinh dưỡng", askedBy: "Nguyễn Thị A", askedAt: "10:30 Hôm nay", status: "Answered", answeredBy: "BS. Nguyễn Văn Minh", likes: 24, views: 142, answer: "Người bệnh tiểu đường có thể ăn trái cây với lượng vừa phải. Nên chọn trái cây ít đường như ổi, thanh long, dâu tây. Tránh các loại quá ngọt như xoài chín, nhãn, vải." },
  { id: 2, question: "Thuốc huyết áp Amlodipine uống vào buổi sáng hay tối tốt hơn?", category: "Tim mạch", askedBy: "Trần Văn B", askedAt: "Hôm qua", status: "Answered", answeredBy: "BS. Lê Thị Thu", likes: 18, views: 89, answer: "Amlodipine có thể uống bất kỳ lúc nào trong ngày, nhưng nên chọn một giờ cố định mỗi ngày để dễ nhớ. Một số nghiên cứu cho thấy uống buổi tối có thể có hiệu quả kiểm soát huyết áp ban đêm tốt hơn." },
  { id: 3, question: "Trẻ em 6 tuổi bị sốt 38.5°C có cần uống thuốc hạ sốt ngay không?", category: "Nhi khoa", askedBy: "Phạm Thị C", askedAt: "1 giờ trước", status: "Pending", answeredBy: "", likes: 5, views: 28, answer: "" },
];

const FIELDS: CrudField[] = [
  { name: "question", label: "Câu hỏi", type: "text", placeholder: "Nhập câu hỏi của bạn...", required: true, span: 2 },
  { name: "category", label: "Chuyên khoa", type: "select", required: true, options: [
    { value: "Nội khoa", label: "Nội khoa" }, { value: "Nhi khoa", label: "Nhi khoa" },
    { value: "Tim mạch", label: "Tim mạch" }, { value: "Dinh dưỡng", label: "Dinh dưỡng" },
    { value: "Sản phụ khoa", label: "Sản phụ khoa" }, { value: "Da liễu", label: "Da liễu" },
    { value: "Thần kinh", label: "Thần kinh" }, { value: "Cơ xương khớp", label: "Cơ xương khớp" },
  ]},
  { name: "askedBy", label: "Người hỏi", type: "text", placeholder: "Nguyễn Văn A" },
];

export default function DoctorQAPage() {
  const [data, setData] = useState(QA_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);
  const [selectedQ, setSelectedQ] = useState<any | null>(QA_INIT[0]);

  const handleAdd = (v: any) => { setData((p) => [{ ...v, id: Date.now(), askedAt: "Vừa xong", status: "Pending", answeredBy: "", likes: 0, views: 0, answer: "" }, ...p]); setAddOpen(false); message.success("Đã gửi câu hỏi — Bác sĩ sẽ trả lời trong vòng 24h!"); };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xóa!"); };

  const stats = [
    { label: "Câu hỏi hôm nay", value: "48", icon: <QuestionCircleOutlined /> },
    { label: "Đã trả lời", value: data.filter(d => d.status === "Answered").length, color: "#52c41a" },
    { label: "Chờ phản hồi", value: data.filter(d => d.status === "Pending").length, color: "#faad14" },
    { label: "Bác sĩ trực tuyến", value: "12", color: "#0050b3" },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader
        title="Hỏi đáp trực tiếp với Bác sĩ"
        subtitle="Kênh hỏi đáp y tế trực tiếp với đội ngũ bác sĩ chuyên khoa — Được trả lời trong vòng 24 giờ"
        primaryAction={{ label: "Đặt câu hỏi mới", icon: <PlusOutlined />, onClick: () => setAddOpen(true) }}
      />

      <EhrStatCards stats={stats} />

      <Row gutter={[20, 20]} style={{ marginTop: 8 }}>
        {/* Q&A List */}
        <Col xs={24} lg={14}>
          <EhrFilterBar placeholder="Tìm câu hỏi, chuyên khoa...">
            <Select placeholder="Chuyên khoa" style={{ width: 150 }} options={[{ value: "noi", label: "Nội khoa" }, { value: "nhi", label: "Nhi khoa" }]} />
            <Select placeholder="Trạng thái" style={{ width: 140 }} options={[{ value: "answered", label: "Đã trả lời" }, { value: "pending", label: "Chờ trả lời" }]} />
          </EhrFilterBar>
          <Space direction="vertical" style={{ width: "100%" }} size={12}>
            {data.map(q => (
              <Card
                key={q.id}
                className="ehr-card"
                hoverable
                onClick={() => setSelectedQ(q)}
                style={{ cursor: "pointer", borderColor: selectedQ?.id === q.id ? "#0050b3" : undefined }}
                bodyStyle={{ padding: 16 }}
              >
                <Space size={12} align="start" style={{ width: "100%" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 4, background: q.status === "Answered" ? "#f6ffed" : "#fff7e6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {q.status === "Answered" ? <CheckCircleFilled style={{ color: "#52c41a" }} /> : <ClockCircleOutlined style={{ color: "#faad14" }} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Text strong style={{ fontSize: 13, display: "block", marginBottom: 4 }}>{q.question}</Text>
                    <Space size={8}>
                      <Tag bordered={false} color="blue" style={{ fontSize: 10 }}>{q.category}</Tag>
                      <Text type="secondary" style={{ fontSize: 10 }}>{q.askedBy} · {q.askedAt}</Text>
                    </Space>
                    <div style={{ marginTop: 8, display: "flex", gap: 16 }}>
                      <Text type="secondary" style={{ fontSize: 11 }}><EyeOutlined /> {q.views}</Text>
                      <Text type="secondary" style={{ fontSize: 11 }}><LikeOutlined /> {q.likes}</Text>
                    </div>
                  </div>
                  <Space size={4}>
                    <Button type="text" size="small" icon={<EditOutlined />} onClick={(e) => { e.stopPropagation(); setEditRecord(q); }} />
                    <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={(e) => { e.stopPropagation(); setDeleteRecord(q); }} />
                  </Space>
                </Space>
              </Card>
            ))}
          </Space>
        </Col>

        {/* Answer Panel */}
        <Col xs={24} lg={10}>
          {selectedQ && (
            <Card className="ehr-card" title={<Space><MedicineBoxOutlined style={{ color: "#0050b3" }} />Chi tiết câu hỏi</Space>} style={{ position: "sticky", top: 24 }}>
              <Space direction="vertical" style={{ width: "100%" }} size={16}>
                <div style={{ background: "#f0f5ff", padding: 16, borderRadius: 4, borderLeft: "3px solid #0050b3" }}>
                  <Text strong style={{ fontSize: 14 }}>{selectedQ.question}</Text>
                </div>
                <Space>
                  <Tag bordered={false} color="blue">{selectedQ.category}</Tag>
                  <Text type="secondary" style={{ fontSize: 11 }}>Bởi {selectedQ.askedBy} · {selectedQ.askedAt}</Text>
                </Space>
                {selectedQ.answer && (
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <Avatar size="small" style={{ backgroundColor: "#52c41a" }}>BS</Avatar>
                      <Text strong style={{ fontSize: 12, color: "#135200" }}>{selectedQ.answeredBy}</Text>
                      <Tag bordered={false} color="success" style={{ fontSize: 10 }}>ĐÃ XÁC NHẬN</Tag>
                    </div>
                    <div style={{ background: "#f6ffed", padding: 16, borderRadius: 4, borderLeft: "3px solid #52c41a" }}>
                      <Paragraph style={{ fontSize: 13, margin: 0 }}>{selectedQ.answer}</Paragraph>
                    </div>
                    <div style={{ marginTop: 8, display: "flex", gap: 16 }}>
                      <Button size="small" icon={<LikeOutlined />} onClick={() => message.success("Đã thích câu trả lời!")}>Hữu ích ({selectedQ.likes})</Button>
                    </div>
                  </div>
                )}
                {!selectedQ.answer && (
                  <div>
                    <Text type="secondary" style={{ fontSize: 12, display: "block", marginBottom: 8 }}>Nhập câu trả lời của bác sĩ:</Text>
                    <Input.TextArea rows={4} placeholder="Nhập câu trả lời chuyên môn..." style={{ borderRadius: 4 }} />
                    <Button type="primary" icon={<SendOutlined />} style={{ marginTop: 8 }} onClick={() => {
                      setData(p => p.map(r => r.id === selectedQ.id ? { ...r, status: "Answered", answeredBy: "BS. Đang trực", answer: "Câu trả lời đã được ghi nhận và sẽ hiển thị sau khi xác nhận." } : r));
                      setSelectedQ((s: any) => ({ ...s, status: "Answered", answer: "Câu trả lời đã được ghi nhận." }));
                      message.success("Đã gửi câu trả lời!");
                    }}>Gửi câu trả lời</Button>
                  </div>
                )}
              </Space>
            </Card>
          )}
        </Col>
      </Row>

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Câu hỏi y tế" fields={FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.question} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}
