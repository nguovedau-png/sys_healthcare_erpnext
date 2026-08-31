"use client";

import React, { useEffect } from 'react';
import { Form, Input, Select, DatePicker, Button, Row, Col, Space, Card } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

interface Field {
    name: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'date' | 'file';
    placeholder?: string;
    required?: boolean;
    options?: { value: string; label: string }[];
    rows?: number;
    disabled?: boolean;
    isMulti?: boolean;
    colSpan?: number; // Added to support custom column spanning
}

interface FormBuilderProps {
    fields: Field[];
    onSubmit: (data: any) => void;
    submitLabel?: string;
    initialValues?: any;
    columns?: 1 | 2 | 3;
    loading?: boolean;
}

export default function FormBuilder({
    fields,
    onSubmit,
    submitLabel = 'Lưu thay đổi',
    initialValues = {},
    columns = 2,
    loading = false
}: FormBuilderProps) {
    const [form] = Form.useForm();

    useEffect(() => {
        // Handle date fields in initialValues for antd DatePicker
        const processedValues = { ...initialValues };
        fields.forEach(field => {
            if (field.type === 'date' && processedValues[field.name]) {
                processedValues[field.name] = dayjs(processedValues[field.name]);
            }
        });
        form.setFieldsValue(processedValues);
    }, [initialValues, fields, form]);

    const onFinish = (values: any) => {
        // Convert dayjs objects back to strings/dates if needed
        const processedValues = { ...values };
        fields.forEach(field => {
            if (field.type === 'date' && processedValues[field.name]) {
                processedValues[field.name] = processedValues[field.name].toISOString?.() || processedValues[field.name];
            }
        });
        onSubmit(processedValues);
    };

    const renderField = (field: Field) => {
        switch (field.type) {
            case 'select':
                return (
                    <Select
                        placeholder={field.placeholder || `Chọn ${field.label.toLowerCase()}`}
                        options={field.options}
                        disabled={field.disabled}
                        mode={field.isMulti ? 'multiple' : undefined}
                        allowClear
                        style={{ width: '100%' }}
                    />
                );
            case 'date':
                return (
                    <DatePicker
                        placeholder={field.placeholder || `Chọn ngày`}
                        disabled={field.disabled}
                        style={{ width: '100%' }}
                    />
                );
            case 'textarea':
                return (
                    <Input.TextArea
                        placeholder={field.placeholder}
                        disabled={field.disabled}
                        rows={field.rows || 4}
                    />
                );
            case 'password':
                return (
                    <Input.Password
                        placeholder={field.placeholder}
                        disabled={field.disabled}
                    />
                );
            case 'number':
                return (
                    <Input
                        type="number"
                        placeholder={field.placeholder}
                        disabled={field.disabled}
                    />
                );
            case 'email':
                return (
                    <Input
                        type="email"
                        placeholder={field.placeholder}
                        disabled={field.disabled}
                    />
                );
            default:
                return (
                    <Input
                        placeholder={field.placeholder}
                        disabled={field.disabled}
                    />
                );
        }
    };

    const getColSpan = (field: Field) => {
        if (field.colSpan) return field.colSpan;
        if (field.type === 'textarea') return 24; // Textareas usually take full width
        return 24 / columns;
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={initialValues}
            className="animate-in fade-in duration-500"
        >
            <Row gutter={[24, 0]}>
                {fields.map((field) => (
                    <Col key={field.name} span={getColSpan(field)}>
                        <Form.Item
                            name={field.name}
                            label={<span style={{ fontWeight: 600 }}>{field.label}</span>}
                            rules={[{ required: field.required, message: `Vui lòng nhập ${field.label.toLowerCase()}` }]}
                        >
                            {renderField(field)}
                        </Form.Item>
                    </Col>
                ))}
            </Row>

            <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid #f0f0f0' }}>
                <Space size="middle">
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        icon={<CheckOutlined />}
                        size="large"
                        style={{ paddingLeft: 32, paddingRight: 32 }}
                    >
                        {submitLabel}
                    </Button>
                    <Button
                        icon={<CloseOutlined />}
                        size="large"
                        onClick={() => window.history.back()}
                    >
                        Hủy bỏ
                    </Button>
                </Space>
            </div>
        </Form>
    );
}
