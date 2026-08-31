import React from 'react';
import _ from 'lodash';

const NewsNav: React.FC = () => {
  return (
    <div className="news-nav">
      <div className="container w-100">
        <div className="row m-row">
          <div className="col-10 offset-2">
            <ul>
              <li><a href="/">COVID-19</a></li>
              <li><a href="/">Y tế 24h</a></li>
              <li><a href="/">Sống khỏe</a></li>
              <li><a href="/">Vac-xin</a></li>
              <li><a href="/">Mẹ và bé</a></li>
              <li><a href="/">Kỹ năng sống</a></li>
              <li><a href="/">Sức khỏe giới tính</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsNav;