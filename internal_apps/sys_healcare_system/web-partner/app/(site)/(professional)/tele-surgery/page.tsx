"use client";
import React, { useState } from "react";
import { Card, Space, Row, Col, Typography, Avatar, Statistic, Tag, Table, message, Select, Button, Progress, Badge } from "antd";
const { Title, Text, Paragraph } = Typography;
import { 
  ThunderboltFilled, 
  VideoCameraFilled, 
  TeamOutlined, 
  DashboardOutlined, 
  SettingOutlined,
  DotChartOutlined,
  PlayCircleFilled,
  WarningFilled
} from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";

const SURGERIES = [
  { id: 1, type: "Phẫu thuật nội soi ổ bụng", status: "In Progress", surgeon: "GS. TS. Nguyễn Văn A", robotics: "Da Vinci Xi", signal: "Excellent", latency: "12ms" },
  { id: 2, type: "Thay khớp háng robot", status: "Scheduled", surgeon: "BSCKII. Trần Thị B", robotics: "Mako System", signal: "Stable", latency: "24ms" },
];

export default function TeleSurgeryPage() {
  const stats = [
    { label: "Ca phẫu thuật/tháng", value: "24", icon: <DotChartOutlined /> },
    { label: "Kết nối Robot", value: "05", color: "#52c41a" },
    { label: "Độ trễ TB", value: "15ms", color: "#0050b3" },
    { label: "Cảnh báo hệ thống", value: "00", color: "#faad14" }
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader 
        title="Tele-Surgery Command Center" 
        subtitle="Hệ thống hỗ trợ phẫu thuật từ xa và giám sát thiết bị Robot y tế thời gian thực"
        primaryAction={{
            label: "Bắt đầu ca mới",
            icon: <PlayCircleFilled />,
            onClick: () => message.info("Đang khởi tạo kết nối Robot...")
        }}
        extra={<Button icon={<SettingOutlined />}>Cấu hình Robot</Button>}
      />

      <EhrStatCards stats={stats} />

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={16}>
          <Card className="ehr-card" title={<Space><VideoCameraFilled style={{ color: '#f5222d' }} /> LIVE SURGERY FEED (SECURE)</Space>} extra={<Badge status="processing" text="LIVE 4K" />}>
            <div style={{ width: '100%', height: 400, background: '#000', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'rgba(255,255,255,0.4)' }}>
                <VideoCameraFilled style={{ fontSize: 48, marginBottom: 16 }} />
                <Text style={{ color: 'rgba(255,255,255,0.4)' }}>Tín hiệu đang truyền từ BV Chợ Rẫy (Phòng mổ số 05)</Text>
                <Button ghost style={{ marginTop: 24 }}>KẾT NỐI CAMERA NỘI SOI</Button>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card className="ehr-card" title="Hệ thống Robot & Thiết bị">
            <Space direction="vertical" style={{ width: '100%' }} size={24}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text strong>Da Vinci Xi (Robotic Arm)</Text>
                        <Tag color="success">CONNECTED</Tag>
                    </div>
                    <Progress percent={98} size="small" strokeColor="#52c41a" />
                </div>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text strong>Anesthesia Monitor</Text>
                        <Tag color="success">SYNCING</Tag>
                    </div>
                    <Progress percent={100} size="small" strokeColor="#0050b3" />
                </div>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text strong>Network Latency</Text>
                        <Text strong style={{ color: '#52c41a' }}>12ms</Text>
                    </div>
                    <Progress percent={95} size="small" strokeColor="#1890ff" trailColor="#f0f2f5" />
                </div>
                
                <Card size="small" style={{ background: '#fff7e6', border: '1px solid #ffe7ba' }}>
                    <Space align="start">
                        <WarningFilled style={{ color: '#faad14', marginTop: 4 }} />
                        <div>
                            <Text strong style={{ fontSize: 12 }}>Cảnh báo môi trường</Text>
                            <Paragraph style={{ fontSize: 11, margin: 0 }}>Nhiệt độ phòng mổ đang ở mức 18°C (Dưới ngưỡng khuyến nghị 20°C).</Paragraph>
                        </div>
                    </Space>
                </Card>
            </Space>
          </Card>
        </Col>

        <Col span={24}>
           <Card className="ehr-card" title="Danh sách ca mổ dự kiến">
              <Table 
                dataSource={SURGERIES}
                rowKey="id"
                pagination={false}
                size="small"
                columns={[
                    { title: 'LOẠI PHẪU THUẬT', dataIndex: 'type', render: (v) => <Text strong>{v}</Text> },
                    { title: 'PHẪU THUẬT VIÊN', dataIndex: 'surgeon' },
                    { title: 'HỆ THỐNG ROBOT', dataIndex: 'robotics' },
                    { title: 'TRẠNG THÁI', dataIndex: 'status', render: (v) => <Tag color={v === 'In Progress' ? 'red' : 'blue'}>{v.toUpperCase()}</Tag> },
                    { title: 'KẾT NỐI', render: (_, r) => <Space><ThunderboltFilled style={{ color: '#52c41a' }} /> {r.latency}</Space> }
                ]}
              />
           </Card>
        </Col>
      </Row>
    </div>
  );
}
