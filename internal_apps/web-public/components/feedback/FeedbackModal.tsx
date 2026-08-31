'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Rate from '@/components/ui/Rate';
import { TextArea } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Result from '@/components/ui/Result';
import { AiOutlineSmile as SmileOutlined } from 'react-icons/ai';

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
                    <p className="text-slate-500 mb-6">Bạn cảm thấy buổi tư vấn với {doctorName} như thế nào?</p>

                    <div className="mb-6">
                        <Rate className="text-4xl" defaultValue={0} />
                    </div>

                    <TextArea rows={3} placeholder="Chia sẻ thêm về trải nghiệm của bạn (tùy chọn)" className="mb-6" />

                    <Button variant="primary" block size="large" onClick={handleSubmit} loading={loading}>
                        Gửi đánh giá
                    </Button>
                </div>
            ) : (
                <Result
                    icon={<SmileOutlined className="text-6xl text-teal-500 mb-4" />}
                    title="Cảm ơn phản hồi của bạn!"
                    subTitle="Ý kiến của bạn giúp chúng tôi cải thiện chất lượng dịch vụ tốt hơn mỗi ngày."
                    extra={
                        <Button variant="primary" key="close" onClick={handleClose}>
                            Đóng
                        </Button>
                    }
                />
            )}
        </Modal>
    );
};

export default FeedbackModal;
