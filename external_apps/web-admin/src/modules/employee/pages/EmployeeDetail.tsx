import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Descriptions, Button, Spin, message, Tag } from 'antd';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import api from '../../../services/api';

const EmployeeDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEmployee();
    }, [id]);

    const fetchEmployee = async () => {
        try {
            const res = await api.get(`/employees/${id}`);
            if (res.data.success) {
                setEmployee(res.data.data);
            }
        } catch (error: any) {
            message.error('Failed to fetch employee details');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>;
    }

    if (!employee) {
        return <div>Employee not found</div>;
    }

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/employees')}>
                    Back to Employees
                </Button>
            </div>

            <Card
                title={`${employee.firstName} ${employee.lastName}`}
                extra={
                    <Button type="primary" icon={<EditOutlined />} onClick={() => navigate(`/employees/${id}/edit`)}>
                        Edit
                    </Button>
                }
            >
                <Descriptions bordered column={2}>
                    <Descriptions.Item label="First Name">{employee.firstName}</Descriptions.Item>
                    <Descriptions.Item label="Last Name">{employee.lastName}</Descriptions.Item>
                    <Descriptions.Item label="Position">{employee.position}</Descriptions.Item>
                    <Descriptions.Item label="Department">
                        <Tag color="blue">{employee.department?.name || 'N/A'}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="User Account" span={2}>
                        {employee.user ? `${employee.user.fullName} (${employee.user.email})` : 'No linked account'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Created At">{new Date(employee.createdAt).toLocaleString()}</Descriptions.Item>
                    <Descriptions.Item label="Updated At">{new Date(employee.updatedAt).toLocaleString()}</Descriptions.Item>
                </Descriptions>
            </Card>
        </div>
    );
};

export default EmployeeDetail;
