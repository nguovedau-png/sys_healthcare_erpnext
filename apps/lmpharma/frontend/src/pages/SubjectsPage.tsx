import React, { useState } from 'react';
import { Table, Tag, Space, Button, Card, Modal, Form, Input, DatePicker, Switch, InputNumber, message, Popconfirm } from 'antd';
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useFrappeGetDocList, useFrappeCreateDoc, useFrappeUpdateDoc, useFrappeDeleteDoc } from 'frappe-react-sdk';
import type { FormProps } from 'antd';

const SubjectsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<any>(null);
  const [form] = Form.useForm();

  const { data, error, isLoading, mutate } = useFrappeGetDocList('Subject', {
    fields: ['name', 'title', 'type', 'publish_date', 'priority', 'hot_news', 'check_show'],
    limit: 100,
    orderBy: { field: 'publish_date', order: 'desc' },
  });

  const createDoc = useFrappeCreateDoc();
  const updateDoc = useFrappeUpdateDoc();
  const deleteDoc = useFrappeDeleteDoc();

  const handleAdd = () => {
    setEditingSubject(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: any) => {
    setEditingSubject(record);
    const publishDate = record.publish_date ? new Date(record.publish_date) : null;
    form.setFieldsValue({
      title: record.title,
      type: record.type,
      publish_date: publishDate && !isNaN(publishDate.getTime()) ? publishDate : null,
      priority: record.priority || 0,
      hot_news: record.hot_news ? true : false,
      check_show: record.check_show ? true : false,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (name: string) => {
    try {
      await deleteDoc.deleteDoc('Subject', name);
      message.success('Subject deleted successfully');
      mutate();
    } catch (error) {
      message.error('Failed to delete subject');
    }
  };

  const handleSubmit: FormProps['onFinish'] = async (values) => {
    try {
      const subjectData = {
        ...values,
        publish_date: values.publish_date ? values.publish_date.toISOString().split('T')[0] : null,
        hot_news: values.hot_news ? 1 : 0,
        check_show: values.check_show ? 1 : 0,
      };

      if (editingSubject) {
        await updateDoc.updateDoc('Subject', editingSubject.name, subjectData);
        message.success('Subject updated successfully');
      } else {
        await createDoc.createDoc('Subject', subjectData);
        message.success('Subject created successfully');
      }
      
      setIsModalOpen(false);
      form.resetFields();
      mutate();
    } catch (error) {
      message.error(editingSubject ? 'Failed to update subject' : 'Failed to create subject');
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag color="blue">{type || 'N/A'}</Tag>,
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: number) => <Tag color={priority && priority > 5 ? 'red' : 'green'}>{priority || '-'}</Tag>,
    },
    {
      title: 'Hot',
      dataIndex: 'hot_news',
      key: 'hot_news',
      render: (hot: number) => hot ? <Tag color="red">🔥 Hot</Tag> : '-',
    },
    {
      title: 'Published',
      dataIndex: 'check_show',
      key: 'check_show',
      render: (show: number) => show ? <Tag color="green">✓ Yes</Tag> : <Tag color="default">✗ No</Tag>,
    },
    {
      title: 'Publish Date',
      dataIndex: 'publish_date',
      key: 'publish_date',
      render: (date: string) => date ? new Date(date).toLocaleDateString() : '-',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="text" icon={<EyeOutlined />} onClick={() => handleEdit(record)} />
          <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Delete Subject"
            description="Are you sure you want to delete this subject?"
            onConfirm={() => handleDelete(record.name)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card 
      title="Subjects Management" 
      bordered={false}
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Subject
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        rowKey="name"
        pagination={{ pageSize: 20 }}
      />

      <Modal
        title={editingSubject ? 'Edit Subject' : 'Add Subject'}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter subject title' }]}
          >
            <Input placeholder="Enter subject title" />
          </Form.Item>

          <Form.Item
            name="type"
            label="Type"
          >
            <Input placeholder="Enter type" />
          </Form.Item>

          <Form.Item
            name="publish_date"
            label="Publish Date"
            rules={[
              {
                validator: (_, value) => {
                  if (!value || value.isValid()) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Invalid date'));
                }
              }
            ]}
          >
            <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item
            name="priority"
            label="Priority"
          >
            <InputNumber min={0} max={10} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="hot_news"
            label="Hot News"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="check_show"
            label="Published"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={createDoc.loading || updateDoc.loading}>
                {editingSubject ? 'Update' : 'Create'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default SubjectsPage;
