import { TrackType } from '@/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  playlist: TrackType[];
  isShuffle: boolean;
  shufflePlaylist: TrackType[];
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  playlist: [],
  isShuffle: false,
  shufflePlaylist: [],
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.playlist = action.payload;
      state.shufflePlaylist = [...state.playlist].sort(
        () => Math.random() - 0.5,
      );
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle ? state.shufflePlaylist : state.playlist;
      const curIndex = state.playlist.findIndex(
        (el) => el._id === state.currentTrack?._id,
      );
      const nextindexTrack = curIndex + 1;
      state.currentTrack = playlist[nextindexTrack];
    },
    setPrevTrack: (state) => {
      const playlist = state.isShuffle ? state.shufflePlaylist : state.playlist;
      const curIndex = state.playlist.findIndex(
        (el) => el._id === state.currentTrack?._id,
      );
      const previndexTrack = curIndex - 1;
      state.currentTrack = playlist[previndexTrack];
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlay,
  setCurrentPlaylist,
  setNextTrack,
  setPrevTrack,
  toggleShuffle,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
