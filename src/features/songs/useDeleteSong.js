import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteSong as deleteSongApi } from "../../services/apiSongs";

export function useDeleteSong() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteSong } = useMutation({
    mutationFn: deleteSongApi,

    onSuccess: () => {
      toast.success("Song successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["playlist_song"],
      });
      queryClient.invalidateQueries({
        queryKey: ["song"],
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteSong };
}
