import axios from 'axios';
import { BASE_URL } from './constants';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { PlaylistResponse } from '@/app/music/category/[id]/page';
import { ApiResponse } from '@/app/music/favourite/page';

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

export const getSelectedTracks = async (
  _id: string,
): Promise<PlaylistResponse> => {
  try {
    const response = await axios.get(BASE_URL + `/catalog/selection/${_id}/`);

    if (response.data && response.data.data) {
      return response.data.data as PlaylistResponse;
    } else {
      throw new Error('Unexpected data structure from API');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const addLike = (access: string, _id: number) => {
  const fullUrl = BASE_URL + `/catalog/track/${_id}/favorite`;
  return axios.post(
    fullUrl,
    {},
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
  );
};

export const removeLike = (access: string, _id: number) => {
  return axios.delete(BASE_URL + `/catalog/track/${_id}/favorite`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
};

export const getFavoriteTracks = async (
  access: string,
): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>(
      BASE_URL + `/catalog/track/favorite/all/`,
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching favorite tracks:', error);
    throw error;
  }
};

/*export const getTrackById = async (
  trackId: number,
): Promise<TrackType | null> => {
  try {
    const response = await axios.get(BASE_URL + `/catalog/track/${trackId}/`);

    if (response.status === 200 && response.data && response.data.data) {
      return response.data.data as TrackType;
    } else {
      console.error(
        'API returned unexpected data structure or error:',
        response,
      );
      return null;
    }
  } catch (error) {
    console.error('Error fetching track by ID:', error);
    return null;
  }
};
*/
