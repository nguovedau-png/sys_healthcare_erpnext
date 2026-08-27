"use client";
import React, { useState } from "react";
import { Card, Space, Row, Col, Typography, Tag, Button, Table, Progress, Divider, Tooltip } from "antd";
const { Title, Text, Paragraph } = Typography;
import {
  SafetyCertificateFilled,
  CheckCircleFilled,
  InfoCircleFilled,
  LockFilled,
  FileProtectOutlined,
  AuditOutlined,
  HistoryOutlined,
  CloudSyncOutlined
} from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";

const STANDARDS = [
  { id: 1, code: "TT 49/2017/TT-BYT", name: "Quy định về Y tế từ xa", status: "Compliant", score: 100 },
  { id: 2, code: "TT 47/2017/TT-BYT", name: "Tư vấn khám chữa bệnh từ xa", status: "Compliant", score: 100 },
  { id: 3, code: "Đề án 2826/BYT 2020-2025", name: "Khám chữa bệnh từ xa giai đoạn 2020-2025", status: "In Progress", score: 82 },
  { id: 4, code: "DICOM Standard", name: "Chuẩn hình ảnh y tế số hóa", status: "Compliant", score: 100 },
  { id: 5, code: "HL7 FHIR R4", name: "Chuẩn kết nối, trao đổi dữ liệu y tế", status: "Compliant", score: 97 },
  { id: 6, code: "ISO 27001", name: "Bảo mật thông tin y tế", status: "In Review", score: 88 },
];

const AUDIT_LOGS = [
  { id: 1, action: "Xuất dữ liệu bệnh nhân", user: "BS. Nguyễn Văn A", time: "10:30 Hôm nay", result: "Authorized" },
  { id: 2, action: "Truy cập hồ sơ EMR ngoài giờ", user: "Y tá Trần Thị B", time: "23:45 Hôm qua", result: "Flagged" },
  { id: 3, action: "Chia sẻ hình ảnh DICOM", user: "BSCK. Lê Văn C", time: "09:00 Hôm nay", result: "Authorized" },
];

