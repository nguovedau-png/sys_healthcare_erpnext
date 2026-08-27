"use client";

import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Avatar, Typography, Input, Button, Space, List, Divider, Badge, Modal, Form, Radio, Checkbox, message } from 'antd';
import { SendOutlined, HeartFilled, FilePdfOutlined, VideoCameraOutlined, UserOutlined, QuestionCircleOutlined, TrophyOutlined } from '@ant-design/icons';

const { Content, Sider } = Layout;
const { Title, Text } = Typography;

export default function LivestreamRoom() {
    const [messages, setMessages] = useState([
        { user: 'Bác sĩ A', text: 'Giảng viên cho hỏi liều dùng ở trẻ em ạ?', time: '10:02' },
        { user: 'Dược sĩ B', text: 'Bài giảng rất hay, cảm ơn chuyên gia!', time: '10:05' },
    ]);
    const [msgInput, setMsgInput] = useState('');
    const [hearts, setHearts] = useState(124);
    const [isSurveyOpen, setIsSurveyOpen] = useState(false);
    const [isTestOpen, setIsTestOpen] = useState(false);

    const handleSendMsg = () => {
        if (!msgInput.trim()) return;
        setMessages([...messages, { user: 'Bạn (Dược sĩ)', text: msgInput, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
        setMsgInput('');
    };

    return (
        <Layout style={{ minHeight: 'calc(100vh - 64px)' }}>
            <Row wrap={false} style={{ width: '100%' }}>
                {/* Main Video Stream Area */}
                <Col flex="auto" style={{ padding: 24, background: '#f0f2f5' }}>
                    <Card bodyStyle={{ padding: 0 }} style={{ overflow: 'hidden', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                        {/* Video Player Mockup */}
                        <div style={{ background: '#000', width: '100%', aspectRatio: '16/9', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <VideoCameraOutlined style={{ fontSize: 64, color: 'rgba(255,255,255,0.2)' }} />
                            <div style={{ position: 'absolute', top: 16, left: 16 }}>
                                <Badge status="processing" color="red" text={<span style={{ color: 'white', fontWeight: 'bold' }}>LIVE</span>} />
                                <Badge count="1,000 người xem" style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', marginLeft: 12 }} />
                            </div>
                        </div>
                        
                        <div style={{ padding: 24 }}>
                            <Title level={3} style={{ marginTop: 0 }}>CME: Cập nhật điều trị Viêm khớp dạng thấp 2026</Title>
                            <Space align="center" style={{ marginBottom: 16 }}>
                                <Avatar icon={<UserOutlined />} src="https://i.pravatar.cc/150?img=11" />
                                <Text strong>PGS.TS.BS Nguyễn Văn Chuyên</Text>
                                <Divider type="vertical" />
                                <Text type="secondary">Chuyên khoa Cơ Xương Khớp</Text>
                            </Space>
                            <p style={{ color: '#595959' }}>
                                Bài giảng cung cấp các kiến thức cập nhật nhất về phác đồ điều trị, cách lựa chọn thuốc sinh học và quản lý tác dụng phụ trong điều trị Viêm khớp dạng thấp.
                            </p>
                            
                            <Space style={{ marginTop: 16 }}>
                                <Button type="primary" icon={<QuestionCircleOutlined />} onClick={() => setIsSurveyOpen(true)}>
                                    Làm bài Khảo sát
                                </Button>
                                <Button type="primary" danger icon={<TrophyOutlined />} onClick={() => setIsTestOpen(true)}>
                                    Làm bài Kiểm tra (Cấp chứng nhận)
                                </Button>
                            </Space>
                        </div>
                    </Card>
                </Col>

                {/* Right Sidebar: Interaction & Materials */}
                <Col flex="350px" style={{ background: '#fff', borderLeft: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '16px 24px', borderBottom: '1px solid #f0f0f0' }}>
                        <Title level={5} style={{ margin: 0 }}>Tài liệu tham khảo</Title>
                        <List
                            size="small"
                            dataSource={['Slides Bài giảng_Phan1.pdf', 'HuongDanDieuTri_BYT.pdf']}
                            renderItem={item => (
                                <List.Item actions={[<Button type="link" size="small">Tải về</Button>]}>
                                    <Space><FilePdfOutlined style={{ color: '#ff4d4f' }} /> {item}</Space>
                                </List.Item>
                            )}
                        />
                    </div>

                    <div style={{ flex: 1, padding: 16, overflowY: 'auto', background: '#fafafa' }}>
                        <List
                            dataSource={messages}
                            renderItem={msg => (
                                <div style={{ marginBottom: 12 }}>
                                    <Text strong style={{ fontSize: 13, color: '#0050b3' }}>{msg.user}</Text>
                                    <Text type="secondary" style={{ fontSize: 11, marginLeft: 8 }}>{msg.time}</Text>
                                    <div style={{ background: '#fff', padding: '8px 12px', borderRadius: '0 8px 8px 8px', display: 'inline-block', marginTop: 4, border: '1px solid #f0f0f0' }}>
                                        {msg.text}
                                    </div>
                                </div>
                            )}
                        />
                    </div>

                    <div style={{ padding: 16, borderTop: '1px solid #f0f0f0', background: '#fff' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
                            <Button 
                                shape="circle" 
                                size="large" 
                                icon={<HeartFilled style={{ color: '#ff4d4f' }} />} 
                                onClick={() => setHearts(h => h + 1)}
                                style={{ boxShadow: '0 2px 8px rgba(255,77,79,0.3)' }}
                            />
                            <Badge count={hearts} overflowCount={999} style={{ backgroundColor: '#ff4d4f', marginLeft: -10, marginTop: -5 }} />
                        </div>
                        <Input.Search
                            value={msgInput}
                            onChange={(e) => setMsgInput(e.target.value)}
                            placeholder="Nhập câu hỏi/thảo luận..."
                            enterButton={<Button type="primary" icon={<SendOutlined />} />}
                            onSearch={handleSendMsg}
                            size="large"
                        />
                    </div>
                </Col>
            </Row>

            {/* Modal Làm Khảo Sát */}
            <Modal title="Khảo sát chất lượng Livestream" open={isSurveyOpen} onCancel={() => setIsSurveyOpen(false)} onOk={() => { message.success("Cảm ơn bạn đã đóng góp ý kiến!"); setIsSurveyOpen(false); }}>
                <Form layout="vertical">
                    <Form.Item label="1. Bạn đánh giá chất lượng hình ảnh/âm thanh như thế nào?">
                        <Radio.Group>
                            <Space direction="vertical">
                                <Radio value={1}>Rất tốt</Radio>
                                <Radio value={2}>Bình thường</Radio>
                                <Radio value={3}>Kém</Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="2. Bạn có góp ý gì để cải thiện khóa học này không?">
                        <Input.TextArea rows={3} />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Modal Làm Bài Kiểm Tra */}
            <Modal title="Bài Kiểm tra Cuối khóa (Cấp CME)" open={isTestOpen} onCancel={() => setIsTestOpen(false)} onOk={() => { message.success("Bạn đạt 90/100 điểm. Chứng nhận CME đã được cấp vào Hồ sơ!"); setIsTestOpen(false); }}>
                <Form layout="vertical">
                    <Form.Item label="Câu 1: Thuốc sinh học nào được ưu tiên trong điều trị VKDT nếu bệnh nhân có tiền sử lao?">
                        <Radio.Group>
                            <Space direction="vertical">
                                <Radio value={1}>Adalimumab</Radio>
                                <Radio value={2}>Etanercept</Radio>
                                <Radio value={3}>Rituximab</Radio>
                                <Radio value={4}>Secukinumab</Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Câu 2: Các dấu hiệu của đợt bùng phát VKDT? (Chọn nhiều đáp án)">
                        <Checkbox.Group>
                            <Space direction="vertical">
                                <Checkbox value="A">Sưng đau khớp liên tục</Checkbox>
                                <Checkbox value="B">Cứng khớp buổi sáng > 1h</Checkbox>
                                <Checkbox value="C">Tăng acid uric máu</Checkbox>
                            </Space>
                        </Checkbox.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
}
