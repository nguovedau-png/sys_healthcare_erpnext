"use client";

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Input, Button, Badge, Modal, Form, Select, Space, Tag, message, Avatar, Divider, Tabs, Table, List, Radio, Steps, Empty, InputNumber, Carousel } from 'antd';
import { 
    ShoppingCartOutlined, SearchOutlined, PlusOutlined, DeleteOutlined, ShopOutlined, 
    TagsOutlined, FireFilled, EyeOutlined, HistoryOutlined, CheckCircleFilled, 
    CreditCardOutlined, CarOutlined, BankOutlined, WalletOutlined, RetweetOutlined
} from '@ant-design/icons';
import shopService, { Product, Category } from '@/services/shop.service';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const getFallbackProducts = () => [
    { id: 1, name: 'Paracetamol 500mg (Hộp 5 vỉ x 10 viên)', category: { name: 'Thuốc không kê đơn' }, price: 25000, oldPrice: 30000, stock: 150, image: 'https://via.placeholder.com/300?text=Paracetamol', description: 'Giảm đau, hạ sốt nhanh chóng và an toàn.' },
    { id: 2, name: 'Amlodipin 5mg (Hộp 30 viên)', category: { name: 'Thuốc kê đơn' }, price: 45000, oldPrice: 45000, stock: 50, image: 'https://via.placeholder.com/300?text=Amlodipin', description: 'Điều trị tăng huyết áp và đau thắt ngực.' },
    { id: 3, name: 'Vitamin C 500mg Domesco', category: { name: 'Thực phẩm chức năng' }, price: 60000, oldPrice: 75000, stock: 200, image: 'https://via.placeholder.com/300?text=Vitamin+C', description: 'Tăng cường sức đề kháng, chống oxy hoá.' },
    { id: 4, name: 'Khẩu trang y tế 4 lớp (Hộp 50 cái)', category: { name: 'Vật tư y tế' }, price: 35000, oldPrice: 50000, stock: 500, image: 'https://via.placeholder.com/300?text=Khau+Trang', description: 'Kháng khuẩn, lọc bụi mịn hiệu quả 99%.' },
    { id: 5, name: 'Nước muối sinh lý 0.9% 500ml', category: { name: 'Vật tư y tế' }, price: 5000, oldPrice: 6000, stock: 1000, image: 'https://via.placeholder.com/300?text=Nuoc+Muoi', description: 'Làm sạch vết thương, súc miệng, rửa mũi.' },
    { id: 6, name: 'Siro ho bổ phế Nam Hà', category: { name: 'Thuốc không kê đơn' }, price: 32000, oldPrice: 35000, stock: 80, image: 'https://via.placeholder.com/300?text=Siro+Ho', description: 'Giảm ho, tiêu đờm, bổ phổi từ thảo dược.' },
    { id: 7, name: 'Máy đo huyết áp Omron', category: { name: 'Thiết bị y tế' }, price: 850000, oldPrice: 950000, stock: 20, image: 'https://via.placeholder.com/300?text=Omron', description: 'Đo huyết áp bắp tay tự động, chính xác cao.' },
    { id: 8, name: 'Que thử đường huyết Accu-Chek', category: { name: 'Vật tư y tế' }, price: 250000, oldPrice: 280000, stock: 100, image: 'https://via.placeholder.com/300?text=Accu-Chek', description: 'Hộp 50 que thử, dùng cho máy Accu-Chek Active.' },
];

