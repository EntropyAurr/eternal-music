import { useQuery } from "@tanstack/react-query";
import { getSongFromPlaylist } from "../../services/apiPlaylists";
import { useParams } from "react-router-dom";

export function usePlaylistSong() {
  const { playlistId } = useParams();

  const { isPending, data: songsFromPlaylist } = useQuery({
    queryKey: ["playlist_song", Number(playlistId)],
    queryFn: () => getSongFromPlaylist(Number(playlistId)),
  });

  return { songsFromPlaylist, isPending };
}
