import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createUpdatePlaylist } from "../../services/apiPlaylists";

export function useUpdatePlaylist() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updatePlaylist } = useMutation({
    mutationFn: ({ newPlaylistData, id }) => createUpdatePlaylist(newPlaylistData, id),
    onSuccess: () => {
      toast.success("Playlist successfully updated");

      queryClient.invalidateQueries({ queryKey: ["playlist"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updatePlaylist };
}
