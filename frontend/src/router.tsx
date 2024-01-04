import { createBrowserRouter } from "react-router-dom";

import App, { AppProps } from "./App";
import appData from "./AppData";

import { loader as HomePageLoader } from "./loaders/HomePageLoader";

import ErrorNotFoundPage from "./pages/ErrorNotFoundPage";
import Homepage from "./pages/HomePage";
import ProductDetails from "./pages/ProductDetails";

export default createBrowserRouter([
  {
    element: <App {...(appData as AppProps)} />,
    children: [
      {
        path: "/",
        element: <Homepage />,
        loader: HomePageLoader,
      },
      {
        path: "/products?type=:productType",
        element: <ProductDetails />,
      },
      {
        path: "/products/:productID",
        element: <ProductDetails />,
      },
      {
        path: "*",
        element: <ErrorNotFoundPage />,
      },
    ]
  }
]);

