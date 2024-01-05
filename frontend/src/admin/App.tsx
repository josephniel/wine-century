import React from 'react';
import { Outlet } from "react-router-dom";

import './App.scss';

export interface AppProps {}

const App: React.FunctionComponent<AppProps> = (props: AppProps) =>
  <div className="app">
    Wine Century Admin Portal
    <Outlet />
  </div >;

export default App;
