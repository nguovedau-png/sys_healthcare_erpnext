'use client';
import React, { useEffect, useState, Suspense } from 'react';
import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';
import Tag from '@/components/ui/Tag';
import { Title, Text } from '@/components/ui/Typography';
import Spin from '@/components/ui/Spin';
import { message } from '@/components/ui/Message';
import Descriptions from '@/components/ui/Descriptions';
import Form from '@/components/ui/Form';
import Tabs from '@/components/ui/Tabs';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import Divider from '@/components/ui/Divider';
import { Row, Col } from '@/components/ui/Grid';
import Menu from '@/components/ui/Menu';
// removed unused imports
import { 
    AiOutlineUser as UserOutlined, 
    AiOutlineHistory as HistoryOutlined, 
    AiOutlineEdit as EditOutlined, 
    AiOutlineMail as MailOutlined, 
    AiOutlinePhone as PhoneOutlined, 
    AiOutlineHome as HomeOutlined, 
    AiOutlineApartment as ApartmentOutlined, 
    AiOutlineSolution as SolutionOutlined,
    AiOutlineSafety as SafetyOutlined,
    AiOutlineBell as BellOutlined,
    AiOutlineGlobal as GlobalOutlined,
    AiOutlineArrowLeft as ArrowLeftOutlined,
    AiOutlineCalendar as CalendarOutlined,
    AiOutlineShoppingCart as ShoppingCartOutlined,
    AiOutlineVideoCamera as VideoCameraOutlined,
    AiOutlineHeart as HeartOutlined
} from 'react-icons/ai';
import { useAuth } from '@/providers/AuthProvider';
import userService from '@/services/user.service';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function ProfileContent() {
    const { user, isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [form] = Form.useForm();
    const [saving, setSaving] = useState(false);
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const tabFromUrl = searchParams.get('tab');
    
    const [activeKey, setActiveKey] = useState(tabFromUrl || 'overview');
    const [healthActiveTab, setHealthActiveTab] = useState('overview');

    const HEALTH_DATA = {
        weight: [{ date: '01/12', value: 68 }, { date: '08/12', value: 67.5 }, { date: '15/12', value: 67 }],
        bloodPressure: [{ date: '01/12', sys: 120, dia: 80 }, { date: '08/12', sys: 118, dia: 78 }],
        glucose: [{ date: '01/12', value: 95 }, { date: '08/12', value: 92 }]
    };

    const MEDICATIONS = [
        { name: 'Metformin 500mg', time: '08:00 & 20:00', status: 'active' },
        { name: 'Vitamin D3', time: '08:00', status: 'active' }
    ];

    useEffect(() => {
        if (tabFromUrl && tabFromUrl !== activeKey) {
            setActiveKey(tabFromUrl);
        }
    }, [tabFromUrl]);

    const handleTabChange = (key: string) => {
        setActiveKey(key);
        router.push(`/profile?tab=${key}`, { scroll: false });
    };

    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                department: user.department,
                position: user.position,
            });
        }
    }, [user, form]);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!user) return;
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:3000/v1/payments/history?userId=${user.userId}`);
                if (res.ok) {
                    const data = await res.json();
                    setTransactions(data);
                }
            } catch (error) {
                console.error('Failed to load history', error);
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) fetchHistory();
    }, [user, isAuthenticated]);

    const handleUpdateProfile = async (values: any) => {
        if (!user) return;
        try {
            setSaving(true);
            await userService.updateUser(user.id, values);
            message.success('Cập nhật hồ sơ thành công');
        } catch (error: any) {
            message.error(error.message || 'Cập nhật thất bại');
        } finally {
            setSaving(false);
        }
    };

    const myBookings = [
        { id: 'BK-123456', date: '2024-03-20', time: '09:00 - 09:30', doctor: 'BS.CKII Nguyễn Thế Dũng', specialty: 'Tim mạch', status: 'confirmed', paymentStatus: 'paid', price: 300000 },
        { id: 'BK-789012', date: '2024-02-15', time: '14:30 - 15:00', doctor: 'ThS.BS Hoàng Lan Phương', specialty: 'Da liễu', status: 'completed', paymentStatus: 'paid', price: 250000 }
    ];

    const bookingColumns = [
        {
            title: 'Mã đặt lịch',
            dataIndex: 'id',
            key: 'id',
            render: (text: string) => <Text strong className="text-teal-600 font-black">{text}</Text>
        },
        {
            title: 'Bác sĩ / Chuyên khoa',
            key: 'doctor',
            render: (_: any, record: any) => (
                <div className="py-2">
                    <div className="font-bold text-slate-800">{record.doctor}</div>
                    <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-1">{record.specialty}</div>
                </div>
            )
        },
        {
            title: 'Thời gian',
            key: 'time',
            render: (_: any, record: any) => (
                <div className="flex flex-col gap-1 py-2">
                    <div className="flex items-center gap-2 text-slate-700 font-medium">
                        <CalendarOutlined className="text-teal-600" /> 
                        {new Date(record.date).toLocaleDateString('vi-VN')}
                    </div>
                    <Text type="secondary" className="text-xs font-bold">{record.time}</Text>
                </div>
            )
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const colors: any = { confirmed: 'blue', completed: 'success', cancelled: 'error', pending: 'warning' };
                const labels: any = { confirmed: 'Đã xác nhận', completed: 'Hoàn thành', cancelled: 'Đã hủy', pending: 'Chờ duyệt' };
                return <Tag color={colors[status]} bordered={false}>{labels[status]}</Tag>;
            }
        },
        {
            title: 'Thanh toán',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            render: (status: string) => (
                <Tag color={status === 'paid' ? 'success' : 'warning'} bordered={false}>
                    {status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                </Tag>
            )
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_: any, record: any) => (
                <div className="flex gap-2">
                    {record.status === 'confirmed' && (
                        <Button
                            variant="primary"
                            size="small"
                            icon={<VideoCameraOutlined />}
                            onClick={() => router.push(`/consultation/${record.id}`)}
                            className="rounded-lg bg-teal-600 border-none font-bold text-xs"
                        >
                            Vào phòng
                        </Button>
                    )}
                    <Button variant="text" size="small" className="text-slate-400 hover:text-teal-600 font-bold text-xs">Chi tiết</Button>
                </div>
            )
        }
    ];

    const columns = [
        {
            title: 'Giao dịch',
            dataIndex: 'id',
            key: 'id',
            render: (id: number) => <Text strong className="text-slate-700">{`#${id}`}</Text>,
        },
        {
            title: 'Dịch vụ',
            dataIndex: 'plan',
            key: 'plan',
            render: (plan: string) => <Tag color="blue" className="rounded-md px-2 font-medium">{plan}</Tag>,
        },
        {
            title: 'Số tiền',
            dataIndex: 'amount',
            key: 'amount',
            render: (val: number, record: any) => (
                <Text strong className="text-slate-900">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: record.currency || 'VND' }).format(val)}
                </Text>
            ),
        },
        {
            title: 'Thời gian',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => <Text type="secondary">{new Date(date).toLocaleDateString('vi-VN')}</Text>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag bordered={false} color={status === 'ACTIVE' || status === 'COMPLETED' ? 'success' : 'processing'} className="rounded-full px-3">
                    {status === 'ACTIVE' ? 'Hoàn tất' : status}
                </Tag>
            ),
        },
    ];

    if (!isAuthenticated) {
        return (
            <div className="flex justify-center items-center h-[70vh] bg-slate-50/50">
                <Card className="w-full max-w-md text-center shadow-2xl border-none rounded-lg p-8">
                    <Spin size="large" />
                    <div className="mt-6 text-slate-500 font-semibold text-lg">Đang xác thực thông tin...</div>
                    <Link href="/login" className="mt-4 inline-block text-teal-600 font-bold hover:underline">Vui lòng đăng nhập</Link>
                </Card>
            </div>
        );
    }

    const renderContent = () => {
        switch (activeKey) {
            case 'overview':
                return (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        <Row gutter={[24, 24]}>
                            <Col span={24}>
                                <Card bordered={false} className="shadow-sm rounded-lg bg-gradient-to-br from-teal-50 to-white border border-teal-100/50">
                                    <Row align="middle" gutter={24}>
                                        <Col>
                                            <Avatar size={80} icon={<UserOutlined />} className="bg-teal-500 shadow-lg shadow-teal-200" src={(user as any)?.profilePicture} />
                                        </Col>
                                        <Col>
                                            <Title level={3} className="m-0 text-slate-800">{user?.name}</Title>
                                            <Text type="secondary" className="text-slate-500 font-medium">Mã nhân viên: {user?.userId}</Text>
                                            <div className="mt-2 flex gap-2">
                                                <Tag color="teal" className="rounded-full border-none px-3 font-bold text-[10px] uppercase tracking-wider">
                                                    {user?.roleId === 1 ? 'Administrator' : 'Standard User'}
                                                </Tag>
                                                <Tag color="blue" className="rounded-full border-none px-3 font-bold text-[10px] uppercase tracking-wider">
                                                    Active
                                                </Tag>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Card title={<span className="text-slate-800 font-bold">Thông tin liên hệ</span>} bordered={false} className="shadow-sm rounded-lg h-full border border-slate-100">
                                    <Descriptions column={1} className="enterprise-desc">
                                        <Descriptions.Item label={<MailOutlined className="text-teal-500" />}>
                                            <div className="flex flex-col"><Text type="secondary" className="text-[10px] uppercase font-bold tracking-tighter">Email</Text><Text strong>{user?.email}</Text></div>
                                        </Descriptions.Item>
                                        <Descriptions.Item label={<PhoneOutlined className="text-teal-500" />}>
                                            <div className="flex flex-col"><Text type="secondary" className="text-[10px] uppercase font-bold tracking-tighter">Điện thoại</Text><Text strong>{user?.phone || 'N/A'}</Text></div>
                                        </Descriptions.Item>
                                        <Descriptions.Item label={<HomeOutlined className="text-teal-500" />}>
                                            <div className="flex flex-col"><Text type="secondary" className="text-[10px] uppercase font-bold tracking-tighter">Địa chỉ</Text><Text strong>{user?.address || 'N/A'}</Text></div>
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Card title={<span className="text-slate-800 font-bold">Vị trí công tác</span>} bordered={false} className="shadow-sm rounded-lg h-full border border-slate-100">
                                    <Descriptions column={1} className="enterprise-desc">
                                        <Descriptions.Item label={<ApartmentOutlined className="text-teal-500" />}>
                                            <div className="flex flex-col"><Text type="secondary" className="text-[10px] uppercase font-bold tracking-tighter">Phòng ban</Text><Text strong>{user?.department || 'N/A'}</Text></div>
                                        </Descriptions.Item>
                                        <Descriptions.Item label={<SolutionOutlined className="text-teal-500" />}>
                                            <div className="flex flex-col"><Text type="secondary" className="text-[10px] uppercase font-bold tracking-tighter">Chức vụ</Text><Text strong>{user?.position || 'N/A'}</Text></div>
                                        </Descriptions.Item>
                                        <Descriptions.Item label={<SafetyOutlined className="text-teal-500" />}>
                                            <div className="flex flex-col"><Text type="secondary" className="text-[10px] uppercase font-bold tracking-tighter">Thâm niên</Text><Text strong>2 năm</Text></div>
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                );
            case 'edit':
                return (
                    <div className="max-w-3xl animate-in fade-in slide-in-from-right-4 duration-500">
                        <Card bordered={false} className="shadow-sm rounded-lg border border-slate-100">
                            <Title level={4} className="mb-8 text-slate-800">Cài đặt thông tin cá nhân</Title>
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={handleUpdateProfile}
                                requiredMark={false}
                                className="enterprise-form"
                            >
                                <Row gutter={24}>
                                    <Col span={12}>
                                        <Form.Item label="Họ và tên" name="name" rules={[{ required: true }]}>
                                            <Input placeholder="Nguyễn Văn A" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Địa chỉ Email" name="email">
                                            <Input disabled className="bg-slate-50 cursor-not-allowed" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Số điện thoại" name="phone">
                                            <Input placeholder="09xxxx" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Chức danh" name="position">
                                            <Input placeholder="VD: Bác sĩ trưởng" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label="Phòng ban" name="department">
                                            <Input placeholder="Khoa Nội" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label="Địa chỉ liên hệ" name="address">
                                            <Input.TextArea rows={3} placeholder="Số nhà, đường, phường..." />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Divider />
                                <div className="flex justify-end gap-3">
                                    <Button size="large" className="rounded-xl px-8 font-bold border-slate-200">Hủy</Button>
                                    <Button variant="primary" type="submit" loading={saving} size="large" className="rounded-xl px-8 font-bold bg-teal-600 border-none shadow-lg shadow-teal-500/20">
                                        Cập nhật hồ sơ
                                    </Button>
                                </div>
                            </Form>
                        </Card>
                    </div>
                );
            case 'history':
                return (
                    <div className="animate-in fade-in duration-500">
                        <Card bordered={false} className="shadow-sm rounded-lg border border-slate-100 overflow-hidden" bodyStyle={{ padding: 0 }}>
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                <Title level={4} className="m-0 text-slate-800">Lịch sử thanh toán</Title>
                                <Button variant="text" className="text-teal-600 font-bold">Xuất báo cáo</Button>
                            </div>
                            <Table
                                dataSource={transactions}
                                columns={columns}
                                rowKey="id"
                                pagination={{ pageSize: 8 }}
                                className="enterprise-table"
                                loading={loading}
                            />
                        </Card>
                    </div>
                );
            case 'orders':
                return (
                    <div className="animate-in fade-in duration-500">
                        <Card bordered={false} className="shadow-sm rounded-lg border border-slate-100 overflow-hidden" bodyStyle={{ padding: 0 }}>
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                <Title level={4} className="m-0 text-slate-800">Đơn hàng của tôi</Title>
                                <Button variant="primary" size="small" className="bg-teal-600 border-none rounded-lg">Theo dõi đơn hàng</Button>
                            </div>
                            <Table
                                dataSource={transactions} // Using same data source for now as backend store everything in subscription table
                                columns={[
                                    { title: 'Mã đơn hàng', dataIndex: 'id', key: 'id', render: (id) => <Text strong>{`ORD-${id}`}</Text> },
                                    { title: 'Sản phẩm', dataIndex: 'plan', key: 'plan', render: (plan) => <Text>{plan === 'BASIC' ? 'Gói khám sức khỏe' : plan}</Text> },
                                    { title: 'Tổng tiền', dataIndex: 'amount', key: 'amount', render: (val) => <Text strong className="text-teal-600">{new Intl.NumberFormat('vi-VN').format(val)}đ</Text> },
                                    { title: 'Ngày mua', dataIndex: 'createdAt', key: 'createdAt', render: (date) => new Date(date).toLocaleDateString('vi-VN') },
                                    { 
                                        title: 'Trạng thái', 
                                        dataIndex: 'status', 
                                        key: 'status',
                                        render: (status) => (
                                            <Tag color={status === 'ACTIVE' ? 'success' : 'processing'} className="rounded-full px-3">
                                                {status === 'ACTIVE' ? 'Đã thanh toán' : 'Đang xử lý'}
                                            </Tag>
                                        )
                                    },
                                ]}
                                rowKey="id"
                                pagination={{ pageSize: 8 }}
                                className="enterprise-table"
                                loading={loading}
                            />
                        </Card>
                    </div>
                );
            case 'bookings':
                return (
                    <div className="animate-in fade-in duration-500">
                        <Card bordered={false} className="shadow-sm rounded-lg border border-slate-100 overflow-hidden" bodyStyle={{ padding: 0 }}>
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <Title level={4} className="m-0 text-slate-800">Quản lý lịch khám bệnh</Title>
                                <Button variant="primary" className="bg-teal-600 border-none rounded-lg" icon={<CalendarOutlined />} onClick={() => router.push('/booking')}>
                                    Đặt lịch mới
                                </Button>
                            </div>
                            <Tabs 
                                defaultActiveKey="upcoming"
                                className="px-6 pt-4"
                                items={[
                                    {
                                        key: 'upcoming',
                                        label: <span className="px-2 font-bold">Sắp tới</span>,
                                        children: (
                                            <div className="pb-6">
                                                <Table 
                                                    dataSource={myBookings.filter(b => b.status === 'confirmed')} 
                                                    columns={bookingColumns} 
                                                    rowKey="id" 
                                                    pagination={false}
                                                    className="enterprise-table"
                                                />
                                            </div>
                                        )
                                    },
                                    {
                                        key: 'history',
                                        label: <span className="px-2 font-bold">Lịch sử</span>,
                                        children: (
                                            <div className="pb-6">
                                                <Table 
                                                    dataSource={myBookings.filter(b => b.status !== 'confirmed')} 
                                                    columns={bookingColumns} 
                                                    rowKey="id" 
                                                    pagination={false}
                                                    className="enterprise-table"
                                                />
                                            </div>
                                        )
                                    }
                                ]}
                            />
                        </Card>
                    </div>
                );
            case 'health':
                return (
                    <div className="animate-in fade-in duration-500 space-y-6">
                        <Card bordered={false} className="shadow-sm rounded-lg border border-slate-100 overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                                <Title level={4} className="m-0 text-slate-800 flex items-center gap-2">
                                    <HeartOutlined className="text-rose-500" /> Sổ sức khỏe điện tử
                                </Title>
                                <div className="flex gap-2">
                                    {['overview', 'vitals', 'medications'].map(tab => (
                                        <Button 
                                            key={tab}
                                            variant={healthActiveTab === tab ? 'primary' : 'text'}
                                            size="small"
                                            onClick={() => setHealthActiveTab(tab)}
                                            className={`rounded-lg px-4 font-bold text-xs ${healthActiveTab === tab ? 'bg-teal-600 border-none' : 'text-slate-500'}`}
                                        >
                                            {tab === 'overview' ? 'Tổng quan' : tab === 'vitals' ? 'Chỉ số' : 'Thuốc'}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="p-6">
                                {healthActiveTab === 'overview' && (
                                    <Row gutter={[16, 16]}>
                                        <Col xs={24} sm={12} lg={6}>
                                            <Card className="bg-blue-50/50 border-blue-100/50 rounded-xl">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                        <HeartOutlined className="text-blue-600 text-xl" />
                                                    </div>
                                                    <Text type="secondary" className="text-[10px] font-bold">Hôm nay</Text>
                                                </div>
                                                <div className="text-2xl font-black text-slate-800">67 kg</div>
                                                <div className="text-[10px] text-emerald-600 font-bold mt-1">↓ -1kg so với tuần trước</div>
                                            </Card>
                                        </Col>
                                        <Col xs={24} sm={12} lg={6}>
                                            <Card className="bg-rose-50/50 border-rose-100/50 rounded-xl">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                                                        <HeartOutlined className="text-rose-600 text-xl" />
                                                    </div>
                                                    <Text type="secondary" className="text-[10px] font-bold">Hôm nay</Text>
                                                </div>
                                                <div className="text-2xl font-black text-slate-800">118/78</div>
                                                <div className="text-[10px] text-slate-500 font-bold mt-1">mmHg - Bình thường</div>
                                            </Card>
                                        </Col>
                                        <Col xs={24} sm={12} lg={6}>
                                            <Card className="bg-orange-50/50 border-orange-100/50 rounded-xl">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                                        <HeartOutlined className="text-orange-600 text-xl" />
                                                    </div>
                                                    <Text type="secondary" className="text-[10px] font-bold">Hôm nay</Text>
                                                </div>
                                                <div className="text-2xl font-black text-slate-800">92 mg/dL</div>
                                                <div className="text-[10px] text-slate-500 font-bold mt-1">Đường huyết - Tốt</div>
                                            </Card>
                                        </Col>
                                        <Col xs={24} sm={12} lg={6}>
                                            <Card className="bg-emerald-50/50 border-emerald-100/50 rounded-xl">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                                        <HeartOutlined className="text-emerald-600 text-xl" />
                                                    </div>
                                                    <Text type="secondary" className="text-[10px] font-bold">Hôm nay</Text>
                                                </div>
                                                <div className="text-2xl font-black text-slate-800">2/2</div>
                                                <div className="text-[10px] text-emerald-600 font-bold mt-1">✓ Đã uống đủ thuốc</div>
                                            </Card>
                                        </Col>
                                    </Row>
                                )}

                                {healthActiveTab === 'vitals' && (
                                    <div className="space-y-8">
                                        <div>
                                            <Title level={5} className="mb-6 text-slate-700 font-bold">Biểu đồ Cân nặng</Title>
                                            <div className="h-48 flex items-end justify-around gap-4 px-4">
                                                {HEALTH_DATA.weight.map((item, idx) => (
                                                    <div key={idx} className="flex-1 flex flex-col items-center group">
                                                        <div 
                                                            className="w-full bg-teal-100 rounded-t-lg relative transition-all group-hover:bg-teal-200" 
                                                            style={{ height: `${item.value}%` }}
                                                        >
                                                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-teal-700 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                {item.value}kg
                                                            </span>
                                                        </div>
                                                        <span className="text-[10px] text-slate-400 font-bold mt-2 tracking-tighter">{item.date}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <Divider />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                <Text strong className="text-xs uppercase text-slate-500 tracking-wider">Huyết áp gần nhất</Text>
                                                <div className="mt-4 flex items-baseline gap-2">
                                                    <span className="text-3xl font-black text-slate-800">118/78</span>
                                                    <span className="text-xs font-bold text-slate-400 uppercase">mmHg</span>
                                                </div>
                                                <Tag color="success" bordered={false} className="mt-2 text-[10px]">Bình thường</Tag>
                                            </div>
                                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                <Text strong className="text-xs uppercase text-slate-500 tracking-wider">Đường huyết gần nhất</Text>
                                                <div className="mt-4 flex items-baseline gap-2">
                                                    <span className="text-3xl font-black text-slate-800">92</span>
                                                    <span className="text-xs font-bold text-slate-400 uppercase">mg/dL</span>
                                                </div>
                                                <Tag color="success" bordered={false} className="mt-2 text-[10px]">Tốt</Tag>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {healthActiveTab === 'medications' && (
                                    <div className="space-y-4">
                                        <Title level={5} className="mb-4 text-slate-700 font-bold">Thuốc đang sử dụng</Title>
                                        {MEDICATIONS.map((med, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-teal-200 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                                                        <HeartOutlined className="text-teal-600 text-xl" />
                                                    </div>
                                                    <div>
                                                        <div className="font-black text-slate-800">{med.name}</div>
                                                        <div className="text-xs font-bold text-slate-500 uppercase tracking-tighter mt-1">Thời gian: {med.time}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Tag color="success" bordered={false} className="text-[10px] uppercase font-bold tracking-widest px-3">Active</Tag>
                                                    <Button variant="text" size="small" className="text-teal-600 font-bold text-xs hover:bg-teal-50 rounded-lg">Nhắc nhở</Button>
                                                </div>
                                            </div>
                                        ))}
                                        <Button variant="dashed" className="w-full h-14 rounded-xl border-2 border-slate-200 text-slate-500 font-bold hover:text-teal-600 hover:border-teal-200">
                                            + Thêm thuốc mới
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>
                );
            case 'security':
                return (
                    <div className="max-w-3xl animate-in fade-in slide-in-from-right-4 duration-500">
                        <Card bordered={false} className="shadow-sm rounded-lg border border-slate-100">
                            <Title level={4} className="mb-8 text-slate-800 flex items-center gap-2">
                                <SafetyOutlined className="text-teal-600" /> Bảo mật & Mật khẩu
                            </Title>
                            <Form layout="vertical" className="enterprise-form">
                                <Form.Item label="Mật khẩu hiện tại" name="currentPassword">
                                    <Input type="password" placeholder="••••••••" />
                                </Form.Item>
                                <Row gutter={24}>
                                    <Col span={12}>
                                        <Form.Item label="Mật khẩu mới" name="newPassword">
                                            <Input type="password" placeholder="••••••••" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Xác nhận mật khẩu mới" name="confirmPassword">
                                            <Input type="password" placeholder="••••••••" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Divider />
                                <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100 mb-8">
                                    <div>
                                        <Text strong className="block text-slate-800">Xác thực 2 yếu tố (2FA)</Text>
                                        <Text type="secondary" className="text-xs">Tăng cường bảo mật cho tài khoản của bạn</Text>
                                    </div>
                                    <Button variant="outline" className="rounded-lg border-teal-500 text-teal-600 font-bold px-6">Kích hoạt</Button>
                                </div>
                                <div className="flex justify-end gap-3">
                                    <Button variant="primary" size="large" className="rounded-xl px-8 font-bold bg-teal-600 border-none shadow-lg shadow-teal-500/20">
                                        Đổi mật khẩu
                                    </Button>
                                </div>
                            </Form>
                        </Card>
                    </div>
                );
            case 'notifications':
                return (
                    <div className="max-w-3xl animate-in fade-in slide-in-from-right-4 duration-500">
                        <Card bordered={false} className="shadow-sm rounded-lg border border-slate-100">
                            <Title level={4} className="mb-8 text-slate-800 flex items-center gap-2">
                                <BellOutlined className="text-teal-600" /> Cài đặt thông báo
                            </Title>
                            <div className="space-y-6">
                                {[
                                    { title: 'Thông báo đặt lịch', desc: 'Nhận thông báo khi bác sĩ xác nhận lịch khám', type: 'Email' },
                                    { title: 'Nhắc nhở uống thuốc', desc: 'Thông báo hàng ngày về lịch uống thuốc', type: 'Push' },
                                    { title: 'Cập nhật hệ thống', desc: 'Thông tin về các tính năng mới và bảo trì', type: 'Email' },
                                    { title: 'Khuyến mãi & Tin tức', desc: 'Các chương trình ưu đãi đặc biệt', type: 'Sms' }
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between items-center p-4 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors">
                                        <div>
                                            <Text strong className="block text-slate-800">{item.title}</Text>
                                            <Text type="secondary" className="text-xs">{item.desc}</Text>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Tag color="blue" className="rounded-full border-none px-3 font-bold text-[10px] uppercase tracking-wider">{item.type}</Tag>
                                            <div className="w-12 h-6 bg-teal-600 rounded-full relative cursor-pointer">
                                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Divider />
                            <div className="flex justify-end">
                                <Button variant="primary" size="large" className="rounded-xl px-8 font-bold bg-teal-600 border-none shadow-lg shadow-teal-500/20">
                                    Lưu cài đặt
                                </Button>
                            </div>
                        </Card>
                    </div>
                );
            case 'language':
                return (
                    <div className="max-w-3xl animate-in fade-in slide-in-from-right-4 duration-500">
                        <Card bordered={false} className="shadow-sm rounded-lg border border-slate-100">
                            <Title level={4} className="mb-8 text-slate-800 flex items-center gap-2">
                                <GlobalOutlined className="text-teal-600" /> Ngôn ngữ & Vùng
                            </Title>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { label: 'Tiếng Việt', code: 'vi', flag: '🇻🇳', selected: true },
                                    { label: 'English', code: 'en', flag: '🇺🇸', selected: false },
                                    { label: '日本語', code: 'jp', flag: '🇯🇵', selected: false },
                                    { label: '한국어', code: 'kr', flag: '🇰🇷', selected: false }
                                ].map((lang, i) => (
                                    <div 
                                        key={i} 
                                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${lang.selected ? 'border-teal-500 bg-teal-50/30' : 'border-slate-100 hover:border-teal-200'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-2xl">{lang.flag}</span>
                                            <Text strong className={lang.selected ? 'text-teal-700' : 'text-slate-700'}>{lang.label}</Text>
                                        </div>
                                        {lang.selected && <div className="w-2 h-2 bg-teal-500 rounded-full"></div>}
                                    </div>
                                ))}
                            </div>
                            <Divider />
                            <div className="flex justify-end">
                                <Button variant="primary" size="large" className="rounded-xl px-8 font-bold bg-teal-600 border-none shadow-lg shadow-teal-500/20">
                                    Xác nhận thay đổi
                                </Button>
                            </div>
                        </Card>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 pt-[70px]">
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <Link href="/" className="text-slate-500 hover:text-teal-600 font-medium flex items-center gap-2 mb-2 transition-colors">
                            <ArrowLeftOutlined className="text-xs" /> Quay lại Trang chủ
                        </Link>
                        <Title level={2} className="m-0 text-slate-900 font-black tracking-tight">Hồ sơ người dùng</Title>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/booking">
                            <Button icon={<CalendarOutlined />} className="rounded-xl border-teal-500 text-teal-600 hover:bg-teal-50">
                                Đặt khám bệnh
                            </Button>
                        </Link>
                        <Link href="/shop">
                            <Button icon={<ShoppingCartOutlined />} className="rounded-xl border-blue-500 text-blue-600 hover:bg-blue-50">
                                Mua thuốc
                            </Button>
                        </Link>
                        <Button icon={<BellOutlined />} className="rounded-xl border-slate-200" />
                        <Button variant="primary" icon={<EditOutlined />} className="rounded-xl bg-teal-600 border-none" onClick={() => setActiveKey('edit')}>
                            Sửa thông tin
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="w-full lg:w-[280px] flex-shrink-0 bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden sticky top-[100px]">
                        <Menu
                            mode="inline"
                            selectedKeys={[activeKey]}
                            onClick={({ key }) => handleTabChange(key)}
                            className="border-none py-4 px-3"
                            items={[
                                { key: 'overview', icon: <UserOutlined />, label: 'Tổng quan hồ sơ' },
                                { key: 'edit', icon: <EditOutlined />, label: 'Thông tin cá nhân' },
                                { key: 'bookings', icon: <CalendarOutlined />, label: 'Lịch sử khám bệnh' },
                                { key: 'health', icon: <HeartOutlined />, label: 'Sổ sức khỏe' },
                                { key: 'orders', icon: <SolutionOutlined />, label: 'Đơn hàng của tôi' },
                                { key: 'history', icon: <HistoryOutlined />, label: 'Lịch sử thanh toán' },
                                { type: 'divider' },
                                { key: 'security', icon: <SafetyOutlined />, label: 'Bảo mật & Mật khẩu' },
                                { key: 'notifications', icon: <BellOutlined />, label: 'Thông báo' },
                                { key: 'language', icon: <GlobalOutlined />, label: 'Ngôn ngữ' },
                            ]}
                        />
                    </div>
                    <div className="flex-1 min-h-[600px] min-w-0">
                        {renderContent()}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .custom-menu-item {
                    border-radius: 12px !important;
                    margin-bottom: 6px !important;
                    font-weight: 600 !important;
                    color: #64748b !important;
                    transition: all 0.2s ease !important;
                }
                .custom-menu-item:hover {
                    background-color: #f8fafc !important;
                    color: #0f766e !important;
                }
                .custom-menu-item-active {
                    background-color: #f0fdfa !important;
                    color: #0f766e !important;
                }
                .enterprise-desc .desc-label {
                    width: 40px;
                    padding-bottom: 24px !important;
                }
                .enterprise-table thead th {
                    background: var(--color-background) !important;
                    color: var(--color-muted) !important;
                    font-weight: 700 !important;
                    text-transform: uppercase !important;
                    font-size: 11px !important;
                    letter-spacing: 0.05em !important;
                }
            `}</style>
        </div>
    );
}

export default function ProfilePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">Đang tải...</div>}>
            <ProfileContent />
        </Suspense>
    );
}
