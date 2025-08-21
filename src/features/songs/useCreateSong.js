import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createUpdateSong } from "../../services/apiSongs";

export function useCreateSong() {
  const queryClient = useQueryClient();

  const { mutate: createSong, isPending: isCreating } = useMutation({
    mutationFn: createUpdateSong,
    onSuccess: (_, variables) => {
      toast.success("New song successfully created");
      queryClient.invalidateQueries({
        queryKey: ["song"],
      });
      queryClient.invalidateQueries({
        queryKey: ["playlist_song", variables.toPlaylistId],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createSong, isCreating };
}
