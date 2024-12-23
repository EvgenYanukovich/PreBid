import Search from '../ui/Search/SearchBar';
import Button from '../ui/Button/Button';
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { logoutAsync } from '../../store/slices/authSlice';
import styles from "./Header.module.scss";

interface HeaderBottomProps {
    onAuthClick: () => void;
    isAuthenticated: boolean;
    userFullName: string;
}

const MENU_ITEMS = [
    { label: "Главная", path: "/" },
    { label: "О нас", path: "/about" },
    { label: "Услуги", path: "/services" },
    { label: "Контакты", path: "/contacts" }
];

const HeaderDown: React.FC<HeaderBottomProps> = ({ 
    onAuthClick, 
    isAuthenticated, 
    userFullName 
}) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleUserNameClick = async () => {
        try {
            await dispatch(logoutAsync());
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    return (
        <>
            <div className={styles.headerDown}>
                <div className={styles.headerDownLeft}>
                    <img src='/logo.png' alt="PreBid Logo" />
                    <nav className={styles.headerNav}>
                        <ul className={styles.navList}>
                            {MENU_ITEMS.map((item) => (
                                <li key={item.path} className={styles.navItem}>
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            isActive ? styles.active : ""
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
                    {isAuthenticated ? (
                        <span 
                            className={styles.userName}
                            onClick={handleUserNameClick}
                        >
                            {userFullName}
                        </span>
                    ) : (
                        <Button 
                            styleButton='blueButton'
                            onClick={onAuthClick}
                        >
                            Вход/Регистрация
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
};

export default HeaderDown;