export default function MarketPage() {
    const [activeTab, setActiveTab] = useState('1');
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<number | 'All'>('All');
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<any[]>(getFallbackProducts());
    
    // States
    const [cart, setCart] = useState<any[]>([]);
    const [recentlyViewedIds, setRecentlyViewedIds] = useState<number[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    
    // Order Modal State
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    
    // Quick Buy State
    const [quickBuyQuantities, setQuickBuyQuantities] = useState<Record<number, number>>({});
    const [quickBuySearch, setQuickBuySearch] = useState('');
    
    // Order Filter State
    const [orderTab, setOrderTab] = useState('All');

    const [form] = Form.useForm();

    // Load from Local Storage on Mount
    useEffect(() => {
        try {
            const lCart = localStorage.getItem('ehr_market_cart');
            const lViews = localStorage.getItem('ehr_market_views');
            const lOrders = localStorage.getItem('ehr_market_orders');
            if (lCart) setCart(JSON.parse(lCart));
            if (lViews) setRecentlyViewedIds(JSON.parse(lViews));
            if (lOrders) setOrders(JSON.parse(lOrders));
        } catch (e) {}

        const fetchData = async () => {
            try {
                const [cats, prods] = await Promise.all([ shopService.getCategories(), shopService.getProducts() ]);
                if (cats?.length) setCategories(cats);
                if (prods?.length) setProducts(prods);
            } catch (e) { console.error('Failed to fetch shop data:', e); }
        };
        fetchData();
    }, []);

    // Sync state to LocalStorage
    useEffect(() => { localStorage.setItem('ehr_market_cart', JSON.stringify(cart)); }, [cart]);
    useEffect(() => { localStorage.setItem('ehr_market_views', JSON.stringify(recentlyViewedIds)); }, [recentlyViewedIds]);
    useEffect(() => { localStorage.setItem('ehr_market_orders', JSON.stringify(orders)); }, [orders]);

    // Helpers
    const filteredProducts = products.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchCategory = categoryFilter === 'All' || p.categoryId === categoryFilter || p.category?.name === categoryFilter;
        return matchSearch && matchCategory;
    });

    const viewedProducts = recentlyViewedIds.map(id => products.find(p => p.id === id)).filter(Boolean);

    const handleViewDetail = (product: any) => {
        setSelectedProduct(product);
        setIsDetailModalOpen(true);
        if (!recentlyViewedIds.includes(product.id)) {
            setRecentlyViewedIds(prev => [product.id, ...prev].slice(0, 8)); // keep last 8
        }
    };

    const addToCart = (product: any, qty: number = 1) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + qty } : item);
            }
            return [...prev, { ...product, quantity: qty }];
        });
        message.success(`Đã thêm ${qty} ${product.name} vào giỏ hàng`);
    };

    const updateCartQty = (id: number, qty: number) => {
        setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, qty) } : item));
    };

    const removeFromCart = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    const handleQuickBuyAddToCart = () => {
        let added = 0;
        Object.entries(quickBuyQuantities).forEach(([idStr, qty]) => {
            if (qty > 0) {
                const prod = products.find(p => p.id === Number(idStr));
                if (prod) {
                    addToCart(prod, qty);
                    added += qty;
                }
            }
        });
        if (added > 0) {
            setQuickBuyQuantities({});
            setActiveTab('3'); // Go to cart
        } else {
            message.warning("Vui lòng chọn số lượng sản phẩm!");
        }
    };

    const handleCheckout = (values: any) => {
        if (cart.length === 0) {
            message.error("Giỏ hàng đang trống!");
            return;
        }
        const newOrder = {
            id: `ORD-${Date.now()}`,
            items: [...cart],
            total: cartTotal,
            address: values.address,
            phone: values.phone,
            paymentMethod: values.paymentMethod,
            status: 'Processing',
            date: new Date().toISOString()
        };
        setOrders(prev => [newOrder, ...prev]);
        setCart([]);
        message.success({ content: "Đặt hàng thành công!", icon: <CheckCircleFilled style={{ color: '#52c41a' }} /> });
        form.resetFields();
        setActiveTab('4'); // go to orders
    };

    const handleReorder = (orderItems: any[]) => {
        const newCart = [...cart];
        orderItems.forEach(item => {
            const existing = newCart.find(c => c.id === item.id);
            if (existing) {
                existing.quantity += item.quantity;
            } else {
                newCart.push({ ...item });
            }
        });
        setCart(newCart);
        message.success("Đã thêm các sản phẩm trong đơn hàng cũ vào giỏ!");
        setActiveTab('3');
    };

    // --- RENDER COMPONENTS ---

    const renderStoreFront = () => (
        <div className="store-front">
            {/* Banner Khuyến mãi */}
            <Card bodyStyle={{ padding: 0 }} style={{ marginBottom: 24, borderRadius: 12, overflow: 'hidden', border: 'none' }}>
                <div style={{ background: 'linear-gradient(90deg, #1890ff 0%, #0050b3 100%)', padding: 40, color: 'white', position: 'relative' }}>
                    <FireFilled style={{ fontSize: 120, position: 'absolute', right: 40, top: 0, opacity: 0.2, color: '#faad14' }} />
                    <Title level={1} style={{ color: 'white', margin: 0 }}>FLASH SALE DƯỢC PHẨM</Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 18, display: 'block', marginTop: 12 }}>
                        Chiết khấu cực khủng lên tới 30% cho các nhóm Thuốc Hô hấp và Vật tư y tế phòng dịch.
                    </Text>
                </div>
            </Card>

            {/* Filters */}
            <div style={{ marginBottom: 24, display: 'flex', gap: 16 }}>
                <Input.Search 
                    placeholder="Tìm kiếm sản phẩm, hoạt chất..." 
                    size="large" 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{ maxWidth: 400 }}
                />
                <Select 
                    size="large" 
                    defaultValue="All" 
                    value={categoryFilter}
                    onChange={setCategoryFilter}
                    style={{ width: 200 }}
                >
                    <Option value="All">Tất cả danh mục</Option>
                    <Option value="Thuốc không kê đơn">Thuốc không kê đơn</Option>
                    <Option value="Thuốc kê đơn">Thuốc kê đơn</Option>
                    <Option value="Thực phẩm chức năng">Thực phẩm chức năng</Option>
                    <Option value="Vật tư y tế">Vật tư y tế</Option>
                    <Option value="Thiết bị y tế">Thiết bị y tế</Option>
                </Select>
            </div>

            {/* Products Grid */}
            <Row gutter={[24, 24]}>
                {filteredProducts.length > 0 ? filteredProducts.map(product => (
                    <Col xs={24} sm={12} md={8} lg={6} xl={6} key={product.id}>
                        <Card 
                            hoverable
                            cover={<img alt={product.name} src={product.image} style={{ height: 200, objectFit: 'cover' }} onClick={() => handleViewDetail(product)} />}
                            bodyStyle={{ padding: 16, display: 'flex', flexDirection: 'column', height: 180 }}
                            style={{ borderRadius: 8, overflow: 'hidden' }}
                        >
                            <Tag color="blue" style={{ width: 'fit-content', marginBottom: 8, fontSize: 10 }}>{product.category?.name || product.category}</Tag>
                            <Text strong ellipsis={{ tooltip: product.name }} style={{ fontSize: 14, marginBottom: 8, flex: 1, cursor: 'pointer' }} onClick={() => handleViewDetail(product)}>
                                {product.name}
                            </Text>
                            
                            <div>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                                    <Text strong style={{ color: '#ff4d4f', fontSize: 16 }}>{product.price.toLocaleString()}đ</Text>
                                    {product.oldPrice && product.oldPrice > product.price && (
                                        <Text delete type="secondary" style={{ fontSize: 12 }}>{product.oldPrice.toLocaleString()}đ</Text>
                                    )}
                                </div>
                                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                                    <Button icon={<EyeOutlined />} onClick={() => handleViewDetail(product)} />
                                    <Button type="primary" ghost icon={<ShoppingCartOutlined />} onClick={() => addToCart(product)} style={{ flex: 1 }}>Thêm</Button>
                                </div>
                            </div>
                        </Card>
                    </Col>
                )) : (
                    <Col span={24}><Empty description="Không tìm thấy sản phẩm" /></Col>
                )}
            </Row>

            {/* Recently Viewed */}
            {viewedProducts.length > 0 && (
                <div style={{ marginTop: 40 }}>
                    <Title level={4}><HistoryOutlined /> Sản phẩm vừa xem</Title>
                    <Row gutter={16} style={{ overflowX: 'auto', flexWrap: 'nowrap', paddingBottom: 16 }}>
                        {viewedProducts.map(p => (
                            <Col key={p.id} style={{ flex: '0 0 250px' }}>
                                <Card hoverable size="small" cover={<img src={p.image} style={{ height: 120, objectFit: 'cover' }} onClick={() => handleViewDetail(p)} />}>
                                    <Text strong ellipsis>{p.name}</Text>
                                    <div style={{ color: '#ff4d4f', fontWeight: 'bold' }}>{p.price.toLocaleString()}đ</div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            )}
        </div>
    );

    const renderQuickBuy = () => {
        const qbProducts = products.filter(p => p.name.toLowerCase().includes(quickBuySearch.toLowerCase()));
        
        return (
            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <Title level={4} style={{ margin: 0 }}>Mua Hàng Loạt (Dành cho Phòng khám / Nhà thuốc)</Title>
                    <Input.Search 
                        placeholder="Tìm tên thuốc nhanh..." 
                        style={{ width: 300 }} 
                        value={quickBuySearch}
                        onChange={e => setQuickBuySearch(e.target.value)}
                        allowClear
                    />
                </div>
                
                <Table
                    dataSource={qbProducts}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    columns={[
                        {
                            title: 'Sản phẩm',
                            dataIndex: 'name',
                            render: (text, record) => (
                                <Space>
                                    <Avatar src={record.image} shape="square" />
                                    <Text strong>{text}</Text>
                                </Space>
                            )
                        },
                        { title: 'Danh mục', dataIndex: 'category', render: c => c?.name || c },
                        { title: 'Đơn giá', dataIndex: 'price', render: p => <Text style={{ color: '#ff4d4f' }}>{p.toLocaleString()}đ</Text> },
                        {
                            title: 'Số lượng mua',
                            width: 150,
                            render: (_, record) => (
                                <InputNumber 
                                    min={0} 
                                    max={record.stock} 
                                    value={quickBuyQuantities[record.id] || 0}
                                    onChange={(val) => setQuickBuyQuantities(prev => ({ ...prev, [record.id]: val || 0 }))}
                                />
                            )
                        },
                        {
                            title: 'Thao tác',
                            width: 120,
                            render: (_, record) => (
                                <Button 
                                    type="primary" 
                                    ghost 
                                    icon={<PlusOutlined />} 
                                    onClick={() => {
                                        const qty = quickBuyQuantities[record.id] || 1;
                                        addToCart(record, qty);
                                        setQuickBuyQuantities(prev => ({ ...prev, [record.id]: 0 }));
                                    }}
                                >
                                    Thêm
                                </Button>
                            )
                        }
                    ]}
                />
                
                <div style={{ 
                    marginTop: 16, 
                    padding: 16, 
                    background: '#fafafa', 
                    border: '1px solid #f0f0f0', 
                    borderRadius: 8, 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    position: 'sticky',
                    bottom: 0,
                    zIndex: 10
                }}>
                    <Space size={24}>
                        <div>
                            <Text type="secondary" style={{ display: 'block' }}>Tổng số lượng trong giỏ:</Text>
                            <Text strong style={{ fontSize: 18 }}>{cartCount} sản phẩm</Text>
                        </div>
                        <div>
                            <Text type="secondary" style={{ display: 'block' }}>Tổng tiền tạm tính:</Text>
                            <Text strong style={{ fontSize: 20, color: '#ff4d4f' }}>{cartTotal.toLocaleString()}đ</Text>
                        </div>
                    </Space>
                    <Space>
                        <Button type="primary" size="large" icon={<ShoppingCartOutlined />} onClick={handleQuickBuyAddToCart}>
                            Thêm tất cả đã chọn vào giỏ
                        </Button>
                        <Button size="large" onClick={() => setActiveTab('3')} style={{ background: '#52c41a', color: 'white', borderColor: '#52c41a' }}>
                            Đến trang Thanh toán
                        </Button>
                    </Space>
                </div>
            </Card>
        );
    };

    const renderCartAndCheckout = () => (
        <Row gutter={32}>
            <Col xs={24} lg={14}>
                <Card title={<><ShoppingCartOutlined /> Giỏ hàng của bạn ({cartCount} sản phẩm)</>} style={{ marginBottom: 24 }}>
                    {cart.length > 0 ? (
                        <List
                            itemLayout="horizontal"
                            dataSource={cart}
                            renderItem={item => (
                                <List.Item actions={[ <Button type="text" danger icon={<DeleteOutlined />} onClick={() => removeFromCart(item.id)} /> ]}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.image} shape="square" size={80} />}
                                        title={<Text strong style={{ fontSize: 16 }}>{item.name}</Text>}
                                        description={
                                            <Space direction="vertical" size={4}>
                                                <Text style={{ color: '#ff4d4f', fontWeight: 'bold' }}>{item.price.toLocaleString()}đ</Text>
                                                <Space>
                                                    <Button size="small" onClick={() => updateCartQty(item.id, item.quantity - 1)}>-</Button>
                                                    <InputNumber value={item.quantity} onChange={(v) => updateCartQty(item.id, v || 1)} min={1} style={{ width: 60, textAlign: 'center' }} />
                                                    <Button size="small" onClick={() => updateCartQty(item.id, item.quantity + 1)}>+</Button>
                                                </Space>
                                            </Space>
                                        }
                                    />
                                    <div style={{ fontWeight: 'bold', fontSize: 16 }}>
                                        {(item.price * item.quantity).toLocaleString()}đ
                                    </div>
                                </List.Item>
                            )}
                        />
                    ) : (
                        <Empty description="Giỏ hàng trống" />
                    )}
                </Card>
            </Col>
            
            <Col xs={24} lg={10}>
                <Card title="Thông tin Thanh toán" style={{ background: '#fafafa' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                        <Text>Tạm tính:</Text>
                        <Text strong>{cartTotal.toLocaleString()}đ</Text>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                        <Text>Phí giao hàng:</Text>
                        <Text>Miễn phí</Text>
                    </div>
                    <Divider />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                        <Text strong style={{ fontSize: 18 }}>Tổng cộng:</Text>
                        <Text strong style={{ fontSize: 24, color: '#ff4d4f' }}>{cartTotal.toLocaleString()}đ</Text>
                    </div>

                    <Form form={form} layout="vertical" onFinish={handleCheckout}>
                        <Form.Item name="phone" label="Số điện thoại nhận hàng" rules={[{ required: true, message: 'Vui lòng nhập SĐT' }]}>
                            <Input size="large" placeholder="Nhập SĐT..." />
                        </Form.Item>
                        <Form.Item name="address" label="Địa chỉ giao hàng" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}>
                            <Input.TextArea rows={2} placeholder="Nhập địa chỉ nhà, tên đường, phường/xã..." />
                        </Form.Item>
                        
                        <Form.Item name="paymentMethod" label="Phương thức thanh toán" initialValue="COD" rules={[{ required: true }]}>
                            <Radio.Group style={{ width: '100%' }}>
                                <Space direction="vertical" style={{ width: '100%' }}>
                                    <Radio.Button value="COD" style={{ width: '100%', height: 'auto', padding: 12, display: 'flex', alignItems: 'center' }}>
                                        <CarOutlined style={{ marginRight: 8, fontSize: 18 }} /> Thanh toán khi nhận hàng (COD)
                                    </Radio.Button>
                                    <Radio.Button value="MOMO" style={{ width: '100%', height: 'auto', padding: 12, display: 'flex', alignItems: 'center' }}>
                                        <WalletOutlined style={{ marginRight: 8, fontSize: 18, color: '#d82d8b' }} /> Ví điện tử MoMo
                                    </Radio.Button>
                                    <Radio.Button value="ATM" style={{ width: '100%', height: 'auto', padding: 12, display: 'flex', alignItems: 'center' }}>
                                        <CreditCardOutlined style={{ marginRight: 8, fontSize: 18, color: '#1890ff' }} /> Thẻ ATM Nội địa / Visa
                                    </Radio.Button>
                                    <Radio.Button value="BANK" style={{ width: '100%', height: 'auto', padding: 12, display: 'flex', alignItems: 'center' }}>
                                        <BankOutlined style={{ marginRight: 8, fontSize: 18, color: '#52c41a' }} /> Chuyển khoản Ngân hàng
                                    </Radio.Button>
                                </Space>
                            </Radio.Group>
                        </Form.Item>

                        <Button type="primary" htmlType="submit" size="large" block style={{ background: '#ff4d4f', height: 50, fontSize: 16, marginTop: 16 }}>
                            ĐẶT HÀNG NGAY
                        </Button>
                    </Form>
                </Card>
            </Col>
        </Row>
    );

    const renderOrders = () => {
        const filteredOrders = orderTab === 'All' 
            ? orders 
            : orders.filter(o => {
                if (orderTab === 'Processing') return o.status === 'Processing';
                if (orderTab === 'Delivering') return o.status === 'Delivering';
                if (orderTab === 'Completed') return o.status === 'Completed';
                return true;
            });

        return (
            <div>
                <Title level={4}>Đơn hàng của tôi</Title>
                <Tabs 
                    activeKey={orderTab} 
                    onChange={setOrderTab} 
                    style={{ marginBottom: 24 }}
                    items={[
                        { key: 'All', label: 'Tất cả' },
                        { key: 'Processing', label: 'Đang chờ xử lý' },
                        { key: 'Delivering', label: 'Đang giao hàng' },
                        { key: 'Completed', label: 'Đã hoàn thành / Đã mua' },
                    ]}
                />

                {filteredOrders.length > 0 ? (
                    filteredOrders.map(order => (
                        <Card 
                            key={order.id} 
                            style={{ marginBottom: 16, borderRadius: 8, cursor: 'pointer' }}
                            onClick={() => { setSelectedOrder(order); setIsOrderModalOpen(true); }}
                            hoverable
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Space size={24}>
                                    <div>
                                        <Text type="secondary" style={{ fontSize: 12 }}>Mã đơn hàng</Text>
                                        <Title level={5} style={{ margin: 0 }}>{order.id}</Title>
                                    </div>
                                    <div>
                                        <Text type="secondary" style={{ fontSize: 12 }}>Ngày đặt</Text>
                                        <div style={{ fontWeight: 500 }}>{new Date(order.date).toLocaleString('vi-VN')}</div>
                                    </div>
                                    <div>
                                        <Text type="secondary" style={{ fontSize: 12 }}>Tổng tiền</Text>
                                        <div style={{ fontWeight: 'bold', color: '#ff4d4f' }}>{order.total.toLocaleString()}đ</div>
                                    </div>
                                </Space>
                                <Space>
                                    <Tag color={order.status === 'Processing' ? 'blue' : order.status === 'Delivering' ? 'orange' : 'green'}>
                                        {order.status === 'Processing' ? 'Đang xử lý' : order.status === 'Delivering' ? 'Đang giao' : 'Hoàn thành'}
                                    </Tag>
                                    <Button type="primary" ghost>Xem chi tiết</Button>
                                </Space>
                            </div>
                        </Card>
                    ))
                ) : (
                    <Empty description="Không có đơn hàng nào trong mục này" />
                )}
            </div>
        );
    };

    return (
        <div style={{ padding: 24, maxWidth: 1400, margin: '0 auto', paddingBottom: 60 }}>
            {/* Header Area */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <Title level={2} style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
                        <ShopOutlined style={{ color: '#1890ff' }} /> Siêu thị Thuốc Trực tuyến
                    </Title>
                    <Text type="secondary">Nguồn cung cấp dược phẩm, thực phẩm chức năng chính hãng, giá tốt.</Text>
                </div>
                
                <Space size={16}>
                    <Badge count={orders.length} showZero>
                        <Button size="large" onClick={() => setActiveTab('4')} icon={<HistoryOutlined />}>
                            Đơn hàng
                        </Button>
                    </Badge>
                    <Badge count={cartCount} showZero>
                        <Button 
                            type="primary" 
                            size="large" 
                            icon={<ShoppingCartOutlined />} 
                            onClick={() => setActiveTab('3')}
                            style={{ background: '#ff4d4f', borderColor: '#ff4d4f' }}
                        >
                            Giỏ hàng
                        </Button>
                    </Badge>
                </Space>
            </div>

            {/* Main Tabs */}
            <Tabs 
                activeKey={activeTab} 
                onChange={setActiveTab} 
                size="large"
                type="card"
                items={[
                    { key: '1', label: <span style={{ padding: '0 16px' }}><ShopOutlined /> Cửa hàng</span>, children: renderStoreFront() },
                    { key: '2', label: <span style={{ padding: '0 16px' }}><TagsOutlined /> Mua Nhanh (Sỉ)</span>, children: renderQuickBuy() },
                    { key: '3', label: <span style={{ padding: '0 16px' }}><ShoppingCartOutlined /> Giỏ hàng & Thanh toán</span>, children: renderCartAndCheckout() },
                    { key: '4', label: <span style={{ padding: '0 16px' }}><CarOutlined /> Đơn hàng của tôi</span>, children: renderOrders() },
                ]}
            />

            {/* Product Detail Modal */}
            <Modal
                title="Chi tiết sản phẩm"
                open={isDetailModalOpen}
                onCancel={() => setIsDetailModalOpen(false)}
                footer={null}
                width={800}
            >
                {selectedProduct && (
                    <Row gutter={24}>
                        <Col span={10}>
                            <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '100%', borderRadius: 8, border: '1px solid #f0f0f0' }} />
                        </Col>
                        <Col span={14}>
                            <Title level={3}>{selectedProduct.name}</Title>
                            <Tag color="blue" style={{ marginBottom: 16 }}>{selectedProduct.category?.name || selectedProduct.category}</Tag>
                            
                            <div style={{ background: '#fafafa', padding: 16, borderRadius: 8, marginBottom: 16 }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                                    <Text strong style={{ color: '#ff4d4f', fontSize: 24 }}>{selectedProduct.price.toLocaleString()}đ</Text>
                                    {selectedProduct.oldPrice && selectedProduct.oldPrice > selectedProduct.price && (
                                        <Text delete type="secondary" style={{ fontSize: 16 }}>{selectedProduct.oldPrice.toLocaleString()}đ</Text>
                                    )}
                                </div>
                                <Text type="success" strong style={{ display: 'block', marginTop: 8 }}><CheckCircleFilled /> Còn hàng ({selectedProduct.stock} sản phẩm)</Text>
                            </div>

                            <Paragraph>
                                {selectedProduct.description || "Chưa có mô tả chi tiết cho sản phẩm này."}
                            </Paragraph>

                            <Divider />

                            <Space size={16} style={{ width: '100%' }}>
                                <Button size="large" style={{ width: 120 }}>Số lượng: 1</Button>
                                <Button 
                                    type="primary" 
                                    size="large" 
                                    icon={<ShoppingCartOutlined />} 
                                    onClick={() => {
                                        addToCart(selectedProduct, 1);
                                        setIsDetailModalOpen(false);
                                    }}
                                    style={{ flex: 1, background: '#ff4d4f', borderColor: '#ff4d4f' }}
                                >
                                    Thêm vào giỏ
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                )}
            </Modal>

            {/* Order Detail Modal */}
            <Modal
                title={`Chi tiết đơn hàng: ${selectedOrder?.id}`}
                open={isOrderModalOpen}
                onCancel={() => setIsOrderModalOpen(false)}
                footer={null}
                width={700}
            >
                {selectedOrder && (
                    <>
                        <div style={{ background: '#fafafa', padding: 16, borderRadius: 8, marginBottom: 24, display: 'flex', justifyContent: 'space-between' }}>
                            <Space direction="vertical" size={4}>
                                <Text type="secondary">Ngày đặt hàng:</Text>
                                <Text strong>{new Date(selectedOrder.date).toLocaleString('vi-VN')}</Text>
                            </Space>
                            <Space direction="vertical" size={4} style={{ textAlign: 'right' }}>
                                <Text type="secondary">Trạng thái:</Text>
                                <Tag color={selectedOrder.status === 'Processing' ? 'blue' : selectedOrder.status === 'Delivering' ? 'orange' : 'green'}>
                                    {selectedOrder.status === 'Processing' ? 'Đang xử lý' : selectedOrder.status === 'Delivering' ? 'Đang giao' : 'Hoàn thành'}
                                </Tag>
                            </Space>
                        </div>

                        <Steps 
                            size="small" 
                            current={selectedOrder.status === 'Processing' ? 1 : selectedOrder.status === 'Delivering' ? 2 : 3} 
                            style={{ padding: '0 40px', marginBottom: 24 }}
                            items={[
                                { title: 'Đã đặt hàng' },
                                { title: 'Đang xử lý' },
                                { title: 'Đang giao' },
                                { title: 'Hoàn thành' }
                            ]}
                        />

                        <Title level={5}>Sản phẩm đã mua</Title>
                        <List
                            itemLayout="horizontal"
                            dataSource={selectedOrder.items}
                            renderItem={(item: any) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.image} shape="square" size={48} />}
                                        title={item.name}
                                        description={`Số lượng: ${item.quantity}`}
                                    />
                                    <div style={{ fontWeight: 'bold' }}>{(item.price * item.quantity).toLocaleString()}đ</div>
                                </List.Item>
                            )}
                            style={{ marginBottom: 24 }}
                        />

                        <Title level={5}>Thông tin thanh toán & Giao hàng</Title>
                        <Row gutter={24} style={{ background: '#fafafa', padding: 16, borderRadius: 8 }}>
                            <Col span={12}>
                                <Text type="secondary" style={{ display: 'block' }}>Phương thức thanh toán:</Text>
                                <Text strong>{selectedOrder.paymentMethod}</Text>
                                <div style={{ marginTop: 12 }}>
                                    <Text type="secondary" style={{ display: 'block' }}>Tổng tiền:</Text>
                                    <Title level={4} style={{ color: '#ff4d4f', margin: 0 }}>{selectedOrder.total.toLocaleString()}đ</Title>
                                </div>
                            </Col>
                            <Col span={12}>
                                <Text type="secondary" style={{ display: 'block' }}>Giao đến:</Text>
                                <Text strong>{selectedOrder.address}</Text>
                                <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>Số điện thoại:</Text>
                                <Text strong>{selectedOrder.phone}</Text>
                            </Col>
                        </Row>

                        <Divider />
                        
                        <div style={{ textAlign: 'right' }}>
                            <Button onClick={() => setIsOrderModalOpen(false)} style={{ marginRight: 12 }}>Đóng</Button>
                            <Button type="primary" icon={<RetweetOutlined />} onClick={() => {
                                handleReorder(selectedOrder.items);
                                setIsOrderModalOpen(false);
                            }}>
                                Mua lại đơn này
                            </Button>
                        </div>
                    </>
                )}
            </Modal>
        </div>
    );
}
