'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import { AiOutlineGlobal as GlobalOutlined } from 'react-icons/ai';

const LanguageSwitcher: React.FC = () => {
    // Simplified version without i18n
    return (
        <Button variant="text" icon={<GlobalOutlined className="text-[18px]" />} disabled>
            <span className="hidden sm:inline">VI</span>
        </Button>
    );
};

export default LanguageSwitcher;
