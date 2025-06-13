/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import supabase from "../services/supabase";

const SongContext = createContext();

function SongProvider({ children }) {
  const [song, setSong] = useState({});
  const [songIds, setSongIds] = useState([]);

  async function getSong(songForPlaylist) {
    setSong(songForPlaylist);
    setSongIds((id) => [...id, songForPlaylist.songId]);

    const { data } = await supabase.from("playlists").insert([
      {
        playlist_id: 1,
        song_id: songForPlaylist.songId,
      },
    ]);

    return data;
  }

  return <SongContext.Provider value={{ song, getSong, songIds }}>{children}</SongContext.Provider>;
}

function useAddSong() {
  const context = useContext(SongContext);
  if (context === undefined) throw new Error("SongContext is used outside of SongProvider");
  return context;
}

export { SongProvider, useAddSong };
