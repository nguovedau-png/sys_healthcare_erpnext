"use client";
import React, { useState } from 'react';
import { Card, Table, Button, Space, Tag, Input, Modal, Form, Select, Typography, Popconfirm, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, DatabaseOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const MOCK_QUESTIONS = [
    { id: 1, type: 'single', content: 'Chỉ định của Paracetamol là gì?', options: ['Giảm đau, hạ sốt', 'Chống viêm', 'Kháng sinh', 'An thần'], answer: ['Giảm đau, hạ sốt'] },
    { id: 2, type: 'multiple', content: 'Các tác dụng phụ phổ biến của NSAIDs?', options: ['Loét dạ dày', 'Suy thận', 'Tăng huyết áp', 'Buồn ngủ'], answer: ['Loét dạ dày', 'Suy thận'] },
    { id: 3, type: 'text', content: 'Mô tả cơ chế tác dụng của thuốc nhóm PPI?', options: [], answer: [] },
    { id: 4, type: 'number', content: 'Liều tối đa của Paracetamol trong 24h đối với người lớn (g)?', options: [], answer: ['4'] },
];

export default function QuestionBank() {
    const [data, setData] = useState(MOCK_QUESTIONS);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [qType, setQType] = useState('single');

    const handleDelete = (id: number) => {
        setData(data.filter(q => q.id !== id));
        message.success("Đã xoá câu hỏi");
    };

    const handleSave = (values: any) => {
        const newQ = {
            id: Date.now(),
            type: values.type,
            content: values.content,
            options: values.options ? values.options.split('\n') : [],
            answer: values.answer ? values.answer.split('\n') : []
        };
        setData([...data, newQ]);
        setIsModalVisible(false);
        form.resetFields();
        message.success("Lưu câu hỏi thành công");
    };

    const getTypeTag = (type: string) => {
        switch (type) {
            case 'single': return <Tag color="blue">1 Lựa chọn</Tag>;
            case 'multiple': return <Tag color="geekblue">Nhiều lựa chọn</Tag>;
            case 'number': return <Tag color="green">Dạng Số</Tag>;
            case 'text': return <Tag color="default">Văn bản</Tag>;
            default: return <Tag>{type}</Tag>;
        }
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', width: 60 },
        { title: 'Loại câu hỏi', dataIndex: 'type', render: getTypeTag, width: 120 },
        { title: 'Nội dung câu hỏi', dataIndex: 'content', render: (text: string) => <Text strong>{text}</Text> },
        { title: 'Các lựa chọn (Nếu có)', dataIndex: 'options', render: (opt: string[]) => opt.length > 0 ? opt.join(' | ') : '-' },
        {
            title: 'Hành động',
            width: 120,
            render: (_: any, record: any) => (
                <Space>
                    <Button type="text" icon={<EditOutlined />} size="small" />
                    <Popconfirm title="Xoá câu hỏi này?" onConfirm={() => handleDelete(record.id)}>
                        <Button type="text" danger icon={<DeleteOutlined />} size="small" />
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <div>
                    <Title level={4}><DatabaseOutlined /> Quản lý Kho Câu hỏi</Title>
                    <Text type="secondary">Quản lý ngân hàng câu hỏi dùng cho Đợt Khảo sát và Bài Kiểm tra.</Text>
                </div>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => { form.resetFields(); setIsModalVisible(true); }}>Thêm câu hỏi mới</Button>
            </div>

            <Card bodyStyle={{ padding: 0 }}>
                <Table
                    dataSource={data}
                    columns={columns}
                    rowKey="id"
                    size="middle"
                    pagination={{ pageSize: 10 }}
                />
            </Card>

            <Modal title="Thêm/Sửa Câu hỏi" open={isModalVisible} onCancel={() => setIsModalVisible(false)} onOk={() => form.submit()}>
                <Form form={form} layout="vertical" onFinish={handleSave} initialValues={{ type: 'single' }}>
                    <Form.Item name="type" label="Loại câu hỏi" rules={[{ required: true }]}>
                        <Select onChange={setQType}>
                            <Select.Option value="single">Một lựa chọn (Trắc nghiệm)</Select.Option>
                            <Select.Option value="multiple">Nhiều lựa chọn (Checkbox)</Select.Option>
                            <Select.Option value="text">Văn bản (Tự luận/Góp ý)</Select.Option>
                            <Select.Option value="number">Dạng số</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="content" label="Nội dung câu hỏi" rules={[{ required: true }]}>
                        <Input.TextArea rows={3} placeholder="Nhập nội dung câu hỏi..." />
                    </Form.Item>
                    {(qType === 'single' || qType === 'multiple') && (
                        <Form.Item name="options" label="Các phương án lựa chọn (Mỗi dòng 1 phương án)" rules={[{ required: true }]}>
                            <Input.TextArea rows={4} placeholder="Phương án A&#10;Phương án B&#10;Phương án C" />
                        </Form.Item>
                    )}
                    <Form.Item name="answer" label="Đáp án đúng (Nếu là bài Test)">
                        <Input.TextArea rows={2} placeholder="Nhập đáp án đúng (Mỗi dòng 1 đáp án nếu nhiều lựa chọn)..." />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
