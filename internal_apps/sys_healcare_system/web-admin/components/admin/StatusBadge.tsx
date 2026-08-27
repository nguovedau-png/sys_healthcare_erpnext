"use client";

import React from 'react';
import { Tag } from 'antd';

interface StatusBadgeProps {
    status: 'active' | 'inactive' | 'pending' | 'published' | 'draft' | 'approved' | 'rejected' | 'processing' | 'shipping' | 'confirmed' | 'completed' | 'cancelled';
    label?: string;
}

const colorMap: Record<string, string> = {
    active: 'success',
    inactive: 'default',
    pending: 'warning',
    processing: 'processing',
    shipping: 'blue',
    published: 'processing',
    draft: 'default',
    approved: 'success',
    confirmed: 'blue',
    completed: 'success',
    cancelled: 'error',
    rejected: 'error',
};

const labelMap: Record<string, string> = {
    active: 'Hoạt động',
    inactive: 'Tạm ngưng',
    pending: 'Chờ duyệt',
    processing: 'Đang xử lý',
    shipping: 'Đang giao',
    published: 'Đã xuất bản',
    draft: 'Nháp',
    approved: 'Đã duyệt',
    confirmed: 'Đã xác nhận',
    completed: 'Hoàn thành',
    cancelled: 'Đã hủy',
    rejected: 'Từ chối',
};

export default function StatusBadge({ status, label }: StatusBadgeProps) {
    return (
        <Tag color={colorMap[status] || 'default'} bordered={false}>
            {label || labelMap[status] || status}
        </Tag>
    );
}
