"use client";

import React, { useState } from 'react';
import { Card, Input, Button, Typography, Space, Modal, Checkbox, Form, message, Result, Steps } from 'antd';
import { SafetyCertificateOutlined, QrCodeOutlined, LockOutlined, CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Title, Text, Paragraph } = Typography;

export default function HubActivationPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activationCode, setActivationCode] = useState('');
    const [isAgreed, setIsAgreed] = useState(false);
    const [otp, setOtp] = useState('');

    const handleActivate = () => {
        if (!activationCode) {
            message.error('Vui lòng nhập mã kích hoạt!');
            return;
        }
        setIsModalVisible(true);
    };

    const handleAgreeConsent = () => {
        if (!isAgreed) {
            message.warning('Bạn cần đồng ý với các điều khoản để tiếp tục.');
            return;
        }
        setIsModalVisible(false);
        setCurrentStep(1); // Move to OTP step
        message.info('Mã OTP đã được gửi đến số điện thoại đăng ký của bạn.');
    };

    const handleVerifyOtp = () => {
        if (otp.length !== 6) {
            message.error('Mã OTP không hợp lệ!');
            return;
        }
        setCurrentStep(2); // Success step
    };

    const goToHub = () => {
        router.push('/hub');
    };

    return (
        <div style={{ 
            minHeight: '80vh', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            background: 'linear-gradient(135deg, #f0f2f5 0%, #e6f7ff 100%)',
            padding: '24px'
        }}>
            <Card style={{ width: 500, borderRadius: 16, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div style={{ 
                        width: 64, height: 64, background: '#1890ff', borderRadius: '50%', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        margin: '0 auto 16px', color: '#fff', fontSize: 32 
                    }}>
                        <SafetyCertificateOutlined />
                    </div>
                    <Title level={3} style={{ margin: 0 }}>Kích hoạt Hub Y Khoa</Title>
                    <Text type="secondary">Dành riêng cho Bác sĩ & Dược sĩ khách mời</Text>
                </div>

                <Steps 
                    current={currentStep} 
                    size="small" 
                    style={{ marginBottom: 32 }}
                    items={[
                        { title: 'Kích hoạt' },
                        { title: 'Xác thực' },
                        { title: 'Hoàn tất' }
                    ]}
                />

                {currentStep === 0 && (
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <div style={{ textAlign: 'center' }}>
                            <Text>Vui lòng nhập mã kích hoạt từ thư mời hoặc quét mã QR được cung cấp để bắt đầu tham gia cộng đồng.</Text>
                        </div>
                        <Input 
                            size="large" 
                            placeholder="Nhập mã kích hoạt (Vd: HUB-XXXX)" 
                            prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                            value={activationCode}
                            onChange={(e) => setActivationCode(e.target.value)}
                            style={{ borderRadius: 8 }}
                        />
                        <Button 
                            type="primary" 
                            size="large" 
                            block 
                            onClick={handleActivate}
                            style={{ borderRadius: 8, height: 48, fontWeight: 600 }}
                        >
                            TIẾP TỤC
                        </Button>
                        <Divider plain>Hoặc</Divider>
                        <Button 
                            icon={<QrCodeOutlined />} 
                            size="large" 
                            block 
                            style={{ borderRadius: 8, height: 48 }}
                        >
                            QUÉT MÃ QR
                        </Button>
                    </Space>
                )}

                {currentStep === 1 && (
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <div style={{ textAlign: 'center' }}>
                            <Text>Nhập mã xác thực 6 chữ số vừa được gửi qua SMS.</Text>
                        </div>
                        <Input.OTP 
                            size="large"
                            value={otp}
                            onChange={setOtp}
                        />
                        <Button 
                            type="primary" 
                            size="large" 
                            block 
                            onClick={handleVerifyOtp}
                            style={{ borderRadius: 8, height: 48, fontWeight: 600 }}
                        >
                            XÁC NHẬN
                        </Button>
                        <div style={{ textAlign: 'center' }}>
                            <Button type="link">Gửi lại mã OTP</Button>
                        </div>
                    </Space>
                )}

                {currentStep === 2 && (
                    <Result
                        status="success"
                        title="Kích hoạt thành công!"
                        subTitle="Chào mừng bạn đến với Hub Y Khoa cao cấp. Bạn đã sẵn sàng khám phá kho kiến thức đặc quyền."
                        extra={[
                            <Button type="primary" key="hub" onClick={goToHub} style={{ borderRadius: 8, height: 40 }}>
                                VÀO HUB NGAY
                            </Button>
                        ]}
                    />
                )}
            </Card>

            {/* E-Consent Modal */}
            <Modal
                title={<span><InfoCircleOutlined style={{ color: '#1890ff', marginRight: 8 }} /> Điều khoản & Quy định tham gia Hub</span>}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="back" onClick={() => setIsModalVisible(false)}>Quay lại</Button>,
                    <Button key="submit" type="primary" onClick={handleAgreeConsent}>Đồng ý & Tiếp tục</Button>
                ]}
                width={600}
                centered
            >
                <div style={{ maxHeight: '400px', overflowY: 'auto', padding: '0 8px' }}>
                    <Title level={5}>1. Phạm vi áp dụng</Title>
                    <Paragraph>Hub Y Khoa là không gian trao đổi chuyên môn dành riêng cho cán bộ y tế được xác thực.</Paragraph>
                    <Title level={5}>2. Bảo mật thông tin</Title>
                    <Paragraph>Thành viên cam kết không chia sẻ dữ liệu bệnh nhân thực tế, tuân thủ luật bảo mật thông tin y tế.</Paragraph>
                    <Title level={5}>3. Quy tắc ứng xử</Title>
                    <Paragraph>Tôn trọng đồng nghiệp, thảo luận dựa trên bằng chứng khoa học.</Paragraph>
                    <Title level={5}>4. Quyền lợi & Trách nhiệm</Title>
                    <Paragraph>Thành viên được quyền truy cập kho tài liệu đặc quyền, tích điểm đổi quà và tham gia thảo luận kín.</Paragraph>
                    <Divider />
                    <Checkbox checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)}>
                        Tôi đã đọc và đồng ý với các điều khoản và quy định tham gia Hub.
                    </Checkbox>
                </div>
            </Modal>
        </div>
    );
}

function Divider({ children, plain }: { children: React.ReactNode, plain?: boolean }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', margin: '16px 0' }}>
            <div style={{ flex: 1, height: '1px', background: '#f0f0f0' }}></div>
            <div style={{ padding: '0 16px', color: '#8c8c8c', fontSize: '12px' }}>{children}</div>
            <div style={{ flex: 1, height: '1px', background: '#f0f0f0' }}></div>
        </div>
    );
}
