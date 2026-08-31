'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

interface Category {
    id: string;
    icon: string;
    title: string;
    children?: {
        image: string;
        title: string;
        href: string;
    }[];
}

const categories: Category[] = [
    {
        id: 'cate1',
        icon: 'flaticon-stethoscope',
        title: 'Thực phẩm chức năng',
        children: [
            { image: '/assets/images/shop/cate-1.jpg', title: 'Da liễu', href: '/shop/categories/da-lieu' },
            { image: '/assets/images/shop/cate-2.jpg', title: 'Tai mũi họng', href: '/shop/categories/tai-mui-hong' },
            { image: '/assets/images/shop/cate-3.jpg', title: 'Mắt', href: '/shop/categories/mat' },
        ]
    },
    {
        id: 'cate2',
        icon: 'flaticon-medicine',
        title: 'Chăm sóc sức khỏe',
        children: [
            { image: '/assets/images/shop/cate-4.jpg', title: 'Máy đo đường huyết', href: '/shop/categories/may-do-duong-huyet' },
            { image: '/assets/images/shop/cate-5.jpg', title: 'Máy đo huyết áp', href: '/shop/categories/may-do-huyet-ap' },
        ]
    },
];

interface SideMenuProps {
    isOpen?: boolean;
    onClose?: () => void;
}

const SideMenu = ({ isOpen = false, onClose }: SideMenuProps) => {
    const [openCategory, setOpenCategory] = useState<string | null>(null);

    const toggleCategory = (categoryId: string) => {
        setOpenCategory(openCategory === categoryId ? null : categoryId);
    };

    return (
        <div className={classNames('side-menu', { 'side-menu--open': isOpen })}>
            <div className="side-menu__header">
                <h2>Danh mục</h2>
                {onClose && (
                    <button onClick={onClose} className="side-menu__close">
                        <i className="fi flaticon-close"></i>
                    </button>
                )}
            </div>

            <div className="side-menu__content">
                {categories.map((category) => (
                    <div key={category.id} className="side-menu__category">
                        <button
                            onClick={() => toggleCategory(category.id)}
                            className="side-menu__category-btn"
                        >
                            <div className="side-menu__category-info">
                                <i className={`fi ${category.icon}`}></i>
                                <span>{category.title}</span>
                            </div>
                            <i className={`fi flaticon-down-arrow side-menu__arrow ${openCategory === category.id ? 'side-menu__arrow--open' : ''}`}></i>
                        </button>

                        <div className={classNames('side-menu__submenu', { 'side-menu__submenu--open': openCategory === category.id })}>
                            {category.children?.map((child, index) => (
                                <Link
                                    key={index}
                                    href={child.href}
                                    className="side-menu__submenu-item"
                                >
                                    <div className="side-menu__submenu-img">
                                        {/* Placeholder image if actual image not found */}
                                        <div className="img-placeholder"></div>
                                    </div>
                                    <span>{child.title}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="side-menu__links">
                    <Link href="/shop/deals" className="side-menu__link">Giá sốc</Link>
                    <Link href="/shop/new" className="side-menu__link">Sản phẩm mới</Link>
                    <Link href="/shop/promotions" className="side-menu__link">Sản phẩm khuyến mại</Link>
                    <Link href="/shop" className="side-menu__link side-menu__link--highlight">Xem tất cả sản phẩm</Link>
                </div>
            </div>
        </div>
    );
};

export default SideMenu;
