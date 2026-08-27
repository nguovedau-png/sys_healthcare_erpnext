import React from 'react';
import FloatingAIAssistant from "@/components/common/FloatingAIAssistant";

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
            <FloatingAIAssistant />
        </>
    );
}
