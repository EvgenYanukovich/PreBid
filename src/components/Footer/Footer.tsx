import React from 'react';
import FooterTop from './FooterTop';
import FooterBottom from './FooterBottom';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <FooterTop />
      <hr className={styles.divider} />
      <FooterBottom />
    </footer>
  );
};

export default Footer;
