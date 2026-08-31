"use client";
import React, { useState } from "react";
import { Card, Space, Row, Col, Typography, Tag, Button, Table, message, Select, QRCode, Input, Divider, Statistic } from "antd";
const { Title, Text, Paragraph } = Typography;
import {
  SafetyCertificateOutlined, QrcodeOutlined, SearchOutlined,
  CheckCircleFilled, CloseCircleFilled, InfoCircleFilled,
  UserOutlined, CalendarOutlined, FileProtectOutlined, ReloadOutlined
} from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";

const INSURANCE_DATA: Record<string, any> = {
  "BV2024001234": { name: "Nguyễn Văn A", dob: "15/05/1979", gender: "Nam", insuranceId: "BV2024001234", type: "BHYT Hộ gia đình", validFrom: "01/01/2024", validTo: "31/12/2024", copayRate: "80%", provider: "BHXH TP. Hồ Chí Minh", registeredAt: "BV Chợ Rẫy", status: "Valid" },
  "LT2023005678": { name: "Trần Thị B", dob: "24/08/1992", gender: "Nữ", insuranceId: "LT2023005678", type: "BHYT Bắt buộc (Lao động)", validFrom: "01/07/2023", validTo: "30/06/2024", copayRate: "80%", provider: "BHXH Hà Nội", registeredAt: "BV Bạch Mai", status: "Expired" },
};

