import React from 'react';
import styles from './FooterBottom.module.scss';

const socialIcons = [
    { icon: '/src/assets/images/icons/facebook.png', alt: 'Facebook', href: '#' },
    { icon: '/src/assets/images/icons/instagram.png', alt: 'Instagram', href: '#' },
    { icon: '/src/assets/images/icons/vk.png', alt: 'VK', href: '#' },
    { icon: '/src/assets/images/icons/vimeo.png', alt: 'Vimeo', href: '#' },
    { icon: '/src/assets/images/icons/youtube.png', alt: 'YouTube', href: '#' },
];

const FooterBottom: React.FC = () => {
    return (
        <div className={styles.footerBottom}>
            <div className={styles.copyright}>
                © 2024 Your Company. All rights reserved.
            </div>
            <div className={styles.socialLinks}>
                {socialIcons.map((item, index) => (
                    <a key={index} href={item.href}>
                        <img src={item.icon} alt={item.alt} />
                    </a>
                ))}
            </div>
        </div>
    );
};

export default FooterBottom;
