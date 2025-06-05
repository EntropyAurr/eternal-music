/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useRef, useState } from "react";

const SongsPlayerContext = createContext();

function SongsPlayerProvider({ children }) {
  const songRef = useRef(null);
  const [currentSongId, setCurrentSongId] = useState(null);

  // PLAY song
  function playSong(song) {
    if (songRef.current) {
      songRef.current.pause();
      songRef.current.currentTime = 0;
    }

    const currentSong = new Audio(song.url);
    songRef.current = currentSong;
    currentSong.play();
    setCurrentSongId(song.id);
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
