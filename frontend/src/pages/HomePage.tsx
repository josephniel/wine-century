import React from "react";
import { useLoaderData } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

import "./HomePage.css";
import { HomePageData } from "../loaders/HomePageLoader";

const Homepage: React.FC = () => {
  const data = useLoaderData() as HomePageData;

  const settings = {
    className: "slider",
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };

  return (
    <section className="homePage">
      <Slider {...settings}>
        {data.carouselImages.map((image: string, index: number) => <div key={index}><img src={image} alt={`Carousel ${index}`} /></div>)}
      </Slider>
    </section>
  );
}
  

export default Homepage;
