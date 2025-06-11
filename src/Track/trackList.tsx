import { data } from '@/data';
import { TrackType } from '@/sharedTypes/sharedTypes';
import Track from './track';

type trackTypeProps = {
  track: TrackType;
};

export default function TrackList({}: trackTypeProps) {
  return (
    <>
      {data.map((track: TrackType) => (
        <Track key={track._id} track={track} />
      ))}
    </>
  );
}
