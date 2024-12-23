import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import HeaderUp from "./HeaderTop";
import HeaderDown from "./HeaderBottom";
import Modal from "../ui/Modal/Modal";
import LoginForm from "../Auth/LoginForm";
import RegisterForm from "../Auth/RegisterForm";
import styles from "./Header.module.scss";
import { RootState } from "../../store";
import { logout } from "../../store/slices/authSlice";

const Header: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

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
    dispatch(logout());
  };

  return (
    <header className={styles.header}>
      <HeaderUp />
      <HeaderDown 
        isAuthenticated={isAuthenticated}
        onAuthClick={handleAuthClick}
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
            onSuccess={handleAuthSuccess}
          />
        )}
      </Modal>
    </header>
  );
};

export default Header;
