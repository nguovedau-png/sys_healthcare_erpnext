'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import React, { useState, useEffect, Suspense } from 'react';
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
      borderColor: '#e8f3ec',
      width: '100%',
      height: '50px',
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
    height: '48px',
    padding: '0',
    '@media (max-width: 1366px)': {
      height: '43px',
    },
    '@media (max-width: 768px)': {
      height: '48px',
    }
  }),
  singleValue: (provided) => ({
    ...provided,
    '@media (max-width: 768px)': {
      color: '#1e2225'
    }
  })
}

const BannerContent: React.FC<BannerProps> = ({ page }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialKeyword = searchParams.get('q') || '';
  const { register, handleSubmit, setValue, reset } = useForm<FormData>({
    defaultValues: {
      keyword: initialKeyword
    }
  });
  const [selectedType, setSelectedType] = useState<SelectOption>(TYPE[0]);
  const [selectedDistrict, setSelectedDistrict] = useState<SelectOption>(DISTRICT[0]);
  const [selectedCity, setSelectedCity] = useState<SelectOption>({ value: 'hochiminh', label: 'TP. HCM' });
  const [selectedWeekday, setSelectedWeekday] = useState<SelectOption>(WEEKDAY[0]);
  const [selectedTime, setSelectedTime] = useState<SelectOption>(TIME[0]);
  const [selectedPrice, setSelectedPrice] = useState<SelectOption>(PRICE[0]);
  const [selectedRadius, setSelectedRadius] = useState<SelectOption>(RADIUS[0]);
  const [isAdvancedShow, setIsAdvancedShow] = useState<boolean>(false);

  useEffect(() => {
    const q = searchParams.get('q');
    const type = searchParams.get('type');
    const district = searchParams.get('district');
    const city = searchParams.get('city');

    console.log('[Banner] useEffect syncing with searchParams. q:', q, 'type:', type);
    if (q) {
      setValue('keyword', q);
      reset({ keyword: q });
    }
    if (type) {
      const typeOpt = TYPE.find(t => t.value === type);
      if (typeOpt) setSelectedType(typeOpt);
    }
    if (district) {
      const districtOpt = DISTRICT.find(d => d.value === district);
      if (districtOpt) setSelectedDistrict(districtOpt);
    }
    if (city) {
      const cityOpt = CITY.find(c => c.value === city);
      if (cityOpt) setSelectedCity(cityOpt);
    }
  }, [searchParams, setValue, reset]);

  const typeValueMap: Record<string, string> = {
    '*': 'doctor',
    'disease': 'disease',
    'medicine': 'medicine',
    'hospital': 'hospital',
    'clinic': 'clinic',
    'doctor': 'doctor',
    'bv': 'hospital',
    'pk': 'clinic',
    'bs': 'doctor'
  };

  const onSearch = (data: FormData) => {
    console.log('[Banner] Search form data:', data);
    
    const typeValue = typeValueMap[data.type || '*'] || 'doctor';
    const params = new URLSearchParams();
    
    if (data.keyword && data.keyword.trim()) {
      params.set('q', data.keyword.trim());
    }
    params.set('type', typeValue);
    
    if (data.district && data.district !== '*') {
      params.set('district', data.district);
    }
    if (data.city && data.city !== '*') {
      params.set('city', data.city);
    }
    
    const url = `/search?${params.toString()}`;
    console.log('[Banner] Navigating to:', url);
    router.push(url);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSearch)(e);
  };

  const getDisplayConfig = (): DisplayClass => {
    const baseSearch = {
      wrap: 'w-full',
      label: false,
      keyword: 'flex-1 min-w-[200px]',
      type: false as string | boolean,
      district: false as string | boolean,
      city: 'w-full sm:w-[150px] lg:w-[200px] shrink-0' as string | boolean,
      btn: 'shrink-0'
    };

    switch (page) {
      case 'home':
        return {
          banner: "relative min-h-[380px] md:min-h-[480px] bg-[url('/img/banner/index-banner.jpg')] bg-center bg-no-repeat bg-cover before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary before:to-secondary before:opacity-85 before:z-0 flex items-center py-10 md:py-16",
          title: true,
          subTitle: true,
          search: {
            ...baseSearch,
            wrap: 'w-full xl:w-2/3 mx-auto px-4',
            keyword: 'w-full lg:flex-1 lg:min-w-[300px]',
            city: 'w-full lg:w-[250px] shrink-0',
            btn: 'w-full lg:w-auto shrink-0'
          },
          tagList: true,
          advanced: false
        };
      case 'search':
        return {
          banner: "h-auto bg-gradient-to-br from-primary to-secondary relative overflow-hidden py-10",
          title: false,
          subTitle: false,
          search: {
            ...baseSearch,
            wrap: 'w-full',
            keyword: 'w-full lg:flex-1 lg:min-w-[200px]',
            type: 'w-full sm:flex-1 sm:min-w-[240px] lg:flex-none lg:w-[180px] xl:w-[220px]',
            district: 'w-full sm:flex-1 sm:min-w-[240px] lg:flex-none lg:w-[180px] xl:w-[220px]',
            city: 'w-full sm:flex-1 sm:min-w-[240px] lg:flex-none lg:w-[180px] xl:w-[220px]',
            btn: 'w-full lg:w-auto shrink-0'
          },
          tagList: false,
          advanced: true
        };
      case 'news':
      case 'forum':
      case 'others':
      case 'video':
        return {
          banner: "h-auto bg-gradient-to-br from-primary to-secondary relative overflow-hidden py-10",
          title: false,
          subTitle: false,
          search: {
            ...baseSearch,
            wrap: 'w-full',
            keyword: 'flex-1 min-w-0',
            btn: 'shrink-0'
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
      <div className="relative w-full overflow-x-hidden">

        <div className="container mx-auto px-4 z-10 relative">
          <h5 className="text-[#47af50] text-sm font-normal font-google-sans mb-[10px] md:hidden">Đặt lịch hẹn với các bước đơn giản</h5>
          <h1 className={classNames("text-[26px] md:text-[34px] font-bold font-google-sans text-center md:text-left xl:text-center text-white md:text-[#1e2225] xl:text-white uppercase mb-4 md:mb-5 xl:mb-0", { "hidden": !title })}>Tra cứu thông tin y tế</h1>
          {subTitle ? <h6 className="hidden md:block text-center text-[14px] lg:text-[17px] font-normal text-white/70 font-google-sans">Đặt lịch hẹn với các bước đơn giản </h6> : false}
          <div className="w-full">
            <div className={search.wrap}>
              <form onSubmit={handleFormSubmit}>
                <div className={classNames("mt-0 lg:mt-[20px]", { "mt-[20px]": advanced })}>
                  <div className="flex flex-wrap items-stretch gap-2">
                    <div className={classNames(search.keyword as string)}>
                      {search.label ? <label className="text-white text-[15px] mb-[5px] block">Tìm kiếm thông tin</label> : false}
                      <div className="relative">
                        <input
                          type="text"
                          name="keyword"
                          ref={register}
                          placeholder="Triệu chứng bệnh, bệnh viện, phòng khám, bác sĩ"
                          className="w-full h-[48px] md:h-[48px] lg:h-[48px] px-4 md:px-10 rounded-[5px] border border-[#5fad73] text-[17px] text-[#1e2225] bg-white placeholder:text-[#52575c] focus:outline-none focus:border-[#47af50] transition-colors md:shadow-sm"
                        />
                      </div>
                    </div>

                    {search.type ? (
                      <div className={classNames(search.type as string)}>
                        {search.label ? <label className="text-white text-[15px] mb-[5px] block">Đối tượng tìm kiếm</label> : false}
                        <div>
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
                      <div className={classNames(search.district as string)}>
                        {search.label ? <label className="text-white text-[15px] mb-[5px] block">Quận/Huyện</label> : false}
                        <div>
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
                      <div className={classNames(search.city as string)}>
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

                    <div className={classNames(search.btn)}>
                        <button 
                          type="button"
                          className="bg-[#47af50] text-white h-[48px] px-6 rounded-[5px] w-full text-[17px] font-medium hover:bg-[#3d9744] transition-colors shadow-md whitespace-nowrap"
                          onClick={() => {
                            const keyword = (document.querySelector('input[name="keyword"]') as HTMLInputElement)?.value;
                            const typeValue = selectedType?.value || 'doctor';
                            const url = `/search?q=${encodeURIComponent(keyword || '')}&type=${typeValue}`;
                            console.log('[Banner] Navigating to:', url);
                            router.push(url);
                          }}
                        >Tìm kiếm</button>
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
                        <div className="w-full px-[10px] mt-10 mb-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                          <button className="bg-[#47af50] text-white h-[50px] w-full sm:w-auto px-12 rounded-xl text-[17px] font-bold hover:bg-[#3d9744] shadow-lg shadow-green-100 transition-all active:scale-95 flex items-center justify-center gap-2" type="submit">
                            <Flaticon icon="search" className="text-white w-4 h-4" />
                            Lọc kết quả
                          </button>
                          <button className="bg-gray-100 text-[#1e2225] h-[50px] w-full sm:w-auto px-12 rounded-xl text-[17px] font-bold hover:bg-gray-200 transition-all active:scale-95 flex items-center justify-center" type="button" onClick={() => {
                            setSelectedWeekday(WEEKDAY[0]);
                            setSelectedTime(TIME[0]);
                            setSelectedPrice(PRICE[0]);
                            setSelectedRadius(RADIUS[0]);
                          }}>Thiết lập lại</button>
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

export const Banner: React.FC<BannerProps> = (props) => (
  <Suspense fallback={null}>
    <BannerContent {...props} />
  </Suspense>
);

export default Banner;