/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import useSound from "use-sound";

import { useSongs } from "../features/songs/useSongs";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";

const SongsPlayerContext = createContext();

function SongsPlayerProvider({ children }) {
  const { songs, isPending } = useSongs();
  const [currentSongId, setCurrentSongId] = useState(null);

  if (isPending) return <Spinner />;
  if (!songs) return <Empty />;

  // PLAY song
  function playSong(id) {}

  // PAUSE song
  function pauseSong(id) {}

  return <SongsPlayerContext.Provider value={{ playSong, pauseSong }}>{children}</SongsPlayerContext.Provider>;
}

function useSongsPlayer() {
  const context = useContext(SongsPlayerContext);
  if (context === undefined) throw new Error("SongsPlayerContext is used outside of SongsPlayerProvider");
  return context;
}

export { SongsPlayerProvider, useSongsPlayer };
