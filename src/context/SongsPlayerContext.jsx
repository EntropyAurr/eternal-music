/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useRef, useState } from "react";
import { useSongs } from "../features/songs/useSongs";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";

const SongsPlayerContext = createContext();

function SongsPlayerProvider({ children }) {
  const songRef = useRef(null);
  const { songs, isPending } = useSongs();
  const [currentSongId, setCurrentSongId] = useState(null);
  const [currentSongTime, setCurrentSongTime] = useState(0);

  if (isPending) return <Spinner />;
  if (!songs) return <Empty />;

  // PLAY song
  function playSong(song) {
    console.log(currentSongId);

    if (songRef.current) {
      songRef.current.pause();
      songRef.current.currentTime = 0;
    }

    const currentSong = new Audio(song.url);
    songRef.current = currentSong;
    currentSong.play();
    setCurrentSongId(song.id);

    console.log(currentSongId);
  }

  // PAUSE song
  function pauseSong(songId) {
    if (songId === currentSongId && songRef.current) {
      songRef.current.pause();
    }
  }

  return <SongsPlayerContext.Provider value={{ playSong, pauseSong, currentSongId }}>{children}</SongsPlayerContext.Provider>;
}

function useSongsPlayer() {
  const context = useContext(SongsPlayerContext);
  if (context === undefined) throw new Error("SongsPlayerContext is used outside of SongsPlayerProvider");
  return context;
}

export { SongsPlayerProvider, useSongsPlayer };
