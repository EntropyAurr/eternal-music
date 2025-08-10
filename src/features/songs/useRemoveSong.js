import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { removeSong as removeSongApi } from "../../services/apiSongs";

export function useRemoveSong() {
  const queryClient = useQueryClient();

  const { isPending: isRemoving, mutate: removeSong } = useMutation({
    mutationFn: removeSongApi,

    onSuccess: () => {
      toast.success("Song successfully removed");
      queryClient.invalidateQueries({ queryKey: ["playlist_song"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isRemoving, removeSong };
}
