"use client";
import React, { useState } from "react";
import { Card, Space, Row, Col, Typography, Tag, Button, Table, message, Select, Avatar, QRCode, Statistic } from "antd";
const { Title, Text, Paragraph } = Typography;
import {
  IdcardOutlined,
  PlusOutlined,
  QrcodeOutlined,
  UserOutlined,
  HeartOutlined,
  FileProtectOutlined,
  EditOutlined,
  DeleteOutlined,
  HistoryOutlined,
  SafetyCertificateOutlined
} from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";

const DATA_INIT = [
  { id: 1, fullName: "Nguyễn Văn A", healthId: "VN-HID-4281-2024", dob: "15/05/1979", gender: "Nam", phone: "0909 123 456", bloodType: "O+", chronicDiseases: "Đái tháo đường type 2", allergies: "Penicillin", status: "Active", lastUpdate: "10:30 Hôm nay" },
  { id: 2, fullName: "Trần Thị B", healthId: "VN-HID-9902-2024", dob: "24/08/1992", gender: "Nữ", phone: "0988 777 666", bloodType: "A+", chronicDiseases: "Viêm phế quản mãn", allergies: "Không", status: "Active", lastUpdate: "Hôm qua" },
  { id: 3, fullName: "Lê Văn C", healthId: "VN-HID-1105-2024", dob: "03/11/1960", gender: "Nam", phone: "0912 345 678", bloodType: "B+", chronicDiseases: "Tăng huyết áp", allergies: "Aspirin", status: "Active", lastUpdate: "2 ngày trước" },
];

const FIELDS: CrudField[] = [
  { name: "fullName", label: "Họ và tên", type: "text", placeholder: "Nguyễn Văn A", required: true, span: 2 },
  { name: "dob", label: "Ngày sinh", type: "text", placeholder: "15/05/1979", required: true },
  { name: "gender", label: "Giới tính", type: "select", options: [{ value: "Nam", label: "Nam" }, { value: "Nữ", label: "Nữ" }] },
  { name: "phone", label: "Số điện thoại", type: "phone", placeholder: "0909 123 456", required: true },
  { name: "bloodType", label: "Nhóm máu", type: "select", options: [{ value: "O+", label: "O+" }, { value: "A+", label: "A+" }, { value: "B+", label: "B+" }, { value: "AB+", label: "AB+" }] },
  { name: "chronicDiseases", label: "Bệnh mãn tính", type: "text", placeholder: "Đái tháo đường, Tăng huyết áp...", span: 2 },
  { name: "allergies", label: "Dị ứng thuốc / thực phẩm", type: "text", placeholder: "Penicillin, Đậu phộng...", span: 2 },
];

