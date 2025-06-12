/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const SongContext = createContext();

function SongProvider({ children }) {
  const [song, setSong] = useState({});

  function getSong(songForPlaylist) {
    setSong(songForPlaylist);
  }

  return <SongContext.Provider value={{ song, getSong }}>{children}</SongContext.Provider>;
}

function useAddSong() {
  const context = useContext(SongContext);
  if (context === undefined) throw new Error("SongContext is used outside of SongProvider");
  return context;
}

export { SongProvider, useAddSong };
