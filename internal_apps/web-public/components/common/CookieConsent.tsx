'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

const CookieConsent = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consented = localStorage.getItem('cookie_consent');
        if (!consented) {
            setVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'true');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 shadow-lg z-50 flex flex-col sm:flex-row justify-between items-center gap-4 animate-slide-up">
            <div className="text-sm">
                <p className="font-semibold mb-1">Chúng tôi coi trọng quyền riêng tư của bạn</p>
                <p className="text-gray-300">
                    Website này sử dụng cookie để nâng cao trải nghiệm người dùng và phân tích lưu lượng truy cập.
                    Bằng cách tiếp tục sử dụng, bạn đồng ý với chính sách bảo mật của chúng tôi.
                </p>
            </div>
            <div className="flex gap-3">
                <Button variant="dashed" size="small" onClick={() => setVisible(false)}>Từ chối</Button>
                <Button variant="primary" size="small" onClick={handleAccept} className="bg-blue-600 hover:bg-blue-500 border-none">
                    Chấp nhận tất cả
                </Button>
            </div>
        </div>
    );
};

export default CookieConsent;
