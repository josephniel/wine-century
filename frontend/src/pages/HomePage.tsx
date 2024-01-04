import React from "react";
import { useLoaderData } from "react-router-dom";

import "./HomePage.css";
import Carousel from "../components/Carousel";
import { HomePageData } from "../loaders/HomePageLoader";

const Homepage: React.FC = () => {
  const data = useLoaderData() as HomePageData;

  return (
    <section className="homePage">
      <Carousel images={data.carouselImages} />
    </section>
  );
}
  

export default Homepage;
