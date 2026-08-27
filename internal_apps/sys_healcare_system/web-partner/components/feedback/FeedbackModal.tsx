'use client';

import React, { useState } from 'react';
import { Modal, Rate, Input, Button, Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const { TextArea } = Input;

interface FeedbackModalProps {
    visible: boolean;
    onClose: () => void;
    doctorName?: string;
    consultationId?: string;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ visible, onClose, doctorName = 'Bác sĩ' }) => {
    const [step, setStep] = useState<'rating' | 'success'>('rating');
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setStep('success');
        }, 1000);
    };

    const handleClose = () => {
        setStep('rating');
        onClose();
    };

    return (
        <Modal
            open={visible}
            onCancel={handleClose}
            footer={null}
            centered
            destroyOnClose
        >
            {step === 'rating' ? (
                <div className="text-center p-4">
                    <h3 className="text-lg font-bold mb-2">Đánh giá trải nghiệm của bạn</h3>
                    <p className="text-gray-500 mb-6">Bạn cảm thấy buổi tư vấn với {doctorName} như thế nào?</p>

                    <Rate className="text-4xl mb-6 text-yellow-400" defaultValue={0} />

                    <TextArea rows={3} placeholder="Chia sẻ thêm về trải nghiệm của bạn (tùy chọn)" className="mb-6" />

                    <Button type="primary" block size="large" onClick={handleSubmit} loading={loading}>
                        Gửi đánh giá
                    </Button>
                </div>
            ) : (
                <Result
                    icon={<SmileOutlined />}
                    title="Cảm ơn phản hồi của bạn!"
                    subTitle="Ý kiến của bạn giúp chúng tôi cải thiện chất lượng dịch vụ tốt hơn mỗi ngày."
                    extra={[
                        <Button type="primary" key="close" onClick={handleClose}>
                            Đóng
                        </Button>,
                    ]}
                />
            )}
        </Modal>
    );
};

export default FeedbackModal;
