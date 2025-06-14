import axios from 'axios';
import { BASE_URL } from './constants';
import { TrackType } from '@/sharedTypes/sharedTypes';

export const getTracks = (): Promise<TrackType[]> => {
  return axios(BASE_URL + `/catalog/track/all/`).then((res) => {
    return res.data.data;
  });
};
