import React from 'react';
import { Outlet } from 'react-router-dom';

import './App.scss';
import Header, { type HeaderProps } from './components/Header';
import Footer from './components/Footer';

export interface AppProps {
  header: HeaderProps;
}

const App: React.FunctionComponent<AppProps> = (props: AppProps) => (
  <div className="app">
    <Header {...props.header} />
    <Outlet />
    <Footer />
  </div>
);

export default App;
