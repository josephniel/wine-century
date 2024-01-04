import { HeaderBannerImageProps, HeaderBannerProps } from '../components/HeaderBanner';
import { ProductListProps } from '../components/ProductList';

import image1 from '../assets/carousel/image1.png';
import image2 from '../assets/carousel/image2.png';

import product1 from '../assets/products/product1.png';
import product2 from '../assets/products/product2.png';

export interface HomePageData {
  headerBannerProps: HeaderBannerProps;
  bestSellerList: ProductListProps;
  recommendedList: ProductListProps;
  newArrivalsList: ProductListProps;
}

export const loader = async (): Promise<HomePageData> => {
  return {
    headerBannerProps: {
      images: [
        { link: image2, name: "image 2" },
        { link: image1, name: "image 1" },
        { link: image2, name: "image 2" },
        { link: image1, name: "image 1" },
        { link: image2, name: "image 2" },
        { link: image1, name: "image 1" },
      ]
    },
    bestSellerList: {
      title: "Best Sellers",
      viewAllLink: '',
      products: [
        {
          name: "Montes Purple Angel Carmenere Petit Berdot",
          image: product1,
          price: "10,000 PHP",
          detailsLink: '/products/1',
        },
        {
          name: "Braes Speyside Single Malt Scotch Whiskey",
          image: product2,
          price: "30,000 PHP",
          detailsLink: '/products/2',
        },
        {
          name: "Montes Purple Angel Carmenere Petit Berdot",
          image: product1,
          price: "10,000 PHP",
          detailsLink: '/products/3',
        },
        {
          name: "Braes Speyside Single Malt Scotch Whiskey",
          image: product2,
          price: "30,000 PHP",
          detailsLink: '/products/4',
        },
        {
          name: "Montes Purple Angel Carmenere Petit Berdot",
          image: product1,
          price: "10,000 PHP",
          detailsLink: '/products/5',
        },
        {
          name: "Braes Speyside Single Malt Scotch Whiskey",
          image: product2,
          price: "30,000 PHP",
          detailsLink: '/products/6',
        },
        {
          name: "Montes Purple Angel Carmenere Petit Berdot",
          image: product1,
          price: "10,000 PHP",
          detailsLink: '/products/5',
        },
        {
          name: "Braes Speyside Single Malt Scotch Whiskey",
          image: product2,
          price: "30,000 PHP",
          detailsLink: '/products/6',
        },
      ],
    },
    recommendedList: {
      title: "Recommended Buys",
      viewAllLink: "",
      products: [
        {
          name: "Montes Purple Angel Carmenere Petit Berdot",
          image: product1,
          price: "10,000 PHP",
          detailsLink: '/products/1',
        },
        {
          name: "Braes Speyside Single Malt Scotch Whiskey",
          image: product2,
          price: "30,000 PHP",
          detailsLink: '/products/2',
        },
        {
          name: "Montes Purple Angel Carmenere Petit Berdot",
          image: product1,
          price: "10,000 PHP",
          detailsLink: '/products/3',
        },
        {
          name: "Braes Speyside Single Malt Scotch Whiskey",
          image: product2,
          price: "30,000 PHP",
          detailsLink: '/products/4',
        },
        {
          name: "Montes Purple Angel Carmenere Petit Berdot",
          image: product1,
          price: "10,000 PHP",
          detailsLink: '/products/5',
        },
        {
          name: "Braes Speyside Single Malt Scotch Whiskey",
          image: product2,
          price: "30,000 PHP",
          detailsLink: '/products/6',
        },
        {
          name: "Montes Purple Angel Carmenere Petit Berdot",
          image: product1,
          price: "10,000 PHP",
          detailsLink: '/products/5',
        },
        {
          name: "Braes Speyside Single Malt Scotch Whiskey",
          image: product2,
          price: "30,000 PHP",
          detailsLink: '/products/6',
        },
      ],
    },
    newArrivalsList: {
      title: "New Arrivals",
      viewAllLink: "",
      products: [
        {
          name: "Montes Purple Angel Carmenere Petit Berdot",
          image: product1,
          price: "10,000 PHP",
          detailsLink: '/products/1',
        },
        {
          name: "Braes Speyside Single Malt Scotch Whiskey",
          image: product2,
          price: "30,000 PHP",
          detailsLink: '/products/2',
        },
        {
          name: "Montes Purple Angel Carmenere Petit Berdot",
          image: product1,
          price: "10,000 PHP",
          detailsLink: '/products/3',
        },
        {
          name: "Braes Speyside Single Malt Scotch Whiskey",
          image: product2,
          price: "30,000 PHP",
          detailsLink: '/products/4',
        },
        {
          name: "Montes Purple Angel Carmenere Petit Berdot",
          image: product1,
          price: "10,000 PHP",
          detailsLink: '/products/5',
        },
        {
          name: "Braes Speyside Single Malt Scotch Whiskey",
          image: product2,
          price: "30,000 PHP",
          detailsLink: '/products/6',
        },
        {
          name: "Montes Purple Angel Carmenere Petit Berdot",
          image: product1,
          price: "10,000 PHP",
          detailsLink: '/products/5',
        },
        {
          name: "Braes Speyside Single Malt Scotch Whiskey",
          image: product2,
          price: "30,000 PHP",
          detailsLink: '/products/6',
        },
      ],
    },
  };
}
