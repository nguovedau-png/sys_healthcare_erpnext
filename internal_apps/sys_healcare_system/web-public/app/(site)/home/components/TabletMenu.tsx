import React from 'react';
import _ from 'lodash';

interface MenuItem {
  icon: string;
  title: string;
  description: string;
  link: string;
}

const TabletMenu: React.FC = () => {
  const menuItems: MenuItem[] = [
    {
      icon: '/img/icon/tablet-menu/booking.svg',
      title: 'Đặt lịch khám',
      description: 'Tìm kiếm và đặt lịch khám nhanh chóng',
      link: '/booking'
    },
    {
      icon: '/img/icon/tablet-menu/news.svg',
      title: 'Tin tức',
      description: 'Thông tin y tế chính thống từ các bệnh viện',
      link: ''
    },
    {
      icon: '/img/icon/tablet-menu/sick.svg',
      title: 'Bệnh thường gặp',
      description: 'Cách phòng bệnh, triệu chứng và điều trị',
      link: ''
    },
    {
      icon: '/img/icon/tablet-menu/doctor.svg',
      title: 'Bác sĩ',
      description: 'Tìm kiếm và đặt lịch tại phòng mạch gần nhất',
      link: ''
    },
    {
      icon: '/img/icon/tablet-menu/clinic.svg',
      title: 'Phòng khám',
      description: 'Tìm kiếm và đặt lịch tại phòng khám gần nhất',
      link: ''
    },
    {
      icon: '/img/icon/tablet-menu/hospital.svg',
      title: 'Bệnh viện',
      description: 'Tìm kiếm thông tin bệnh viện gần nhất',
      link: ''
    },
    {
      icon: '/img/icon/tablet-menu/sick-a-z.svg',
      title: 'Bệnh A-Z',
      description: 'Tra cứu nhanh thông tin các bệnh',
      link: ''
    },
    {
      icon: '/img/icon/tablet-menu/medicine-a-z.svg',
      title: 'Thuốc A-Z',
      description: 'Tra cứu nhanh thông tin các tên thuốc',
      link: ''
    },
    {
      icon: '/img/icon/tablet-menu/forum.svg',
      title: 'Diễn đàn',
      description: 'Thảo luận về sức khỏe cộng đồng',
      link: ''
    }
  ];

  return (
    <div className="mt-0 py-[30px] rounded-t-[20px] bg-[#f5f6f8] pt-[20px] md:pt-[30px] lg:hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-[10px]">
          <div className="w-full px-[10px] mb-5 relative pl-5 after:content-[''] after:absolute after:left-[5px] after:top-[3px] after:w-[6px] after:h-[60%] after:bg-[#34B166] after:-skew-x-[20deg] uppercase">
            <h1 className="text-xl md:text-2xl font-normal uppercase m-0 p-0 text-text-main">Bạn quan tâm gì?</h1>
          </div>
          {menuItems.map((item: MenuItem, i: number) => (
            <div className="w-1/2 md:w-1/3 px-[10px] mb-5" key={i}>
              <a
                href={item.link || '#'}
                className="bg-[#3da045] w-full h-full min-h-[160px] md:min-h-[180px] rounded-[7px] no-underline flex flex-col p-[15px] shadow-[5px_5px_13px_rgba(0,0,0,0.25)] transition-all duration-200 hover:bg-[#358e3c] hover:text-white hover:scale-[0.99] cursor-pointer group"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 mb-3 flex-shrink-0">
                  <img src={item.icon} className="w-full h-full object-contain" alt={item.title} />
                </div>
                <span className="text-white text-[15px] md:text-[18px] font-medium mb-1 font-google-sans line-clamp-1">
                  {item.title}
                </span>
                <p className="m-0 text-white/70 text-[11px] md:text-[13px] font-light leading-[14px] md:leading-[17px] line-clamp-2 flex-grow">
                  {item.description}
                </p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabletMenu;