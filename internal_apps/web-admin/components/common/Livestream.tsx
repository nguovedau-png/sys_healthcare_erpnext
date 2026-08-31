import React from 'react';
import _ from 'lodash';
import Carousel from 'nuka-carousel';
import Ratio from 'react-ratio';
import { useViewport } from './Function';
import { API_GET_LIVESTREAM_EVENT } from './Constant';

interface LivestreamItem {
  title: string;
  thumbnail: string;
  date: string;
}

interface ViewportSize {
  width: number;
}

interface CarouselOptions {
  autoplay: boolean;
  wrapAround: boolean;
  transitionMode: string;
  speed: number;
  renderCenterLeftControls: null;
  renderCenterRightControls: null;
  renderBottomCenterControls: null;
}

const Livestream: React.FC = () => {
  const { data } = API_GET_LIVESTREAM_EVENT as { data: LivestreamItem[] };

  // Responsive
  const { width } = useViewport() as ViewportSize;
  const breakpoint = 768;

  const options: CarouselOptions = {
    autoplay: true,
    wrapAround: true,
    transitionMode: 'fade',
    speed: 500,
    renderCenterLeftControls: null,
    renderCenterRightControls: null,
    renderBottomCenterControls: null
  };

  const LivestreamContent = ({ item }: { item: LivestreamItem }) => (
    <div className="rounded-[7px] md:w-full w-[70%] flex-shrink-0 md:mr-0 mr-5 md:last:mr-0 group article" title={item.title}>
      <Ratio
        ratio={16 / 9}
        className="overflow-hidden relative block border border-[#f0f2f5] rounded-[7px] md:rounded-b-none group"
      >
        <img src={item.thumbnail} className="w-full h-auto" alt="" />
        <a href="/" className="flex justify-center items-center absolute inset-0 bg-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 no-underline">
          <div className="px-4 py-2 border border-primary text-primary rounded bg-transparent font-medium hover:bg-primary hover:text-white transition-colors">Tham gia</div>
        </a>
      </Ratio>
      <div className="bg-[#f3f6f9] p-2.5 md:p-5 rounded-b-[7px] md:mt-0 mt-2.5">
        <h5 className="text-[17px] md:text-xl font-medium leading-[22px] mb-1 text-text-main line-clamp-2">{item.title}</h5>
        <h6 className="text-sm md:text-lg text-sub font-normal m-0">{item.date}</h6>
      </div>
    </div>
  );

  return (
    <div className="w-full mb-7.5">
      <div className="mb-5 relative">
        <h1 className="flex items-center text-xl md:text-2xl text-text-main font-normal uppercase font-google-sans">
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full mr-2.5 animate-pulse"></div>
          Đang trực tuyến
        </h1>
      </div>
      {/* {width > breakpoint ? (
        <Carousel {...options}>
          {_.map(data, (item: LivestreamItem, i: number) => (
            <LivestreamContent key={i} item={item} />
          ))}
        </Carousel>
      ) : (
        <div className="flex min-w-full overflow-x-auto pb-2.5">
          {_.map(data, (item: LivestreamItem, i: number) => (
            <LivestreamContent key={i} item={item} />
          ))}
        </div>
      )} */}
      <div className="flex min-w-full overflow-x-auto pb-2.5">

        <LivestreamContent key={1} item={data[0]} />

      </div>
    </div>
  );
};

export default Livestream;