"use client";
import React, { useState } from "react";
import { 
    Button, Input, Table, Badge, message, Tooltip, Tag, Card, Space, 
    Typography, Tabs, Modal, Form, Select, Row, Col, Avatar, Rate, Divider, List
} from "antd";
const { Title, Text, Paragraph } = Typography;
import { 
    SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, 
    VideoCameraOutlined, HistoryOutlined, LinkOutlined, CopyOutlined, 
    UserOutlined, ClockCircleOutlined, SettingOutlined, CalendarOutlined,
    StarFilled
} from "@ant-design/icons";
import EhrPageHeader from "@/components/portal/EhrPageHeader";
import EhrStatCards from "@/components/portal/EhrStatCards";

// Mock Data
const INITIAL_ROOMS = [
    { 
        id: 1, 
        roomName: "Khám Nội tiết - Bệnh nhân Trần Văn B", 
        host: "Bs. Nguyễn Văn A", 
        status: "Đang diễn ra", 
        time: "10:00 - 10:30, Hôm nay",
        zoomData: {
            meetingId: "892 345 6781",
            passcode: "123456",
            joinUrl: "https://zoom.us/j/8923456781?pwd=...",
        },
        participants: [
            { name: "Bs. Nguyễn Văn A", role: "Host" },
            { name: "Trần Văn B", role: "Bệnh nhân" }
        ]
    },
    { 
        id: 2, 
        roomName: "Hội chẩn liên khoa - Ca mổ Tim", 
        host: "Bs. Lê Hoàng", 
        status: "Sắp tới", 
        time: "14:00 - 15:30, Hôm nay",
        zoomData: {
            meetingId: "981 222 3344",
            passcode: "987654",
            joinUrl: "https://zoom.us/j/9812223344?pwd=...",
        },
        participants: [
            { name: "Bs. Lê Hoàng", role: "Host" },
            { name: "Bs. Phạm Tâm", role: "Bác sĩ" },
            { name: "Bs. Trần Hùng", role: "Bác sĩ" }
        ]
    }
];

const HISTORY_SESSIONS = [
    { id: 101, roomName: "Tư vấn Tâm lý - Nguyễn Thị C", date: "26/10/2023", duration: "45 phút", participants: 2, rating: 5, feedback: "Bác sĩ tư vấn rất nhiệt tình." },
    { id: 102, roomName: "Khám Da liễu online", date: "25/10/2023", duration: "15 phút", participants: 2, rating: 4, feedback: "Kết nối đôi lúc bị chập chờn." },
    { id: 103, roomName: "Hội chẩn Ung bướu", date: "24/10/2023", duration: "90 phút", participants: 5, rating: 5, feedback: "Cuộc họp hiệu quả." },
];

