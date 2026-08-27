import React from 'react';

interface FlaticonProps {
  icon: string;
}

const Flaticon: React.FC<FlaticonProps> = ({ icon }) => (
  <i className={`fi flaticon-${icon}`}></i>
);

export default Flaticon;