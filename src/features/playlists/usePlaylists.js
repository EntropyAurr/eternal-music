import { useQuery } from "@tanstack/react-query";
import { getPlaylists } from "../../services/apiPlaylists";

export function usePlaylists() {
  const { data: playlists, isPendingPlaylists } = useQuery({
    queryKey: ["playlists"],
    queryFn: getPlaylists,
  });

  return { playlists, isPendingPlaylists };
}
