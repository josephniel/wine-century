import './ErrorNotFoundPage.scss';

import React from 'react';

import image404 from '../assets/404-not-found.png';

const ErrorNotFoundPage: React.FC = () => (
  <section className="errorPage">
    <img className="image404" src={image404} alt="Page not found" />
  </section>
);

export default ErrorNotFoundPage;
