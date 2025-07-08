import { useQuery } from "@tanstack/react-query";
import { getSongFromPlaylist } from "../../services/apiPlaylists";
import { useParams } from "react-router-dom";

export function usePlaylistSong() {
  const { playlistId } = useParams();

  const { isPending, data: songsFromPlaylist } = useQuery({
    queryKey: ["playlists_songs", playlistId],
    queryFn: () => getSongFromPlaylist(playlistId),
  });

  return { songsFromPlaylist, isPending };
}
