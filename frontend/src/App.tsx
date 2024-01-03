import React from 'react';

import './App.css';
import Header, { HeaderProps } from './components/Header';
import Footer, { FooterProps } from './components/Footer';

export interface AppProps {
  header: HeaderProps;
  footer: FooterProps;
}

const App: React.FunctionComponent<AppProps> = ({ header, footer }) =>
  <div className="app">
    <Header {...header} />
    <div style={{ height: '1000px' }}>Foo</div>
    <Footer {...footer} />
  </div >;

export default App;