export default function CompliancePage() {
  const stats = [
    { label: "Tuân thủ pháp quy", value: "94%", icon: <SafetyCertificateFilled /> },
    { label: "Chuẩn đã đạt", value: "04/06", color: "#52c41a" },
    { label: "Cảnh báo bảo mật", value: "01", color: "#faad14" },
    { label: "Lần kiểm tra cuối", value: "Hôm nay", color: "#0050b3" }
  ];

  const columns = [
    {
      title: <Text strong style={{ fontSize: 11 }}>MÃ CHUẨN / TÊN VĂN BẢN</Text>,
      render: (_: any, r: any) => (
        <Space size={12}>
          <div style={{ width: 32, height: 32, borderRadius: 4, background: r.status === 'Compliant' ? '#f6ffed' : '#fff7e6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: r.status === 'Compliant' ? '#52c41a' : '#faad14' }}>
            <FileProtectOutlined />
          </div>
          <div>
            <Text strong style={{ fontSize: 13, display: 'block' }}>{r.code}</Text>
            <Text type="secondary" style={{ fontSize: 11 }}>{r.name}</Text>
          </div>
        </Space>
      )
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>MỨC ĐỘ TUÂN THỦ</Text>,
      render: (_: any, r: any) => (
        <div style={{ width: 160 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text type="secondary" style={{ fontSize: 10 }}>Score</Text>
            <Text strong style={{ fontSize: 10 }}>{r.score}%</Text>
          </div>
          <Progress percent={r.score} size="small" showInfo={false} strokeColor={r.score >= 95 ? '#52c41a' : r.score >= 80 ? '#faad14' : '#f5222d'} />
        </div>
      )
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>,
      render: (_: any, r: any) => (
        <Tag bordered={false}
          color={r.status === 'Compliant' ? 'green' : r.status === 'In Progress' ? 'blue' : 'orange'}
          style={{ fontSize: 10, fontWeight: 700 }}
        >
          {r.status === 'Compliant' ? 'ĐÃ TUÂN THỦ' : r.status === 'In Progress' ? 'ĐANG THỰC HIỆN' : 'ĐANG KIỂM TRA'}
        </Tag>
      )
    },
  ];

  const auditColumns = [
    { title: <Text strong style={{ fontSize: 11 }}>HÀNH ĐỘNG</Text>, dataIndex: 'action', render: (v: string) => <Text style={{ fontSize: 12, fontWeight: 600 }}>{v}</Text> },
    { title: <Text strong style={{ fontSize: 11 }}>NGƯỜI DÙNG</Text>, dataIndex: 'user', render: (v: string) => <Text style={{ fontSize: 12 }}>{v}</Text> },
    { title: <Text strong style={{ fontSize: 11 }}>THỜI GIAN</Text>, dataIndex: 'time', render: (v: string) => <Text type="secondary" style={{ fontSize: 11 }}>{v}</Text> },
    {
      title: <Text strong style={{ fontSize: 11 }}>KẾT QUẢ</Text>,
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.result === 'Authorized' ? 'green' : 'orange'} style={{ fontSize: 10, fontWeight: 700 }}>
          {r.result === 'Authorized' ? 'XÁC THỰC' : 'ĐÁNH DẤU'}
        </Tag>
      )
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader
        title="Compliance & Data Security"
        subtitle="Hệ thống quản lý tuân thủ pháp quy, bảo mật dữ liệu y tế theo Thông tư 49/47/2017 và Đề án 2826/BYT"
        primaryAction={{
          label: "Kiểm tra tuân thủ",
          icon: <AuditOutlined />,
          onClick: () => {}
        }}
        extra={<Button icon={<HistoryOutlined />}>Lịch sử kiểm toán</Button>}
      />

      <EhrStatCards stats={stats} />

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={8}>
          <Card className="ehr-card" style={{ background: '#f6ffed', border: '1px solid #b7eb8f' }}>
            <Space>
              <CheckCircleFilled style={{ color: '#52c41a', fontSize: 24 }} />
              <div>
                <Text strong style={{ fontSize: 14, color: '#135200' }}>TT 49/2017/TT-BYT</Text>
                <div style={{ fontSize: 11, color: '#52c41a', fontWeight: 700 }}>ĐÃ TUÂN THỦ TOÀN PHẦN</div>
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="ehr-card" style={{ background: '#e6f7ff', border: '1px solid #91d5ff' }}>
            <Space>
              <LockFilled style={{ color: '#0050b3', fontSize: 24 }} />
              <div>
                <Text strong style={{ fontSize: 14, color: '#003a8c' }}>Mã hóa AES-256</Text>
                <div style={{ fontSize: 11, color: '#0050b3', fontWeight: 700 }}>DỮ LIỆU ĐƯỢC MÃ HÓA TOÀN BỘ</div>
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="ehr-card" style={{ background: '#fff7e6', border: '1px solid #ffe7ba' }}>
            <Space>
              <InfoCircleFilled style={{ color: '#faad14', fontSize: 24 }} />
              <div>
                <Text strong style={{ fontSize: 14, color: '#874d00' }}>ISO 27001</Text>
                <div style={{ fontSize: 11, color: '#faad14', fontWeight: 700 }}>ĐANG TRONG QUÁ TRÌNH KIỂM ĐỊNH</div>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      <Card className="ehr-card" title="Danh sách Chuẩn Pháp Quy & Kỹ Thuật" style={{ marginBottom: 24 }}>
        <Table
          className="ehr-table-compact"
          dataSource={STANDARDS}
          rowKey="id"
          pagination={false}
          columns={columns}
          size="small"
        />
      </Card>

      <Card className="ehr-card" title={<Space><AuditOutlined />Nhật ký Kiểm toán Bảo mật (Security Audit Log)</Space>}>
        <Table
          className="ehr-table-compact"
          dataSource={AUDIT_LOGS}
          rowKey="id"
          pagination={false}
          columns={auditColumns}
          size="small"
        />
      </Card>

      <Card bordered={false} style={{ background: 'linear-gradient(135deg, #003a8c 0%, #001529 100%)', marginTop: 24, borderRadius: 4 }} bodyStyle={{ padding: 40 }}>
        <Row align="middle" gutter={32}>
          <Col span={16}>
            <Space align="center" size={12} style={{ marginBottom: 16 }}>
              <CloudSyncOutlined style={{ fontSize: 32, color: '#69c0ff' }} />
              <Title level={4} style={{ color: 'white', margin: 0 }}>Cloud Security & Data Sovereignty</Title>
            </Space>
            <Paragraph style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15 }}>
              Dữ liệu y tế được lưu trữ trên hạ tầng Cloud trong nước, tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân. Mỗi người dân có một Health ID riêng để quản lý hồ sơ sức khỏe xuyên suốt.
            </Paragraph>
            <Space size="middle">
              <Button type="primary" size="large" style={{ height: 44, fontWeight: 700 }}>XEM CHÍNH SÁCH BẢO MẬT</Button>
              <Button ghost size="large" style={{ height: 44, fontWeight: 700, borderColor: 'rgba(255,255,255,0.2)' }}>TẢI BÁO CÁO TUÂN THỦ</Button>
            </Space>
          </Col>
          <Col span={8} style={{ textAlign: 'center' }}>
            <div style={{ color: 'white' }}>
              <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, textTransform: 'uppercase' }}>Dữ liệu được bảo mật</Text>
              <div style={{ fontSize: 48, fontWeight: 900 }}>100%</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#52c41a' }} />
                <Text style={{ color: '#52c41a', fontWeight: 700, fontSize: 12 }}>HỆ THỐNG AN TOÀN</Text>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
