import { TrackType } from './sharedTypes/sharedTypes';

export const data: TrackType[] = [
  {
    _id: 8,
    name: 'Chase',
    author: 'Alexander Nakarada',
    release_date: '2005-06-11',
    genre: ['Классическая музыка'],
    duration_in_seconds: 205,
    album: 'Chase',
    logo: null,
    track_file:
      'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Alexander_Nakarada_-_Chase.mp3',
    stared_user: [],
  },
  {
    _id: 9,
    name: 'Open Sea epic',
    author: 'Frank Schroter',
    release_date: '2019-06-12',
    genre: ['Классическая музыка'],
    duration_in_seconds: 165,
    album: 'Open Sea epic',
    logo: null,
    track_file:
      'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Frank_Schroter_-_Open_Sea_epic.mp3',
    stared_user: [],
  },
  {
    _id: 10,
    name: 'Sneaky Snitch',
    author: 'Kevin Macleod',
    release_date: '2022-04-16',
    genre: ['Классическая музыка'],
    duration_in_seconds: 305,
    album: 'Sneaky Snitch',
    logo: null,
    track_file:
      'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Kevin_Macleod_-_Sneaky_Snitch.mp3',
    stared_user: [],
  },
  {
    _id: 11,
    name: 'Secret Garden',
    author: 'Mixkit',
    release_date: '1972-06-06',
    genre: ['Классическая музыка'],
    duration_in_seconds: 324,
    album: 'Secret Garden',
    logo: null,
    track_file:
      'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Mixkit_-_Secret_Garden.mp3',
    stared_user: [],
  },

  {
    _id: 12,
    name: 'A journey of successfull winners',
    author: '-',
    release_date: '1985-02-02',
    genre: ['Классическая музыка'],
    duration_in_seconds: 255,
    album: '-',
    logo: null,
    track_file:
      'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Musiclfiles_-_A_Journey_For_Successful_Winners.mp3',
    stared_user: [],
  },
  {
    _id: 13,
    name: 'Epic Heroic Conquest',
    author: '-',
    release_date: '1962-01-15',
    genre: ['Классическая музыка'],
    duration_in_seconds: 200,
    album: 'Epic Heroic Conquest',
    logo: null,
    track_file:
      'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Musiclfiles_-_Epic_Heroic_Conquest.mp3',
    stared_user: [],
  },
  {
    _id: 14,
    name: 'The March OF The Final Battle',
    author: '-',
    release_date: '2011-11-02',
    genre: ['Классическая музыка'],
    duration_in_seconds: 206,
    album: 'The March OF The Final Battle',
    logo: null,
    track_file:
      'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/musiclfiles_-_The_March_Of_The_Final_Battle.mp3',
    stared_user: [],
  },
  {
    _id: 15,
    name: 'True Summer',
    author: '-',
    release_date: '2012-06-01',
    genre: ['Классическая музыка'],
    duration_in_seconds: 253,
    album: 'True Summer',
    logo: null,
    track_file:
      'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Musiclfiles_-_True_Summer.mp3',
    stared_user: [],
  },
  {
    _id: 16,
    name: 'Background Sensible',
    author: 'Waltz Piano',
    release_date: '2003-05-12',
    genre: ['Классическая музыка'],
    duration_in_seconds: 135,
    album: 'Background Sensible',
    logo: null,
    track_file:
      'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Waltz_Piano_-_Background_Sensible.mp3',
    stared_user: [],
  },
  {
    _id: 17,
    name: 'Cinematic',
    author: 'Winniethemoog',
    release_date: '2004-10-01',
    genre: ['Классическая музыка'],
    duration_in_seconds: 206,
    album: 'Cinematic',
    logo: null,
    track_file:
      'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Winniethemoog_-_Action_Sport_Breakbeat.mp3',
    stared_user: [],
  },
];

export const playlist = data.map((track) => ({
  id: track._id,
  title: track.name,
  url: track.track_file,
}));
