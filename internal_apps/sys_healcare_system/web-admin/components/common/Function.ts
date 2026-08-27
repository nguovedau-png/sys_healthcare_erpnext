import React, { useEffect } from 'react';

interface ScrollState {
  transform: number;
}

interface ScrollComponent {
  setState: (state: Partial<ScrollState>) => void;
}

export const scrollToFixedNav = function(this: ScrollComponent, e: Event): void {
  if (typeof window === 'undefined') return;
  
  const target = e.target as HTMLElement;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const itemTranslate = Math.min(0, scrollTop / 3 - 60);

  this.setState({
    transform: itemTranslate
  });
}

interface ViewportDimensions {
  width: number;
  height: number;
}

// custom hook
export const useViewport = (): ViewportDimensions => {
  const [width, setWidth] = React.useState<number>(0);
  const [height, setHeight] = React.useState<number>(0);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);

      const handleWindowResize = (): void => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      }

      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }
  }, []);

  return { width, height };
}