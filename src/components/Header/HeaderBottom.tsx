import Search from '../ui/Search/SearchBar';
import Button from '../ui/Button/Button';
import { NavLink } from "react-router-dom";

import styles from "./Header.module.scss";

const navItems = [
    { label: "Главная", path: "/" },
    { label: "О нас", path: "/about" },
    { label: "Услуги", path: "/services" },
    { label: "Контакты", path: "/contacts" }
];

const HeaderDown: React.FC = () => {
    return (
        <>
            <div className={styles.headerDown}>
                <div className={styles.headerDownLeft}>
                    <img src='/logo.png' />
                    <nav className={styles.headerNav}>
                        <ul className={styles.navList}>
                            {navItems.map((item, index) => (
                                <li key={index} className={styles.navItem}>
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                                        }
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className={styles.headerDownRight}>
                    <Search />
                    <Button styleButton='blueButton'>Вход/Регистрация</Button>
                </div>
            </div>
        </>
    );
}

export default HeaderDown