'use client';

import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Select, { StylesConfig } from 'react-select';
import _ from 'lodash';
import Flaticon from './Flaticon';

import { TYPE, DISTRICT, CITY, WEEKDAY, TIME, PRICE, RADIUS } from './Constant';
import TagList from './TagList';
import classNames from 'classnames';

interface BannerProps {
  page: 'home' | 'search' | 'forum' | 'news' | 'video' | 'others';
}

interface SelectOption {
  value: string;
  label: string;
}

interface SearchConfig {
  wrap: string;
  label: boolean;
  keyword: string;
  type: string | boolean;
  district: string | boolean;
  city: string | boolean;
  btn: string;
}

interface DisplayClass {
  banner: string;
  title: boolean;
  subTitle: boolean;
  search: SearchConfig;
  tagList: boolean;
  advanced: boolean;
}

interface FormData {
  keyword: string;
  type?: string;
  district?: string;
  city: string;
  weekday?: string;
  time?: string;
  price?: string;
  radius?: string;
}

const customSelectStyles: StylesConfig<SelectOption, false> = {
  control: (provided) => ({
    ...provided,
    height: '48px',
    borderRadius: '5px',
    borderColor: '#5fad73',
    fontSize: '17px',
    paddingLeft: '10px',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#5fad73'
    },
    '@media (max-width: 1366px)': {
      height: '45px',
      fontSize: '15px',
    },
    '@media (max-width: 768px)': {
      borderColor: '#e8f3ec',
      width: '100%',
      height: '50px',
    }
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: '48px',
    padding: '0',
    '@media (max-width: 1366px)': {
      height: '43px',
    },
    '@media (max-width: 768px)': {
      height: '48px',
    }
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '17px',
    backgroundColor: state.isSelected ? '#fff' : state.isFocused ? '#f0f9f4' : '#fff',
    color: state.isSelected ? '#47af50' : '#1e2225',
    '&:hover': {
      backgroundColor: '#f0f9f4',
    },
    '@media (max-width: 1366px)': {
      fontSize: '15px',
    }
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#1e2225',
  }),
  input: (provided) => ({
    ...provided,
    color: '#1e2225',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '5px',
    zIndex: 9999
  })
};

const citySelectStyles: StylesConfig<SelectOption, false> = {
  ...customSelectStyles,
  control: (provided) => ({
    ...provided,
    height: '48px',
    borderRadius: '5px',
    borderColor: '#5fad73',
    fontSize: '17px',
    paddingLeft: '10px',
    backgroundColor: '#ffffff',
    '@media (max-width: 768px)': {
      border: 'none',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      width: 'auto',
      height: 'auto',
      padding: 0,
      margin: 0,
    }
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    '@media (max-width: 768px)': {
      padding: 0,
      color: '#47af50'
    }
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    '@media (max-width: 768px)': {
      display: 'none'
    }
  }),
  valueContainer: (provided) => ({
    ...provided,
    '@media (max-width: 768px)': {
      height: 'auto',
      fontWeight: 500,
      fontSize: '17px',
      backgroundColor: 'transparent'
    }
  }),
  singleValue: (provided) => ({
    ...provided,
    '@media (max-width: 768px)': {
      color: '#1e2225'
    }
  })
}

