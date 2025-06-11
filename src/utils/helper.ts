import { TrackType } from '@/sharedTypes/sharedTypes';

export function formatTimeTime(time: number): string {
  const minutes = Math.floor(time / 60);
  const inputSeconds = Math.floor(time % 60);
  const outputSeconds = inputSeconds < 10 ? `0${inputSeconds}` : inputSeconds;

  return `${minutes}:${outputSeconds}`;
}

export function getUniqueValuesByKey(
  arr: TrackType[],
  key: keyof TrackType,
): string[] {
  const uniqueValues = new Set<string>();

  arr.forEach((item) => {
    const value = item[key];

    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v) {
          uniqueValues.add(String(v));
        }
      });
    } else if (typeof value === 'string') {
      uniqueValues.add(value);
    } else if (typeof value === 'number') {
      uniqueValues.add(String(value));
    }
  });
  return Array.from(uniqueValues);
}

export function formatTime(time: number): string {
  const minutes = Math.floor(time / 60);
  const inputSeconds = Math.floor(time % 60);
  const outputSeconds =
    inputSeconds < 10 ? `0${inputSeconds}` : `${inputSeconds}`;

  return `${minutes}:${outputSeconds}`;
}

export const getTimePanel = (
  currentTime: number,
  totalTime: number | undefined,
) => {
  if (totalTime) {
    return `${formatTime(currentTime)}/${formatTime(totalTime)}`;
  }
};
