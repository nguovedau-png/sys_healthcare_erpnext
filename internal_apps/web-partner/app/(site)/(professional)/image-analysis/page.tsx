"use client";
import React, { useState } from "react";
import { Card, Space, Row, Col, Typography, Tag, Button, Table, Progress, message, Select, Avatar, Statistic } from "antd";
const { Title, Text, Paragraph } = Typography;
import {
  PictureOutlined,
  CloudUploadOutlined,
  HistoryOutlined,
  AimOutlined,
  ThunderboltFilled,
  CheckCircleFilled,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  MedicineBoxOutlined
} from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

const DATA_INIT = [
  { id: 1, imageName: "X-Quang ngực AP", imageType: "X-Ray", patient: "Nguyễn Văn A", patientId: "BN-4281", date: "10:30 Hôm nay", status: "AI Processed", aiScore: 98.2, finding: "Phổi bình thường, không có dấu hiệu bất thường", dicomId: "DCM-20240425-001" },
  { id: 2, imageName: "CT Scan bụng có thuốc cản quang", imageType: "CT-Scan", patient: "Trần Thị B", patientId: "BN-9902", date: "09:15 Hôm nay", status: "Pending Review", aiScore: 91.5, finding: "Phát hiện khối mờ ở hạ sườn phải cần xem xét thêm", dicomId: "DCM-20240425-002" },
  { id: 3, imageName: "MRI não không thuốc cản quang", imageType: "MRI", patient: "Lê Văn C", patientId: "BN-1105", date: "Hôm qua", status: "Reviewed", aiScore: 99.1, finding: "Không có tổn thương nhu mô não", dicomId: "DCM-20240424-015" },
];

const FIELDS: CrudField[] = [
  { name: "imageName", label: "Tên hình ảnh / Loại chụp", type: "text", placeholder: "X-Quang ngực AP", required: true, span: 2 },
  { name: "imageType", label: "Phương thức chẩn đoán", type: "select", required: true, options: [{ value: "X-Ray", label: "X-Quang" }, { value: "CT-Scan", label: "CT Scan" }, { value: "MRI", label: "MRI" }, { value: "Ultrasound", label: "Siêu âm" }, { value: "PET-CT", label: "PET-CT" }] },
  { name: "patient", label: "Bệnh nhân", type: "text", placeholder: "Nguyễn Văn A" },
  { name: "patientId", label: "Mã bệnh nhân", type: "text", placeholder: "BN-XXXX" },
  { name: "finding", label: "Nhận xét sơ bộ", type: "text", placeholder: "Mô tả dấu hiệu, tổn thương...", span: 2 },
];

