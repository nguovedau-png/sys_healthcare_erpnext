'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Card, Input, Pagination, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface FetchParams {
  page: number;
  limit: number;
  search: string;
}

interface FetchResult<T> {
  data: T[];
  total: number;
}

interface DataTableProps<T extends object> {
  columns: ColumnsType<T>;
  fetchData: (params: FetchParams) => Promise<FetchResult<T>>;
  title?: string;
  searchPlaceholder?: string;
}

export default function DataTable<T extends object>({ columns, fetchData, title, searchPlaceholder = 'Tìm kiếm...' }: DataTableProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchData({ page, limit, search });
      setData(result.data);
      setTotal(result.total);
    } finally {
      setLoading(false);
    }
  }, [fetchData, limit, page, search]);

  useEffect(() => { void load(); }, [load]);

  return (
    <Card title={title}>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Input.Search
          allowClear
          placeholder={searchPlaceholder}
          onSearch={(value) => { setPage(1); setSearch(value.trim()); }}
          style={{ maxWidth: 420 }}
        />
        <Table<T> rowKey={(record) => String((record as { id?: string | number }).id ?? JSON.stringify(record))} columns={columns} dataSource={data} loading={loading} pagination={false} scroll={{ x: 'max-content' }} />
        <Pagination current={page} pageSize={limit} total={total} showSizeChanger={false} onChange={setPage} />
      </Space>
    </Card>
  );
}
