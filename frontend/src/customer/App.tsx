import './App.scss';

import React, { type PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

import Footer, { type FooterProps } from './components/Footer';
import Header, { type HeaderProps } from './components/Header';

export interface AppProps extends PropsWithChildren {
  header: HeaderProps;
  footer: FooterProps;
}

const App: React.FunctionComponent<AppProps> = ({ header, footer }) => (
  <div className="app">
    <Header {...header} />
    <Outlet />
    <Footer {...footer} />
  </div>
);

export default App;
