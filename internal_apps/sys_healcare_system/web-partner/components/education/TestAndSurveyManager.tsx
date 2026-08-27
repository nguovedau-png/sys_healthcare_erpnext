import React, { useState } from 'react';
import { Card, Table, Button, Space, Tag, Input, Modal, Form, Select, Typography, Popconfirm, message, Tabs } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, FormOutlined, BarChartOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const MOCK_SURVEYS = [
    { id: 1, title: 'Khảo sát chất lượng Livestream B107', status: 'Active', questionsCount: 5, responses: 120 },
    { id: 2, title: 'Đánh giá giảng viên khóa Tim mạch', status: 'Draft', questionsCount: 10, responses: 0 },
];

const MOCK_TESTS = [
    { id: 1, title: 'Bài kiểm tra cuối khóa CME 01', status: 'Active', questionsCount: 20, passingScore: 80 },
    { id: 2, title: 'Test đầu vào Bác sĩ nội trú', status: 'Closed', questionsCount: 50, passingScore: 70 },
];

export default function TestAndSurveyManager() {
    const [surveys, setSurveys] = useState(MOCK_SURVEYS);
    const [tests, setTests] = useState(MOCK_TESTS);
    const [isSurveyModalVisible, setIsSurveyModalVisible] = useState(false);
    const [isTestModalVisible, setIsTestModalVisible] = useState(false);
    const [form] = Form.useForm();

    const handleSaveSurvey = (values: any) => {
        setSurveys([...surveys, { id: Date.now(), title: values.title, status: values.status, questionsCount: 0, responses: 0 }]);
        setIsSurveyModalVisible(false);
        form.resetFields();
        message.success("Tạo Đợt khảo sát thành công");
    };

    const handleSaveTest = (values: any) => {
        setTests([...tests, { id: Date.now(), title: values.title, status: values.status, questionsCount: 0, passingScore: values.passingScore }]);
        setIsTestModalVisible(false);
        form.resetFields();
        message.success("Tạo Bài Test thành công");
    };

    const getStatusTag = (status: string) => {
        switch(status) {
            case 'Active': return <Tag color="green">Đang chạy</Tag>;
            case 'Draft': return <Tag color="default">Bản nháp</Tag>;
            case 'Closed': return <Tag color="red">Đã đóng</Tag>;
            default: return <Tag>{status}</Tag>;
        }
    };

    const surveyColumns = [
        { title: 'Tên đợt khảo sát', dataIndex: 'title', render: (text: string) => <Text strong>{text}</Text> },
        { title: 'Trạng thái', dataIndex: 'status', render: getStatusTag, width: 120 },
        { title: 'Số câu hỏi', dataIndex: 'questionsCount', width: 120, align: 'center' as const },
        { title: 'Số lượt tham gia', dataIndex: 'responses', width: 150, align: 'center' as const },
        { 
            title: 'Hành động', 
            width: 150, 
            render: (_: any, record: any) => (
                <Space>
                    <Button type="text" icon={<EditOutlined />} size="small" title="Sửa thông tin" />
                    <Button type="text" icon={<FormOutlined />} size="small" title="Quản lý câu hỏi" />
                    <Button type="text" icon={<BarChartOutlined />} size="small" title="Xem báo cáo" />
                    <Popconfirm title="Xoá khảo sát này?" onConfirm={() => setSurveys(surveys.filter(s => s.id !== record.id))}>
                        <Button type="text" danger icon={<DeleteOutlined />} size="small" />
                    </Popconfirm>
                </Space>
            ) 
        }
    ];

    const testColumns = [
        { title: 'Tên bài Test', dataIndex: 'title', render: (text: string) => <Text strong>{text}</Text> },
        { title: 'Trạng thái', dataIndex: 'status', render: getStatusTag, width: 120 },
        { title: 'Số câu hỏi', dataIndex: 'questionsCount', width: 120, align: 'center' as const },
        { title: 'Điểm đạt (%)', dataIndex: 'passingScore', width: 120, align: 'center' as const, render: (val: number) => <Text strong color="#389e0d">{val}%</Text> },
        { 
            title: 'Hành động', 
            width: 150, 
            render: (_: any, record: any) => (
                <Space>
                    <Button type="text" icon={<EditOutlined />} size="small" title="Sửa thông tin" />
                    <Button type="text" icon={<FormOutlined />} size="small" title="Quản lý câu hỏi" />
                    <Button type="text" icon={<BarChartOutlined />} size="small" title="Xem điểm học viên" />
                    <Popconfirm title="Xoá bài test này?" onConfirm={() => setTests(tests.filter(t => t.id !== record.id))}>
                        <Button type="text" danger icon={<DeleteOutlined />} size="small" />
                    </Popconfirm>
                </Space>
            ) 
        }
    ];

    return (
        <Tabs defaultActiveKey="1" type="card">
            <Tabs.TabPane tab="Quản lý Đợt Khảo Sát" key="1">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                    <Text type="secondary">Quản lý danh sách đợt khảo sát, gán câu hỏi từ Kho và xem báo cáo thống kê lựa chọn của người học.</Text>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => { form.resetFields(); setIsSurveyModalVisible(true); }}>Tạo đợt khảo sát mới</Button>
                </div>
                <Table dataSource={surveys} columns={surveyColumns} rowKey="id" size="middle" bordered />
            </Tabs.TabPane>
            
            <Tabs.TabPane tab="Quản lý Bài Test" key="2">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                    <Text type="secondary">Quản lý danh sách bài kiểm tra (Test), cấu hình điểm đạt và xem điểm của người học.</Text>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => { form.resetFields(); setIsTestModalVisible(true); }}>Tạo bài Test mới</Button>
                </div>
                <Table dataSource={tests} columns={testColumns} rowKey="id" size="middle" bordered />
            </Tabs.TabPane>

            {/* Modal Survey */}
            <Modal title="Tạo/Sửa Đợt Khảo Sát" open={isSurveyModalVisible} onCancel={() => setIsSurveyModalVisible(false)} onOk={() => form.submit()}>
                <Form form={form} layout="vertical" onFinish={handleSaveSurvey} initialValues={{ status: 'Draft' }}>
                    <Form.Item name="title" label="Tên đợt khảo sát" rules={[{ required: true }]}>
                        <Input placeholder="VD: Khảo sát chất lượng dịch vụ..." />
                    </Form.Item>
                    <Form.Item name="status" label="Trạng thái">
                        <Select>
                            <Select.Option value="Draft">Bản nháp</Select.Option>
                            <Select.Option value="Active">Đang chạy</Select.Option>
                            <Select.Option value="Closed">Đã đóng</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Modal Test */}
            <Modal title="Tạo/Sửa Bài Test" open={isTestModalVisible} onCancel={() => setIsTestModalVisible(false)} onOk={() => form.submit()}>
                <Form form={form} layout="vertical" onFinish={handleSaveTest} initialValues={{ status: 'Draft', passingScore: 80 }}>
                    <Form.Item name="title" label="Tên bài kiểm tra" rules={[{ required: true }]}>
                        <Input placeholder="VD: Bài kiểm tra cuối kỳ CME..." />
                    </Form.Item>
                    <Form.Item name="passingScore" label="Điểm đạt (%)" rules={[{ required: true }]}>
                        <Input type="number" min={0} max={100} addonAfter="%" />
                    </Form.Item>
                    <Form.Item name="status" label="Trạng thái">
                        <Select>
                            <Select.Option value="Draft">Bản nháp</Select.Option>
                            <Select.Option value="Active">Đang chạy</Select.Option>
                            <Select.Option value="Closed">Đã đóng</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </Tabs>
    );
}
