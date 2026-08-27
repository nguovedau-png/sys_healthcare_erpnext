'use client';

import Link from 'next/link';
import { Button, Result } from 'antd';

export default function NotFound() {
    return (
        <div className="h-screen flex items-center justify-center bg-gray-50">
            <Result
                status="404"
                title="404"
                subTitle="Xin lỗi, trang bạn tìm kiếm không tồn tại."
                extra={
                    <Link href="/dashboard">
                        <Button type="primary">Quay lại Trang chủ</Button>
                    </Link>
                }
            />
        </div>
    );
}
