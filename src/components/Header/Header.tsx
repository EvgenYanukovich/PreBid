import { useState, useEffect } from "react";
import HeaderUp from "./HeaderTop";
import HeaderDown from "./HeaderBottom";
import Modal from "../ui/Modal/Modal";
import LoginForm from "../Auth/LoginForm";
import RegisterForm from "../Auth/RegisterForm";
import styles from "./Header.module.scss";
import authService from "../../services/auth.service";
import authEvents from "../../services/auth.events";

const Header: React.FC = () => {
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

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAuthModalOpen(false);
    setIsLoginMode(true);
  };

  const toggleAuthMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  const handleAuthSuccess = () => {
    handleCloseModal();
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  return (
    <header className={styles.header}>
      <HeaderUp />
      <HeaderDown 
        onAuthClick={handleAuthClick}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />

      <Modal isOpen={isAuthModalOpen} onClose={handleCloseModal}>
        {isLoginMode ? (
          <LoginForm 
            onRegisterClick={toggleAuthMode}
            onLoginClick={handleAuthSuccess}
            onSuccess={handleAuthSuccess}
          />
        ) : (
          <RegisterForm 
            onLoginClick={toggleAuthMode}
            onSuccess={() => setIsLoginMode(true)}
          />
        )}
      </Modal>
    </header>
  );
};

export default Header;
