import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Calendar from 'react-calendar';
import type { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface Service {
  name: string;
}

interface Location {
  userId: string;
  userType: 'clinic' | 'hospital' | 'doctor';
  name: string;
  service: Service;
}

interface ScheduleItem {
  date: string;
  service: string;
  isReVisit: boolean;
  location: Location;
}

const schedule: ScheduleItem[] = [
  {
    date: '08/01/2021 18:30',
    service: 'Khám bệnh',
    isReVisit: false,
    location: {
      userId: 'cli-001',
      userType: 'clinic',
      name: 'Phòng khám nội tổng hợp',
      service: {
        name: 'Khám bệnh'
      }
    }
  },
  {
    date: '08/01/2021 18:30',
    service: 'Khám bệnh',
    isReVisit: true,
    location: {
      userId: 'cli-001',
      userType: 'clinic',
      name: 'Phòng khám nội tổng hợp',
      service: {
        name: 'Khám bệnh'
      }
    }
  }
];

const Schedule: React.FC = () => {
  const [curDate, setCurDate] = useState<Date>(new Date());

  useEffect(() => {
    console.log(curDate);
  }, [curDate]);

  const handleDateChange = (value: CalendarProps['value'], event: React.MouseEvent<HTMLButtonElement>) => {
    if (value instanceof Date) {
      setCurDate(value);
      console.log('Clicked day: ', value);
    }
  };

  return (
    <div className="profile-schedule">
      <h2 className="profile-title">Lịch hẹn hôm nay</h2>
      <Calendar
        className='profile-schedule-calendar'
        onChange={handleDateChange}
        locale='vn-VN'
        value={curDate}
        defaultValue={curDate}
      />
      <div className="profile-schedule-list">
        <span className="profile-schedule-count">Bạn có {schedule.length} cuộc hẹn hôm nay</span>
        {_.map(schedule, (item, i) =>
          <div className="profile-schedule-item" key={i}>
            <p className="content">
              {item.location.service.name}{item.isReVisit ? ' (Tái khám) ' : ' '}
              tại <a href={`profile/${item.location.userType}/${item.location.userId}`}>{item.location.name}</a>
            </p>
            <span className="date">
              {item.date}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;