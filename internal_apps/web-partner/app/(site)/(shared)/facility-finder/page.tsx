"use client";
import React, { useState } from "react";
import { Card, Space, Row, Col, Typography, Tag, Button, Table, message, Select, Input, Rate, Avatar } from "antd";
const { Title, Text, Paragraph } = Typography;
import {
  EnvironmentOutlined, SearchOutlined, ShopOutlined,
  PhoneOutlined, ClockCircleOutlined, StarFilled,
  MedicineBoxOutlined, BankOutlined, PlusOutlined, FilterOutlined
} from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";

const FACILITIES = [
  { id: 1, name: "Bệnh viện Chợ Rẫy", type: "Bệnh viện Tuyến Trung ương", address: "201B Nguyễn Chí Thanh, Q.5, TP.HCM", phone: "(028) 3855 4269", rating: 4.5, distance: "2.3 km", openHours: "24/7", specialties: ["Tim mạch", "Ung thư", "Thần kinh", "Nội tổng quát"], beds: 2000, bhyt: true },
  { id: 2, name: "Phòng khám Đa khoa MedPlus Q.3", type: "Phòng khám Đa khoa", address: "152 Lý Chính Thắng, Q.3, TP.HCM", phone: "1800 6858", rating: 4.8, distance: "1.1 km", openHours: "07:00 - 20:00", specialties: ["Nội", "Nhi", "Da liễu", "Sản phụ khoa"], beds: 0, bhyt: true },
  { id: 3, name: "Nhà thuốc Long Châu Q.1", type: "Nhà thuốc", address: "45 Nguyễn Huệ, Q.1, TP.HCM", phone: "1800 6928", rating: 4.7, distance: "0.8 km", openHours: "07:00 - 22:00", specialties: [], beds: 0, bhyt: false },
  { id: 4, name: "Trung tâm Y tế Quận 10", type: "Bệnh viện Tuyến Quận", address: "365 Lý Thường Kiệt, Q.10, TP.HCM", phone: "(028) 3865 5556", rating: 4.1, distance: "3.8 km", openHours: "07:00 - 16:30 (T2-T6)", specialties: ["Nội", "Ngoại", "Sản", "Nhi"], beds: 250, bhyt: true },
];

