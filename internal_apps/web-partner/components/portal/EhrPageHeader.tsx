"use client";

import React from 'react';
import { Row, Col, Typography, Space, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

interface EhrPageHeaderProps {
    title: string;
    subtitle?: string;
    onBack?: () => void;
    extra?: React.ReactNode;
    primaryAction?: {
        label: string;
        icon?: React.ReactNode;
        onClick: () => void;
    };
}

export default function EhrPageHeader({ title, subtitle, onBack, extra, primaryAction }: EhrPageHeaderProps) {
    return (
        <Row justify="space-between" align="middle" gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} lg={16}>
                <Space align="center" size="middle">
                    {onBack && <Button type="text" icon={<ArrowLeftOutlined />} onClick={onBack} aria-label="Quay lại" />}
                    <Title level={3} style={{ fontWeight: 700, margin: 0, color: '#001529' }}>{title}</Title>
                </Space>
                {subtitle && <Text type="secondary" style={{ fontSize: 13, display: 'block', marginTop: 4 }}>{subtitle}</Text>}
            </Col>
            <Col xs={24} lg={8} style={{ textAlign: 'right' }}>
                <Space size="middle">
                    {extra}
                    {primaryAction && (
                        <Button 
                            type="primary" 
                            size="large" 
                            icon={primaryAction.icon} 
                            onClick={primaryAction.onClick}
                            style={{ height: 40, padding: '0 24px', fontWeight: 600, borderRadius: 4 }}
                        >
                            {primaryAction.label.toUpperCase()}
                        </Button>
                    )}
                </Space>
            </Col>
        </Row>
    );
}
