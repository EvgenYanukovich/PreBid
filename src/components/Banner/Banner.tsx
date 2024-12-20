import { useState, useEffect } from "react";
import Button from "../ui/Button/Button";
import styles from "./Banner.module.scss";
import authService from "../../services/auth.service";
import authEvents from "../../services/auth.events";
import Modal from "../ui/Modal/Modal";
import LoginForm from "../Auth/LoginForm";
import RegisterForm from "../Auth/RegisterForm";

const Banner = () => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());

    useEffect(() => {
        // Подписываемся на изменения состояния авторизации
        const unsubscribe = authEvents.subscribe(() => {
            setIsAuthenticated(authService.isAuthenticated());
        });

        // Отписываемся при размонтировании
        return () => unsubscribe();
    }, []);

    const handleAuthClick = (isLogin: boolean) => {
        setIsLoginMode(isLogin);
        setIsAuthModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsAuthModalOpen(false);
        setIsLoginMode(true);
    };

    const handleAuthSuccess = () => {
        handleCloseModal();
    };

    // Если пользователь авторизован, не показываем баннер
    if (isAuthenticated) {
        return null;
    }

    return (
        <>
            <section className={styles.banner}>
                <div className={styles.bannerContent}>
                    <h1>Надежный способ продажи<br/>и покупки авто через аукцион</h1>
                    <div>
                        <Button styleButton="greenButton" onClick={() => handleAuthClick(false)}>
                            Зарегистрироваться
                        </Button>
                        <Button styleButton="blueButton" onClick={() => handleAuthClick(true)}>
                            Войти
                        </Button>
                    </div>
                </div>
                <img src="/banner-car.png" alt="Car" className="banner-image" />
            </section>

            <Modal isOpen={isAuthModalOpen} onClose={handleCloseModal}>
                {isLoginMode ? (
                    <LoginForm 
                        onRegisterClick={() => setIsLoginMode(false)}
                        onSuccess={handleAuthSuccess}
                        onLoginClick={handleAuthSuccess}
                    />
                ) : (
                    <RegisterForm 
                        onLoginClick={() => setIsLoginMode(true)}
                        onSuccess={handleAuthSuccess}
                    />
                )}
            </Modal>
        </>
    );
};

export default Banner;
