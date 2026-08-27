"use client";
import React, { useState, useEffect } from "react";
import { Card, Space, Row, Col, Typography, Avatar, Statistic, Tag, Progress, Button, message, Badge } from "antd";
const { Title, Text, Paragraph } = Typography;
import { 
  HeartOutlined, 
  DashboardOutlined, 
  ThunderboltFilled, 
  LineChartOutlined, 
  MedicineBoxOutlined,
  AlertFilled,
  HistoryOutlined,
  ReloadOutlined
} from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";

export default function TelemetryPage() {
  const [heartRate, setHeartRate] = useState(72);
  const [spo2, setSpo2] = useState(98);

  useEffect(() => {
    const interval = setInterval(() => {
        setHeartRate(prev => prev + (Math.random() > 0.5 ? 1 : -1));
        setSpo2(prev => Math.min(100, Math.max(94, prev + (Math.random() > 0.5 ? 0.5 : -0.5))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: "Thiết bị kết nối", value: "1,240", icon: <ThunderboltFilled /> },
    { label: "Bệnh nhân giám sát", value: "45", color: "#0050b3" },
    { label: "Cảnh báo khẩn", value: "02", color: "#f5222d" },
    { label: "Độ ổn định sóng", value: "99.9%", color: "#52c41a" }
  ];

  const PatientMonitor = ({ name, id, hr, bp, spo2, temp, status }: any) => (
    <Card className="ehr-card" bodyStyle={{ padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <Space>
                <Avatar style={{ backgroundColor: '#0050b3' }}>{name[0]}</Avatar>
                <div>
                    <Text strong style={{ fontSize: 14 }}>{name}</Text>
                    <div style={{ fontSize: 11, color: '#8c8c8c' }}>ID: {id}</div>
                </div>
            </Space>
            <Badge status={status === 'Stable' ? 'success' : 'warning'} text={status} />
        </div>
        
        <Row gutter={[16, 16]}>
            <Col span={12}>
                <div style={{ background: '#fff1f0', padding: 12, borderRadius: 4, borderLeft: '3px solid #f5222d' }}>
                    <Text style={{ fontSize: 10, color: '#cf1322', fontWeight: 700 }}>HEART RATE</Text>
                    <div style={{ fontSize: 24, fontWeight: 900, color: '#cf1322' }}>{hr} <small style={{ fontSize: 12 }}>BPM</small></div>
                </div>
            </Col>
            <Col span={12}>
                <div style={{ background: '#e6f7ff', padding: 12, borderRadius: 4, borderLeft: '3px solid #1890ff' }}>
                    <Text style={{ fontSize: 10, color: '#0050b3', fontWeight: 700 }}>SPO2</Text>
                    <div style={{ fontSize: 24, fontWeight: 900, color: '#0050b3' }}>{spo2.toFixed(1)} <small style={{ fontSize: 12 }}>%</small></div>
                </div>
            </Col>
            <Col span={12}>
                <div style={{ background: '#f6ffed', padding: 12, borderRadius: 4, borderLeft: '3px solid #52c41a' }}>
                    <Text style={{ fontSize: 10, color: '#389e0d', fontWeight: 700 }}>TEMP</Text>
                    <div style={{ fontSize: 24, fontWeight: 900, color: '#389e0d' }}>{temp} <small style={{ fontSize: 12 }}>°C</small></div>
                </div>
            </Col>
            <Col span={12}>
                <div style={{ background: '#f9f0ff', padding: 12, borderRadius: 4, borderLeft: '3px solid #722ed1' }}>
                    <Text style={{ fontSize: 10, color: '#531dab', fontWeight: 700 }}>BLOOD PRESSURE</Text>
                    <div style={{ fontSize: 24, fontWeight: 900, color: '#531dab' }}>{bp} <small style={{ fontSize: 12 }}>mmHg</small></div>
                </div>
            </Col>
        </Row>
        
        <div style={{ marginTop: 16, height: 40, background: '#fafafa', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LineChartOutlined style={{ color: '#d9d9d9', fontSize: 20 }} />
            <Text type="secondary" style={{ fontSize: 11, marginLeft: 8 }}>Tín hiệu thời gian thực từ Wearable-ID: {id}-W</Text>
        </div>
    </Card>
  );

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader 
        title="Patient Telemetry & IoT Hub" 
        subtitle="Hệ thống giám sát dấu hiệu sinh tồn từ xa thông qua các thiết bị y tế IoT và Wearable"
        primaryAction={{
            label: "Quét thiết bị",
            icon: <ReloadOutlined />,
            onClick: () => message.loading("Đang tìm kiếm thiết bị mới...")
        }}
        extra={<Button icon={<HistoryOutlined />}>Lịch sử sinh tồn</Button>}
      />

      <EhrStatCards stats={stats} />

      <div style={{ marginTop: 24 }}>
          <Title level={5} style={{ marginBottom: 16, textTransform: 'uppercase', fontSize: 12, letterSpacing: 1 }}>Bệnh nhân đang giám sát trực tiếp</Title>
          <Row gutter={[20, 20]}>
              <Col xs={24} md={12} lg={8}>
                  <PatientMonitor name="Nguyễn Văn A" id="BN-4281" hr={heartRate} bp="120/80" spo2={spo2} temp="36.8" status="Stable" />
              </Col>
              <Col xs={24} md={12} lg={8}>
                  <PatientMonitor name="Trần Thị B" id="BN-9902" hr={78} bp="145/95" spo2={95.2} temp="38.2" status="Warning" />
              </Col>
              <Col xs={24} md={12} lg={8}>
                  <PatientMonitor name="Lê Văn C" id="BN-1105" hr={65} bp="110/70" spo2={99.1} temp="36.5" status="Stable" />
              </Col>
          </Row>
      </div>

      <Card className="ehr-card" style={{ marginTop: 24, background: '#1e1b4b', color: 'white' }} bodyStyle={{ padding: 40 }}>
          <Row align="middle" gutter={32}>
              <Col span={16}>
                  <Space align="center" size={16} style={{ marginBottom: 16 }}>
                    <AlertFilled style={{ fontSize: 32, color: '#fbbf24' }} />
                    <Title level={4} style={{ color: 'white', margin: 0 }}>Smart Alert Orchestration</Title>
                  </Space>
                  <Paragraph style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16 }}>
                      Hệ thống AI tự động phân tích xu hướng sinh tồn và đưa ra cảnh báo sớm (Early Warning Score) trước khi các chỉ số chạm ngưỡng nguy hiểm.
                  </Paragraph>
                  <Button type="primary" size="large">CẤU HÌNH NGƯỠNG CẢNH BÁO</Button>
              </Col>
              <Col span={8} style={{ textAlign: 'center' }}>
                  <Statistic value={99.98} suffix="%" title={<Text style={{ color: 'rgba(255,255,255,0.4)' }}>UPTIME KẾT NỐI</Text>} valueStyle={{ color: 'white', fontSize: 48, fontWeight: 900 }} />
              </Col>
          </Row>
      </Card>
    </div>
  );
}
