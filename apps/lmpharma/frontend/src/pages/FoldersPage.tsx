import React, { useState } from 'react';
import { Table, Tag, Button, Space, Card, Modal, Form, Input, InputNumber, Switch, message, Popconfirm } from 'antd';
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined, FolderOutlined } from '@ant-design/icons';
import { useFrappeGetDocList, useFrappeCreateDoc, useFrappeUpdateDoc, useFrappeDeleteDoc } from 'frappe-react-sdk';
import type { FormProps } from 'antd';

const FoldersPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFolder, setEditingFolder] = useState<any>(null);
  const [form] = Form.useForm();

  const { data, isLoading, mutate } = useFrappeGetDocList('Folder', {
    fields: ['name', 'folder_name', 'parent_folder', 'order', 'status', 'path'],
    limit: 100,
    orderBy: { field: 'order', order: 'asc' },
  });

  const createDoc = useFrappeCreateDoc();
  const updateDoc = useFrappeUpdateDoc();
  const deleteDoc = useFrappeDeleteDoc();

  const handleAdd = () => {
    setEditingFolder(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: any) => {
    setEditingFolder(record);
    form.setFieldsValue({
      folder_name: record.folder_name,
      parent_folder: record.parent_folder,
      order: record.order || 0,
      status: record.status ? true : false,
      path: record.path,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (name: string) => {
    try {
      await deleteDoc.deleteDoc('Folder', name);
      message.success('Folder deleted successfully');
      mutate();
    } catch (error) {
      message.error('Failed to delete folder');
    }
  };

  const handleSubmit: FormProps['onFinish'] = async (values) => {
    try {
      const folderData = {
        ...values,
        status: values.status ? 1 : 0,
      };

      if (editingFolder) {
        await updateDoc.updateDoc('Folder', editingFolder.name, folderData);
        message.success('Folder updated successfully');
      } else {
        await createDoc.createDoc('Folder', folderData);
        message.success('Folder created successfully');
      }
      
      setIsModalOpen(false);
      form.resetFields();
      mutate();
    } catch (error) {
      message.error(editingFolder ? 'Failed to update folder' : 'Failed to create folder');
    }
  };

  const columns = [
    {
      title: 'Folder Name',
      dataIndex: 'folder_name',
      key: 'folder_name',
      render: (text: string) => <strong><FolderOutlined /> {text}</strong>,
    },
    {
      title: 'Parent',
      dataIndex: 'parent_folder',
      key: 'parent_folder',
      render: (parent: string) => parent || 'Root',
    },
    {
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => status ? <Tag color="green">Active</Tag> : <Tag color="default">Inactive</Tag>,
    },
    {
      title: 'Path',
      dataIndex: 'path',
      key: 'path',
      ellipsis: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button type="text" icon={<EyeOutlined />} onClick={() => handleEdit(record)} />
          <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Delete Folder"
            description="Are you sure you want to delete this folder?"
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
      title="Folders Management" 
      bordered={false}
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Folder
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
        title={editingFolder ? 'Edit Folder' : 'Add Folder'}
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
            name="folder_name"
            label="Folder Name"
            rules={[{ required: true, message: 'Please enter folder name' }]}
          >
            <Input placeholder="Enter folder name" />
          </Form.Item>

          <Form.Item
            name="parent_folder"
            label="Parent Folder"
          >
            <Input placeholder="Enter parent folder (leave empty for root)" />
          </Form.Item>

          <Form.Item
            name="order"
            label="Order"
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="path"
            label="Path"
          >
            <Input placeholder="Enter path" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={createDoc.loading || updateDoc.loading}>
                {editingFolder ? 'Update' : 'Create'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default FoldersPage;
