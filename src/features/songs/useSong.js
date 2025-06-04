import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCurrentSong } from "../../services/apiSongs";

export function useSong() {
  const { songId } = useParams();

  const { isPending: isPendingSong, data: song } = useQuery({
    queryKey: ["song", songId],
    queryFn: () => getCurrentSong(songId),
  });

  return { song, isPendingSong };
}
