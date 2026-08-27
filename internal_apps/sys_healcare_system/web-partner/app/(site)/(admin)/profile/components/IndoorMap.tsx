import React, { useState } from 'react';
import _ from 'lodash';
import Ratio from 'react-ratio';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { USER_TYPE } from '@/components/common/Constant';

interface MapItem {
  img: string;
  label: string;
}

interface IndoorMapData {
  userType: keyof typeof USER_TYPE;
  indoorMap: MapItem[];
}

interface IndoorMapProps {
  data: IndoorMapData;
}


const IndoorMap: React.FC<IndoorMapProps> = ({ data }) => {
  const { userType, indoorMap } = data;
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const safeMap = indoorMap || [];
  const slides = safeMap.map((item) => ({ src: item.img }));

  function openLightbox(e: React.MouseEvent<HTMLAnchorElement>, index: number) {
    e.preventDefault();
    setPhotoIndex(index);
    setIsOpen(true);
  }

  return (
    <div className="profile-indoor">
      <h2 className="profile-title">
        Sơ đồ {USER_TYPE[userType]}
      </h2>
      <div className="profile-indoor-items">
        <div className="row m-row">
          {_.map(indoorMap, (item, i) => (
            <div className="col-md-3 col-6" key={i}>
              <a href="" onClick={(event) => openLightbox(event, i)}>
                <Ratio
                  ratio={1 / 1}
                  className=" profile-indoor-item"
                >
                  <img src={item.img} alt="" />
                  <span className="profile-indoor-label">{item.label}</span>
                </Ratio>
              </a>
            </div>
          ))}
          <Lightbox open={isOpen} close={() => setIsOpen(false)} index={photoIndex} slides={slides} on={{ view: ({ index }) => setPhotoIndex(index) }} />
        </div>
      </div>
    </div>
  );
};

export default IndoorMap;