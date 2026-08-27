import React, { useState } from 'react';
import _ from 'lodash';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

interface GalleryItem {
  img: string;
}

interface GalleryProps {
  data: GalleryItem[];
}

interface LightboxState {
  photoIndex: number;
  isOpen: boolean;
}

const Gallery: React.FC<GalleryProps> = ({ data }) => {
  const [lboxState, setLbState] = useState<LightboxState>({
    photoIndex: 0,
    isOpen: false,
  });
  const { photoIndex, isOpen } = lboxState;

  function openLightbox(e: React.MouseEvent<HTMLAnchorElement>, index: number) {
    e.preventDefault();
    setLbState({ photoIndex: index, isOpen: true });
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <h4 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100 flex items-center justify-between">
        Hình ảnh
        <span className="text-sm font-normal text-gray-500">{data.length} ảnh</span>
      </h4>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {_.map(data, (item, i) => (
          <div className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all" key={i}>
            <a href="" onClick={(e) => openLightbox(e, i)} className="block aspect-square relative bg-gray-100">
              <img
                src={item.img}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                alt={`Gallery image ${i + 1}`}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <i className="fi flaticon-zoom text-white text-2xl transform scale-50 group-hover:scale-100 transition-transform duration-300"></i>
              </div>
            </a>
          </div>
        ))}
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={data[photoIndex].img}
          nextSrc={data[(photoIndex + 1) % data.length].img}
          prevSrc={data[(photoIndex + data.length - 1) % data.length].img}
          onCloseRequest={() => setLbState({ ...lboxState, isOpen: false })}
          onMovePrevRequest={() =>
            setLbState({
              ...lboxState,
              photoIndex: (photoIndex + data.length - 1) % data.length
            })
          }
          onMoveNextRequest={() =>
            setLbState({
              ...lboxState,
              photoIndex: (photoIndex + 1) % data.length,
            })
          }
        />
      )}
    </div>
  );
};

export default Gallery;