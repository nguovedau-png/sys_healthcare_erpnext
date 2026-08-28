import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, DatePicker, Form, Input, Modal, Row, Space, Statistic, Table, Tag, Typography, message } from 'antd';
import { CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined, PlusOutlined, ReloadOutlined, TeamOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs, { Dayjs } from 'dayjs';
import api from '../../../services/api';

const { Title, Text } = Typography;

type AppointmentStatus = 'pending' | 'confirmed' | 'checked_in' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';

interface Appointment {
  id: string;
  patient?: { id: string; fullName: string; phoneLast4: string };
  practitionerExternalId: string;
  startsAt: string;
  endsAt: string;
  status: AppointmentStatus;
  serviceCode: string;
  notes?: string;
}

interface QueueTicket {
  id: string;
  appointmentId: string;
  ticketNumber: number;
  priority: number;
  status: 'waiting' | 'called' | 'skipped' | 'completed' | string;
  appointment?: Appointment;
}

interface PaginatedResult<T> {
  data: T[];
  pagination?: { total?: number };
}

type ApiEnvelope<T> = { success?: boolean; data?: T | { data?: T[]; pagination?: { total?: number } } };
type ApiError = { response?: { data?: { message?: unknown } } };

function unwrap<T>(response: { data?: unknown }): PaginatedResult<T> {
  const body = response.data as ApiEnvelope<T> | T[] | undefined;
  const payload = body && !Array.isArray(body) && body.success ? body.data : body;
  if (Array.isArray(payload)) return { data: payload as T[] };
  if (payload && typeof payload === 'object') {
    const result = payload as { data?: unknown; pagination?: { total?: number } };
    return { data: Array.isArray(result.data) ? result.data as T[] : [], pagination: result.pagination };
  }
  return { data: [] };
}

function errorMessage(error: unknown, fallback: string) {
  if (error && typeof error === 'object' && 'response' in error) {
    const message = (error as ApiError).response?.data?.message;
    if (typeof message === 'string' && message.trim()) return message;
  }
  return fallback;
}

const NEXT_STATUS: Partial<Record<AppointmentStatus, AppointmentStatus>> = {
  pending: 'confirmed',
  confirmed: 'checked_in',
  checked_in: 'in_progress',
  in_progress: 'completed',
};

const statusColor: Record<string, string> = {
  pending: 'gold',
  confirmed: 'blue',
  checked_in: 'cyan',
  in_progress: 'processing',
  completed: 'green',
  cancelled: 'red',
  no_show: 'volcano',
  waiting: 'gold',
  examining: 'processing',
};

const statusLabel: Record<string, string> = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  checked_in: 'Đã check-in',
  in_progress: 'Đang khám',
  completed: 'Hoàn tất',
  cancelled: 'Đã hủy',
  no_show: 'Không đến',
  waiting: 'Đang chờ',
  called: 'Đã gọi',
  skipped: 'Bỏ qua',
};

