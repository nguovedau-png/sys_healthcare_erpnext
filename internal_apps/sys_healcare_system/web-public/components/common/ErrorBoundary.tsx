'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import Button from '@/components/ui/Button';
import Result from '@/components/ui/Result';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <Result
                        status="500"
                        title="Đã có lỗi xảy ra"
                        subTitle="Xin lỗi, hệ thống đã gặp sự cố không mong muốn."
                        extra={
                            <Button variant="primary" onClick={() => window.location.reload()}>
                                Tải lại trang
                            </Button>
                        }
                    />
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
