declare module 'raw-html-react' {
  import * as React from 'react';

  interface RawHtmlProps {
    html: string;
    className?: string;
    componentMap?: React.ReactNode;
  }

  const RawHtml: React.FC<RawHtmlProps>;

  export default RawHtml;
}