export default function ZoomTelemedicinePage() {
    const [activeTab, setActiveTab] = useState("1");
    const [configModalOpen, setConfigModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<any>(null);
    const [rooms, setRooms] = useState(INITIAL_ROOMS);
    const [addParticipantOpen, setAddParticipantOpen] = useState(false);
    const [createRoomOpen, setCreateRoomOpen] = useState(false);
    const [form] = Form.useForm();
    const [createForm] = Form.useForm();

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        message.success("Đã sao chép vào khay nhớ tạm");
    };

    const handleOpenConfig = (room: any) => {
        setSelectedRoom(room);
        setConfigModalOpen(true);
    };

    const handleAddParticipant = (values: any) => {
        const updatedRooms = rooms.map(r => {
            if (r.id === selectedRoom.id) {
                const updatedRoom = { ...r, participants: [...r.participants, { name: values.name, role: values.role }] };
                setSelectedRoom(updatedRoom);
                return updatedRoom;
            }
            return r;
        });
        setRooms(updatedRooms);
        setAddParticipantOpen(false);
        form.resetFields();
        message.success("Đã gửi lời mời tham gia cuộc gọi!");
    };

    const handleCreateRoom = (values: any) => {
        // Generate dummy Zoom credentials
        const newMeetingId = `${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(1000 + Math.random() * 9000)}`;
        const newPasscode = Math.floor(100000 + Math.random() * 900000).toString();
        
        const newRoom = {
            id: Date.now(),
            roomName: values.roomName,
            host: values.host,
            status: "Sắp tới",
            time: values.time || "Sắp diễn ra",
            zoomData: {
                meetingId: newMeetingId,
                passcode: newPasscode,
                joinUrl: `https://zoom.us/j/${newMeetingId.replace(/ /g, '')}?pwd=...`
            },
            participants: [
                { name: values.host, role: "Host" }
            ]
        };
        
        setRooms([newRoom, ...rooms]);
        setCreateRoomOpen(false);
        createForm.resetFields();
        message.success("Đã tạo phòng Telemedicine mới thành công!");
    };

    const handleStartMeeting = () => {
        if (!selectedRoom) return;
        
        // Cập nhật trạng thái thành "Đang diễn ra"
        const updatedRooms = rooms.map(r => 
            r.id === selectedRoom.id ? { ...r, status: "Đang diễn ra" } : r
        );
        setRooms(updatedRooms);
        
        setConfigModalOpen(false);
        message.loading({ content: "Đang khởi tạo kết nối hệ thống Zoom...", key: 'zoom_join' });
        
        setTimeout(() => {
            message.success({ content: "Đã mở Zoom!", key: 'zoom_join', duration: 2 });
            window.open(selectedRoom.zoomData.joinUrl, "_blank");
        }, 800);
    };

    const stats = [
        { label: "Cuộc gọi hôm nay", value: "12", icon: <VideoCameraOutlined /> },
        { label: "Tổng thời gian (phút)", value: "340", color: "#0050b3", icon: <ClockCircleOutlined /> },
        { label: "Đánh giá trung bình", value: "4.8/5", color: "#faad14", icon: <StarFilled /> },
        { label: "Tỷ lệ tham gia", value: "95%", color: "#52c41a", icon: <UserOutlined /> }
    ];

    const activeColumns = [
        { 
            title: <Text strong style={{ fontSize: 11 }}>THÔNG TIN CUỘC GỌI</Text>, 
            render: (_: any, r: any) => (
                <Space size={12}>
                    <div style={{ width: 40, height: 40, borderRadius: 8, background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1890ff' }}>
                        <VideoCameraOutlined style={{ fontSize: 20 }} />
                    </div>
                    <div>
                        <Text strong style={{ fontSize: 14, display: 'block' }}>{r.roomName}</Text>
                        <Space split={<Divider type="vertical" />}>
                            <Text type="secondary" style={{ fontSize: 12 }}><UserOutlined /> {r.host}</Text>
                            <Text type="secondary" style={{ fontSize: 12 }}><CalendarOutlined /> {r.time}</Text>
                        </Space>
                    </div>
                </Space>
            ) 
        },
        { 
            title: <Text strong style={{ fontSize: 11 }}>TRẠNG THÁI</Text>, 
            render: (_: any, r: any) => (
                <Badge 
                    status={r.status === "Đang diễn ra" ? "processing" : "default"} 
                    text={
                        <Text strong style={{ color: r.status === "Đang diễn ra" ? '#1890ff' : '#595959' }}>
                            {r.status}
                        </Text>
                    } 
                />
            ) 
        },
        {
            title: <Text strong style={{ fontSize: 11 }}>THAO TÁC</Text>,
            render: (_: any, r: any) => (
                <Space size={8}>
                    <Button type="primary" ghost icon={<SettingOutlined />} onClick={() => handleOpenConfig(r)}>Cấu hình & Join</Button>
                    <Button type="text" danger icon={<DeleteOutlined />} />
                </Space>
            ),
        },
    ];

    const historyColumns = [
        { title: 'Tên phòng / Cuộc gọi', dataIndex: 'roomName', key: 'roomName', render: (text: string) => <Text strong>{text}</Text> },
        { title: 'Ngày diễn ra', dataIndex: 'date', key: 'date' },
        { title: 'Thời lượng', dataIndex: 'duration', key: 'duration' },
        { title: 'Người tham gia', dataIndex: 'participants', key: 'participants', render: (val: number) => <Tag color="blue">{val} người</Tag> },
        { 
            title: 'Đánh giá', 
            key: 'rating', 
            render: (_: any, r: any) => (
                <Space direction="vertical" size={0}>
                    <Rate disabled defaultValue={r.rating} style={{ fontSize: 14 }} />
                    <Text type="secondary" style={{ fontSize: 12 }}>"{r.feedback}"</Text>
                </Space>
            ) 
        },
    ];

    return (
        <div style={{ paddingBottom: 40 }}>
            <EhrPageHeader 
                title="Telemedicine & Hội chẩn trực tuyến" 
                subtitle="Tích hợp Zoom: Cấu hình mã kết nối, phòng chờ và theo dõi thống kê chất lượng tư vấn từ xa"
                primaryAction={{
                    label: "Tạo phòng Telemedicine",
                    icon: <PlusOutlined />,
                    onClick: () => setCreateRoomOpen(true)
                }}
            />

            <EhrStatCards stats={stats} />

            <Card className="ehr-card" bodyStyle={{ padding: 0 }} style={{ marginTop: 24 }}>
                <Tabs 
                    activeKey={activeTab} 
                    onChange={setActiveTab}
                    size="large"
                    tabBarStyle={{ padding: '0 24px', margin: 0, backgroundColor: '#fafafa' }}
                    items={[
                        {
                            key: "1",
                            label: <span><VideoCameraOutlined /> Cuộc gọi sắp tới & Đang diễn ra</span>,
                            children: (
                                <div style={{ padding: 24 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                                        <Input.Search placeholder="Tìm kiếm tên bác sĩ, bệnh nhân..." style={{ width: 300 }} />
                                    </div>
                                    <Table 
                                        className="ehr-table-compact"
                                        dataSource={rooms} 
                                        rowKey="id" 
                                        pagination={false} 
                                        columns={activeColumns} 
                                    />
                                </div>
                            )
                        },
                        {
                            key: "2",
                            label: <span><HistoryOutlined /> Thống kê & Lịch sử</span>,
                            children: (
                                <div style={{ padding: 24 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                                        <Text type="secondary">Thống kê dữ liệu các cuộc gọi đã kết thúc để đánh giá chất lượng Telemedicine.</Text>
                                        <Button icon={<SearchOutlined />}>Lọc thời gian</Button>
                                    </div>
                                    <Table 
                                        dataSource={HISTORY_SESSIONS} 
                                        rowKey="id" 
                                        pagination={false} 
                                        columns={historyColumns} 
                                    />
                                </div>
                            )
                        }
                    ]}
                />
            </Card>

            {/* Config & Join Modal */}
            <Modal
                title={
                    <Space>
                        <SettingOutlined />
                        <span>Cấu hình Phòng Zoom</span>
                    </Space>
                }
                open={configModalOpen}
                onCancel={() => setConfigModalOpen(false)}
                footer={null}
                width={700}
            >
                {selectedRoom && (
                    <div style={{ paddingTop: 16 }}>
                        <div style={{ background: '#fafafa', padding: 16, borderRadius: 8, marginBottom: 24 }}>
                            <Title level={4} style={{ margin: 0, marginBottom: 8 }}>{selectedRoom.roomName}</Title>
                            <Text type="secondary"><ClockCircleOutlined /> {selectedRoom.time}</Text>
                        </div>

                        <Row gutter={24}>
                            <Col span={12}>
                                <Title level={5}>Thông tin Kết nối (Zoom API)</Title>
                                <Space direction="vertical" style={{ width: '100%' }}>
                                    <div>
                                        <Text type="secondary">Meeting ID</Text>
                                        <Input 
                                            value={selectedRoom.zoomData.meetingId} 
                                            readOnly 
                                            addonAfter={<CopyOutlined style={{ cursor: 'pointer' }} onClick={() => handleCopy(selectedRoom.zoomData.meetingId)} />} 
                                        />
                                    </div>
                                    <div>
                                        <Text type="secondary">Passcode</Text>
                                        <Input 
                                            value={selectedRoom.zoomData.passcode} 
                                            readOnly 
                                            addonAfter={<CopyOutlined style={{ cursor: 'pointer' }} onClick={() => handleCopy(selectedRoom.zoomData.passcode)} />} 
                                        />
                                    </div>
                                    <div>
                                        <Text type="secondary">Link tham gia (Dành cho Bệnh nhân)</Text>
                                        <Input 
                                            value={selectedRoom.zoomData.joinUrl} 
                                            readOnly 
                                            addonAfter={<CopyOutlined style={{ cursor: 'pointer' }} onClick={() => handleCopy(selectedRoom.zoomData.joinUrl)} />} 
                                        />
                                    </div>
                                </Space>
                            </Col>

                            <Col span={12}>
                                <Title level={5}>Danh sách Tham gia</Title>
                                <List
                                    size="small"
                                    dataSource={selectedRoom.participants}
                                    renderItem={(item: any) => (
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={<Avatar icon={<UserOutlined />} />}
                                                title={item.name}
                                                description={<Tag color={item.role === 'Host' ? 'red' : 'blue'}>{item.role}</Tag>}
                                            />
                                        </List.Item>
                                    )}
                                    style={{ border: '1px solid #f0f0f0', borderRadius: 8 }}
                                />
                                <Button type="dashed" block icon={<PlusOutlined />} style={{ marginTop: 12 }} onClick={() => setAddParticipantOpen(true)}>
                                    Thêm người tham gia
                                </Button>
                            </Col>
                        </Row>

                        <Divider />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Button danger>Huỷ phòng</Button>
                            <Space>
                                <Button onClick={() => setConfigModalOpen(false)}>Đóng</Button>
                                <Button type="primary" style={{ background: '#1890ff' }} icon={<VideoCameraOutlined />} onClick={handleStartMeeting}>
                                    Bắt đầu Cuộc gọi (Start Meeting)
                                </Button>
                            </Space>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Add Participant Modal */}
            <Modal
                title="Thêm Người tham gia"
                open={addParticipantOpen}
                onCancel={() => setAddParticipantOpen(false)}
                onOk={() => form.submit()}
                okText="Gửi lời mời"
                cancelText="Huỷ"
                width={400}
                zIndex={1001}
            >
                <Form form={form} layout="vertical" onFinish={handleAddParticipant}>
                    <Form.Item name="name" label="Tên người tham gia" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
                        <Input placeholder="Ví dụ: Bs. Trần Văn C, Điều dưỡng Hoa..." />
                    </Form.Item>
                    <Form.Item name="role" label="Vai trò" initialValue="Khách mời">
                        <Select>
                            <Select.Option value="Khách mời">Khách mời</Select.Option>
                            <Select.Option value="Bác sĩ">Bác sĩ</Select.Option>
                            <Select.Option value="Điều dưỡng">Điều dưỡng</Select.Option>
                            <Select.Option value="Bệnh nhân">Bệnh nhân</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="email" label="Email nhận link Zoom (Tùy chọn)">
                        <Input placeholder="Email để hệ thống gửi tự động" />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Create Room Modal */}
            <Modal
                title="Tạo phòng Telemedicine mới"
                open={createRoomOpen}
                onCancel={() => setCreateRoomOpen(false)}
                onOk={() => createForm.submit()}
                okText="Tạo phòng"
                cancelText="Huỷ"
                width={500}
            >
                <Form form={createForm} layout="vertical" onFinish={handleCreateRoom}>
                    <Form.Item name="roomName" label="Tên phòng họp / Ca khám" rules={[{ required: true, message: 'Vui lòng nhập tên phòng' }]}>
                        <Input placeholder="Ví dụ: Khám Da liễu - Bệnh nhân A" />
                    </Form.Item>
                    <Form.Item name="host" label="Bác sĩ phụ trách (Host)" rules={[{ required: true, message: 'Vui lòng nhập tên bác sĩ' }]}>
                        <Input placeholder="Ví dụ: Bs. Nguyễn Văn A" />
                    </Form.Item>
                    <Form.Item name="time" label="Thời gian dự kiến">
                        <Input placeholder="Ví dụ: 15:00 - 16:00, 30/10/2023" />
                    </Form.Item>
                    <div style={{ background: '#e6f7ff', padding: 12, borderRadius: 8, marginTop: 16 }}>
                        <Text type="secondary" style={{ color: '#1890ff' }}>
                            <VideoCameraOutlined style={{ marginRight: 8 }} />
                            Hệ thống sẽ tự động gọi API Zoom để tạo Meeting ID và Mật khẩu sau khi bạn bấm Tạo phòng.
                        </Text>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}