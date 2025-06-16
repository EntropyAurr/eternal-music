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

    const rowsToInsert = songIds.map((songId) => ({
      playlist_id: 4,
      song_id: songId,
    }));

    const { data } = await supabase.from("playlists").insert(rowsToInsert);

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
