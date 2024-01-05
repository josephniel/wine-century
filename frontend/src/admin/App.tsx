import React from 'react';
import { Outlet } from 'react-router-dom';

import './App.scss';

export interface AppProps {
  name: 'Wine Century Admin Portal';
}

const App: React.FunctionComponent<AppProps> = (props: AppProps) => (
  <div className="app">
    {props.name}
    <Outlet />
  </div>
);

export default App;
