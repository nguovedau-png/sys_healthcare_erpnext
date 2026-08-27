import React, { useState } from 'react';
import { Table, Tag, Button, Space, Card, Modal, Form, Input, Select, DatePicker, message, Popconfirm } from 'antd';
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useFrappeGetDocList, useFrappeCreateDoc, useFrappeUpdateDoc, useFrappeDeleteDoc } from 'frappe-react-sdk';
import type { FormProps } from 'antd';

const TopicsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<any>(null);
  const [form] = Form.useForm();

  const { data, isLoading, mutate } = useFrappeGetDocList('Topic', {
    fields: ['name', 'topic_title', 'status', 'date', 'folder'],
    limit: 100,
    orderBy: { field: 'date', order: 'desc' },
  });

  const createDoc = useFrappeCreateDoc();
  const updateDoc = useFrappeUpdateDoc();
  const deleteDoc = useFrappeDeleteDoc();

  const handleAdd = () => {
    setEditingTopic(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: any) => {
    setEditingTopic(record);
    form.setFieldsValue({
      topic_title: record.topic_title,
      status: record.status || 'Draft',
      date: record.date ? new Date(record.date) : null,
      folder: record.folder,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (name: string) => {
    try {
      await deleteDoc.deleteDoc('Topic', name);
      message.success('Topic deleted successfully');
      mutate();
    } catch (error) {
      message.error('Failed to delete topic');
    }
  };

  const handleSubmit: FormProps['onFinish'] = async (values) => {
    try {
      const topicData = {
        ...values,
        date: values.date ? values.date.toISOString().split('T')[0] : null,
      };

      if (editingTopic) {
        await updateDoc.updateDoc('Topic', editingTopic.name, topicData);
        message.success('Topic updated successfully');
      } else {
        await createDoc.createDoc('Topic', topicData);
        message.success('Topic created successfully');
      }
      
      setIsModalOpen(false);
      form.resetFields();
      mutate();
    } catch (error) {
      message.error(editingTopic ? 'Failed to update topic' : 'Failed to create topic');
    }
  };

  const columns = [
    {
      title: 'Topic Title',
      dataIndex: 'topic_title',
      key: 'topic_title',
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors: any = { Draft: 'default', Published: 'green', Archived: 'orange' };
        return <Tag color={colors[status] || 'default'}>{status || 'Draft'}</Tag>;
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => date ? new Date(date).toLocaleDateString() : '-',
    },
    {
      title: 'Folder',
      dataIndex: 'folder',
      key: 'folder',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button type="text" icon={<EyeOutlined />} onClick={() => handleEdit(record)} />
          <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Delete Topic"
            description="Are you sure you want to delete this topic?"
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
      title="Topics Management" 
      bordered={false}
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Topic
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
        title={editingTopic ? 'Edit Topic' : 'Add Topic'}
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
            name="topic_title"
            label="Topic Title"
            rules={[{ required: true, message: 'Please enter topic title' }]}
          >
            <Input placeholder="Enter topic title" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select>
              <Select.Option value="Draft">Draft</Select.Option>
              <Select.Option value="Published">Published</Select.Option>
              <Select.Option value="Archived">Archived</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="date"
            label="Date"
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="folder"
            label="Folder"
          >
            <Input placeholder="Enter folder" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={createDoc.loading || updateDoc.loading}>
                {editingTopic ? 'Update' : 'Create'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default TopicsPage;
