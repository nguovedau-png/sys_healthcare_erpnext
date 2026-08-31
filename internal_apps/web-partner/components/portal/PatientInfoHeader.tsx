"use client";

import React from 'react';
import { Row, Col, Typography, Space, Divider } from 'antd';
const { Text } = Typography;

interface PatientInfo {
    id: string;
    code: string;
    name: string;
    gender: string;
    age: number;
    phone: string;
    ethnicity: string;
    address: string;
    job: string;
    insuranceType: string;
    insuranceCode: string;
    insuranceRate: string;
    insuranceExpiry: string;
}

interface PatientInfoHeaderProps {
    patient: PatientInfo;
    onAction?: (action: string) => void;
}

export default function PatientInfoHeader({ patient }: PatientInfoHeaderProps) {
    return (
        <div className="ehr-patient-header">
            <div style={{ marginBottom: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text strong style={{ color: 'var(--ehr-header-text)', fontSize: 13, textTransform: 'uppercase' }}>
                    Bệnh nhân đang khám
                </Text>
                <Space>
                    <Text strong style={{ fontSize: 13 }}>TẠM ỨNG: <span style={{ color: '#0958d9' }}>0,00 ₫</span></Text>
                    <Divider type="vertical" />
                    <Text strong style={{ fontSize: 13 }}>CÒN LẠI: <span style={{ color: '#cf1322' }}>0,00 ₫</span></Text>
                </Space>
            </div>
            <div style={{ borderTop: '1px solid var(--ehr-header-border)', paddingTop: 8 }}>
                <Text strong style={{ fontSize: 14, color: '#000', marginRight: 16 }}>THÔNG TIN HÀNH CHÍNH</Text>
                <Row gutter={[16, 4]}>
                    <Col>
                        <Space size={4}>
                            <Text type="secondary" style={{ fontSize: 12 }}>Mã TN:</Text>
                            <Text strong style={{ fontSize: 12 }}>{patient.id}</Text>
                        </Space>
                    </Col>
                    <Col>
                        <Space size={4}>
                            <Text type="secondary" style={{ fontSize: 12 }}>Mã BN:</Text>
                            <Text strong style={{ fontSize: 12 }}>{patient.code}</Text>
                        </Space>
                    </Col>
                    <Col>
                        <Space size={4}>
                            <Text type="secondary" style={{ fontSize: 12 }}>Họ tên:</Text>
                            <Text strong style={{ fontSize: 12, color: '#c41d7f' }}>{patient.name.toUpperCase()}</Text>
                        </Space>
                    </Col>
                    <Col>
                        <Space size={4}>
                            <Text type="secondary" style={{ fontSize: 12 }}>Giới tính:</Text>
                            <Text strong style={{ fontSize: 12 }}>{patient.gender}</Text>
                        </Space>
                    </Col>
                    <Col>
                        <Space size={4}>
                            <Text type="secondary" style={{ fontSize: 12 }}>Tuổi:</Text>
                            <Text strong style={{ fontSize: 12 }}>{patient.age}</Text>
                        </Space>
                    </Col>
                    <Col>
                        <Space size={4}>
                            <Text type="secondary" style={{ fontSize: 12 }}>SĐT:</Text>
                            <Text strong style={{ fontSize: 12 }}>{patient.phone}</Text>
                        </Space>
                    </Col>
                    <Col>
                        <Space size={4}>
                            <Text type="secondary" style={{ fontSize: 12 }}>Dân tộc:</Text>
                            <Text strong style={{ fontSize: 12 }}>{patient.ethnicity}</Text>
                        </Space>
                    </Col>
                </Row>
                <Row gutter={[16, 4]} style={{ marginTop: 4 }}>
                    <Col>
                        <Space size={4}>
                            <Text type="secondary" style={{ fontSize: 12 }}>Địa chỉ:</Text>
                            <Text strong style={{ fontSize: 12 }}>{patient.address}</Text>
                        </Space>
                    </Col>
                    <Col>
                        <Space size={4}>
                            <Text type="secondary" style={{ fontSize: 12 }}>Nghề nghiệp:</Text>
                            <Text strong style={{ fontSize: 12 }}>{patient.job}</Text>
                        </Space>
                    </Col>
                    <Col>
                        <Space size={4}>
                            <Text type="secondary" style={{ fontSize: 12 }}>Tuyến khám:</Text>
                            <Text strong style={{ fontSize: 12, color: '#389e0d' }}>{patient.insuranceType}</Text>
                        </Space>
                    </Col>
                    <Col>
                        <Space size={4}>
                            <Text type="secondary" style={{ fontSize: 12 }}>Số BHYT:</Text>
                            <Text strong style={{ fontSize: 12, color: '#0958d9' }}>{patient.insuranceCode}</Text>
                        </Space>
                    </Col>
                    <Col>
                        <Space size={4}>
                            <Text type="secondary" style={{ fontSize: 12 }}>Mức hưởng:</Text>
                            <Text strong style={{ fontSize: 12, color: '#0958d9' }}>{patient.insuranceRate}</Text>
                        </Space>
                    </Col>
                    <Col>
                        <Space size={4}>
                            <Text type="secondary" style={{ fontSize: 12 }}>Ngày hiệu lực:</Text>
                            <Text strong style={{ fontSize: 12 }}>{patient.insuranceExpiry}</Text>
                        </Space>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