const Banner: React.FC<BannerProps> = ({ page }) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormData>();
  const [selectedType, setSelectedType] = useState<SelectOption>(TYPE[0]);
  const [selectedDistrict, setSelectedDistrict] = useState<SelectOption>(DISTRICT[0]);
  const [selectedCity, setSelectedCity] = useState<SelectOption>({ value: 'hochiminh', label: 'TP. HCM' });
  const [selectedWeekday, setSelectedWeekday] = useState<SelectOption>(WEEKDAY[0]);
  const [selectedTime, setSelectedTime] = useState<SelectOption>(TIME[0]);
  const [selectedPrice, setSelectedPrice] = useState<SelectOption>(PRICE[0]);
  const [selectedRadius, setSelectedRadius] = useState<SelectOption>(RADIUS[0]);
  const [isAdvancedShow, setIsAdvancedShow] = useState<boolean>(false);

  const onSearch = (data: FormData) => {
    let queryStr = '?';
    _.map(data, (val, key) => queryStr = queryStr + `${key}=${val}&`);
    router.push(`/search${queryStr}`);
  };

  const getDisplayConfig = (): DisplayClass => {
    const baseSearch = {
      wrap: 'w-full',
      label: false,
      keyword: 'w-full lg:w-3/4 xl:w-5/12 pr-0 lg:pr-0',
      type: false,
      district: false,
      city: 'w-full md:w-1/3 xl:w-2/12 pr-0 lg:pr-0',
      btn: 'hidden xl:block xl:w-1/12'
    };

    switch (page) {
      case 'home':
        return {
          banner: "h-[290px] md:h-[400px] lg:h-[500px] xl:h-[500px] bg-[url('/img/banner/index-banner.jpg')] bg-center bg-no-repeat bg-cover relative before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-[#0f766e] before:to-[#0ea5e9] before:opacity-85 before:z-0",
          title: true,
          subTitle: true,
          search: {
            ...baseSearch,
            wrap: 'w-full xl:w-2/3 mx-auto px-2 md:px-4',
            keyword: 'w-full lg:w-9/12 xl:w-7/12 pr-0 lg:pr-2 mb-3 lg:mb-0',
            city: 'w-full lg:w-3/12 pr-0 lg:pr-2 mb-3 lg:mb-0',
            btn: 'hidden xl:block xl:w-2/12'
          },
          tagList: true,
          advanced: false
        };
      case 'search':
        return {
          banner: "h-auto bg-gradient-to-br from-[#0f766e] to-[#0ea5e9] relative overflow-hidden py-10",
          title: false,
          subTitle: false,
          search: {
            ...baseSearch,
            wrap: 'w-full',
            keyword: 'w-full lg:w-5/12 pr-0 lg:pr-0 mb-3 lg:mb-0',
            type: 'w-full md:w-1/3 xl:w-2/12 pr-0 lg:pr-0 mb-3 md:mb-0',
            district: 'w-full md:w-1/3 xl:w-2/12 pr-0 lg:pr-0 mb-3 md:mb-0',
            city: 'w-full md:w-1/3 xl:w-2/12 pr-0 lg:pr-0 mb-3 md:mb-0',
            btn: 'hidden xl:block xl:w-1/12'
          },
          tagList: false,
          advanced: true
        };
      case 'forum':
      case 'others':
        return {
          banner: "h-auto bg-gradient-to-br from-[#0f766e] to-[#0ea5e9] relative overflow-hidden py-10",
          title: false,
          subTitle: false,
          search: {
            ...baseSearch,
            wrap: 'w-full',
            keyword: 'w-full lg:w-1/2 pr-0 lg:pr-0 mb-3 lg:mb-0',
            btn: 'hidden lg:block lg:w-2/12'
          },
          tagList: false,
          advanced: false
        }
      default:
        return {
          banner: "h-[300px]",
          title: false,
          subTitle: false,
          search: baseSearch as any,
          tagList: false,
          advanced: false
        }
    }
  };

  const { banner, title, subTitle, search, tagList, advanced } = getDisplayConfig();

  return (
    <div className={banner}>
      <div className="absolute w-full h-full flex items-center overflow-x-hidden py-[40px] md:py-0">
        <div className="container mx-auto px-4 z-10 relative">
          <h5 className="text-[#47af50] text-sm font-normal font-google-sans mb-[10px] md:hidden">Đặt lịch hẹn với các bước đơn giản</h5>
          <h1 className={classNames("text-[26px] md:text-[34px] font-bold font-google-sans text-center md:text-left xl:text-center text-white md:text-[#1e2225] xl:text-white uppercase mb-4 md:mb-5 xl:mb-0", { "hidden": !title })}>Tra cứu thông tin y tế</h1>
          {subTitle ? <h6 className="hidden md:block text-center text-[14px] lg:text-[17px] font-normal text-white/70 font-google-sans">Đặt lịch hẹn với các bước đơn giản </h6> : false}
          <div className="flex flex-wrap -mx-[10px]">
            <div className={search.wrap}>
              <form action="" onSubmit={handleSubmit(onSearch)}>
                <div className={classNames("mt-0 lg:mt-[20px]", { "mt-[20px]": advanced })}>
                  <div className="flex flex-wrap items-end -mx-[5px]">
                    <div className={classNames(search.keyword as string, "px-[5px]")}>
                      {search.label ? <label className="text-white text-[15px] mb-[5px] block">Tìm kiếm thông tin</label> : false}
                      <div className="relative">
                        <input
                          type="text"
                          {...(register("keyword", { required: true }) as any)}
                          className="w-full h-[45px] md:h-[50px] lg:h-[45px] xl:h-[48px] border border-white md:border-[#fff] lg:border-[#5fad73] rounded-[5px] text-[15px] md:text-[17px] px-[10px] md:px-[20px] bg-white/70 md:bg-white placeholder:text-[#52575c] placeholder:text-[13px] md:placeholder:text-[15px] focus:ring-0 focus:outline-none focus:shadow-md"
                          autoComplete="off"
                          placeholder="Triệu chứng bệnh, bệnh viện, phòng khám, bác sĩ"
                        />
                      </div>
                    </div>

                    {search.type ? (
                      <div className={classNames(search.type as string, "px-[5px]")}>
                        {search.label ? <label className="text-white text-[15px] mb-[5px] block">Đối tượng tìm kiếm</label> : false}
                        <div className="mt-[10px] md:mt-0">
                          <Select
                            instanceId="select-type"
                            styles={customSelectStyles}
                            defaultValue={TYPE[0]}
                            onChange={(option) => setSelectedType(option as SelectOption)}
                            options={TYPE}
                            placeholder='Bạn muốn tìm?'
                          />
                          <input
                            type="text"
                            className="hidden"
                            value={selectedType.value}
                            {...(register("type") as any)}
                            readOnly
                          />
                        </div>
                      </div>
                    ) : false}

                    {search.district ? (
                      <div className={classNames(search.district as string, "px-[5px]")}>
                        {search.label ? <label className="text-white text-[15px] mb-[5px] block">Quận/Huyện</label> : false}
                        <div className="mt-[10px] md:mt-0">
                          <Select
                            instanceId="select-district"
                            styles={customSelectStyles}
                            defaultValue={DISTRICT[0]}
                            onChange={(option) => setSelectedDistrict(option as SelectOption)}
                            options={DISTRICT}
                            placeholder='Chọn quận/huyện'
                          />
                          <input
                            type="text"
                            className="hidden"
                            value={selectedDistrict.value}
                            {...(register("district") as any)}
                            readOnly
                          />
                        </div>
                      </div>
                    ) : false}

                    {search.city && (
                      <div className={classNames(search.city as string, "px-[5px]")}>
                        {search.label ? <label className="text-white text-[15px] mb-[5px] block">Tỉnh/Thành phố</label> : false}
                        <div className="mt-[10px] md:mt-0 relative">
                          <div className="md:hidden absolute top-[-30px] left-0 flex items-center">
                            <i className="fi flaticon-placeholder text-[#47af50] text-[18px] mr-[5px]"></i>
                          </div>
                          <Select
                            instanceId="select-city"
                            styles={citySelectStyles}
                            defaultValue={selectedCity}
                            onChange={(option) => setSelectedCity(option as SelectOption)}
                            options={CITY}
                            placeholder='Chọn tỉnh/thành phố'
                          />
                          <input
                            type="text"
                            className="hidden"
                            value={selectedCity.value}
                            {...(register("city") as any)}
                            readOnly
                          />
                        </div>
                      </div>
                    )}

                    <div className={classNames(search.btn, "px-[5px]")}>
                      <button className="bg-[#47af50] text-white h-[48px] rounded-[5px] w-full text-[17px] font-medium hover:bg-[#3d9744] transition-colors shadow-md" type="submit">Tìm kiếm</button>
                    </div>
                  </div>
                </div>

                {advanced ? (
                  <div className="flex flex-col pt-[20px]">
                    <span
                      onClick={() => setIsAdvancedShow(!isAdvancedShow)}
                      className="text-white font-bold cursor-pointer block mx-auto flex items-center justify-center"
                    >
                      Tìm nâng cao <span className="ml-[5px]"><Flaticon icon={isAdvancedShow ? 'up-arrow' : 'down-arrow'} /></span>
                    </span>
                    <div className={classNames("bg-white rounded-[10px] px-[20px] overflow-hidden transition-all duration-200 ease-in-out opacity-0 h-0", { "mt-[20px] h-auto p-[20px] opacity-100 visible overflow-visible": isAdvancedShow })}>
                      <div className="flex flex-wrap items-end justify-center -mx-[10px]">
                        <div className="w-full md:w-1/2 lg:w-1/4 px-[10px] mb-4 lg:mb-0">
                          <label className="text-[#1e2225] mb-2 block">Ngày trong tuần</label>
                          <div className="">
                            <Select
                              instanceId="select-weekday"
                              styles={customSelectStyles}
                              defaultValue={WEEKDAY[0]}
                              onChange={(option) => setSelectedWeekday(option as SelectOption)}
                              options={WEEKDAY}
                              placeholder='Chọn ngày trong tuần'
                            />
                            <input
                              type="text"
                              className="hidden"
                              value={selectedWeekday.value}
                              {...(register("weekday") as any)}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/4 px-[10px] mb-4 lg:mb-0">
                          <label className="text-[#1e2225] mb-2 block">Khung giờ khám</label>
                          <div className="">
                            <Select
                              instanceId="select-time"
                              styles={customSelectStyles}
                              defaultValue={TIME[0]}
                              options={TIME}
                              placeholder='Chọn khung giờ'
                            />
                            <input type="text" className="hidden" value={selectedTime.value} name="time" readOnly />
                          </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/4 px-[10px] mb-4 lg:mb-0">
                          <label className="text-[#1e2225] mb-2 block">Giá khám</label>
                          <div className="">
                            <Select
                              instanceId="select-price"
                              styles={customSelectStyles}
                              defaultValue={PRICE[0]}
                              options={PRICE}
                              placeholder='Chọn giá khám'
                            />
                            <input type="text" className="hidden" value={selectedPrice.value} name="price" readOnly />
                          </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/4 px-[10px] mb-4 lg:mb-0">
                          <label className="text-[#1e2225] mb-2 block">Bán kính</label>
                          <div className="">
                            <Select
                              instanceId="select-radius"
                              styles={customSelectStyles}
                              defaultValue={RADIUS[0]}
                              options={RADIUS}
                              placeholder='Chọn phạm vi bán kính'
                            />
                            <input type="text" className="hidden" value={selectedRadius.value} name="radius" readOnly />
                          </div>
                        </div>
                        <div className="w-full lg:w-auto px-[10px] mt-4 lg:mt-0 flex">
                          <button className="bg-[#47af50] text-white h-[40px] px-[40px] rounded-[5px] text-[17px] font-medium hover:bg-[#3d9744] mr-[10px]" type="submit">Lọc</button>
                          <button className="bg-transparent text-[#1e2225] h-[40px] px-[40px] rounded-[5px] text-[17px] hover:bg-gray-100">Xóa</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : false}
              </form>

              {tagList ? (
                <div className="mt-[15px] lg:mt-[25px] flex flex-col md:flex-row overflow-x-auto">
                  <TagList />
                </div>
              ) : false}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;