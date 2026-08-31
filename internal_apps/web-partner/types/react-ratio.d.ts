declare module 'react-ratio' {
  import * as React from 'react';

  interface RatioProps {
    ratio: number;
    children: React.ReactNode;
    className?: string;
  }

  const Ratio: React.FC<RatioProps>;

  export default Ratio;
}