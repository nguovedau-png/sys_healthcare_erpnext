"use client";

import React from 'react';
import { Row, Col, Card, Statistic, Typography } from 'antd';
const { Text } = Typography;

interface StatItem {
    label: string;
    value: string | number;
    icon?: React.ReactNode;
    color?: string;
    trend?: number;
}

interface EhrStatCardsProps {
    stats: StatItem[];
}

export default function EhrStatCards({ stats }: EhrStatCardsProps) {
    return (
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            {stats.map((s, i) => (
                <Col key={i} xs={24} sm={12} lg={6}>
                    <Card className="ehr-card" bodyStyle={{ padding: 20, position: 'relative', overflow: 'hidden' }}>
                        {s.icon && (
                            <div style={{ position: 'absolute', top: 12, right: 12, opacity: 0.1, fontSize: 24 }}>
                                {s.icon}
                            </div>
                        )}
                        <Statistic 
                            value={s.value} 
                            valueStyle={{ fontWeight: 700, fontSize: 24, color: '#001529' }} 
                        />
                        <Text style={{ fontSize: 11, color: '#8c8c8c', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 4, display: 'block' }}>
                            {s.label}
                        </Text>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}