export default function ImageAnalysisPage() {
  const [data, setData] = useState(DATA_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => {
    setData((p) => [{ ...v, id: Date.now(), date: "Vừa tải lên", status: "Pending AI", aiScore: 0, dicomId: `DCM-${Date.now()}` }, ...p]);
    setAddOpen(false);
    message.success("Đã tải hình ảnh lên PACS — AI đang phân tích...");
  };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xóa hình ảnh!"); };

  const stats = [
    { label: "Ảnh chờ phân tích", value: data.filter(d => d.status === 'Pending Review').length.toString(), icon: <PictureOutlined /> },
    { label: "Đã xử lý AI hôm nay", value: "856", color: "#0050b3" },
    { label: "Độ chính xác AI trung bình", value: "98.5%", color: "#52c41a" },
    { label: "Thời gian xử lý TB", value: "1.2s", color: "#faad14" }
  ];

  const columns = [
    {
      title: <Text strong style={{ fontSize: 11 }}>HÌNH ẢNH / DICOM ID</Text>,
      render: (_: any, r: any) => (
        <Space size={12}>
          <div style={{ width: 40, height: 40, borderRadius: 4, background: '#001529', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#69c0ff' }}>
            <PictureOutlined style={{ fontSize: 18 }} />
          </div>
          <div>
            <Text strong style={{ fontSize: 13, display: 'block' }}>{r.imageName}</Text>
            <Space size={4}>
              <Tag color="blue" bordered={false} style={{ fontSize: 9, fontWeight: 700 }}>{r.imageType}</Tag>
              <Text type="secondary" style={{ fontSize: 10 }}>{r.dicomId}</Text>
            </Space>
          </div>
        </Space>
      ),
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>BỆNH NHÂN</Text>,
      render: (_: any, r: any) => (
        <div>
          <Text strong style={{ fontSize: 12 }}>{r.patient}</Text>
          <div style={{ fontSize: 10, color: '#8c8c8c' }}>{r.patientId}</div>
        </div>
      )
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>NHẬN XÉT AI</Text>,
      render: (_: any, r: any) => (
        <div style={{ maxWidth: 200 }}>
          {r.status === 'AI Processed' || r.status === 'Reviewed' ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <Text type="secondary" style={{ fontSize: 9 }}>AI Confidence</Text>
                <Text strong style={{ fontSize: 9 }}>{r.aiScore}%</Text>
              </div>
              <Progress percent={r.aiScore} size="small" showInfo={false} strokeColor={r.aiScore >= 95 ? '#52c41a' : '#faad14'} />
              <Text type="secondary" style={{ fontSize: 10, display: 'block', marginTop: 4 }}>{r.finding}</Text>
            </>
          ) : (
            <Tag bordered={false} color="orange">Đang xử lý AI...</Tag>
          )}
        </div>
      )
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>,
      render: (_: any, r: any) => (
        <Tag bordered={false}
          color={r.status === 'Reviewed' ? 'green' : r.status === 'AI Processed' ? 'blue' : 'orange'}
          style={{ fontSize: 10, fontWeight: 700 }}
        >
          {r.status.toUpperCase()}
        </Tag>
      )
    },
    { title: <Text strong style={{ fontSize: 11 }}>THỜI GIAN</Text>, render: (_: any, r: any) => <Text type="secondary" style={{ fontSize: 11 }}>{r.date}</Text> },
    {
      title: "",
      render: (_: any, r: any) => (
        <Space size={8}>
          <Button type="text" size="small" icon={<EyeOutlined />} onClick={() => message.info("Mở PACS Viewer...")} />
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => setEditRecord(r)} />
          <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => setDeleteRecord(r)} />
        </Space>
      )
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader
        title="Medical Image Analysis (AI-PACS)"
        subtitle="Hội chẩn chẩn đoán hình ảnh từ xa — Tích hợp DICOM/HL7, AI phân tích tổn thương và kết nối chuyên gia toàn quốc"
        primaryAction={{
          label: "Tải ảnh lên PACS",
          icon: <CloudUploadOutlined />,
          onClick: () => setAddOpen(true)
        }}
        extra={<Button icon={<HistoryOutlined />}>Lịch sử phân tích</Button>}
      />

      <EhrStatCards stats={stats} />

      {/* AI Feature Banner */}
      <Card bordered={false} style={{ marginBottom: 24, background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)', borderRadius: 4 }} bodyStyle={{ padding: 32 }}>
        <Row align="middle" gutter={32}>
          <Col flex="1">
            <Space align="center" size={12} style={{ marginBottom: 12 }}>
              <ThunderboltFilled style={{ color: '#faad14', fontSize: 28 }} />
              <Title level={4} style={{ color: 'white', margin: 0 }}>AI-Powered Radiology Assistant</Title>
            </Space>
            <Paragraph style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, margin: 0 }}>
              Hệ thống AI phân tích X-Quang, CT-Scan, MRI sử dụng mô hình Deep Learning được huấn luyện trên 10 triệu ca lâm sàng. Hỗ trợ hội chẩn từ xa (Tele-radiology) theo chuẩn DICOM 3.0 và HL7 FHIR R4.
            </Paragraph>
          </Col>
          <Col>
            <Row gutter={24}>
              <Col style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: '#faad14' }}>98.5%</div>
                <Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }}>ĐỘ CHÍNH XÁC</Text>
              </Col>
              <Col style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: '#69c0ff' }}>1.2s</div>
                <Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }}>XỬ LÝ TB</Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      <EhrFilterBar placeholder="Tìm tên ảnh, mã DICOM, bệnh nhân...">
        <Select placeholder="Loại ảnh" style={{ width: 150 }} options={[
          { value: "xray", label: "X-Quang" },
          { value: "ct", label: "CT-Scan" },
          { value: "mri", label: "MRI" },
          { value: "us", label: "Siêu âm" }
        ]} />
        <Select placeholder="Trạng thái" style={{ width: 150 }} options={[
          { value: "pending", label: "Chờ xem xét" },
          { value: "processed", label: "AI đã xử lý" },
          { value: "reviewed", label: "Đã duyệt" }
        ]} />
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

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Hình ảnh y khoa / DICOM" fields={FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.imageName} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}