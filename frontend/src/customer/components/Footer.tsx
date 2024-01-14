import './Footer.scss';

import React from 'react';

import addressLogo from '../assets/footer/address.svg';
import emailLogo from '../assets/footer/email.svg';
import facebookLogo from '../assets/footer/facebook.svg';
import instagramLogo from '../assets/footer/instagram.svg';
import phoneLogo from '../assets/footer/phone.svg';
import wechatIcon from '../assets/footer/wechat.svg';
import whatsappLogo from '../assets/footer/whatsapp.svg';

export interface FooterProps {
  contactUs: ContactUsProps;
}

interface ContactUsProps {
  address: string;
  email: string;
  phone: string;
  facebookLink: string;
  instagramLink: string;
  whatsappLink: string;
  wechatLink: string;
}

const ContactUs: React.FC<ContactUsProps> = (props) => (
  <section className="contactUs">
    <div className="inner">
      <p className="heading">Connect with us</p>

      <div className="row">
        <img src={addressLogo} alt="address" />
        {props.address}
      </div>

      <div className="row">
        <img src={emailLogo} alt="email" />
        {props.email}
      </div>

      <div className="row">
        <img src={phoneLogo} alt="phone" />
        {props.phone}
      </div>

      <div className="socials">
        <a href={props.facebookLink}>
          <img src={facebookLogo} alt="facebook" />
        </a>

        <a href={props.instagramLink}>
          <img src={instagramLogo} alt="instagram" />
        </a>

        <a href={props.whatsappLink}>
          <img src={whatsappLogo} alt="whatsapp" />
        </a>

        <a href={props.wechatLink}>
          <img src={wechatIcon} alt="wechat" />
        </a>
      </div>
    </div>
  </section>
);

const Credits: React.FC = () => (
  <section className="credits">
    <div className="inner">Copyright © {new Date().getFullYear()} Wine Century Bros Phil Inc.</div>
  </section>
);

const Footer: React.FC<FooterProps> = ({ contactUs }) => (
  <footer className="footer">
    <ContactUs {...contactUs} />
    <Credits />
  </footer>
);

export default Footer;
