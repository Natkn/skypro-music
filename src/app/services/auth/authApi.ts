import axios from 'axios';
import { BASE_URL } from '../tracks/constants';

type authUserProps = {
  email: string;
  password: string;
};

type authUserReturn = {
  email: string;
  username: string;
  _id: number;
};

export const authUser = async (
  data: authUserProps,
): Promise<authUserReturn> => {
  try {
    const response = await axios.post(BASE_URL + '/user/login', data, {
      headers: {
        'Content-type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при аутентификации:', error);
    throw error;
  }
};

type registerUserProps = {
  email: string;
  password: string;
  username: string;
};

type registerUserReturn = {
  email: string;
  username: string;
  _id: number;
};

export const registerUser = (
  data: registerUserProps,
): Promise<registerUserReturn> => {
  return axios.post(BASE_URL + '/user/signup', data, {
    headers: {
      'Content-type': 'application/json',
    },
  });
};

type accessTokenType = {
  access: string;
};

type refreshTokenType = {
  refresh: string;
};

type tokensType = accessTokenType & refreshTokenType;

export const getTokens = async (data: authUserProps): Promise<tokensType> => {
  const res = await axios.post(BASE_URL + '/user/token/', data);
  return res.data;
};

export const refreshToken = async (refresh: string): Promise<tokensType> => {
  const res = await axios.post(BASE_URL + '/user/token/refresh', { refresh });
  return res.data;
};
