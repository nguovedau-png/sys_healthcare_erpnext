'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Form from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Title, Text } from '@/components/ui/Typography';
import Divider from '@/components/ui/Divider';
import { message } from '@/components/ui/Message';
import Result from '@/components/ui/Result';
import Spin from '@/components/ui/Spin';
import { AiOutlineCreditCard as CreditCardOutlined, AiOutlineSafety as SafetyOutlined, AiOutlineCheckCircle as CheckCircleOutlined, AiOutlineLock as LockOutlined } from 'react-icons/ai';

function PaymentContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const bookingId = searchParams.get('bookingId');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!bookingId) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Result
                    status="error"
                    title="Lỗi thanh toán"
                    subTitle="Không tìm thấy thông tin đơn hàng."
                    extra={<Button variant="primary" onClick={() => router.push('/')}>Về trang chủ</Button>}
                />
            </div>
        );
    }

    const handleFinish = (values: any) => {
        setLoading(true);
        // Simulate payment processing
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            message.success('Thanh toán thành công!');
        }, 2000);
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-12">
                <Card className="w-full max-w-lg shadow-lg rounded-lg">
                    <Result
                        status="success"
                        title="Thanh toán thành công!"
                        subTitle={`Mã đặt lịch #${bookingId} đã được xác nhận. Thông tin chi tiết đã được gửi đến email của bạn.`}
                        extra={[
                            <Button variant="primary" key="home" onClick={() => router.push('/')}>
                                Về trang chủ
                            </Button>,
                            <Button key="history" onClick={() => router.push('/profile/bookings')}>
                                Lịch sử đặt khám
                            </Button>,
                        ]}
                    />
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4">
                <div className="mb-8 text-center">
                    <Title level={2}>Thanh toán an toàn</Title>
                    <Text type="secondary">Hoàn tất thủ tục đặt lịch khám bệnh</Text>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <Card title="Thông tin thẻ" className="shadow-md rounded-xl" bordered={false}>
                            <div className="mb-6 flex space-x-4">
                                <div className="p-2 border rounded bg-blue-50 text-blue-600"><CreditCardOutlined /> Thẻ Tín Dụng/Ghi Nợ</div>
                                <div className="p-2 border rounded text-gray-400 cursor-not-allowed">Ví MoMo (Bảo trì)</div>
                            </div>

                            <Form layout="vertical" onFinish={handleFinish} initialValues={{ holder: 'NGUYEN VAN A' }}>
                                <Form.Item
                                    label="Số thẻ"
                                    name="cardNumber"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập số thẻ' },
                                        { pattern: /^\d{16}$/, message: 'Số thẻ không hợp lệ' }
                                    ]}
                                >
                                    <Input prefix={<CreditCardOutlined className="text-gray-400" />} placeholder="0000 0000 0000 0000" size="large" />
                                </Form.Item>

                                <div className="grid grid-cols-2 gap-4">
                                    <Form.Item
                                        label="Ngày hết hạn"
                                        name="expiry"
                                        rules={[{ required: true, message: 'Nhập ngày hết hạn' }]}
                                    >
                                        <Input placeholder="MM/YY" size="large" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Mã CVC"
                                        name="cvc"
                                        rules={[{ required: true, message: 'Nhập mã CVC' }]}
                                    >
                                        <Input placeholder="123" maxLength={3} size="large" prefix={<LockOutlined className="text-gray-400" />} />
                                    </Form.Item>
                                </div>

                                <Form.Item
                                    label="Tên chủ thẻ"
                                    name="holder"
                                    rules={[{ required: true, message: 'Vui lòng nhập tên chủ thẻ' }]}
                                >
                                    <Input placeholder="NGUYEN VAN A" size="large" style={{ textTransform: 'uppercase' }} />
                                </Form.Item>

                                <Divider />

                                <div className="flex justify-between items-center mb-6">
                                    <Text strong>Tổng thanh toán:</Text>
                                    <Title level={3} type="success" style={{ margin: 0 }}>300.000đ</Title>
                                </div>

                                <Button variant="primary" htmlType="submit" size="large" block loading={loading} className="h-12 text-lg bg-indigo-600 hover:bg-indigo-700">
                                    {loading ? 'Đang xử lý...' : 'Thanh toán ngay 300.000đ'}
                                </Button>

                                <div className="mt-4 text-center text-xs text-gray-400">
                                    <SafetyOutlined /> Thanh toán được bảo mật bởi MockGateway. Chúng tôi không lưu thông tin thẻ của bạn.
                                </div>
                            </Form>
                        </Card>
                    </div>

                    <div className="md:col-span-1">
                        <Card className="shadow-sm rounded-xl bg-gray-50 border-gray-200">
                            <Title level={5}>Tóm tắt đơn hàng</Title>
                            <Divider style={{ margin: '12px 0' }} />
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <Text type="secondary">Mã đơn:</Text>
                                    <Text strong>#{bookingId.substring(0, 8)}...</Text>
                                </div>
                                <div className="flex justify-between">
                                    <Text type="secondary">Dịch vụ:</Text>
                                    <Text>Khám chuyên khoa</Text>
                                </div>
                                <div className="flex justify-between">
                                    <Text type="secondary">Phí dịch vụ:</Text>
                                    <Text>300.000đ</Text>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

function PaymentPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Spin size="large" />
            </div>
        }>
            <PaymentContent />
        </Suspense>
    );
}

export default PaymentPage;