export default function HealthIdPage() {
  const [data, setData] = useState(DATA_INIT);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);

  const handleAdd = (v: any) => {
    const newId = `VN-HID-${Math.floor(Math.random() * 9999)}-2024`;
    setData((p) => [{ ...v, id: Date.now(), healthId: newId, status: "Active", lastUpdate: "Vừa xong" }, ...p]);
    setAddOpen(false);
    message.success("Đã cấp Health ID mới!");
  };
  const handleEdit = (v: any) => { setData((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật thành công!"); };
  const handleDelete = () => { setData((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xóa!"); };

  const stats = [
    { label: "Health ID đã cấp", value: "124,560", icon: <IdcardOutlined /> },
    { label: "Kích hoạt tháng này", value: "1,284", color: "#0050b3" },
    { label: "Hồ sơ hoàn chỉnh", value: "89.4%", color: "#52c41a" },
    { label: "Liên kết hộ gia đình", value: "45,200", color: "#faad14" }
  ];

  const columns = [
    {
      title: <Text strong style={{ fontSize: 11 }}>HEALTH ID / NGƯỜI DÂN</Text>,
      render: (_: any, r: any) => (
        <Space size={12}>
          <Avatar size={36} style={{ backgroundColor: '#0050b3', fontWeight: 700 }}>{r.fullName[0]}</Avatar>
          <div>
            <Text strong style={{ fontSize: 13, display: 'block' }}>{r.fullName}</Text>
            <Tag color="blue" bordered={false} style={{ fontSize: 9, fontWeight: 700 }}>{r.healthId}</Tag>
          </div>
        </Space>
      )
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>THÔNG TIN CỐ ĐỊNH</Text>,
      render: (_: any, r: any) => (
        <div style={{ fontSize: 11 }}>
          <div><Text type="secondary">Sinh:</Text> <Text strong>{r.dob}</Text> | <Text strong>{r.gender}</Text></div>
          <div><Text type="secondary">Nhóm máu:</Text> <Tag color="red" bordered={false} style={{ fontSize: 9, fontWeight: 700 }}>{r.bloodType}</Tag></div>
        </div>
      )
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>HỒ SƠ BỆNH LÝ NỀN</Text>,
      render: (_: any, r: any) => (
        <div style={{ fontSize: 11 }}>
          <div><Text type="secondary">Mãn tính:</Text> <Text strong>{r.chronicDiseases}</Text></div>
          <div><Text type="secondary">Dị ứng:</Text> <Text style={{ color: r.allergies === 'Không' ? '#8c8c8c' : '#f5222d', fontWeight: 700 }}>{r.allergies}</Text></div>
        </div>
      )
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>CẬP NHẬT</Text>,
      render: (_: any, r: any) => <Text type="secondary" style={{ fontSize: 11 }}>{r.lastUpdate}</Text>
    },
    {
      title: "",
      render: (_: any, r: any) => (
        <Space size={8}>
          <Button type="text" size="small" icon={<QrcodeOutlined />} onClick={() => setSelectedRecord(r)} />
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => setEditRecord(r)} />
          <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => setDeleteRecord(r)} />
        </Space>
      )
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader
        title="Health ID — Hồ sơ Sức khỏe Cá nhân"
        subtitle="Mỗi người dân có một Health ID riêng, quản lý hồ sơ sức khỏe xuyên suốt từ khi sinh đến khi mất — Theo đề án 2826/BYT"
        primaryAction={{
          label: "Cấp Health ID",
          icon: <PlusOutlined />,
          onClick: () => setAddOpen(true)
        }}
        extra={<Button icon={<HistoryOutlined />}>Lịch sử truy cập</Button>}
      />

      <EhrStatCards stats={stats} />

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={8}>
          <Card className="ehr-card" bodyStyle={{ padding: 24, textAlign: 'center', background: 'linear-gradient(135deg, #f0f5ff, #e6f7ff)' }}>
            <IdcardOutlined style={{ fontSize: 40, color: '#0050b3', marginBottom: 12 }} />
            <div style={{ fontWeight: 900, fontSize: 20, color: '#001529' }}>PERSONAL HEALTH ID</div>
            <div style={{ fontSize: 12, color: '#8c8c8c', marginBottom: 16 }}>VN-HID-XXXX-2024</div>
            <Paragraph style={{ fontSize: 12, color: '#595959' }}>
              Mỗi người dân, mỗi hộ gia đình có 1 ID riêng để quản lý hồ sơ sức khỏe cá nhân xuyên suốt theo hệ thống y tế quốc gia.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="ehr-card" bodyStyle={{ padding: 24, textAlign: 'center' }}>
            <SafetyCertificateOutlined style={{ fontSize: 40, color: '#52c41a', marginBottom: 12 }} />
            <div style={{ fontWeight: 900, fontSize: 20, color: '#001529' }}>AN TOÀN BẢO MẬT</div>
            <div style={{ fontSize: 12, color: '#8c8c8c', marginBottom: 16 }}>AES-256 Encryption</div>
            <Paragraph style={{ fontSize: 12, color: '#595959' }}>
              Người dân có thể trực tiếp chia sẻ thông tin đến bác sĩ độc lập theo ý muốn, kiểm soát hoàn toàn quyền truy cập dữ liệu.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="ehr-card" bodyStyle={{ padding: 24, textAlign: 'center' }}>
            <HeartOutlined style={{ fontSize: 40, color: '#f5222d', marginBottom: 12 }} />
            <div style={{ fontWeight: 900, fontSize: 20, color: '#001529' }}>THEO DÕI LIÊN TỤC</div>
            <div style={{ fontSize: 12, color: '#8c8c8c', marginBottom: 16 }}>365 ngày / 24 giờ</div>
            <Paragraph style={{ fontSize: 12, color: '#595959' }}>
              Dữ liệu khám lâm sàng được gửi về trung tâm điều hành theo thời gian thực, đánh giá tình trạng sức khỏe hàng ngày.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <EhrFilterBar placeholder="Tìm Health ID, họ tên, số điện thoại...">
        <Select placeholder="Giới tính" style={{ width: 120 }} options={[{ value: "Nam", label: "Nam" }, { value: "Nữ", label: "Nữ" }]} />
        <Select placeholder="Nhóm máu" style={{ width: 120 }} options={[{ value: "O+", label: "O+" }, { value: "A+", label: "A+" }, { value: "B+", label: "B+" }]} />
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

      {selectedRecord && (
        <Card className="ehr-card" style={{ marginTop: 24 }}>
          <Row gutter={32} align="middle">
            <Col>
              <QRCode value={`VN-HEALTH-ID:${selectedRecord.healthId}|NAME:${selectedRecord.fullName}|DOB:${selectedRecord.dob}`} size={160} />
            </Col>
            <Col flex="1">
              <Title level={4}>{selectedRecord.fullName}</Title>
              <Tag color="blue" style={{ fontSize: 13, fontWeight: 700, padding: '4px 12px' }}>{selectedRecord.healthId}</Tag>
              <div style={{ marginTop: 16 }}>
                <Row gutter={[16, 8]}>
                  <Col span={12}><Text type="secondary">Ngày sinh:</Text> <Text strong>{selectedRecord.dob}</Text></Col>
                  <Col span={12}><Text type="secondary">Giới tính:</Text> <Text strong>{selectedRecord.gender}</Text></Col>
                  <Col span={12}><Text type="secondary">Nhóm máu:</Text> <Tag color="red">{selectedRecord.bloodType}</Tag></Col>
                  <Col span={12}><Text type="secondary">Điện thoại:</Text> <Text strong>{selectedRecord.phone}</Text></Col>
                  <Col span={24}><Text type="secondary">Dị ứng:</Text> <Text style={{ color: '#f5222d', fontWeight: 700 }}>{selectedRecord.allergies}</Text></Col>
                </Row>
              </div>
            </Col>
            <Col>
              <Button danger onClick={() => setSelectedRecord(null)}>Đóng</Button>
            </Col>
          </Row>
        </Card>
      )}

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Hồ sơ sức khỏe cá nhân (Health ID)" fields={FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord?.fullName} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}
