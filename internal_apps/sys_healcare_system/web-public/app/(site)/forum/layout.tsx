'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Banner from '@/components/common/Banner';
import ForumSidebarLeft from './components/ForumSidebarLeft';
import ForumSidebarRight from './components/ForumSidebarRight';

export default function ForumLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-background min-h-screen pb-12">
            <div className="container mx-auto px-4 pt-8 relative z-10">
                <div className="flex gap-6 items-start">
                    <ForumSidebarLeft />

                    <main className="flex-1 min-w-0">
                        {children}
                    </main>

                    <ForumSidebarRight />
                </div>
            </div>
        </div>
    );
}
