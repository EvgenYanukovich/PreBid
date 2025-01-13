import { useState, FormEvent, ChangeEvent } from 'react';
import styles from './LoginForm.module.scss';
import authService from '../../services/auth.service';
import Button from '../ui/Button/Button';
import { useAuthAction } from '../../hooks/useAuthAction';
import { LoginFormProps, LoginFormData } from '../../types/auth';

export const LoginForm = ({ onRegisterClick, onSuccess }: LoginFormProps) => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const { execute: login, isLoading, error } = useAuthAction(
        async (data: LoginFormData) => {
            await authService.login(data.email, data.password);
            onSuccess?.();
        }
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await login(formData);
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
                {error && <div className={styles.error}>{error}</div>}

                <div className={styles.formGroup}>
                    <label>Электронная почта</label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Пароль</label>
                    <div className={styles.passwordInput}>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
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
