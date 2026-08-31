"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Button, Tooltip, Space, Divider, Input } from 'antd';
import { 
    BoldOutlined, 
    ItalicOutlined, 
    UnderlineOutlined, 
    StrikethroughOutlined,
    UnorderedListOutlined,
    OrderedListOutlined,
    AlignLeftOutlined,
    AlignCenterOutlined,
    AlignRightOutlined,
    LinkOutlined,
    CodeOutlined,
    EyeOutlined
} from '@ant-design/icons';

interface HtmlEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const HtmlEditor: React.FC<HtmlEditorProps> = ({ value, onChange, placeholder }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [isCodeView, setIsCodeView] = useState(false);
    const [htmlValue, setHtmlValue] = useState(value || '');

    useEffect(() => {
        if (editorRef.current && value !== editorRef.current.innerHTML) {
            editorRef.current.innerHTML = value || '';
            setHtmlValue(value || '');
        }
    }, [value]);

    const execCommand = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        if (editorRef.current) {
            const newValue = editorRef.current.innerHTML;
            setHtmlValue(newValue);
            onChange(newValue);
        }
    };

    const handleInput = () => {
        if (editorRef.current) {
            const newValue = editorRef.current.innerHTML;
            setHtmlValue(newValue);
            onChange(newValue);
        }
    };

    const toggleCodeView = () => {
        setIsCodeView(!isCodeView);
    };

    const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setHtmlValue(newValue);
        onChange(newValue);
    };

    return (
        <div style={{ border: '1px solid #d9d9d9', borderRadius: '8px', overflow: 'hidden', background: '#fff' }}>
            {/* Toolbar */}
            <div style={{ padding: '8px', borderBottom: '1px solid #f0f0f0', background: '#fafafa', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                <Space size={2}>
                    <Tooltip title="In đậm"><Button size="small" type="text" icon={<BoldOutlined />} onClick={() => execCommand('bold')} /></Tooltip>
                    <Tooltip title="In nghiêng"><Button size="small" type="text" icon={<ItalicOutlined />} onClick={() => execCommand('italic')} /></Tooltip>
                    <Tooltip title="Gạch chân"><Button size="small" type="text" icon={<UnderlineOutlined />} onClick={() => execCommand('underline')} /></Tooltip>
                    <Tooltip title="Gạch ngang"><Button size="small" type="text" icon={<StrikethroughOutlined />} onClick={() => execCommand('strikeThrough')} /></Tooltip>
                </Space>
                <Divider type="vertical" style={{ height: '20px', marginTop: '4px' }} />
                <Space size={2}>
                    <Tooltip title="Danh sách không thứ tự"><Button size="small" type="text" icon={<UnorderedListOutlined />} onClick={() => execCommand('insertUnorderedList')} /></Tooltip>
                    <Tooltip title="Danh sách có thứ tự"><Button size="small" type="text" icon={<OrderedListOutlined />} onClick={() => execCommand('insertOrderedList')} /></Tooltip>
                </Space>
                <Divider type="vertical" style={{ height: '20px', marginTop: '4px' }} />
                <Space size={2}>
                    <Tooltip title="Căn trái"><Button size="small" type="text" icon={<AlignLeftOutlined />} onClick={() => execCommand('justifyLeft')} /></Tooltip>
                    <Tooltip title="Căn giữa"><Button size="small" type="text" icon={<AlignCenterOutlined />} onClick={() => execCommand('justifyCenter')} /></Tooltip>
                    <Tooltip title="Căn phải"><Button size="small" type="text" icon={<AlignRightOutlined />} onClick={() => execCommand('justifyRight')} /></Tooltip>
                </Space>
                <Divider type="vertical" style={{ height: '20px', marginTop: '4px' }} />
                <Space size={2}>
                    <Tooltip title="Chèn liên kết"><Button size="small" type="text" icon={<LinkOutlined />} onClick={() => {
                        const url = prompt('Nhập URL:');
                        if (url) execCommand('createLink', url);
                    }} /></Tooltip>
                </Space>
                <div style={{ marginLeft: 'auto' }}>
                    <Tooltip title={isCodeView ? "Chế độ soạn thảo" : "Xem mã HTML"}>
                        <Button 
                            size="small" 
                            type={isCodeView ? "primary" : "text"} 
                            icon={isCodeView ? <EyeOutlined /> : <CodeOutlined />} 
                            onClick={toggleCodeView} 
                        />
                    </Tooltip>
                </div>
            </div>

            {/* Editor Area */}
            <div style={{ position: 'relative', minHeight: '300px' }}>
                {isCodeView ? (
                    <Input.TextArea 
                        value={htmlValue}
                        onChange={handleCodeChange}
                        style={{ 
                            width: '100%', 
                            height: '300px', 
                            border: 'none', 
                            borderRadius: 0, 
                            fontFamily: 'monospace',
                            resize: 'none',
                            padding: '16px'
                        }}
                    />
                ) : (
                    <div
                        ref={editorRef}
                        contentEditable
                        onInput={handleInput}
                        style={{ 
                            width: '100%', 
                            minHeight: '300px', 
                            padding: '16px', 
                            outline: 'none',
                            overflowY: 'auto'
                        }}
                        dangerouslySetInnerHTML={{ __html: value }}
                    />
                )}
                {!htmlValue && !isCodeView && (
                    <div style={{ position: 'absolute', top: '16px', left: '16px', color: '#bfbfbf', pointerEvents: 'none' }}>
                        {placeholder || 'Bắt đầu viết nội dung bài viết...'}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HtmlEditor;
