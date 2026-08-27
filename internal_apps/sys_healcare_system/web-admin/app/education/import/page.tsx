"use client";

import React, { useState } from 'react';
import {
    Typography,
    Button,
    Space,
    Card,
    Breadcrumb,
    Row,
    Col,
    Upload,
    Table,
    Alert,
    message,
    Steps,
    Divider,
    Result
} from 'antd';
import {
    InboxOutlined,
    DownloadOutlined,
    ArrowLeftOutlined,
    CheckCircleOutlined,
    FileExcelOutlined,
    DeleteOutlined,
    CloudUploadOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { educationService } from '@/services/education.service';

const { Title, Text } = Typography;
const { Dragger } = Upload;

export default function StudentImportPage() {
    const router = useRouter();
    const [fileList, setFileList] = useState<any[]>([]);
    const [preview, setPreview] = useState<any[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [importing, setImporting] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const handleUpload = (info: any) => {
        const { status } = info.file;
        if (status !== 'uploading') {
            setFileList([info.file]);
        }
        if (status === 'done' || status === 'error') {
            // Mocking a successful parse
            setPreview([
                { key: '1', name: 'Nguyễn Văn A', email: 'nva@email.com', phone: '0909123456', course: 'CME 2024', status: 'valid' },
                { key: '2', name: 'Trần Thị B', email: 'ttb@email.com', phone: '0909123457', course: 'CPE 2024', status: 'valid' },
                { key: '3', name: 'Lê Văn C', email: 'lvc@email.com', phone: '0909123458', course: 'CME 2024', status: 'valid' },
            ]);
            setCurrentStep(1);
            message.success(`${info.file.name} đã được tải và kiểm tra dữ liệu thành công.`);
        }
    };

    const handleImport = async () => {
        setImporting(true);
        message.loading({ content: 'Đang lưu dữ liệu học viên...', key: 'importing' });

        try {
            // Map preview data to backend format
            // Assuming course field contains the Course Code or ID
            const payload = preview.map(item => ({
                userId: item.email, // Use email as userId for now
                courseId: item.course,
                ...item
            }));

            await educationService.importStudents(payload);

            setImporting(false);
            setIsFinished(true);
            setCurrentStep(2);
            message.success({ content: `Import thành công ${preview.length} học viên!`, key: 'importing' });
        } catch (error) {
            console.error('Import failed:', error);
            setImporting(false);
            message.error({ content: 'Có lỗi xảy ra khi import dữ liệu.', key: 'importing' });
        }
    };

    const downloadTemplate = () => {
        message.info('Template đang được tải xuống...');
    };

    const columns = [
        { title: 'Họ và tên', dataIndex: 'name', key: 'name', render: (text: string) => <Text strong>{text}</Text> },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
        { title: 'Khóa học', dataIndex: 'course', key: 'course' },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (val: string) => <Tag color="success">Hợp lệ</Tag>
        },
    ];

    if (isFinished) {
        return (
            <Card variant="outlined" className="shadow-sm">
                <Result
                    status="success"
                    title="Import Học viên Thành công!"
                    subTitle="Thông tin 3 học viên đã được cập nhật vào danh sách lớp học tương ứng."
                    extra={[
                        <Button type="primary" key="list" onClick={() => router.push('/education/courses')}>
                            Về danh sách khóa học
                        </Button>,
                        <Button key="again" onClick={() => {
                            setIsFinished(false);
                            setCurrentStep(0);
                            setFileList([]);
                            setPreview([]);
                        }}>
                            Tiếp tục Import
                        </Button>,
                    ]}
                />
            </Card>
        );
    }

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Giáo dục</Breadcrumb.Item>
                <Breadcrumb.Item>Import danh sách</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Space orientation="vertical" size={0}>
                        <Title level={2} style={{ margin: 0 }}>Import Học viên Hàng loạt</Title>
                        <Text type="secondary">Sử dụng file Excel hoặc CSV để thêm nhiều học viên vào hệ thống cùng một lúc</Text>
                    </Space>
                </Col>
                <Col>
                    <Button
                        icon={<DownloadOutlined />}
                        onClick={downloadTemplate}
                        size="large"
                    >
                        Tải file mẫu
                    </Button>
                </Col>
            </Row>

            <Steps
                current={currentStep}
                items={[
                    { title: 'Tải lên file', icon: <CloudUploadOutlined /> },
                    { title: 'Kiểm tra dữ liệu', icon: <FileExcelOutlined /> },
                    { title: 'Hoàn tất', icon: <CheckCircleOutlined /> },
                ]}
                style={{ marginBottom: 24 }}
            />

            {currentStep === 0 && (
                <Card variant="outlined" className="shadow-sm">
                    <Dragger
                        name="file"
                        multiple={false}
                        action="/api/mock/upload" // Mock API
                        onChange={handleUpload}
                        fileList={fileList}
                        onRemove={() => {
                            setFileList([]);
                            setPreview([]);
                        }}
                    >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Nhấp hoặc kéo tệp vào khu vực này để tải lên</p>
                        <p className="ant-upload-hint">
                            Hỗ trợ tải lên một lần. Nghiêm cấm tải lên dữ liệu công ty hoặc các tập tin bị cấm khác.
                            Chấp nhận .csv, .xls, .xlsx
                        </p>
                    </Dragger>
                </Card>
            )}

            {currentStep === 1 && (
                <Card
                    variant="outlined"
                    className="shadow-sm"
                    title={<Space><FileExcelOutlined />Xem trước dữ liệu ({preview.length} bản ghi)</Space>}
                    extra={
                        <Space>
                            <Button onClick={() => setCurrentStep(0)}>Tải lại file</Button>
                            <Button type="primary" onClick={handleImport} loading={importing}>
                                Xác nhận Import
                            </Button>
                        </Space>
                    }
                >
                    <Alert
                        message="Dữ liệu hợp lệ"
                        description="Tất cả các hàng dữ liệu đã vượt qua bước kiểm tra định dạng. Bạn có thể tiến hành import."
                        type="success"
                        showIcon
                        style={{ marginBottom: 24 }}
                    />

                    <Table
                        columns={columns}
                        dataSource={preview}
                        pagination={false}
                    />

                    <Divider />

                    <Row justify="end">
                        <Space>
                            <Text type="secondary">Tổng số: {preview.length} học viên</Text>
                            <Button type="primary" size="large" onClick={handleImport} loading={importing}>
                                Tiến hành lưu dữ liệu
                            </Button>
                        </Space>
                    </Row>
                </Card>
            )}
        </Space>
    );
}

// Add local Tag import if missing
import { Tag, Tooltip } from 'antd';
