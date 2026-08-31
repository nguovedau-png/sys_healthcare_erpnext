"use client";
import React, { useState, useEffect } from "react";
import { Tabs, Button, Input, Table, Badge, message, Card, Row, Col, Typography, Space, Tag, Spin } from "antd";
const { Text, Title } = Typography;
import consultationService, { Consultation } from "@/services/consultation.service";
import { 
  SearchOutlined, 
  PlusOutlined, 
  HistoryOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";
import PatientInfoHeader from "@/components/portal/PatientInfoHeader";

const SAMPLE_PATIENT = {
    id: "2104140003",
    code: "21021228",
    name: "Nguyễn Văn A",
    gender: "Nam",
    age: 30,
    phone: "0901234567",
    ethnicity: "Kinh",
    address: "123 Đường Láng, Đống Đa, Hà Nội",
    job: "Kỹ sư",
    insuranceType: "Đúng tuyến",
    insuranceCode: "GD4010121085002",
    insuranceRate: "80%",
    insuranceExpiry: "01/01/2026 - 31/12/2026"
};

const getFallbackPatients = () => [
    { id: '2104140005', name: 'MGT VA DOITUONGUD', gender: 'F', age: 30, status: 'Waiting', type: 'Thu phí', line: 'Đúng tuyến' },
    { id: '2104140008', name: 'TESTHU DVKY KBENH', gender: 'M', age: 30, status: 'Waiting', type: 'Nhân BHYT', line: 'Đúng tuyến' },
    { id: '2104140003', name: 'NGUYỄN VĂN A', gender: 'M', age: 30, status: 'Examining', type: 'BHYT', line: 'Đúng tuyến' },
    { id: '2104140004', name: 'TEST MIEM GIAM', gender: 'F', age: 34, status: 'Waiting', type: 'Thu phí', line: 'Trái tuyến' },
    { id: '2104140006', name: 'LÊ CHÁNH', gender: 'M', age: 34, status: 'Waiting', type: 'Thu phí', line: 'Đúng tuyến' },
];

export default function ConsultationPage() {
    const [activeTab, setActiveTab] = useState("1");
    const [loading, setLoading] = useState(true);
    const [patients, setPatients] = useState<any[]>(getFallbackPatients());
    const [selectedPatient, setSelectedPatient] = useState<any>(SAMPLE_PATIENT);

    useEffect(() => {
        const fetchPatients = async () => {
            setLoading(true);
            try {
                const data = await consultationService.getConsultations();
                if (data && data.length > 0) {
                    const mapped = data.map((c: any) => ({
                        id: c.patientId || c.id.toString(),
                        name: c.patientName,
                        gender: c.patientGender === 'Nam' ? 'M' : 'F',
                        age: c.patientAge,
                        status: c.status.charAt(0).toUpperCase() + c.status.slice(1),
                        type: c.type || 'BHYT',
                        line: c.line || 'Đúng tuyến',
                        raw: c
                    }));
                    setPatients(mapped);
                    // If current patient is not set or not in new list, pick first one
                    if (mapped.length > 0 && selectedPatient.id === SAMPLE_PATIENT.id) {
                        handleSelectPatient(mapped[0]);
                    }
                }
            } catch (e) { console.error('Failed to fetch consultation patients:', e); }
            finally { setLoading(false); }
        };
        fetchPatients();
    }, []);

    const handleSelectPatient = (p: any) => {
        setSelectedPatient({
            id: p.id,
            code: p.id,
            name: p.name,
            gender: p.gender === 'M' ? 'Nam' : 'Nữ',
            age: p.age,
            phone: '0901234567',
            ethnicity: 'Kinh',
            address: '123 Đường Láng, Đống Đa, Hà Nội',
            job: 'Kỹ sư',
            insuranceType: p.type,
            insuranceCode: 'GD4010121085002',
            insuranceRate: '80%',
            insuranceExpiry: '01/01/2026 - 31/12/2026'
        });
    };

    const columns = [
        { title: 'Họ tên', dataIndex: 'name', key: 'name', render: (t: string, r: any) => <div><Text strong>{t}</Text><br/><Text type="secondary" style={{fontSize: 11}}>{r.id}</Text></div> },
        { title: 'Đối tượng', dataIndex: 'type', key: 'type', render: (t: string) => <Tag color={t.includes('BHYT') ? 'blue' : 'default'} style={{fontSize: 10}}>{t}</Tag> },
        { title: 'Tuyến khám', dataIndex: 'line', key: 'line', render: (t: string) => <Text style={{fontSize: 11}}>{t}</Text> },
    ];

    const tabItems = [
        { key: '1', label: 'KHÁM BỆNH', children: (
            <div style={{ padding: 16 }}>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Text strong style={{ fontSize: 13, textTransform: 'uppercase', color: '#0050b3' }}>Lý do vào viện</Text>
                        <Input.TextArea rows={2} style={{ marginTop: 8 }} placeholder="Nhập lý do vào viện..." />
                    </Col>
                    <Col span={24}>
                        <Text strong style={{ fontSize: 13, textTransform: 'uppercase', color: '#0050b3' }}>Bệnh sử</Text>
                        <Input.TextArea rows={3} style={{ marginTop: 8 }} placeholder="Mô tả quá trình bệnh lý..." />
                    </Col>
                    <Col span={24}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text strong style={{ fontSize: 13, textTransform: 'uppercase', color: '#0050b3' }}>Tiền sử bệnh</Text>
                                <Button type="text" icon={<PlusOutlined />} size="small" />
                            </div>
                            <div style={{ padding: '8px 12px', background: '#fafafa', border: '1px solid #d9d9d9', borderRadius: 4 }}>
                                <Text type="secondary">Không có tiền sử bệnh</Text>
                            </div>
                        </Space>
                    </Col>
                    <Col span={24}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text strong style={{ fontSize: 13, textTransform: 'uppercase', color: '#0050b3' }}>Tiền sử gia đình</Text>
                                <Button type="text" icon={<PlusOutlined />} size="small" />
                            </div>
                            <div style={{ padding: '8px 12px', background: '#fafafa', border: '1px solid #d9d9d9', borderRadius: 4 }}>
                                <Text type="secondary">Không có tiền sử gia đình</Text>
                            </div>
                        </Space>
                    </Col>
                    <Col span={24}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text strong style={{ fontSize: 13, textTransform: 'uppercase', color: '#0050b3' }}>Dị ứng</Text>
                                <Button type="text" icon={<PlusOutlined />} size="small" />
                            </div>
                            <div style={{ padding: '8px 12px', background: '#fafafa', border: '1px solid #d9d9d9', borderRadius: 4 }}>
                                <Text type="secondary">Không có dị ứng</Text>
                            </div>
                        </Space>
                    </Col>
                    <Col span={24}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text strong style={{ fontSize: 13, textTransform: 'uppercase', color: '#0050b3' }}>Chỉ số sinh tồn</Text>
                            </div>
                            <Row gutter={8}>
                                <Col span={6}>
                                    <Input addonBefore="Mạch" addonAfter="l/p" size="small" />
                                </Col>
                                <Col span={6}>
                                    <Input addonBefore="Huyết áp" addonAfter="mmHg" size="small" />
                                </Col>
                                <Col span={6}>
                                    <Input addonBefore="Nhiệt độ" addonAfter="°C" size="small" />
                                </Col>
                                <Col span={6}>
                                    <Input addonBefore="SpO2" addonAfter="%" size="small" />
                                </Col>
                            </Row>
                        </Space>
                    </Col>
                    <Col span={24}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text strong style={{ fontSize: 13, textTransform: 'uppercase', color: '#0050b3' }}>Khám toàn thân</Text>
                                <Button type="text" icon={<PlusOutlined />} size="small" />
                            </div>
                            <Input.TextArea rows={2} placeholder="Nội dung khám toàn thân..." />
                        </Space>
                    </Col>
                    <Col span={24}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text strong style={{ fontSize: 13, textTransform: 'uppercase', color: '#0050b3' }}>Khám các cơ quan</Text>
                                <Button type="text" icon={<PlusOutlined />} size="small" />
                            </div>
                            <Input.TextArea rows={2} placeholder="Nội dung khám các cơ quan..." />
                        </Space>
                    </Col>
                </Row>
            </div>
        ) },
        { key: '2', label: 'LỊCH SỬ KHÁM', children: <div style={{ padding: 16 }}>Lịch sử khám...</div> },
        { key: '3', label: 'CHỈ ĐỊNH', children: <div style={{ padding: 16 }}>Chỉ định cận lâm sàng...</div> },
        { key: '4', label: 'KẾT QUẢ', children: <div style={{ padding: 16 }}>Kết quả xét nghiệm / chẩn đoán hình ảnh...</div> },
        { key: '5', label: 'CHẨN ĐOÁN & KÊ ĐƠN', children: (
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                    <Text strong style={{ fontSize: 13, textTransform: 'uppercase', color: '#0050b3' }}>Chẩn đoán (ICD-10)</Text>
                    <Input.Search placeholder="Nhập mã hoặc tên bệnh ICD-10..." enterButton="Thêm" style={{ marginTop: 8 }} />
                </div>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <Text strong style={{ fontSize: 13, textTransform: 'uppercase', color: '#0050b3' }}>Đơn thuốc</Text>
                        <Space>
                            <Button size="small">Form soạn sẵn</Button>
                            <Button size="small" type="primary" icon={<PlusOutlined />}>Kê thuốc</Button>
                        </Space>
                    </div>
                    <Table 
                        size="small"
                        pagination={false}
                        dataSource={[
                            { key: 1, name: 'Paracetamol 500mg', days: 5, dosage: 'Sáng 1, Tối 1', usage: 'Sau ăn', qty: 10 }
                        ]}
                        columns={[
                            { title: 'Tên thuốc', dataIndex: 'name' },
                            { title: 'Số ngày', dataIndex: 'days', width: 80 },
                            { title: 'Cách dùng (số lượng)', dataIndex: 'dosage' },
                            { title: 'Chỉ định', dataIndex: 'usage' },
                            { title: 'SL', dataIndex: 'qty', width: 60 },
                        ]}
                    />
                </div>
                <div>
                    <Text strong style={{ fontSize: 13, textTransform: 'uppercase', color: '#0050b3' }}>Lời dặn</Text>
                    <Input.TextArea rows={2} style={{ marginTop: 8 }} placeholder="Lời dặn dò bệnh nhân..." />
                </div>
            </div>
        ) },
    ];

    return (
        <div style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', flex: 1, gap: 12, overflow: 'hidden' }}>
                {/* Left Patient List */}
                <Card 
                    className="ehr-card" 
                    bodyStyle={{ padding: 0, display: 'flex', flexDirection: 'column', height: '100%' }}
                    style={{ width: 340, flexShrink: 0 }}
                >
                    <Tabs
                        defaultActiveKey="1"
                        items={[
                            { key: '1', label: 'BỆNH NHÂN ĐANG KHÁM' },
                            { key: '2', label: 'DANH SÁCH HOÀN THÀNH KHÁM' }
                        ]}
                        size="small"
                        tabBarStyle={{ marginBottom: 0, padding: '0 8px', fontWeight: 600 }}
                    />
                    <div style={{ padding: 8, borderBottom: '1px solid #d9d9d9', borderTop: '1px solid #f0f0f0' }}>
                        <Input prefix={<SearchOutlined />} placeholder="Tìm kiếm bệnh nhân..." size="small" />
                    </div>
                    <div style={{ flex: 1, overflow: 'auto' }}>
                        {loading ? (
                            <div style={{ padding: 40, textAlign: 'center' }}><Spin /></div>
                        ) : (
                            <Table 
                                className="ehr-table-compact"
                                dataSource={patients} 
                                columns={columns} 
                                pagination={false} 
                                size="small"
                                onRow={(record) => ({
                                    onClick: () => handleSelectPatient(record),
                                    style: { cursor: 'pointer' }
                                })}
                                rowClassName={(record) => record.id === selectedPatient.id ? 'bg-blue-50' : ''}
                            />
                        )}
                    </div>
                    <div style={{ padding: 8, borderTop: '1px solid #d9d9d9', background: '#fafafa' }}>
                        <Text strong style={{ fontSize: 12 }}>Số lượng: {patients.length}</Text>
                    </div>
                </Card>

                {/* Right Consultation Area */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden' }}>
                    <PatientInfoHeader patient={selectedPatient} />
                    
                    <Card 
                        className="ehr-card ehr-tabs-square" 
                        bodyStyle={{ padding: 0, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                        style={{ flex: 1 }}
                    >
                        <Tabs 
                            activeKey={activeTab} 
                            onChange={setActiveTab}
                            items={tabItems}
                            type="card"
                            size="small"
                        />
                    </Card>

                    {/* Bottom Actions */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                        <Button danger>BN vắng</Button>
                        <Space>
                            <Button>In phiếu</Button>
                            <Button type="primary">Chuyển dịch vụ khám</Button>
                        </Space>
                    </div>
                </div>
            </div>
        </div>
    );
}