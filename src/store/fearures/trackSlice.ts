import { TrackType } from '@/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  playlist: TrackType[];
  isShuffle: boolean;
  shufflePlaylist: TrackType[];
  isLoop: boolean;
  allTracks: TrackType[];
  fetchError: null | string;
  fetchIsLoading: boolean;
  favoriteTracks: TrackType[];
  filters: {
    authors: string[];
    genres: string[];
    years: string;
  };
  filteredTracks: TrackType[];
  pagePlaylist: TrackType[];
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  playlist: [],
  isShuffle: false,
  shufflePlaylist: [],
  isLoop: false,
  allTracks: [],
  fetchError: null,
  fetchIsLoading: true,
  favoriteTracks: [],
  filters: {
    authors: [],
    genres: [],
    years: 'По умолчанию',
  },
  filteredTracks: [],
  pagePlaylist: [],
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
    toggleLoop: (state) => {
      state.isLoop = !state.isLoop;
    },
    setAllTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.allTracks = action.payload;
      state.filteredTracks = action.payload;
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    setFetchLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
    },
    setFavoriteTrack: (state, action: PayloadAction<TrackType[]>) => {
      state.favoriteTracks = action.payload;
      localStorage.setItem(
        'favoriteTracks',
        JSON.stringify(state.favoriteTracks),
      );
    },
    setDelFavTrack: (state, action: PayloadAction<TrackType[]>) => {
      state.favoriteTracks = action.payload;
      localStorage.setItem(
        'favoriteTracks',
        JSON.stringify(state.favoriteTracks),
      );
    },
    addLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks.push(action.payload);
      localStorage.setItem(
        'favoriteTracks',
        JSON.stringify(state.favoriteTracks),
      );
    },
    removeLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = state.favoriteTracks.filter(
        (track) => track._id !== action.payload._id,
      );
      localStorage.setItem(
        'favoriteTracks',
        JSON.stringify(state.favoriteTracks),
      );
    },
    setPagePlaylist: (state, action) => {
      state.pagePlaylist = action.payload;
    },
    setFilterAuthors: (state, action: PayloadAction<string>) => {
      const author = action.payload;
      if (state.filters.authors.includes(author)) {
        state.filters.authors = state.filters.authors.filter(
          (el) => el !== author,
        );
      } else {
        state.filters.authors = [...state.filters.authors, author];
      }

      state.filteredTracks = state.allTracks.filter(
        (track) =>
          state.filters.authors.length === 0 ||
          state.filters.authors.includes(track.author),
      );
    },
    setSortByYear: (state, action: PayloadAction<string>) => {
      const sortOrder = action.payload;
      state.filters.years = sortOrder;

      if (sortOrder === 'newest') {
        state.filteredTracks = [...state.filteredTracks].sort((a, b) => {
          const yearA = parseInt(a.release_date.substring(0, 4), 10);
          const yearB = parseInt(b.release_date.substring(0, 4), 10);
          return yearB - yearA;
        });
      } else if (sortOrder === 'oldest') {
        state.filteredTracks = [...state.filteredTracks].sort((a, b) => {
          const yearA = parseInt(a.release_date.substring(0, 4), 10);
          const yearB = parseInt(b.release_date.substring(0, 4), 10);
          return yearA - yearB;
        });
      } else {
        state.filteredTracks = state.allTracks.filter((track) => {
          const authorMatch =
            state.filters.authors.length === 0 ||
            state.filters.authors.includes(track.author);

          const genreMatch =
            state.filters.genres.length === 0 ||
            (Array.isArray(track.genre)
              ? track.genre.some((g) => state.filters.genres.includes(g))
              : state.filters.genres.includes(track.genre));
          return authorMatch && genreMatch;
        });
      }
    },
    setFilterGenres: (state, action: PayloadAction<string>) => {
      const genre = action.payload;
      if (state.filters.genres.includes(genre)) {
        state.filters.genres = state.filters.genres.filter(
          (el) => el !== genre,
        );
      } else {
        state.filters.genres = [...state.filters.genres, genre];
      }
      state.filteredTracks = state.allTracks.filter((track) => {
        const authorMatch =
          state.filters.authors.length === 0 ||
          state.filters.authors.includes(track.author);

        const genreMatch =
          state.filters.genres.length === 0 ||
          (Array.isArray(track.genre)
            ? track.genre.some((g) => state.filters.genres.includes(g))
            : state.filters.genres.includes(track.genre));

        return authorMatch && genreMatch;
      });
    },
    clearFavoriteTracks: (state) => {
      state.favoriteTracks = [];
    },
    setFilteredTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.filteredTracks = action.payload;
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
  toggleLoop,
  setAllTracks,
  setFetchError,
  setFetchLoading,
  setFavoriteTrack,
  setDelFavTrack,
  addLikedTracks,
  removeLikedTracks,
  setFilterAuthors,
  setPagePlaylist,
  setFilterGenres,
  setSortByYear,
  clearFavoriteTracks,
  setFilteredTracks,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
