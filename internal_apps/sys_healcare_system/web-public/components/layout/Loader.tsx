import React from 'react';
import _ from 'lodash';

const Loader: React.FC = () => (
  <div className="loader">
    <div className="loader-box">
      {_.map(Array(26), (_e: undefined, i: number) =>
        <div key={i}></div>
      )}
    </div>
  </div>
);

export default Loader;