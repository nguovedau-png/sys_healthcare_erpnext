"use client";
import React, { useState, useEffect } from "react";
import { Tag, Button, Input, Select, Badge, Table, message, Tooltip, Card, Row, Col, Typography, Space, Statistic, Tabs, Spin } from "antd";
const { Title, Text, Paragraph } = Typography;
import { DollarOutlined, SearchOutlined, FilterOutlined, PlusOutlined, FileExcelOutlined, EditOutlined, DeleteOutlined, MoreOutlined, SafetyCertificateFilled, CloudSyncOutlined } from "@ant-design/icons";
import CrudModal, { CrudField } from "@/components/common/CrudModal";
import DeleteModal from "@/components/common/DeleteModal";
import financeService from "@/services/finance.service";

import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";
import EhrFilterBar from "@/components/portal/EhrFilterBar";

const INV_FIELDS: CrudField[] = [
  { name: "patientName", label: "Tên bệnh nhân", type: "text", required: true },
  { name: "amount", label: "Tổng tiền (₫)", type: "number", required: true },
  { name: "status", label: "Trạng thái", type: "select", options: [{ value: "paid", label: "Đã thanh toán" }, { value: "pending", label: "Chờ thanh toán" }] },
];

const getFallbackInvoices = () => [
  { id: "HD-001", patientName: "Nguyễn Văn A", patientId: "BN-001", serviceType: "Outpatient", amount: 1500000, insuranceCovered: 1200000, patientPaid: 300000, status: "paid", date: "25/04/2026" },
  { id: "HD-002", patientName: "Trần Thị B", patientId: "BN-002", serviceType: "Inpatient", amount: 8500000, insuranceCovered: 7000000, patientPaid: 1500000, status: "pending", date: "25/04/2026" },
  { id: "HD-003", patientName: "Lê Văn C", patientId: "BN-003", serviceType: "Outpatient", amount: 450000, insuranceCovered: 0, patientPaid: 450000, status: "paid", date: "24/04/2026" },
  { id: "HD-004", patientName: "Phạm Thu D", patientId: "BN-004", serviceType: "Inpatient", amount: 12000000, insuranceCovered: 10000000, patientPaid: 2000000, status: "pending", date: "24/04/2026" },
];

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState<string>("billing");
  const [invoices, setInvoices] = useState<any[]>(getFallbackInvoices());
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await financeService.getRevenue();
        if (data && data.length > 0) {
          const mapped = data.map((r: any) => ({
            id: r.id || `HD-${String(r.id).padStart(3, "0")}`,
            patientName: r.details || "Bệnh nhân",
            patientId: `BN-${r.id}`,
            serviceType: r.type || "Outpatient",
            amount: r.amount || 0,
            insuranceCovered: r.fee || 0,
            patientPaid: r.net || 0,
            status: r.status === 'Completed' ? 'paid' : 'pending',
            date: r.timestamp || "25/04/2026"
          }));
          setInvoices(mapped);
        }
      } catch (e) { console.error('Failed to fetch finance data:', e); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const handleAdd = (v: any) => { setInvoices((p) => [{ ...v, id: `HD-${String(p.length + 1).padStart(3, "0")}` }, ...p]); setAddOpen(false); message.success("Đã tạo hóa đơn mới!"); };
  const handleEdit = (v: any) => { setInvoices((p) => p.map((r) => (r.id === editRecord.id ? { ...r, ...v } : r))); setEditRecord(null); message.success("Cập nhật hóa đơn thành công!"); };
  const handleDelete = () => { setInvoices((p) => p.filter((r) => r.id !== deleteRecord.id)); setDeleteRecord(null); message.success("Đã xóa hóa đơn!"); };

  const totalRevenue = invoices.reduce((s, i) => s + Number(i.amount), 0);
  const insuranceTotal = invoices.reduce((s, i) => s + Number(i.insuranceCovered), 0);
  const patientTotal = invoices.reduce((s, i) => s + Number(i.patientPaid), 0);

  const stats = [
    { label: "Tổng doanh thu", value: `${(totalRevenue / 1e6).toFixed(1)}M`, icon: <DollarOutlined /> },
    { label: "BHYT chi trả", value: `${(insuranceTotal / 1e6).toFixed(1)}M`, color: "#0050b3" },
    { label: "Bệnh nhân nộp", value: `${(patientTotal / 1e6).toFixed(1)}M`, color: "#52c41a" },
    { label: "Chờ thanh toán", value: `${invoices.filter((i) => i.status === "pending").length}`, color: "#f5222d" },
  ];

  const columns = [
    {
      title: <Text strong style={{ fontSize: 11 }}>HÓA ĐƠN / BỆNH NHÂN</Text>,
      render: (_: any, r: any) => (
        <Space size={12}>
          <div style={{ width: 32, height: 32, borderRadius: 4, background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0050b3' }}>
            <DollarOutlined />
          </div>
          <div>
            <Text strong style={{ fontSize: 13, display: 'block' }}>{r.id}</Text>
            <Text type="secondary" style={{ fontSize: 11 }}>{r.patientName} • {r.patientId}</Text>
          </div>
        </Space>
      ),
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>LOẠI HÌNH</Text>, 
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.serviceType === "Inpatient" ? "purple" : "blue"} style={{ fontSize: 10, fontWeight: 700 }}>
          {r.serviceType.toUpperCase()}
        </Tag>
      ) 
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>TỔNG PHÍ</Text>, 
      render: (_: any, r: any) => <Text strong style={{ fontSize: 13 }}>{Number(r.amount).toLocaleString()} ₫</Text> 
    },
    {
      title: <Text strong style={{ fontSize: 11 }}>PHÂN BỔ</Text>,
      render: (_: any, r: any) => (
        <div style={{ fontSize: 10, fontWeight: 600 }}>
          <div style={{ color: '#0050b3' }}>BHYT: {Number(r.insuranceCovered).toLocaleString()} ₫</div>
          <div style={{ color: '#52c41a' }}>BN: {Number(r.patientPaid).toLocaleString()} ₫</div>
        </div>
      ),
    },
    { 
      title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>, 
      render: (_: any, r: any) => (
        <Tag bordered={false} color={r.status === "paid" ? "green" : "orange"} style={{ fontSize: 10, fontWeight: 700 }}>
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
        title="Quản trị Tài chính & Thu ngân" 
        subtitle="Quản lý hóa đơn y tế, đối soát BHYT và hệ thống báo cáo doanh thu tập trung"
        primaryAction={{
            label: "Tạo hóa đơn",
            icon: <PlusOutlined />,
            onClick: () => setAddOpen(true)
        }}
        extra={<Button icon={<FileExcelOutlined />}>Xuất báo cáo</Button>}
      />

      <EhrStatCards stats={stats} />

      <Card className="ehr-card" style={{ marginBottom: 24 }}>
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={[
            { key: "billing", label: "DANH SÁCH THU NGÂN" },
            { key: "revenue", label: "PHÂN TÍCH DOANH THU" },
            { key: "insurance", label: "ĐỐI SOÁT BHYT" }
        ]} />
        <div style={{ marginTop: 20 }}>
            <EhrFilterBar placeholder="Tìm hóa đơn, mã BN, tên bệnh nhân...">
                <Select placeholder="Trạng thái" style={{ width: 150 }} options={[{ value: "paid", label: "Đã thanh toán" }, { value: "pending", label: "Chờ thanh toán" }]} />
            </EhrFilterBar>
            <Table 
                className="ehr-table-compact"
                dataSource={invoices} 
                rowKey="id" 
                pagination={false} 
                columns={columns} 
                size="small"
            />
        </div>
      </Card>

      <Card bordered={false} style={{ background: '#001529', backgroundImage: 'linear-gradient(135deg, #001529 0%, #003a8c 100%)', borderRadius: 4 }} bodyStyle={{ padding: 40 }}>
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} lg={16}>
            <Space direction="vertical" size={20}>
              <Space align="center" size={12}>
                <SafetyCertificateFilled style={{ color: '#52c41a', fontSize: 32 }} />
                <Title level={4} style={{ color: 'white', margin: 0, fontWeight: 700 }}>Insurance Reconciliation Hub</Title>
              </Space>
              <Paragraph style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, margin: 0 }}>
                Hệ thống tự động đồng bộ hồ sơ XML 1-5 lên cổng giám định BHYT. Tỷ lệ hồ sơ hợp lệ đạt <Text strong style={{ color: 'white' }}>99.8%</Text> trong tháng này.
              </Paragraph>
              <Space size="middle">
                <Button type="primary" style={{ height: 40, padding: '0 24px', fontWeight: 600 }}>ĐỒNG BỘ CỔNG GĐ</Button>
                <Button ghost style={{ height: 40, padding: '0 24px', fontWeight: 600, borderColor: 'rgba(255,255,255,0.2)' }}>XUẤT FILE XML</Button>
              </Space>
            </Space>
          </Col>
          <Col xs={24} lg={8}>
             <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.05)', padding: 32, borderRadius: 4 }}>
               <Statistic value={248} title={<Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, fontWeight: 700 }}>HỒ SƠ ĐÃ ĐỒNG BỘ</Text>} valueStyle={{ color: '#fff', fontSize: 48, fontWeight: 700 }} />
               <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#52c41a' }} />
                  <Text style={{ color: '#52c41a', fontSize: 11, fontWeight: 700 }}>KẾT NỐI ỔN ĐỊNH</Text>
               </div>
            </div>
          </Col>
        </Row>
      </Card>

      <CrudModal open={addOpen || !!editRecord} onClose={() => { setAddOpen(false); setEditRecord(null); }} onSubmit={editRecord ? handleEdit : handleAdd} record={editRecord} title="Hóa đơn / Thanh toán" fields={INV_FIELDS} />
      <DeleteModal open={!!deleteRecord} recordName={deleteRecord ? `${deleteRecord.id} - ${deleteRecord.patientName}` : undefined} onConfirm={handleDelete} onCancel={() => setDeleteRecord(null)} />
    </div>
  );
}