import React from 'react';
import classNames from 'classnames';

interface FlaticonProps {
  icon: string;
  className?: string;
}

const Flaticon: React.FC<FlaticonProps> = ({ icon, className }) => (
  <i className={classNames(`fi flaticon-${icon}`, className)}></i>
);

export default Flaticon;