export default function InsurancePage() {
  const [searchId, setSearchId] = useState("");
  const [qrValue, setQrValue] = useState("BV2024001234");
  const [result, setResult] = useState<any | null>(INSURANCE_DATA["BV2024001234"]);
  const [lookupHistory] = useState([
    { id: "BV2024001234", name: "Nguyễn Văn A", time: "10:30 Hôm nay", status: "Valid" },
    { id: "LT2023005678", name: "Trần Thị B", time: "09:15 Hôm nay", status: "Expired" },
    { id: "DN2024009999", name: "Lê Văn C", time: "Hôm qua", status: "Valid" },
  ]);

  const handleSearch = () => {
    if (!searchId.trim()) { message.warning("Nhập mã thẻ BHYT để tra cứu!"); return; }
    const found = INSURANCE_DATA[searchId.trim()];
    if (found) {
      setResult(found);
      setQrValue(searchId.trim());
      message.success("Đã tìm thấy thông tin bảo hiểm!");
    } else {
      message.error("Không tìm thấy thông tin với mã thẻ này!");
      setResult(null);
    }
  };

  const stats = [
    { label: "Tra cứu hôm nay", value: "1,248", icon: <QrcodeOutlined /> },
    { label: "Thẻ còn hiệu lực", value: "94.2%", color: "#52c41a" },
    { label: "Thẻ hết hạn", value: "5.8%", color: "#f5222d" },
    { label: "Cơ sở KCB đăng ký", value: "342", color: "#0050b3" },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader
        title="BHYT & BHSK — Tra cứu bằng QR Code"
        subtitle="Hệ thống tra cứu thông tin Bảo hiểm Y tế / Bảo hiểm Sức khỏe bằng mã QR, liên kết trực tiếp với cơ sở dữ liệu BHXH"
        primaryAction={{ label: "Quét QR Code", icon: <QrcodeOutlined />, onClick: () => message.info("Đang mở camera quét QR...") }}
      />

      <EhrStatCards stats={stats} />

      <Row gutter={[20, 20]} style={{ marginTop: 8 }}>
        {/* Search + Result */}
        <Col xs={24} lg={16}>
          <Card className="ehr-card" title={<Space><SearchOutlined />Tra cứu thông tin thẻ BHYT</Space>} style={{ marginBottom: 16 }}>
            <Space.Compact style={{ width: "100%" }}>
              <Input
                size="large"
                placeholder="Nhập mã thẻ BHYT (VD: BV2024001234) hoặc số CCCD..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onPressEnter={handleSearch}
                prefix={<SafetyCertificateOutlined style={{ color: "#8c8c8c" }} />}
              />
              <Button type="primary" size="large" icon={<SearchOutlined />} onClick={handleSearch}>Tra cứu</Button>
            </Space.Compact>
            <Text type="secondary" style={{ fontSize: 11, marginTop: 8, display: "block" }}>
              Thử: BV2024001234 (Còn hiệu lực) hoặc LT2023005678 (Hết hạn)
            </Text>
          </Card>

          {result && (
            <Card className="ehr-card">
              <Row gutter={[24, 0]} align="middle">
                <Col xs={24} md={16}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    {result.status === "Valid"
                      ? <CheckCircleFilled style={{ color: "#52c41a", fontSize: 20 }} />
                      : <CloseCircleFilled style={{ color: "#f5222d", fontSize: 20 }} />
                    }
                    <Tag
                      bordered={false}
                      color={result.status === "Valid" ? "green" : "red"}
                      style={{ fontSize: 12, fontWeight: 700, padding: "4px 12px" }}
                    >
                      {result.status === "Valid" ? "THẺ CÒN HIỆU LỰC" : "THẺ ĐÃ HẾT HẠN"}
                    </Tag>
                  </div>
                  <Row gutter={[12, 12]}>
                    <Col span={12}><Text type="secondary" style={{ fontSize: 11 }}>HỌ VÀ TÊN</Text><div style={{ fontWeight: 700, fontSize: 15 }}>{result.name}</div></Col>
                    <Col span={12}><Text type="secondary" style={{ fontSize: 11 }}>NGÀY SINH / GIỚI TÍNH</Text><div style={{ fontWeight: 600 }}>{result.dob} · {result.gender}</div></Col>
                    <Col span={12}><Text type="secondary" style={{ fontSize: 11 }}>MÃ THẺ BHYT</Text><div style={{ fontWeight: 700, color: "#0050b3", fontFamily: "monospace", fontSize: 15 }}>{result.insuranceId}</div></Col>
                    <Col span={12}><Text type="secondary" style={{ fontSize: 11 }}>LOẠI BHYT</Text><div style={{ fontWeight: 600 }}>{result.type}</div></Col>
                    <Col span={12}><Text type="secondary" style={{ fontSize: 11 }}>HIỆU LỰC</Text><div style={{ fontWeight: 600 }}>{result.validFrom} → {result.validTo}</div></Col>
                    <Col span={12}><Text type="secondary" style={{ fontSize: 11 }}>MỨC HƯỞNG</Text><div style={{ fontWeight: 700, color: "#52c41a", fontSize: 16 }}>{result.copayRate}</div></Col>
                    <Col span={12}><Text type="secondary" style={{ fontSize: 11 }}>ĐƠN VỊ CẤP</Text><div>{result.provider}</div></Col>
                    <Col span={12}><Text type="secondary" style={{ fontSize: 11 }}>ĐĂNG KÝ KCB BAN ĐẦU</Text><div style={{ fontWeight: 600 }}>{result.registeredAt}</div></Col>
                  </Row>
                </Col>
                <Col xs={24} md={8} style={{ textAlign: "center" }}>
                  <Text type="secondary" style={{ fontSize: 11, display: "block", marginBottom: 8 }}>MÃ QR BHYT</Text>
                  <QRCode value={`BHYT:${qrValue}|NAME:${result.name}|DOB:${result.dob}|VALID:${result.validTo}`} size={140} />
                  <Button size="small" style={{ marginTop: 8 }} onClick={() => message.success("Đã tải QR Code!")}>Tải QR</Button>
                </Col>
              </Row>
            </Card>
          )}
        </Col>

        {/* Lookup History */}
        <Col xs={24} lg={8}>
          <Card className="ehr-card" title={<Space><FileProtectOutlined />Lịch sử tra cứu</Space>}>
            <Space direction="vertical" style={{ width: "100%" }} size={8}>
              {lookupHistory.map((h, i) => (
                <Card key={i} size="small" bodyStyle={{ padding: 12 }} style={{ cursor: "pointer" }} onClick={() => { setSearchId(h.id); setResult(INSURANCE_DATA[h.id] || null); }}>
                  <Space style={{ width: "100%", justifyContent: "space-between" }}>
                    <div>
                      <Text strong style={{ fontSize: 12 }}>{h.name}</Text>
                      <div style={{ fontFamily: "monospace", fontSize: 10, color: "#8c8c8c" }}>{h.id}</div>
                    </div>
                    <Space direction="vertical" size={0} align="end">
                      <Tag bordered={false} color={h.status === "Valid" ? "green" : "red"} style={{ fontSize: 9, fontWeight: 700 }}>{h.status.toUpperCase()}</Tag>
                      <Text type="secondary" style={{ fontSize: 9 }}>{h.time}</Text>
                    </Space>
                  </Space>
                </Card>
              ))}
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
