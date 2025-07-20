import { useQuery } from "@tanstack/react-query";
import { getSongs } from "../../services/apiSongs";

export function useSongs() {
  const { isPending, data: songs } = useQuery({
    queryKey: ["song"],
    queryFn: getSongs,
  });

  return { songs, isPending };
}
