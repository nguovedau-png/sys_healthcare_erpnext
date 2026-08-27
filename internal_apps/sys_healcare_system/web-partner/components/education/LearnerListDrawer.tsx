import React from 'react';
import { Drawer, Table, Tag, Input, Space, Button, Typography } from 'antd';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

const { Text } = Typography;

const MOCK_LEARNERS = [
    { id: 1, learnerCode: '', learnerName: 'Hoàng Bích Diệp', pharmacyCode: '', pharmacyName: 'NT Long An', phone: '0979166789', address: '185 Trần Cung, P.Cổ Nhuế, Từ Liêm, Hà Nội', repCode: '', rep: 'Hoang Long', dmCode: '', dm: 'Tran Thi Huong Lan', rsmCode: '', rsm: 'HIEU' },
    { id: 2, learnerCode: '', learnerName: 'PHAN THỊ KIM CÚC', pharmacyCode: '', pharmacyName: 'NT NGO GIA', phone: '0937613959', address: '129 NGUYỄN THÁI BÌNH, P.02, Tân Bình, Hồ Chí Minh', repCode: '', rep: 'Vo Cao Nguyen', dmCode: '', dm: 'Nguyen Thanh Phong', rsmCode: '', rsm: 'CHAU' },
    { id: 3, learnerCode: '', learnerName: 'Nguyễn Thị Ngọc', pharmacyCode: '', pharmacyName: 'NT Khang Thịnh', phone: '0937153849', address: '295A Nguyễn Văn Cừ, P.An Khánh, Ninh Kiều, Cần Thơ', repCode: '', rep: 'Nguyen Thanh Hieu', dmCode: '', dm: 'Vo Hung Cuong', rsmCode: '', rsm: 'CHAU' },
    { id: 4, learnerCode: '', learnerName: 'Nguyễn Hồng Vân', pharmacyCode: '', pharmacyName: 'quầy thuốc luân vân', phone: '0836383666', address: 'Thôn Bầu, P.Kim Chung, Đông Anh, Hà Nội', repCode: '', rep: 'Hoang Long', dmCode: '', dm: 'Tran Thi Huong Lan', rsmCode: '', rsm: 'HIEU' },
    { id: 5, learnerCode: '', learnerName: 'nguyễn trần thu trà', pharmacyCode: '', pharmacyName: 'Nha Thuoc Duc', phone: '0904295369', address: '148 quan nhân, P.Nhân Chính, Thanh Xuân, Hà Nội', repCode: '', rep: 'Nguyen Thi Lan Anh', dmCode: '', dm: 'Tran Thi Huong Lan', rsmCode: '', rsm: 'HIEU' },
    { id: 6, learnerCode: '', learnerName: 'Nguyễn Ngọc Hoàng', pharmacyCode: '', pharmacyName: 'Nha Thuốc Hoàng Long', phone: '0908791188', address: '123 Bùi Hữu Nghĩa, P.Bình Thủy, Bình Thuỷ, Cần Thơ', repCode: '', rep: 'Nguyen Thanh Hieu', dmCode: '', dm: 'Vo Hung Cuong', rsmCode: '', rsm: 'CHAU' },
    { id: 7, learnerCode: '', learnerName: 'Nguyễn Đình Hùng', pharmacyCode: '', pharmacyName: 'Quầy thuốc Nguyễn Đình Hùng', phone: '0904918638', address: 'Thôn Thượng, Thanh Liệt, P.Thanh Liệt, Thanh Trì, Hà Nội', repCode: '', rep: 'Nguyen Quang Hau', dmCode: '', dm: 'Phung Thi Chinh', rsmCode: '', rsm: 'HIEU' },
    { id: 8, learnerCode: '', learnerName: 'Lại Thị Thuỳ Nhung', pharmacyCode: '', pharmacyName: 'Cty Pharmacity', phone: '0903450524', address: '248A Nơ trang long, P.12, Bình Thạnh, Hồ Chí Minh', repCode: '', rep: 'Bui Trinh Tien Thanh', dmCode: '', dm: 'Bui Trinh Tien Thanh', rsmCode: '', rsm: 'CHAU' },
    { id: 9, learnerCode: '', learnerName: 'Hồ Thị Bích Thu', pharmacyCode: '', pharmacyName: 'Quầy Thuốc Hồng Nghi', phone: '02963742027', address: 'ấp phú xương, P.Chợ Vàm, Phú Tân, An Giang', repCode: '', rep: 'Le Ngoc Tuan', dmCode: '', dm: 'Vo Hung Cuong', rsmCode: '', rsm: 'CHAU' },
    { id: 10, learnerCode: '', learnerName: 'Phạm Toàn Quyền', pharmacyCode: '', pharmacyName: 'NHA THUOC THAO KHOA', phone: '0932908301', address: '144 DUONG BA TRAC, P.2, P.02, Quận 8, Hồ Chí Minh', repCode: '', rep: 'Cao Thuy Thien Anh', dmCode: '', dm: 'Dau Anh Dat', rsmCode: '', rsm: 'CHAU' },
];

