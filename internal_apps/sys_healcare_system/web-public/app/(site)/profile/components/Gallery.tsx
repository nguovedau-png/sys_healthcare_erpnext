import React, { useMemo, useState } from 'react';
import _ from 'lodash';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface GalleryItem {
  img: string;
}

interface GalleryProps {
  data: GalleryItem[];
}

const Gallery: React.FC<GalleryProps> = ({ data }) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const safeData = data || [];
  const slides = useMemo(() => safeData.map((item) => ({ src: item.img })), [safeData]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8">
      <h4 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100 flex items-center justify-between">
        Hình ảnh
        <span className="text-sm font-normal text-gray-500">{safeData.length} ảnh</span>
      </h4>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {_.map(safeData, (item, index) => (
          <div className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all" key={index}>
            <button
              type="button"
              onClick={() => { setPhotoIndex(index); setIsOpen(true); }}
              className="block aspect-square relative bg-gray-100 w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`Mở ảnh ${index + 1}`}
            >
              <img src={item.img} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt={`Ảnh ${index + 1}`} />
              <span className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100" aria-hidden="true">
                <i className="fi flaticon-zoom text-white text-2xl transform scale-50 group-hover:scale-100 transition-transform duration-300" />
              </span>
            </button>
          </div>
        ))}
      </div>

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        index={photoIndex}
        slides={slides}
        on={{ view: ({ index }) => setPhotoIndex(index) }}
      />
    </div>
  );
};

export default Gallery;
