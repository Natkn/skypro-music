import axios from 'axios';
import { BASE_URL } from './constants';
import { TrackType } from '@/sharedTypes/sharedTypes';

export const getTracks = (): Promise<TrackType[]> => {
  return axios(BASE_URL + `/catalog/track/all/`).then((res) => {
    if (res.data && res.data.data) {
      return res.data.data;
    } else {
      console.error('API returned unexpected data structure:', res.data);
      return [];
    }
  });
};

export const getSelectedTracks = (): Promise<TrackType[]> => {
  return axios(BASE_URL + `/catalog/selection/2/`).then((res) => {
    if (res.data && res.data.data) {
      return res.data.data;
    } else {
      console.error('API returned unexpected data structure:', res.data);
      return [];
    }
  });
};
