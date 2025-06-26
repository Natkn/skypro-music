import {
  setAccessToken,
  setRefreshToken,
  setUsername,
} from '@/store/fearures/authSlice';
import { useAppDispatch } from '@/store/store';
import { useEffect } from 'react';

export const UseInitAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const username = localStorage.getItem('username') || '';
    const access = localStorage.getItem('acceess') || '';
    const refresh = localStorage.getItem('refresh') || '';

    dispatch(setUsername(username));
    dispatch(setAccessToken(access));
    dispatch(setRefreshToken(refresh));
  }, [dispatch]);
};
