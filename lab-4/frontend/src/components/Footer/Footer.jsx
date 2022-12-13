import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './Footer.module.css';

const Footer = (props) => {
  return (
    <footer styleName="main-footer" className="theme">
      <p stylename="footer-text">Copyright © WebLab4 2022. Все права защищены.</p>
      <p stylename="footer-text"><a href="https://mcbrawl.ru/">Sponsored by BrawlCraft LCD</a></p>
    </footer>
  );
}

export default CSSModules(Footer, styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' });
