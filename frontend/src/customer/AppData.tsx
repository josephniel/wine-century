import { type AppProps } from './App';

const data: AppProps = {
  header: {
    primaryHeader: {
      homeLink: '/',
      shopLink: '/shop',
      aboutUsLink: '/about-us',
      wishlist: {
        link: '/wishlist',
        count: 0
      },
      cart: {
        link: '/cart',
        count: 0
      }
    },
    navigation: {
      links: [
        {
          name: 'Whisky',
          url: '/products/whisky'
        },
        {
          name: 'Scotch',
          url: '/products/scotch'
        },
        {
          name: 'Brandy',
          url: '/products/brandy'
        },
        {
          name: 'Tequila',
          url: '/products/tequila'
        },
        {
          name: 'Vodka',
          url: '/products/vodka'
        },
        {
          name: 'Gin',
          url: '/products/gin'
        },
        {
          name: 'Wine',
          url: '/products/wine'
        },
        {
          name: 'Liqueurs',
          url: '/products/liqueurs'
        }
      ]
    }
  },
  footer: {
    contactUs: {
      address:
        'G/F Chinatown Lai-Lai Hotel 801 Ongpin cor, Sabino Padilla St, Sta Cruz, Manila, Manila, 1009 Metro Manila',
      email: 'winecenturybros@gmail.com',
      phone: '(02) 8742 9192',
      facebookLink: '',
      instagramLink: '',
      wechatLink: '',
      whatsappLink: ''
    }
  }
};

export default data;
