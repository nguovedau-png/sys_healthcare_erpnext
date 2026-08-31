'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="error-page">
            <div className="error-page__content">
                <h1>Đã xảy ra lỗi!</h1>
                <p>
                    Rất tiếc, đã có lỗi xảy ra. Vui lòng thử lại sau hoặc liên hệ với chúng tôi nếu vấn đề vẫn tiếp tục.
                </p>
                <div className="error-page__actions">
                    <button onClick={reset} className="btn btn-primary">
                        Thử lại
                    </button>
                    <a href="/shop" className="btn btn-secondary">
                        Về trang chủ
                    </a>
                </div>
            </div>
        </div>
    );
}
