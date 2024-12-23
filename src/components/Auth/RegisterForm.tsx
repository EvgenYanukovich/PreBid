import { useState, FormEvent, ChangeEvent } from 'react';
import styles from './RegisterForm.module.scss';
import authService from '../../services/auth.service';
import Dropdown, { Option } from '../ui/Dropdown/Dropdown';
import belarus from "../../assets/images/country/belarus.png";
import Button from '../ui/Button/Button';
import { useAuthAction } from '../../hooks/useAuthAction';
import { RegisterFormProps, RegisterRequest } from '../../types/auth';

const PHONE_REGIONS: Option[] = [
    { icon: belarus, label: '+375', value: '+375' },
];

interface RegisterFormState {
    second_name_ru: string;
    name_ru: string;
    phone: string;
    email: string;
    password: string;
}

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
    const [formData, setFormData] = useState<RegisterFormState>({
        second_name_ru: '',
        name_ru: '',
        phone: '',
        email: '',
        password: '',
    });

    const [selectedPhoneCode, setSelectedPhoneCode] = useState<Option>(PHONE_REGIONS[0]);
    const [showPassword, setShowPassword] = useState(false);

    const { execute: register, isLoading, error } = useAuthAction(
        async (data: RegisterRequest) => {
            await authService.register(data);
        }
    );

    const formatPhoneNumber = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length === 0) return '';

        let result = '';
        if (numbers.length > 0) {
            result += '(';
            result += numbers.slice(0, 2);
            result += ')';
            if (numbers.length > 2) {
                result += ' ' + numbers.slice(2, 5);
                if (numbers.length > 5) {
                    result += ' ' + numbers.slice(5, 7);
                    if (numbers.length > 7) {
                        result += ' ' + numbers.slice(7, 9);
                    }
                }
            }
        }
        return result;
    };

    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 9) {
            setFormData(prev => ({
                ...prev,
                phone: formatPhoneNumber(value)
            }));
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const cleanPhone = formData.phone.replace(/\D/g, '');
        const dataToSend = {
            ...formData,
            phone: `${selectedPhoneCode.value}${cleanPhone}`
        };

        const result = await register(dataToSend);
        if (result !== undefined) {
            onSuccess();
        }
    };

    return (
        <div className={styles.authForm}>
            <h2>Регистрация в личном кабинете</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="second_name_ru">Фамилия</label>
                    <input
                        type="text"
                        id="second_name_ru"
                        name="second_name_ru"
                        value={formData.second_name_ru}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="name_ru">Имя</label>
                    <input
                        type="text"
                        id="name_ru"
                        name="name_ru"
                        value={formData.name_ru}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="phone">Номер телефона</label>
                    <div className={styles.phoneInputGroup}>
                        <Dropdown
                            options={PHONE_REGIONS}
                            value={selectedPhoneCode}
                            onChange={setSelectedPhoneCode}
                            className={styles.phoneDropdown}
                        />
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            placeholder="(29) 000 00 00"
                            required
                        />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email">Электронная почта</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password">Пароль</label>
                    <div className={styles.passwordInput}>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
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

                {error && <div className={styles.error}>{error}</div>}

                <div className={styles.submitButton}>
                    <Button
                        styleButton="blueButton"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;