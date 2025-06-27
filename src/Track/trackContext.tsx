'use client';
import React, { createContext, useState, useContext } from 'react';

interface PlaylistContextType {
  selectedPlaylistId: number | null;
  setSelectedPlaylistId: (id: number | null) => void;
}

const PlaylistContext = createContext<PlaylistContextType>({
  selectedPlaylistId: null,
  setSelectedPlaylistId: () => {},
});

export const PlaylistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<number | null>(
    null,
  );

  return (
    <PlaylistContext.Provider
      value={{ selectedPlaylistId, setSelectedPlaylistId }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => useContext(PlaylistContext);
