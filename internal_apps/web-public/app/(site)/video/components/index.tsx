import React from 'react';
import _ from 'lodash';
import Flaticon from '@/components/common/Flaticon';

interface VideoItem {
  title: string;
  duration: string;
}

interface TopVideoProps {
  data: VideoItem[];
}

const TopVideo: React.FC<TopVideoProps> = ({ data }) => {
  const curr = new Date();
  const formatedCurr = curr.toLocaleString('vn-VN', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'numeric', 
    day: 'numeric' 
  });

  return (
    <section className="section news video top-video pt-0">
      <div className="section-title">
        <h1>TOP VIDEO TRONG NGÀY</h1>
        <div className="row m-row">
          <div className="col-6">
            <div className="top-video-title">
              <Flaticon icon='play-button-1' />
              {formatedCurr}
            </div>
            <div className="top-video-list">
              {_.map(data, (item, i) => (
                <div className="top-video-item" key={i}>
                  <span className="number">{i + 1}</span>
                  <h2 className="title">{item.title}</h2>
                  <span className="duration">
                    <Flaticon icon='play-button' />
                    {item.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="col-7">
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopVideo;