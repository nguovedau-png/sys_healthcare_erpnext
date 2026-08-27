'use client';

import Link from 'next/link';
import { useCart } from '@/store/CartContext';

export default function CartIcon() {
    const { getTotalItems } = useCart();
    const totalItems = getTotalItems();

    return (
        <Link href="/shop/cart" className="cart-icon">
            <i className="fi flaticon-shopping-cart"></i>
            {totalItems > 0 && (
                <span className="cart-icon__badge">{totalItems}</span>
            )}
        </Link>
    );
}
