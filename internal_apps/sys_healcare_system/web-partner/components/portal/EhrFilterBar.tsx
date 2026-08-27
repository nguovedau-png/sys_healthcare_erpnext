"use client";

import React from 'react';
import { Row, Col, Card, Input, Space, Button } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';

interface EhrFilterBarProps {
    placeholder?: string;
    onSearch?: (val: string) => void;
    children?: React.ReactNode;
}

export default function EhrFilterBar({ placeholder, onSearch, children }: EhrFilterBarProps) {
    return (
        <Card className="ehr-card" bodyStyle={{ padding: 12 }} style={{ marginBottom: 24 }}>
            <Row gutter={[12, 12]} align="middle">
                <Col flex="1">
                    <Input 
                        placeholder={placeholder || "Tìm kiếm..."} 
                        prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />} 
                        onChange={(e) => onSearch?.(e.target.value)}
                        style={{ borderRadius: 4, height: 40 }}
                    />
                </Col>
                <Col>
                    <Space size={8}>
                        {children}
                        <Button 
                            icon={<FilterOutlined />} 
                            style={{ height: 40, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        />
                    </Space>
                </Col>
            </Row>
        </Card>
    );
}
