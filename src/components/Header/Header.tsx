import { useState } from "react";
import { useSelector } from "react-redux";
import HeaderUp from "./HeaderTop";
import HeaderDown from "./HeaderBottom";
import Modal from "../ui/Modal/Modal";
import LoginForm from "../Auth/LoginForm";
import RegisterForm from "../Auth/RegisterForm";
import styles from "./Header.module.scss";
import { RootState } from "../../store";

const Header: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isAuthenticated, userInfo } = useSelector((state: RootState) => state.auth);

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAuthModalOpen(false);
  };

  const toggleAuthMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
  };

  const fullName = userInfo?.client 
    ? `${userInfo.client.name_ru} ${userInfo.client.second_name_ru}`
    : '';

  return (
    <header className={styles.header}>
      <HeaderUp />
      <HeaderDown 
        onAuthClick={handleAuthClick}
        isAuthenticated={isAuthenticated}
        userFullName={fullName}
      />
      {!isAuthenticated && isAuthModalOpen && (
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
              onSuccess={handleAuthSuccess}
            />
          )}
        </Modal>
      )}
    </header>
  );
};

export default Header;
