'use client';

import React from 'react';
import { Button } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

const LanguageSwitcher: React.FC = () => {
    // Simplified version without i18n
    return (
        <Button type="text" icon={<GlobalOutlined style={{ fontSize: 18 }} />} disabled>
            <span className="hidden sm:inline">VI</span>
        </Button>
    );
};

export default LanguageSwitcher;
