import React from 'react';
import CommonInfo from '../common/CommonInfo';
import ProfileTab from './ProfileTabExtended';
import { Button, Card, Typography, Space } from 'antd';
import { EditOutlined, GlobalOutlined, TeamOutlined, BarChartOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface UserProfileProps {
    data: any;
}

const UserProfile: React.FC<UserProfileProps> = ({ data }) => {
    // This profile is for organizations or units like REP, DM, RSM, or Pharma companies
    return (
        <div className="bg-gray-50 min-h-screen pb-16 pt-8">
            <div className="container mx-auto px-4">
                {/* Main Header Card */}
                <Card 
                    className="mb-8 border-0 shadow-sm overflow-hidden" 
                    style={{ borderRadius: 24 }}
                    bodyStyle={{ padding: '32px' }}
                >
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-center">
                        <div className="xl:col-span-8">
                            <CommonInfo data={data} likeCount={data.statistic?.like || 0} />
                        </div>
                        <div className="xl:col-span-4 flex justify-center xl:justify-end">
                            <Space size="middle">
                                <Button type="primary" icon={<EditOutlined />} size="large" shape="round">
                                    Chỉnh sửa hồ sơ
                                </Button>
                            </Space>
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    {/* Left Content: Tabs */}
                    <div className="xl:col-span-8">
                        <Card 
                            className="border-0 shadow-sm" 
                            style={{ borderRadius: 24 }}
                            bodyStyle={{ padding: '24px' }}
                        >
                            <ProfileTab data={data} />
                        </Card>
                    </div>

                    {/* Right Content: Organization Info */}
                    <div className="xl:col-span-4 space-y-8">
                        <Card 
                            className="border-0 shadow-sm" 
                            title={<span className="text-lg font-bold">Thông tin tổ chức</span>}
                            style={{ borderRadius: 24 }}
                        >
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                                    <GlobalOutlined className="text-blue-500 text-xl" />
                                    <div>
                                        <Text type="secondary" className="block text-xs uppercase font-bold tracking-wider">Khu vực quản lý</Text>
                                        <Text className="font-semibold text-gray-800">{data.region || 'Toàn quốc'}</Text>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                                    <TeamOutlined className="text-purple-500 text-xl" />
                                    <div>
                                        <Text type="secondary" className="block text-xs uppercase font-bold tracking-wider">Quy mô nhân sự</Text>
                                        <Text className="font-semibold text-gray-800">{data.teamSize || 'Chưa cập nhật'}</Text>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                                    <BarChartOutlined className="text-green-500 text-xl" />
                                    <div>
                                        <Text type="secondary" className="block text-xs uppercase font-bold tracking-wider">Lĩnh vực hoạt động</Text>
                                        <Text className="font-semibold text-gray-800">{data.field || 'Y tế / Dược phẩm'}</Text>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card 
                            className="border-0 shadow-sm bg-gradient-to-br from-blue-600 to-indigo-700 text-white" 
                            style={{ borderRadius: 24 }}
                        >
                            <div className="text-center py-4">
                                <Title level={4} className="text-white mb-2">Đối tác tin cậy</Title>
                                <Text className="text-blue-100">Profile của bạn được xác thực bởi hệ thống Healthcare SaaS.</Text>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
