"use client";
import React, { useState } from 'react';
import { Modal, Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { jobsService } from '@/services/jobs.service';
import { JobPosting } from '@/types/job-application';

interface ApplyModalProps {
    open: boolean;
    onCancel: () => void;
    job: JobPosting | null;
    onSuccess: () => void;
}

export default function ApplyModal({ open, onCancel, job, onSuccess }: ApplyModalProps) {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = async (values: any) => {
        if (!job) return;

        try {
            setLoading(true);
            // In a real app, we would upload the CV file to file-service first
            // For now, we simulate a CV URL or use a placeholder
            const placeholderCvUrl = "https://example.com/cv-placeholder.pdf";

            await jobsService.createJobApplication({
                jobPostingId: job.id,
                pharmacyId: job.pharmacyId,
                pharmacyName: job.pharmacyName,
                position: job.position,
                pharmacistId: "guest", // or get from auth context
                pharmacistName: values.name,
                cvUrl: placeholderCvUrl,
                coverLetter: values.intro,
            });

            message.success('Ứng tuyển thành công!');
            form.resetFields();
            onSuccess();
        } catch (error) {
            console.error(error);
            message.error('Có lỗi xảy ra, vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title={`Ứng tuyển: ${job?.position || ''}`}
            open={open}
            onCancel={onCancel}
            footer={null}
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="name"
                    label="Họ và tên"
                    rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                >
                    <Input placeholder="Nguyễn Văn A" />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                >
                    <Input placeholder="0909xxxxxx" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ' }]}
                >
                    <Input placeholder="example@gmail.com" />
                </Form.Item>

                <Form.Item
                    name="cv"
                    label="CV / Hồ sơ (PDF, DOC)"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => {
                        if (Array.isArray(e)) return e;
                        return e?.fileList;
                    }}
                    rules={[{ required: true, message: 'Vui lòng tải lên CV' }]}
                >
                    <Upload name="cv" beforeUpload={() => false} maxCount={1}>
                        <Button icon={<UploadOutlined />}>Tải lên CV</Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    name="intro"
                    label="Giới thiệu bản thân"
                >
                    <Input.TextArea rows={4} placeholder="Sơ lược về kinh nghiệm..." />
                </Form.Item>

                <div className="flex justify-end gap-2 mt-4">
                    <Button onClick={onCancel}>Hủy</Button>
                    <Button type="primary" htmlType="submit" loading={loading} className="bg-green-600">
                        Nộp hồ sơ
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}
