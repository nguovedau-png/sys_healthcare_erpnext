import React, { useState } from 'react';
import { Table, Tag, Card, Button, Space, Modal, Form, Input, InputNumber, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useFrappeGetDocList, useFrappeCreateDoc, useFrappeUpdateDoc, useFrappeDeleteDoc } from 'frappe-react-sdk';
import type { FormProps } from 'antd';

const TagsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<any>(null);
  const [form] = Form.useForm();

  const { data, isLoading, mutate } = useFrappeGetDocList('Tag', {
    fields: ['name', 'tag_name', 'level', 'index'],
    limit: 100,
    orderBy: { field: 'index', order: 'asc' },
  });

  const createDoc = useFrappeCreateDoc();
  const updateDoc = useFrappeUpdateDoc();
  const deleteDoc = useFrappeDeleteDoc();

  const handleAdd = () => {
    setEditingTag(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: any) => {
    setEditingTag(record);
    form.setFieldsValue({
      tag_name: record.tag_name,
      level: record.level || 0,
      index: record.index || 0,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (name: string) => {
    try {
      await deleteDoc.deleteDoc('Tag', name);
      message.success('Tag deleted successfully');
      mutate();
    } catch (error) {
      message.error('Failed to delete tag');
    }
  };

  const handleSubmit: FormProps['onFinish'] = async (values) => {
    try {
      if (editingTag) {
        await updateDoc.updateDoc('Tag', editingTag.name, values);
        message.success('Tag updated successfully');
      } else {
        await createDoc.createDoc('Tag', values);
        message.success('Tag created successfully');
      }
      
      setIsModalOpen(false);
      form.resetFields();
      mutate();
    } catch (error) {
      message.error(editingTag ? 'Failed to update tag' : 'Failed to create tag');
    }
  };

  const columns = [
    {
      title: 'Tag Name',
      dataIndex: 'tag_name',
      key: 'tag_name',
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      render: (level: number) => <Tag color={level && level > 5 ? 'red' : 'green'}>{level || '-'}</Tag>,
    },
    {
      title: 'Index',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Delete Tag"
            description="Are you sure you want to delete this tag?"
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
      title="Tags Management" 
      bordered={false}
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Tag
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        rowKey="name"
        pagination={{ pageSize: 50 }}
      />

      <Modal
        title={editingTag ? 'Edit Tag' : 'Add Tag'}
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
            name="tag_name"
            label="Tag Name"
            rules={[{ required: true, message: 'Please enter tag name' }]}
          >
            <Input placeholder="Enter tag name" />
          </Form.Item>

          <Form.Item
            name="level"
            label="Level"
          >
            <InputNumber min={0} max={10} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="index"
            label="Index"
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={createDoc.loading || updateDoc.loading}>
                {editingTag ? 'Update' : 'Create'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default TagsPage;
