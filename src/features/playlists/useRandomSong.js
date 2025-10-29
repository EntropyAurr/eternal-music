import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRandomSongsFromPlaylist } from "../../services/apiPlaylists";

export function useRandomSong() {
  const { playlistId } = useParams();

  const { isPending: isPendingRandom, data: randomSongs } = useQuery({
    queryKey: ["playlist_random_songs", Number(playlistId)],
    queryFn: () => getRandomSongsFromPlaylist(Number(playlistId)),
  });

  return { isPendingRandom, randomSongs };
}
