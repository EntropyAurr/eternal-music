import { useQuery } from "@tanstack/react-query";
import { getPlaylists } from "../../services/apiPlaylists";

export function usePlaylists() {
  const { isPending, data: playlists } = useQuery({
    queryKey: ["playlists"],
    queryFn: getPlaylists,
  });

  return { playlists, isPending };
}
