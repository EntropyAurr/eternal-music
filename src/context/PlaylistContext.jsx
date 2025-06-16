/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { usePlaylists } from "../features/playlists/usePlaylists";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";
import { useParams } from "react-router-dom";

const PlaylistContext = createContext();

function PlaylistProvider({ children }) {
  const { playlistId } = useParams();
  const { playlists, isPendingPlaylists } = usePlaylists();

  if (isPendingPlaylists) return <Spinner />;
  if (!playlists) return <Empty />;

  const playlist = playlists?.find((playlist) => playlist.id === Number(playlistId));

  if (!playlist) return <Empty />;

  return <PlaylistContext.Provider value={{ playlists, playlist }}>{children}</PlaylistContext.Provider>;
}

function usePlaylist() {
  const context = useContext(PlaylistContext);
  if (context === undefined) throw new Error("PlaylistContext is used outside PlaylistProvider");
  return context;
}

export { PlaylistProvider, usePlaylist };
