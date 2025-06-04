/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useRef, useState } from "react";
import { useSongs } from "../features/songs/useSongs";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";

const SongsPlayerContext = createContext();

function SongsPlayerProvider({ children }) {
  const { songs, isPending } = useSongs();
  const songRef = useRef();
  const [currentSongId, setCurrentSongId] = useState(null);

  if (isPending) return <Spinner />;
  if (!songs) return <Empty />;

  // PLAY song
  function playSong(id) {
    if (id === currentSongId) {
      setCurrentSongId(id);
      songRef.current.play();
      console.log(currentSongId);
    } else console.log("There was an error while playing song");
  }

  // PAUSE song
  function pauseSong() {
    songRef.current.pause();
  }

  return <SongsPlayerContext.Provider value={{ songRef, playSong, pauseSong }}>{children}</SongsPlayerContext.Provider>;
}

function useSongsPlayer() {
  const context = useContext(SongsPlayerContext);
  if (context === undefined) throw new Error("SongsPlayerContext is used outside of SongsPlayerProvider");
  return context;
}

export { SongsPlayerProvider, useSongsPlayer };
