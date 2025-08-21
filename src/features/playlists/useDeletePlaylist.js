import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePlaylist as deletePlaylistApi } from "../../services/apiPlaylists";

export function useDeletePlaylist() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deletePlaylist } = useMutation({
    mutationFn: deletePlaylistApi,

    onSuccess: () => {
      toast.success("Playlist successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["playlist_song"],
      });
      queryClient.invalidateQueries({
        queryKey: ["playlist"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deletePlaylist };
}
