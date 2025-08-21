import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { deletePlaylist as deletePlaylistApi } from "../../services/apiPlaylists";

export function useDeletePlaylist() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isDeleting, mutate: deletePlaylist } = useMutation({
    mutationFn: deletePlaylistApi,

    onSuccess: () => {
      navigate("/home", { replace: true });

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
