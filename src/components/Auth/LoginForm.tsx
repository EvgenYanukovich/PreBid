import { useState } from 'react';
import styles from './LoginForm.module.scss';
import authService from '../../services/auth.service';
import Button from '../ui/Button/Button';

interface LoginFormProps {
    onRegisterClick: () => void;
    onLoginClick: () => void;
    onSuccess?: () => void;
}

export const LoginForm = ({ onRegisterClick,  onSuccess }: LoginFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await authService.login(email, password);
            onSuccess?.();
        } catch (err) {
            console.error('Ошибка входа:', err);
            setError(err instanceof Error ? err.message : 'Произошла ошибка при входе');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.authForm}>
            <div className={styles.title}>
                <h2>Вход в личный кабинет</h2>

                <div className={styles.register}>
                    <p>Ещё нет аккаунта?</p>
                    <Button styleButton="greenButton" onClick={onRegisterClick}>
                        Зарегистрироваться
                    </Button>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                {error && (
                    <div className={styles.error}>
                        {error}
                    </div>
                )}

                <div className={styles.formGroup}>
                    <label>Электронная почта</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Пароль</label>
                    <div className={styles.passwordInput}>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            className={styles.togglePassword}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "👁️" : "👁️"}
                        </button>
                    </div>
                </div>

                <div className={styles.formActions}>
                    <Button styleButton='blueButton' type="submit" disabled={isLoading}>
                        {isLoading ? 'Загрузка...' : 'Продолжить'}
                    </Button>
                    <button
                        type="button"
                        className={styles.linkButton}
                        disabled={isLoading}
                    >
                        Забыли пароль
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
