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
  return axios
    .get(BASE_URL + `/catalog/selection/2/`)
    .then((res) => {
      if (res.data && res.data.data) {
        return res.data.data;
      } else {
        console.error('API returned unexpected data structure:', res.data);
        throw new Error('Unexpected data structure from API'); // Выбрасываем ошибку
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      throw error;
    });
};

export const getTrackById = async (
  trackId: number,
): Promise<TrackType | null> => {
  try {
    const response = await axios.get(BASE_URL + `/catalog/track/${trackId}/`);

    if (response.status === 200 && response.data && response.data.data) {
      return response.data.data as TrackType; // Явное приведение типа
    } else {
      console.error(
        'API returned unexpected data structure or error:',
        response,
      );
      return null; // Возвращаем null в случае ошибки или отсутствия данных
    }
  } catch (error) {
    console.error('Error fetching track by ID:', error);
    return null; // Возвращаем null в случае ошибки запроса
  }
};