interface LearnerListDrawerProps {
    open: boolean;
    onClose: () => void;
    courseName?: string;
}

export default function LearnerListDrawer({ open, onClose, courseName }: LearnerListDrawerProps) {
    const handleExportExcel = () => {
        const wsData: Array<Array<string | number>> = [
            ['STT', 'CODE HỌC VIÊN', 'HỌC TÊN HỌC VIÊN', 'CODE NHÀ THUỐC', 'TÊN NHÀ THUỐC', 'SỐ ĐIỆN THOẠI', 'ĐỊA CHỈ', 'CODE CỦA REP', 'REP', 'CODE CỦA DM', 'DM', 'CODE CỦA RSM', 'RSM']
        ];
        
        MOCK_LEARNERS.forEach((item, index) => {
            wsData.push([
                index + 1,
                item.learnerCode,
                item.learnerName,
                item.pharmacyCode,
                item.pharmacyName,
                item.phone,
                item.address,
                item.repCode,
                item.rep,
                item.dmCode,
                item.dm,
                item.rsmCode,
                item.rsm
            ]);
        });

        const ws = XLSX.utils.aoa_to_sheet(wsData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Learners");
        XLSX.writeFile(wb, `Danh_Sach_Hoc_Vien_${courseName?.replace(/\s+/g, '_') || 'Course'}.xlsx`);
    };

    const columns = [
        { title: 'STT', dataIndex: 'id', width: 60, align: 'center' as const },
        { title: 'CODE HỌC VIÊN', dataIndex: 'learnerCode', width: 120 },
        { title: 'HỌC TÊN HỌC VIÊN', dataIndex: 'learnerName', render: (text: string) => <Text strong>{text}</Text>, width: 180 },
        { title: 'CODE NHÀ THUỐC', dataIndex: 'pharmacyCode', width: 130 },
        { title: 'TÊN NHÀ THUỐC', dataIndex: 'pharmacyName', width: 180 },
        { title: 'SỐ ĐIỆN THOẠI', dataIndex: 'phone', width: 120 },
        { title: 'ĐỊA CHỈ', dataIndex: 'address', ellipsis: true, width: 250 },
        { title: 'CODE CỦA REP', dataIndex: 'repCode', width: 120 },
        { title: 'REP', dataIndex: 'rep', width: 150 },
        { title: 'CODE CỦA DM', dataIndex: 'dmCode', width: 120 },
        { title: 'DM', dataIndex: 'dm', width: 150 },
        { title: 'CODE CỦA RSM', dataIndex: 'rsmCode', width: 120 },
        { title: 'RSM', dataIndex: 'rsm', width: 120 },
    ];

    return (
        <Drawer 
            title={`Danh sách học viên tham gia: ${courseName || ''}`}
            placement="right" 
            width={1200}
            onClose={onClose} 
            open={open}
            extra={
                <Space>
                    <Button type="primary" icon={<DownloadOutlined />} style={{ background: '#389e0d' }} onClick={handleExportExcel}>
                        Xuất Excel
                    </Button>
                </Space>
            }
        >
            <div style={{ marginBottom: 16 }}>
                <Input.Search placeholder="Tìm kiếm theo Tên học viên, Tên nhà thuốc, SĐT..." enterButton={<SearchOutlined />} style={{ width: 400 }} />
            </div>
            <Table 
                dataSource={MOCK_LEARNERS} 
                columns={columns} 
                rowKey="id" 
                size="small" 
                bordered 
                scroll={{ x: 'max-content', y: 'calc(100vh - 200px)' }}
                pagination={{ pageSize: 20, showTotal: (total) => `Tổng cộng ${total} học viên` }}
            />
        </Drawer>
    );
}