const Operations: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [queueTickets, setQueueTickets] = useState<QueueTicket[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [form] = Form.useForm();

  const tenantId = import.meta.env.VITE_TENANT_ID || 'demo-tenant';
  const facilityId = import.meta.env.VITE_FACILITY_ID || 'demo-facility';

  const fetchQueues = useCallback(async () => {
    setLoading(true);
    try {
      const [appointmentResponse, queueResponse] = await Promise.all([
        api.get('/healthcare/appointments', { params: { tenantId, facilityId } }),
        api.get('/healthcare/queue', { params: { tenantId, facilityId } }),
      ]);
      setAppointments(unwrap<Appointment>(appointmentResponse).data);
      setQueueTickets(unwrap<QueueTicket>(queueResponse).data);
    } catch (error: unknown) {
      message.error(errorMessage(error, 'Không thể tải lịch hẹn và hàng đợi khám'));
    } finally {
      setLoading(false);
    }
  }, [tenantId, facilityId]);

  useEffect(() => {
    fetchQueues();
  }, [fetchQueues]);

  const handleCreateAppointment = async (values: { patientId: string; practitionerExternalId: string; serviceCode: string; startsAt?: Dayjs; endsAt?: Dayjs; notes?: string }) => {
    try {
      if (!values.startsAt || !values.endsAt) return;
      if (!values.endsAt.isAfter(values.startsAt)) {
        message.error('Thời gian kết thúc phải sau thời gian bắt đầu');
        return;
      }
      if (values.startsAt.isBefore(dayjs())) {
        message.error('Không thể tạo lịch hẹn trong quá khứ');
        return;
      }
      await api.post('/healthcare/appointments', {
        tenantId,
        facilityId,
        patientId: values.patientId,
        practitionerExternalId: values.practitionerExternalId,
        serviceCode: values.serviceCode,
        startsAt: values.startsAt.toISOString(),
        endsAt: values.endsAt.toISOString(),
        notes: values.notes,
        idempotencyKey: crypto.randomUUID(),
      });
      message.success('Đã tạo lịch hẹn');
      setAppointmentModalOpen(false);
      form.resetFields();
      await fetchQueues();
    } catch (error: unknown) {
      message.error(errorMessage(error, 'Không thể tạo lịch hẹn'));
    }
  };

  const advanceAppointment = async (appointment: Appointment) => {
    const next = NEXT_STATUS[appointment.status];
    if (!next) return;
    try {
      if (next === 'checked_in') {
        await api.post(`/healthcare/appointments/${appointment.id}/check-in`, { priority: 0 });
      } else {
        await api.post(`/healthcare/appointments/${appointment.id}/transition`, { status: next });
      }
      message.success(`Đã chuyển lịch hẹn sang ${next}`);
      await fetchQueues();
    } catch (error: unknown) {
      message.error(errorMessage(error, 'Không thể chuyển trạng thái lịch hẹn'));
    }
  };

  const visibleAppointments = useMemo(() => appointments.filter((item) => {
    const haystack = `${item.patient?.fullName || ''} ${item.patient?.phoneLast4 || ''} ${item.practitionerExternalId} ${item.serviceCode}`.toLowerCase();
    return !search || haystack.includes(search.toLowerCase());
  }), [appointments, search]);
  const waitingCount = useMemo(() => queueTickets.filter((item) => item.status === 'waiting').length, [queueTickets]);
  const todayCount = useMemo(() => appointments.filter((item) => dayjs(item.startsAt).isSame(dayjs(), 'day')).length, [appointments]);
  const activeCount = useMemo(() => appointments.filter((item) => !['completed', 'cancelled', 'no_show'].includes(item.status)).length, [appointments]);

  const appointmentColumns: ColumnsType<Appointment> = [
    { title: 'Bệnh nhân', key: 'patient', render: (_, record) => <Space direction="vertical" size={0}><Text strong>{record.patient?.fullName || 'Chưa có tên'}</Text><Text type="secondary">•••• {record.patient?.phoneLast4 || '----'}</Text></Space> },
    { title: 'Bác sĩ', dataIndex: 'practitionerExternalId', key: 'practitionerExternalId' },
    { title: 'Dịch vụ', dataIndex: 'serviceCode', key: 'serviceCode' },
    { title: 'Thời gian', dataIndex: 'startsAt', key: 'startsAt', render: (value?: string) => value ? dayjs(value).format('DD/MM/YYYY HH:mm') : '-' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: (value: string) => <Tag color={statusColor[value] || 'default'}>{statusLabel[value] || value.replace('_', ' ')}</Tag> },
    { title: 'Thao tác', key: 'actions', render: (_, record) => NEXT_STATUS[record.status] ? <Button size="small" type="link" onClick={() => advanceAppointment(record)}>Sang {statusLabel[NEXT_STATUS[record.status]!] || NEXT_STATUS[record.status]?.replace('_', ' ')}</Button> : <Text type="secondary">Đã kết thúc</Text> },
  ];

  const queueColumns: ColumnsType<QueueTicket> = [
    { title: 'Số thứ tự', dataIndex: 'ticketNumber', key: 'ticketNumber', render: (value: number) => <Text strong>#{value}</Text> },
    { title: 'Bệnh nhân', key: 'patient', render: (_, record) => record.appointment?.patient?.fullName || 'Chưa có tên' },
    { title: 'Dịch vụ', key: 'service', render: (_, record) => record.appointment?.serviceCode || '-' },
    { title: 'Ưu tiên', dataIndex: 'priority', key: 'priority' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: (value: string) => <Tag color={statusColor[value] || 'default'}>{statusLabel[value] || value}</Tag> },
  ];

  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>Vận hành phòng khám</Title>
            <Text type="secondary">Hàng đợi khám, lịch hẹn và điều phối bệnh nhân</Text>
          </div>
          <Space>
            <Button icon={<ReloadOutlined />} onClick={fetchQueues} loading={loading}>Làm mới</Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setAppointmentModalOpen(true)}>Tạo lịch hẹn</Button>
          </Space>
        </div>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}><Card><Statistic title="Lịch hẹn hôm nay" value={todayCount} prefix={<CalendarOutlined />} /></Card></Col>
          <Col xs={24} sm={8}><Card><Statistic title="Đang xử lý" value={activeCount} prefix={<ClockCircleOutlined />} valueStyle={{ color: '#1677ff' }} /></Card></Col>
          <Col xs={24} sm={8}><Card><Statistic title="Đang chờ khám" value={waitingCount} prefix={<TeamOutlined />} valueStyle={{ color: '#d48806' }} /></Card></Col>
        </Row>

        <Card title="Lịch hẹn" extra={<Input.Search allowClear placeholder="Tìm bệnh nhân, bác sĩ..." style={{ width: 'min(280px, 100%)' }} onChange={(event) => setSearch(event.target.value)} onSearch={setSearch} /> }>
          <Table rowKey="id" columns={appointmentColumns} dataSource={visibleAppointments} loading={loading} scroll={{ x: 900 }} pagination={{ pageSize: 10 }} locale={{ emptyText: 'Chưa có lịch hẹn' }} />
        </Card>

        <Card title={<Space><CheckCircleOutlined /> Hàng đợi tiếp nhận</Space>}>
          <Table rowKey="id" columns={queueColumns} dataSource={queueTickets} loading={loading} scroll={{ x: 800 }} pagination={{ pageSize: 10 }} locale={{ emptyText: 'Chưa có bệnh nhân trong hàng đợi' }} />
        </Card>
      </Space>

      <Modal title="Tạo lịch hẹn" open={appointmentModalOpen} onCancel={() => setAppointmentModalOpen(false)} onOk={() => form.submit()} okText="Tạo lịch hẹn" cancelText="Hủy" confirmLoading={loading} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={handleCreateAppointment} initialValues={{ startsAt: dayjs().add(1, 'hour'), endsAt: dayjs().add(1, 'hour').add(30, 'minute') }}>
          <Row gutter={16}>
            <Col xs={24} sm={12}><Form.Item name="patientId" label="Mã bệnh nhân" rules={[{ required: true }]}><Input placeholder="patient-id" /></Form.Item></Col>
            <Col xs={24} sm={12}><Form.Item name="practitionerExternalId" label="Mã bác sĩ" rules={[{ required: true }]}><Input placeholder="doctor-id" /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12}><Form.Item name="serviceCode" label="Mã dịch vụ" rules={[{ required: true }]}><Input placeholder="general-checkup" /></Form.Item></Col>
            <Col xs={24} sm={12}><Form.Item name="startsAt" label="Bắt đầu" rules={[{ required: true, message: 'Chọn thời gian bắt đầu' }]}><DatePicker showTime format="DD/MM/YYYY HH:mm" disabledDate={(date) => date.isBefore(dayjs().startOf('day'))} style={{ width: '100%' }} /></Form.Item></Col>
          </Row>
          <Form.Item name="endsAt" label="Kết thúc" rules={[{ required: true, message: 'Chọn thời gian kết thúc' }]}><DatePicker showTime format="DD/MM/YYYY HH:mm" disabledDate={(date) => date.isBefore(dayjs().startOf('day'))} style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="notes" label="Ghi chú"><Input.TextArea rows={3} maxLength={1000} showCount /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Operations;
