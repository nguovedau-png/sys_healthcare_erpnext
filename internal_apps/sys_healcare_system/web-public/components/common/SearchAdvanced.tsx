import React, { useState } from 'react';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import Flaticon from './Flaticon';
import { WEEKDAY, TIME, PRICE, RADIUS } from './Constant';

interface SelectOption {
  value: string;
  label: string;
}

interface SearchAdvancedProps {
  onSearch: (data: SearchAdvancedFormData) => void;
  isShow?: boolean;
}

interface SearchAdvancedFormData {
  weekday?: string;
  time?: string;
  price?: string;
  radius?: string;
}

const SearchAdvanced: React.FC<SearchAdvancedProps> = ({ onSearch, isShow = false }) => {
  const { register, handleSubmit } = useForm<SearchAdvancedFormData>();
  const [isAdvancedShow, setIsAdvancedShow] = useState<boolean>(isShow);

  const [selectedWeekday, setSelectedWeekday] = useState<SelectOption>(WEEKDAY[0]);
  const [selectedTime, setSelectedTime] = useState<SelectOption>(TIME[0]);
  const [selectedPrice, setSelectedPrice] = useState<SelectOption>(PRICE[0]);
  const [selectedRadius, setSelectedRadius] = useState<SelectOption>(RADIUS[0]);

  const handleSearch = (data: SearchAdvancedFormData) => {
    onSearch(data);
  };

  const handleReset = () => {
    setSelectedWeekday(WEEKDAY[0]);
    setSelectedTime(TIME[0]);
    setSelectedPrice(PRICE[0]);
    setSelectedRadius(RADIUS[0]);
  };

  return (
    <div className="search-advanced">
      <span
        onClick={() => setIsAdvancedShow(!isAdvancedShow)}
        className="search-advanced-trigger"
      >
        Tìm nâng cao <Flaticon icon={isAdvancedShow ? 'up-arrow' : 'down-arrow'} />
      </span>
      <div className={`search-advanced-form${isAdvancedShow ? ' show' : ''}`}>
        <div className="row m-row justify-content-center align-items-end">
          <div className="col-lg col-md-6 col-12">
            <label htmlFor="">Ngày trong tuần</label>
            <div className="search-bar-select">
              <Select
                classNamePrefix={'select'}
                defaultValue={WEEKDAY[0]}
                onChange={(val: any) => setSelectedWeekday(val)}
                options={WEEKDAY}
                placeholder='Chọn ngày trong tuần'
              />
              <input type="text" className="d-none" value={selectedWeekday.value} name="weekday" ref={register} readOnly />
            </div>
          </div>
          <div className="col-lg col-md-6 col-12">
            <label htmlFor="">Khung giờ khám</label>
            <div className="search-bar-select">
              <Select
                classNamePrefix={'select'}
                defaultValue={TIME[0]}
                onChange={(val: any) => setSelectedTime(val)}
                options={TIME}
                placeholder='Chọn khung giờ'
              />
              <input type="text" className="d-none" value={selectedTime.value} name="time" ref={register} readOnly />
            </div>
          </div>
          <div className="col-lg col-md-6 col-12">
            <label htmlFor="">Giá khám</label>
            <div className="search-bar-select">
              <Select
                classNamePrefix={'select'}
                defaultValue={PRICE[0]}
                onChange={(val: any) => setSelectedPrice(val)}
                options={PRICE}
                placeholder='Chọn giá khám'
              />
              <input type="text" className="d-none" value={selectedPrice.value} name="price" ref={register} readOnly />
            </div>
          </div>
          <div className="col-lg col-md-6 col-12">
            <label htmlFor="">Bán kính</label>
            <div className="search-bar-select">
              <Select
                classNamePrefix={'select'}
                defaultValue={RADIUS[0]}
                onChange={(val: any) => setSelectedRadius(val)}
                options={RADIUS}
                placeholder='Chọn phạm vi bán kính'
              />
              <input type="text" className="d-none" value={selectedRadius.value} name="radius" ref={register} readOnly />
            </div>
          </div>
          <div className="col-lg col-12">
            <button className="btn btn-main" type="submit" onClick={handleSubmit(handleSearch)}>Lọc</button>
            <button className="btn" type="button" onClick={handleReset}>Xóa</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAdvanced;