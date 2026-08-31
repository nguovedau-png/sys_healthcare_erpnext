'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, ArrowRight } from 'lucide-react';

function SocialCallbackContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);

    useEffect(() => {
        const accessToken = searchParams.get('accessToken');
        const refresh = searchParams.get('refreshToken');

        if (accessToken) {
            setToken(accessToken);
            setRefreshToken(refresh);
            // Here you would typically save to cookies/localStorage
            console.log('Login Success:', accessToken);
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8" />
                </div>

                <h1 className="text-2xl font-bold text-slate-800 mb-2">Login Successful!</h1>
                <p className="text-slate-500 mb-6">
                    You have successfully authenticated via Social Media.
                </p>

                <div className="bg-slate-100 p-4 rounded-lg text-left mb-6 overflow-hidden">
                    <p className="text-xs font-mono text-slate-500 mb-1">Access Token:</p>
                    <p className="text-xs font-mono break-all text-slate-800">
                        {token ? token.substring(0, 50) + '...' : 'Loading...'}
                    </p>
                </div>

                <button
                    onClick={() => router.push('/')}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

export default function SocialCallback() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SocialCallbackContent />
        </Suspense>
    );
}
