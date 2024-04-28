import image1 from '../assets/carousel/image1.png';
import image2 from '../assets/carousel/image2.png';
import headingImage1 from '../assets/middle-banner.jpg';
import product1 from '../assets/products/product1.png';
import product2 from '../assets/products/product2.png';
import { type HeaderBannerProps } from '../components/HeaderBanner';
import { type ProductCategoriesProps } from '../components/ProductCategories';
import { type ProductListProps } from '../components/ProductList';

export interface HomePageData {
  headerBannerProps: HeaderBannerProps;
  bestSellerList: ProductListProps;
  recommendedList: ProductListProps;
  newArrivalsList: ProductListProps;
  productCategories: ProductCategoriesProps;
  allTimeFavorites: ProductListProps;
}

export const loader = async (): Promise<HomePageData> => {
  return {
    headerBannerProps: {
      images: [
        { link: image2, name: 'image 2' },
        { link: image1, name: 'image 1' },
        { link: image2, name: 'image 2' },
        { link: image1, name: 'image 1' },
        { link: image2, name: 'image 2' },
        { link: image1, name: 'image 1' }
      ]
    },
    productCategories: {
      categories: [
        {
          name: 'Whisky',
          image: 'https://cdn.winecenturybros.com/images/static/whisky.png',
          link: '/products?type=whisky'
        },
        {
          name: 'Scotch',
          image: 'https://cdn.winecenturybros.com/images/static/scotch.png',
          link: '/products?type=scotch'
        },
        {
          name: 'Brandy',
          image: 'https://cdn.winecenturybros.com/images/static/brandy.png',
          link: '/products?type=brandy'
        },
        {
          name: 'Tequila',
          image: 'https://cdn.winecenturybros.com/images/static/tequila.png',
          link: '/products?type=tequila'
        },
        {
          name: 'Vodka',
          image: 'https://cdn.winecenturybros.com/images/static/vodka.png',
          link: '/products?type=vodka'
        },
        {
          name: 'Gin',
          image: 'https://cdn.winecenturybros.com/images/static/gin.png',
          link: '/products?type=gin'
        },
        {
          name: 'Wine',
          image: 'https://cdn.winecenturybros.com/images/static/wine.png',
          link: '/products?type=wine'
        },
        {
          name: 'Liqueurs',
          image: 'https://cdn.winecenturybros.com/images/static/liqueur.png',
          link: '/products?type=liqueurs'
        }
      ]
    },
    bestSellerList: {
      title: 'Best Sellers',
      viewAllLink: '',
      products: [
        {
          name: 'Montes Purple Angel Carmenere Petit Berdot',
          image: product1,
          price: '10,000 PHP',
          detailsLink: '/products/1',
          addToCartLink: ''
        },
        {
          name: 'Braes Speyside Single Malt Scotch Whiskey',
          image: product2,
          price: '30,000 PHP',
          detailsLink: '/products/2',
          addToCartLink: ''
        },
        {
          name: 'Montes Purple Angel Carmenere Petit Berdot',
          image: product1,
          price: '10,000 PHP',
          detailsLink: '/products/3',
          addToCartLink: ''
        },
        {
          name: 'Braes Speyside Single Malt Scotch Whiskey',
          image: product2,
          price: '30,000 PHP',
          detailsLink: '/products/4',
          addToCartLink: ''
        },
        {
          name: 'Montes Purple Angel Carmenere Petit Berdot',
          image: product1,
          price: '10,000 PHP',
          detailsLink: '/products/5',
          addToCartLink: ''
        },
        {
          name: 'Braes Speyside Single Malt Scotch Whiskey',
          image: product2,
          price: '30,000 PHP',
          detailsLink: '/products/6',
          addToCartLink: ''
        },
        {
          name: 'Montes Purple Angel Carmenere Petit Berdot',
          image: product1,
          price: '10,000 PHP',
          detailsLink: '/products/7',
          addToCartLink: ''
        },
        {
          name: 'Braes Speyside Single Malt Scotch Whiskey',
          image: product2,
          price: '30,000 PHP',
          detailsLink: '/products/8',
          addToCartLink: ''
        }
      ]
    },
    recommendedList: {
      title: 'Recommended Buys',
      headingImage: headingImage1,
      viewAllLink: '',
      products: [
        {
          name: 'Montes Purple Angel Carmenere Petit Berdot',
          image: product1,
          price: '10,000 PHP',
          detailsLink: '/products/1',
          addToCartLink: ''
        },
        {
          name: 'Braes Speyside Single Malt Scotch Whiskey',
          image: product2,
          price: '30,000 PHP',
          detailsLink: '/products/2',
          addToCartLink: ''
        },
        {
          name: 'Montes Purple Angel Carmenere Petit Berdot',
          image: product1,
          price: '10,000 PHP',
          detailsLink: '/products/3',
          addToCartLink: ''
        },
        {
          name: 'Braes Speyside Single Malt Scotch Whiskey',
          image: product2,
          price: '30,000 PHP',
          detailsLink: '/products/4',
          addToCartLink: ''
        },
        {
          name: 'Montes Purple Angel Carmenere Petit Berdot',
          image: product1,
          price: '10,000 PHP',
          detailsLink: '/products/5',
          addToCartLink: ''
        },
        {
          name: 'Braes Speyside Single Malt Scotch Whiskey',
          image: product2,
          price: '30,000 PHP',
          detailsLink: '/products/6',
          addToCartLink: ''
        },
        {
          name: 'Montes Purple Angel Carmenere Petit Berdot',
          image: product1,
          price: '10,000 PHP',
          detailsLink: '/products/7',
          addToCartLink: ''
        },
        {
          name: 'Braes Speyside Single Malt Scotch Whiskey',
          image: product2,
          price: '30,000 PHP',
          detailsLink: '/products/8',
          addToCartLink: ''
        }
      ]
    },
    newArrivalsList: {
      title: 'New Arrivals',
      viewAllLink: '',
      products: [
        {
          name: 'Montes Purple Angel Carmenere Petit Berdot',
          image: product1,
          price: '10,000 PHP',
          detailsLink: '/products/1',
          addToCartLink: ''
        },
        {
          name: 'Braes Speyside Single Malt Scotch Whiskey',
          image: product2,
          price: '30,000 PHP',
          detailsLink: '/products/2',
          addToCartLink: ''
        },
        {
          name: 'Montes Purple Angel Carmenere Petit Berdot',
          image: product1,
          price: '10,000 PHP',
          detailsLink: '/products/3',
          addToCartLink: ''
        },
        {
          name: 'Braes Speyside Single Malt Scotch Whiskey',
          image: product2,
          price: '30,000 PHP',
          detailsLink: '/products/4',
          addToCartLink: ''
        },
        {
          name: 'Montes Purple Angel Carmenere Petit Berdot',
          image: product1,
          price: '10,000 PHP',
          detailsLink: '/products/5',
          addToCartLink: ''
        },
        {
          name: 'Braes Speyside Single Malt Scotch Whiskey',
          image: product2,
          price: '30,000 PHP',
          detailsLink: '/products/6',
          addToCartLink: ''
        },
        {
          name: 'Montes Purple Angel Carmenere Petit Berdot',
          image: product1,
          price: '10,000 PHP',
          detailsLink: '/products/7',
          addToCartLink: ''
        },
        {
          name: 'Braes Speyside Single Malt Scotch Whiskey',
          image: product2,
          price: '30,000 PHP',
          detailsLink: '/products/8',
          addToCartLink: ''
        }
      ]
    },
    allTimeFavorites: {
      title: 'All time Favorites',
      viewAllLink: '',
      products: [
        {
          name: 'Montes Purple Angel Carmenere Petit Berdot',
          image: product1,
          price: '10,000 PHP',
          detailsLink: '/products/1',
          addToCartLink: ''
        },
        {
          name: 'Braes Speyside Single Malt Scotch Whiskey',
          image: product2,
          price: '30,000 PHP',
          detailsLink: '/products/2',
          addToCartLink: ''
        },
        {
          name: 'Montes Purple Angel Carmenere Petit Berdot',
          image: product1,
          price: '10,000 PHP',
          detailsLink: '/products/3',
          addToCartLink: ''
        },
        {
          name: 'Braes Speyside Single Malt Scotch Whiskey',
          image: product2,
          price: '30,000 PHP',
          detailsLink: '/products/4',
          addToCartLink: ''
        },
        {
          name: 'Montes Purple Angel Carmenere Petit Berdot',
          image: product1,
          price: '10,000 PHP',
          detailsLink: '/products/5',
          addToCartLink: ''
        },
        {
          name: 'Braes Speyside Single Malt Scotch Whiskey',
          image: product2,
          price: '30,000 PHP',
          detailsLink: '/products/6',
          addToCartLink: ''
        },
        {
          name: 'Montes Purple Angel Carmenere Petit Berdot',
          image: product1,
          price: '10,000 PHP',
          detailsLink: '/products/7',
          addToCartLink: ''
        },
        {
          name: 'Braes Speyside Single Malt Scotch Whiskey',
          image: product2,
          price: '30,000 PHP',
          detailsLink: '/products/8',
          addToCartLink: ''
        }
      ]
    }
  };
};
