import React, { PropsWithChildren } from 'react';
import { Outlet } from "react-router-dom";

import './App.css';
import Header, { HeaderProps } from './components/Header';
import Footer, { FooterProps } from './components/Footer';

export interface AppProps extends PropsWithChildren {
  header: HeaderProps;
  footer: FooterProps;
}

const App: React.FunctionComponent<AppProps> = ({ header, footer }) =>
  <div className="app">
    <Header {...header} />
      <Outlet />
    <Footer {...footer} />
  </div >;

export default App;
