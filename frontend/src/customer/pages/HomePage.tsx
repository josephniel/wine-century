import React from 'react';
import { useLoaderData } from 'react-router-dom';

import './HomePage.scss';
import { type HomePageData } from '../loaders/HomePageLoader';
import middleBanner from '../assets/middle-banner.jpg';

import HeaderBanner from '../components/HeaderBanner';
import ProductList from '../components/ProductList';

const Homepage: React.FC = () => {
  const data = useLoaderData() as HomePageData;

  return (
    <section className="homePage">
      <HeaderBanner {...data.headerBannerProps} />

      <div className="productSummary">
        <div className="inner">
          <ProductList {...data.bestSellerList} />

          <section className="middleBanner">
            <img src={middleBanner} alt="Middle banner" />
          </section>

          <section className="productListColumns">
            <ProductList {...data.newArrivalsList} />
            <ProductList {...data.recommendedList} />
          </section>

          <section className="productListColumns">
            <ProductList {...data.newArrivalsList} />
            <ProductList {...data.recommendedList} />
          </section>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
