import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../ui/Button/Button";
import styles from "./Banner.module.scss";
import Modal from "../ui/Modal/Modal";
import LoginForm from "../Auth/LoginForm";
import RegisterForm from "../Auth/RegisterForm";
import { RootState } from "../../store";

const Banner = () => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

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

    if (isAuthenticated) {
        return null;
    }

    return (
        <>
            <section className={styles.banner}>
                <div className={styles.bannerContent}>
                    <h1>Надежный способ продажи<br />и покупки авто через аукцион</h1>
                    <div>
                        <Button styleButton="greenButton" onClick={() => handleAuthClick(false)}>
                            Зарегистрироваться
                        </Button>
                        <Button styleButton="whiteButton" onClick={() => handleAuthClick(true)}>
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
                        onLoginClick={handleAuthSuccess}
                        onSuccess={handleAuthSuccess}
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