export default function FacilityFinderPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [bhytFilter, setBhytFilter] = useState<boolean | null>(null);

  const filtered = FACILITIES.filter(f => {
    const matchSearch = !search || f.name.toLowerCase().includes(search.toLowerCase()) || f.address.toLowerCase().includes(search.toLowerCase());
    const matchType = !typeFilter || f.type === typeFilter;
    const matchBhyt = bhytFilter === null || f.bhyt === bhytFilter;
    return matchSearch && matchType && matchBhyt;
  });

  const stats = [
    { label: "Cơ sở y tế trong mạng lưới", value: "2,840", icon: <BankOutlined /> },
    { label: "Nhà thuốc đối tác", value: "4,200", color: "#52c41a" },
    { label: "Hỗ trợ BHYT", value: "1,640", color: "#0050b3" },
    { label: "Đang mở cửa", value: "1,280", color: "#faad14" },
  ];

  const typeIcon = (type: string) => {
    if (type.includes("Bệnh viện")) return <BankOutlined style={{ color: "#0050b3" }} />;
    if (type.includes("Phòng khám")) return <MedicineBoxOutlined style={{ color: "#52c41a" }} />;
    return <ShopOutlined style={{ color: "#faad14" }} />;
  };

  return (
    <div style={{ paddingBottom: 40 }}>
      <EhrPageHeader
        title="Tra cứu Cơ sở Y tế & Nhà thuốc"
        subtitle="Hệ thống tìm kiếm cơ sở y tế, phòng khám và nhà thuốc trong mạng lưới với thông tin tích hợp BHYT"
        primaryAction={{ label: "Bản đồ cơ sở y tế", icon: <EnvironmentOutlined />, onClick: () => message.info("Đang mở bản đồ...") }}
      />

      <EhrStatCards stats={stats} />

      {/* Search Controls */}
      <Card className="ehr-card" style={{ marginBottom: 16 }}>
        <Row gutter={[12, 12]} align="middle">
          <Col flex="1">
            <Input
              size="large"
              placeholder="Tìm kiếm theo tên, địa chỉ, quận huyện..."
              prefix={<SearchOutlined style={{ color: "#8c8c8c" }} />}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </Col>
          <Col>
            <Select
              size="large"
              placeholder="Loại cơ sở"
              style={{ width: 200 }}
              allowClear
              onChange={v => setTypeFilter(v)}
              options={[
                { value: "Bệnh viện Tuyến Trung ương", label: "BV Trung ương" },
                { value: "Bệnh viện Tuyến Quận", label: "BV Tuyến Quận" },
                { value: "Phòng khám Đa khoa", label: "Phòng khám" },
                { value: "Nhà thuốc", label: "Nhà thuốc" },
              ]}
            />
          </Col>
          <Col>
            <Select
              size="large"
              placeholder="Hỗ trợ BHYT"
              style={{ width: 160 }}
              allowClear
              onChange={v => setBhytFilter(v === "yes" ? true : v === "no" ? false : null)}
              options={[{ value: "yes", label: "Có BHYT" }, { value: "no", label: "Không BHYT" }]}
            />
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]}>
        {filtered.map(f => (
          <Col key={f.id} xs={24} md={12} lg={12}>
            <Card className="ehr-card" hoverable bodyStyle={{ padding: 20 }}>
              <Space size={16} align="start" style={{ width: "100%" }}>
                <div style={{ width: 48, height: 48, borderRadius: 4, background: f.type.includes("Bệnh viện") ? "#e6f7ff" : f.type.includes("Phòng") ? "#f6ffed" : "#fff7e6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                  {typeIcon(f.type)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                    <Text strong style={{ fontSize: 14 }}>{f.name}</Text>
                    <Space size={4}>
                      <StarFilled style={{ color: "#faad14", fontSize: 12 }} />
                      <Text strong style={{ fontSize: 12 }}>{f.rating}</Text>
                    </Space>
                  </div>
                  <Tag bordered={false} color={f.type.includes("Bệnh viện") ? "blue" : f.type.includes("Phòng") ? "green" : "orange"} style={{ fontSize: 10, fontWeight: 700, marginBottom: 8 }}>
                    {f.type.toUpperCase()}
                  </Tag>
                  {f.bhyt && <Tag bordered={false} color="success" style={{ fontSize: 10, fontWeight: 700, marginBottom: 8 }}>BHYT ✓</Tag>}
                  <div style={{ fontSize: 12, color: "#595959", marginBottom: 4 }}>
                    <EnvironmentOutlined style={{ marginRight: 4 }} />{f.address}
                  </div>
                  <div style={{ fontSize: 12, color: "#595959", marginBottom: 4 }}>
                    <PhoneOutlined style={{ marginRight: 4 }} />{f.phone}
                    <span style={{ marginLeft: 16 }}><ClockCircleOutlined style={{ marginRight: 4 }} />{f.openHours}</span>
                  </div>
                  {f.specialties.length > 0 && (
                    <div style={{ marginTop: 8 }}>
                      {f.specialties.map(s => <Tag key={s} style={{ fontSize: 10, marginBottom: 4 }}>{s}</Tag>)}
                    </div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
                    <Text style={{ fontSize: 11, color: "#0050b3", fontWeight: 700 }}>📍 {f.distance}</Text>
                    <Space>
                      <Button size="small" onClick={() => message.info(`Gọi ${f.phone}`)}>Gọi ngay</Button>
                      <Button size="small" type="primary" onClick={() => message.info("Đặt lịch khám...")}>Đặt lịch</Button>
                    </Space>
                  </div>
                </div>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
