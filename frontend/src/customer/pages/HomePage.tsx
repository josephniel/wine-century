import './HomePage.scss';

import React from 'react';
import { useLoaderData } from 'react-router-dom';

import middleBanner from '../assets/middle-banner.jpg';
import HeaderBanner from '../components/HeaderBanner';
import ProductCategories from '../components/ProductCategories';
import ProductList from '../components/ProductList';
import { type HomePageData } from '../loaders/HomePageLoader';

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

          <ProductList {...data.newArrivalsList} />
        </div>
      </div>

      <div className="productHighlight">
        <div className="inner">
          <ProductList {...data.recommendedList} />
        </div>
      </div>

      <div className="productSummary">
        <div className="inner">
          <ProductCategories {...data.productCategories} />

          <ProductList {...data.allTimeFavorites} />
        </div>
      </div>
    </section>
  );
};

export default Homepage;
