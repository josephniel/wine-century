import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProductList.scss';

import React from 'react';
import Slider from 'react-slick';

export interface ProductProps {
  name: string;
  image: string;
  price: string;
  detailsLink: string;
  addToCartLink: string;
}

export interface ProductListProps {
  title: string;
  headingImage?: string | undefined;
  products: ProductProps[];
  viewAllLink: string;
}

const ProductList: React.FunctionComponent<ProductListProps> = (props) => {
  const settings = {
    className: 'slider',
    arrows: true,
    dots: false,
    infinite: true,
    centerPadding: '1px',
    centerMode: false,
    slidesToShow: 5,
    variableWidth: false,
    autoplay: true,
    autoplaySpeed: 6000,
    cssEase: 'ease-in-out'
  };

  return (
    <section className="productList">
      <div className="inner">
        <div className="heading">
          Wine Century&apos;s{` `}
          <b>{props.title.toUpperCase()}</b>
          <a href={props.viewAllLink}>VIEW ALL</a>
        </div>

        {props.headingImage !== undefined ? (
          <section className="headingImage">
            <img src={props.headingImage} alt="Heading image" />
          </section>
        ) : null}

        {props.products.length > 0 ? (
          <Slider {...settings}>
            {props.products.map((product: ProductProps, index: number) => (
              <div key={index} className="productCard">
                <a href={product.detailsLink}>
                  <img className="productThumbnail" src={product.image} alt={product.name} />
                </a>
                <div className="productDescription">
                  <div>{product.name}</div>
                  <div>{product.price}</div>
                  <div>
                    <a href={product.addToCartLink}>Add to cart</a>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : null}
      </div>
    </section>
  );
};

export default ProductList;
