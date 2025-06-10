import { useQuery } from "@tanstack/react-query";
import { getPlaylists } from "../../services/apiPlaylists";

export function usePlaylists() {
  const { isPendingPlaylists, data: playlists } = useQuery({
    queryKey: ["playlists"],
    queryFn: getPlaylists,
  });

  return { playlists, isPendingPlaylists };
}
