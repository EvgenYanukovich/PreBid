import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setUserInfo } from '../store/slices/authSlice';
import authService from '../services/auth.service';

export const useUserInfo = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, userInfo } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (isAuthenticated && !userInfo) {
                try {
                    const data = await authService.getUserInfo();
                    dispatch(setUserInfo(data));
                } catch (error) {
                    console.error('Failed to fetch user info:', error);
                }
            }
        };

        fetchUserInfo();
    }, [isAuthenticated, userInfo, dispatch]);

    return userInfo;
};
