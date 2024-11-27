import React, { useEffect, useState } from 'react';
import styles from './FooterTop.module.scss';

interface FooterLink {
  text: string;
  url: string;
}

interface LinkBlock {
  title: string;
  links: FooterLink[];
}

const FooterTop: React.FC = () => {
  const [linkBlocks, setLinkBlocks] = useState<LinkBlock[]>([]);

  useEffect(() => {
    import('../../data/footerLinks.json')
      .then((data) => setLinkBlocks(data.default))
      .catch((error) => console.error('Ошибка загрузки ссылок:', error));
  }, []);

  return (
    <div className={styles.footerTop}>
      {linkBlocks.map((block, index) => (
        <div className={styles.linkBlock} key={index}>
          <h3 className={styles.linkTitle}>{block.title}</h3>
          <ul>
            {block.links.map((link, i) => (
              <li key={i} className={styles.linkItem}>
                <a href={link.url}>{link.text}</a>
              </li>
            ))}
          </ul>
          {index !== linkBlocks.length - 1 && <div className={styles.dividerLine}></div>}
        </div>
      ))}
    </div>
  );
};

export default FooterTop;
