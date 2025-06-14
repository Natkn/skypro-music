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

export const authUser = (data: authUserProps): Promise<authUserReturn> => {
  return axios.post(BASE_URL + '/user/login', data, {
    headers: {
      'Content-type': 'application/json',
    },
  });
};
