import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HeaderBanner.scss';

import React from 'react';
import Slider from 'react-slick';

export interface HeaderBannerImageProps {
  link: string;
  name: string;
}

export interface HeaderBannerProps {
  images: HeaderBannerImageProps[];
}

const HeaderBanner: React.FunctionComponent<HeaderBannerProps> = (props) => {
  const settings = {
    className: 'slider',
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'ease-in-out'
  };

  return (
    <Slider {...settings}>
      {props.images.map(({ link, name }, index: number) => (
        <div key={index}>
          <img src={link} alt={name} />
        </div>
      ))}
    </Slider>
  );
};

export default HeaderBanner;
