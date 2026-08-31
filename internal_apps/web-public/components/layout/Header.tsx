"use client"
import React, { Fragment, useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import _ from 'lodash';
import classNames from "classnames";
import Flaticon from '../common/Flaticon';
// Components
import SideMenu from "./SideMenu";

// Hooks
import { useViewport } from "@/components/common/Function";
import { useCart } from "@/store/CartContext";
import { useAuth } from '@/providers/AuthProvider';
import Logo from '../common/Logo';
import LanguageSwitcher from '../common/LanguageSwitcher';
interface SubNavItem {
  title: string;
  route: string;
  searchCount?: number;
}

interface MenuItem {
  title: string;
  route: string;
  hidden?: boolean;
  subNav?: SubNavItem[];
}

interface HeaderProps {
  title?: string;
  icon?: string;
}

const HeaderContent: React.FC<HeaderProps> = ({ title, icon }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchStr = searchParams?.toString();
  const curPageRoute = searchStr ? `${pathname}?${searchStr}` : pathname;
  const { user, isAuthenticated } = useAuth();
  console.log(user);
  // Use try/catch for useCart safely as it might be used outside CartProvider in some contexts (though we wrapped it)
  // or handle hydration mismatch if necessary. 
  // For now simple usage:
  const { getTotalItems } = useCart();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    // Update count only on client side to avoid hydration mismatch
    setCartItemCount(getTotalItems());
  }, [getTotalItems]);

  // Responsive
  const { width } = useViewport();
  const breakpoint = 1024;

  const menu: MenuItem[] = [
    {
      title: 'Tin tức',
      route: '/news'
    }, {
      title: 'Bệnh A-Z',
      route: '/search?type=disease'
    }, {
      title: 'Thuốc A-Z',
      route: '/search?type=medicine'
    }, {
      title: 'Bệnh thường gặp',
      route: '',
      hidden: true,
      subNav: []
    }, {
      title: 'Bệnh viện',
      route: '/search?type=hospital'
    }, {
      title: 'Phòng khám',
      route: '/search?type=clinic'
    }, {
      title: 'Bác sĩ',
      route: '/search?type=doctor'
    }, {
      title: 'Chuyên mục tin',
      route: '',
      hidden: true,
      subNav: []
    }, {
      title: 'Diễn đàn',
      route: '/forum'
    }, {
      title: 'Mua thuốc',
      route: '/shop'
    },
  ];

  return (
    <Fragment>
      <header className="fixed top-0 w-full z-50 bg-white shadow-sm h-[70px] flex items-center transition-all duration-300">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <Link className="flex-shrink-0" href="/">
            <Logo variant="dark" className="h-12" iconClassName="w-8 h-8" textClassName="text-2xl text-gray-700" />
          </Link>

          {/* Desktop Menu */}
          {width > breakpoint ? (
            <div className="hidden lg:flex items-center space-x-6">
              <ul className="flex items-center gap-6 m-0 p-0 list-none">
                {_.map(menu, (item, i) => !item.hidden && (
                  <li key={i} className="relative group">
                    <Link
                      className={`text-[15px] font-medium transition-colors hover:text-primary ${curPageRoute === item.route ? 'text-primary' : 'text-gray-700'}`}
                      href={item.route}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Actions */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Language Switcher container */}
            <div className="flex items-center justify-center">
              <LanguageSwitcher />
            </div>

            {/* Cart Button */}
            <Link href="/shop/cart" className="relative group w-11 h-11 rounded-full bg-gray-50 flex items-center justify-center hover:bg-primary/10 transition-colors border border-gray-100 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-400 to-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-white shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Separator */}
            <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

            {/* User Info when logged in */}
            {isAuthenticated ? (
              <div className="relative group">
                <div className="flex items-center gap-2 md:gap-3 cursor-pointer py-1 px-2 rounded-full hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs md:text-sm font-bold text-gray-900 truncate max-w-[120px]">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-[10px] md:text-xs text-gray-500 font-medium truncate max-w-[120px]">
                      {(user as any)?.role === 'doctor' || user?.roleId === 2 ? 'Doctor' : (typeof (user as any)?.role === 'object' ? ((user as any)?.role as any)?.name : (user as any)?.role) || ''}
                    </p>
                  </div>
                  <div className="relative">
                    <div className="w-9 h-9 md:w-10 md:h-10 relative">
                      <Image
                        src="/styles/img/user/user-1.jpg"
                        alt="User Avatar"
                        fill
                        className="rounded-full object-cover border-2 border-white shadow-sm"
                      />
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></span>
                  </div>
                </div>

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 w-52 overflow-hidden transform origin-top-right transition-transform scale-95 group-hover:scale-100">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      <i className="fi flaticon-user text-lg"></i>
                      Thông tin của bạn
                    </Link>
                    <Link
                      href="/profile/partner-registration"
                      className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      <i className="fi flaticon-add text-lg"></i>
                      Đăng ký đối tác
                    </Link>
                    <div className="h-px bg-gray-100 my-1 mx-3"></div>
                    <button
                      onClick={() => {
                        window.location.href = '/login';
                      }}
                      className="w-full flex items-center gap-3 px-5 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <i className="fi flaticon-logout text-lg"></i>
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 md:gap-3">
                {/* Login */}
                <Link href="/login" className="flex items-center justify-center text-gray-600 font-bold hover:text-primary transition-colors text-xs md:text-sm px-2 py-2 rounded-lg hover:bg-primary/5 hidden sm:flex">
                  Đăng nhập
                </Link>

                {/* Register */}
                <Link href="/register" className="flex items-center justify-center bg-gradient-to-r from-primary to-teal-500 text-white px-4 md:px-6 py-2 rounded-full font-bold shadow-md shadow-teal-500/20 hover:shadow-lg hover:shadow-teal-500/30 transition-all text-xs md:text-sm whitespace-nowrap transform hover:-translate-y-0.5">
                  Đăng ký
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            {width <= breakpoint && (
              <button className="text-gray-700 text-2xl lg:hidden ml-1 hover:text-primary transition-colors">
                <i className="fi flaticon-menu"></i>
              </button>
            )}
          </div>
        </div>
      </header>
    </Fragment>
  );
};

const Header: React.FC<HeaderProps> = (props) => (
  <Suspense fallback={<header className="fixed top-0 w-full z-50 bg-white shadow-sm h-[70px] flex items-center" />}>
    <HeaderContent {...props} />
  </Suspense>
);

export default Header;