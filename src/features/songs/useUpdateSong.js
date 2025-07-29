import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createUpdateSong } from "../../services/apiSongs";

export function useUpdateSong() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateSong } = useMutation({
    mutationFn: ({ newSongData, id }) => createUpdateSong(newSongData, id),
    onSuccess: () => {
      toast.success("Song successfully updated");

      queryClient.invalidateQueries({ queryKey: ["playlist_song"] });
      queryClient.invalidateQueries({ queryKey: ["song"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateSong };
}
