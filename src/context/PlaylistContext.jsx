/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { usePlaylists } from "../features/playlists/usePlaylists";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";

const PlaylistContext = createContext();

function PlaylistProvider({ children }) {
  const { playlists, isPendingPlaylists } = usePlaylists();

  if (isPendingPlaylists) return <Spinner />;
  if (!playlists) return <Empty />;

  return <PlaylistContext.Provider>{children}</PlaylistContext.Provider>;
}

function usePlaylist() {
  const context = useContext(PlaylistContext);
  if (context === undefined) throw new Error("PlaylistContext is used outside PlaylistProvider");
  return context;
}

export { PlaylistProvider, usePlaylist };
