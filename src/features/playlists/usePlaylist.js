import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPlaylist } from "../../services/apiPlaylists";

export function usePlaylist() {
  const { playlistId } = useParams();

  const { data: playlist, isPendingPlaylist } = useQuery({
    queryKey: ["playlist", playlistId],
    queryFn: () => getPlaylist(playlistId),
    retry: false,
  });

  return { playlist, isPendingPlaylist };
}
