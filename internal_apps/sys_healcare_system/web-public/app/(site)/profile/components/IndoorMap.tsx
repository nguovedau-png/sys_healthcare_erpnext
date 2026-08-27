import React, { useState } from 'react';
import _ from 'lodash';
import Ratio from 'react-ratio';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
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

interface LightboxState {
  photoIndex: number;
  isOpen: boolean;
}

const IndoorMap: React.FC<IndoorMapProps> = ({ data }) => {
  const { userType, indoorMap } = data;
  const [lboxState, setLbState] = useState<LightboxState>({
    photoIndex: 0,
    isOpen: false,
  });
  const { photoIndex, isOpen } = lboxState;

  function openLightbox(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    setLbState({ ...lboxState, isOpen: true });
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
              <a href="" onClick={openLightbox}>
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
          {isOpen && (
            <Lightbox
              mainSrc={indoorMap[photoIndex].img}
              nextSrc={indoorMap[(photoIndex + 1) % indoorMap.length].img}
              prevSrc={indoorMap[(photoIndex + indoorMap.length - 1) % indoorMap.length].img}
              onCloseRequest={() => setLbState({ ...lboxState, isOpen: false })}
              onMovePrevRequest={() =>
                setLbState({
                  ...lboxState,
                  photoIndex: (photoIndex + indoorMap.length - 1) % indoorMap.length
                })
              }
              onMoveNextRequest={() =>
                setLbState({
                  ...lboxState,
                  photoIndex: (photoIndex + 1) % indoorMap.length,
                })
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default IndoorMap;