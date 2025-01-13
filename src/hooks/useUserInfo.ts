import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setUserInfo, logout } from '../store/slices/authSlice';
import authService from '../services/auth.service';

export const useUserInfo = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, userInfo } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const checkAuth = async () => {
            if (isAuthenticated && !userInfo) {
                try {
                    const data = await authService.getUserInfo();
                    dispatch(setUserInfo(data));
                } catch (error) {
                    // Если не удалось получить информацию о пользователе,
                    // значит сессия истекла
                    localStorage.removeItem('jwt_token');
                    dispatch(logout());
                }
            }
        };

        const interval = setInterval(checkAuth, 60000); // Проверяем каждую минуту
        checkAuth(); // Проверяем сразу при монтировании

        return () => clearInterval(interval);
    }, [isAuthenticated, userInfo, dispatch]);

    return userInfo;
};
