"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Card, Typography, Space, Radio, Checkbox, Input, Button, Form, message, Result } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

// --- MOCK DATA ---
const MOCK_SURVEY = { 
  id: 1, 
  title: "Khảo sát hài lòng bệnh nhân Q1/2024", 
  description: "Cảm ơn quý khách đã sử dụng dịch vụ tại phòng khám. Xin vui lòng dành vài phút để chia sẻ cảm nhận của quý khách, giúp chúng tôi không ngừng nâng cao chất lượng phục vụ.",
  questions: [
    { id: 101, type: "single", text: "Bạn đánh giá thái độ phục vụ của bác sĩ như thế nào?", options: ["Rất hài lòng", "Hài lòng", "Bình thường", "Không hài lòng"] },
    { id: 102, type: "multiple", text: "Bạn đã sử dụng các dịch vụ nào tại phòng khám?", options: ["Khám bệnh", "Xét nghiệm máu", "Chụp X-Quang", "Mua thuốc"] },
    { id: 103, type: "yesno", text: "Bạn có sẵn sàng giới thiệu phòng khám cho người thân không?" },
    { id: 104, type: "text", text: "Bạn có góp ý gì để chúng tôi cải thiện dịch vụ không?" }
  ]
};

export default function PublicSurveyPage() {
    const params = useParams();
    const surveyId = Number(params?.id) || 1;
    const [submitted, setSubmitted] = useState(false);
    const [form] = Form.useForm();

    const survey = surveyId === 1 ? MOCK_SURVEY : null;

    const handleFinish = (values: any) => {
        console.log("Survey Responses:", values);
        // Simulate API Call
        setTimeout(() => {
            setSubmitted(true);
            message.success("Cảm ơn bạn đã hoàn thành khảo sát!");
        }, 800);
    };

    if (!survey) {
        return (
            <div style={{ minHeight: '100vh', background: '#f0f2f5', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Result status="404" title="Không tìm thấy" subTitle="Xin lỗi, bài khảo sát này không tồn tại hoặc đã bị đóng." />
            </div>
        );
    }

    if (submitted) {
        return (
            <div style={{ minHeight: '100vh', background: '#f0f2f5', display: 'flex', justifyContent: 'center', padding: '60px 20px' }}>
                <Card style={{ maxWidth: 600, width: '100%', borderRadius: 12, textAlign: 'center', padding: '40px 20px' }}>
                    <CheckCircleOutlined style={{ fontSize: 64, color: '#52c41a', marginBottom: 24 }} />
                    <Title level={3}>Gửi phản hồi thành công</Title>
                    <Paragraph type="secondary">
                        Chân thành cảm ơn bạn đã dành thời gian làm bài khảo sát. Những đóng góp của bạn là động lực để chúng tôi phát triển tốt hơn!
                    </Paragraph>
                    <Button type="primary" size="large" style={{ marginTop: 24 }} onClick={() => window.close()}>
                        Đóng trang này
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f0f2f5', display: 'flex', justifyContent: 'center', padding: '40px 20px' }}>
            <Card style={{ maxWidth: 700, width: '100%', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} bodyStyle={{ padding: 40 }}>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <Title level={2} style={{ color: '#0050b3' }}>{survey.title}</Title>
                    <Paragraph type="secondary" style={{ fontSize: 16 }}>{survey.description}</Paragraph>
                </div>

                <Form layout="vertical" form={form} onFinish={handleFinish} size="large">
                    {survey.questions.map((q, index) => (
                        <div key={q.id} style={{ marginBottom: 32, padding: 24, background: '#fafafa', borderRadius: 8, border: '1px solid #f0f0f0' }}>
                            <Title level={5} style={{ marginBottom: 16 }}>
                                <span style={{ color: '#1890ff', marginRight: 8 }}>Câu {index + 1}:</span>
                                {q.text}
                            </Title>
                            
                            <Form.Item name={`q_${q.id}`} rules={[{ required: q.type !== 'text', message: 'Vui lòng chọn câu trả lời' }]}>
                                {q.type === 'single' && (
                                    <Radio.Group style={{ width: '100%' }}>
                                        <Space direction="vertical" style={{ width: '100%' }}>
                                            {q.options?.map((opt, i) => (
                                                <Radio key={i} value={opt} style={{ width: '100%', padding: '8px 12px', background: '#fff', borderRadius: 6, border: '1px solid #e8e8e8' }}>
                                                    {opt}
                                                </Radio>
                                            ))}
                                        </Space>
                                    </Radio.Group>
                                )}

                                {q.type === 'multiple' && (
                                    <Checkbox.Group style={{ width: '100%' }}>
                                        <Space direction="vertical" style={{ width: '100%' }}>
                                            {q.options?.map((opt, i) => (
                                                <Checkbox key={i} value={opt} style={{ width: '100%', padding: '8px 12px', background: '#fff', borderRadius: 6, border: '1px solid #e8e8e8' }}>
                                                    {opt}
                                                </Checkbox>
                                            ))}
                                        </Space>
                                    </Checkbox.Group>
                                )}

                                {q.type === 'yesno' && (
                                    <Radio.Group>
                                        <Space size="large">
                                            <Radio.Button value="yes" style={{ width: 120, textAlign: 'center' }}>Có</Radio.Button>
                                            <Radio.Button value="no" style={{ width: 120, textAlign: 'center' }}>Không</Radio.Button>
                                        </Space>
                                    </Radio.Group>
                                )}

                                {q.type === 'text' && (
                                    <Input.TextArea rows={4} placeholder="Nhập ý kiến của bạn ở đây..." />
                                )}
                            </Form.Item>
                        </div>
                    ))}

                    <Form.Item style={{ marginTop: 40, textAlign: 'center' }}>
                        <Button type="primary" htmlType="submit" size="large" style={{ width: 200, height: 48, fontSize: 16, borderRadius: 24 }}>
                            Gửi Khảo Sát
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}
