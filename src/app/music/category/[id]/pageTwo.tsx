import { getSelectedTracks } from '@/app/services/tracks/tracksApi';

interface PageProps {
  _id: string;
}

export async function PlaylistMetadata({
  _id,
}: PageProps): Promise<{ title: string }> {
  try {
    const playlistResponse = await getSelectedTracks(_id);
    if (!playlistResponse) {
      return {
        title: 'Playlist Not Found',
      };
    }
    return {
      title: playlistResponse.name,
    };
  } catch {
    return {
      title: 'Error Loading Playlist',
    };
  }
}
