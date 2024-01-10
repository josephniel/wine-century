import React from 'react';

import './Header.scss';
import headerLogo from '../assets/wine-century-logo.jpg';
import searchLogo from '../assets/header/search.svg';
import cartLogo from '../assets/header/cart.svg';
import wishlistLogo from '../assets/header/wishlist.svg';

export interface HeaderProps {
  primaryHeader: PrimaryHeaderProps;
  navigation: NavigationProps;
}

interface PrimaryHeaderProps {
  homeLink: string;
  shopLink: string;
  aboutUsLink: string;
  wishlist: WishlistProps;
  cart: CartProps;
}

interface NavigationProps {
  links: LinkProps[];
}

interface LinkProps {
  url: string;
  name: string;
}

interface WishlistProps {
  link: string;
  count: number;
}

interface CartProps {
  link: string;
  count: number;
}

const SearchBar: React.FC = () => (
  <div className="searchbar">
    <input type="text" placeholder="I'm looking for..." className="textarea" />
    <img src={searchLogo} alt="search" />
  </div>
);

const PrimaryHeader: React.FC<PrimaryHeaderProps> = (props) => (
  <section className="primary">
    <a href={props.homeLink}>
      <img className="logo" src={headerLogo} alt="Wine Century" />
    </a>
    <div className="actions">
      <a href={props.shopLink}>Shop</a>
      <a href={props.aboutUsLink}>About us</a>

      <SearchBar />

      <a href={props.wishlist.link} className="wishlist">
        <img src={wishlistLogo} alt="cart" />
        {props.wishlist.count}
      </a>

      <a href={props.cart.link} className="cart">
        <img src={cartLogo} alt="cart" />
        {props.cart.count}
      </a>
    </div>
  </section>
);

const NavigationBar: React.FC<NavigationProps> = (props) => (
  <section className="navigation">
    <div className="inner">
      {props.links.map((link: LinkProps, index: number) => (
        <a href={link.url} key={index}>
          {link.name}
        </a>
      ))}
    </div>
  </section>
);

const Header: React.FC<HeaderProps> = ({ primaryHeader, navigation }) => (
  <header className="header shadow">
    <PrimaryHeader {...primaryHeader} />
    <NavigationBar {...navigation} />
  </header>
);

export default Header;
