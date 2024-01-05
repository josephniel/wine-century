import React from 'react';
import ScrollCarousel from 'scroll-carousel-react';

import './ProductList.scss';

export interface ProductProps {
  name: string;
  image: string;
  price: string;
  detailsLink: string;
}

export interface ProductListProps {
  title: string;
  products: ProductProps[];
  viewAllLink: string;
}

const ProductList: React.FunctionComponent<ProductListProps> = (props) => 
  <section className="productList">
    <div className='inner'>
      <div className='heading'>{props.title}</div>
      {
        props.products.length > 0 ?
          <ScrollCarousel
            autoplay
            autoplaySpeed={0.5}
            speed={5}
            margin={30}
          >
            {props.products.map((product: ProductProps, index: number) =>
              <div key={index} className='productCard'>
                <img src={product.image} alt={product.name} />
                <div>{product.name}</div>
                <div>{product.price}</div>
                <div>
                  <a href={product.detailsLink}>Buy Now</a>
                </div>
              </div>
            )}
          </ScrollCarousel> :
          null
      }
      <div className='footing'>
        <a href={props.viewAllLink}>View All</a>
      </div>
    </div>
  </section>;

export default ProductList;