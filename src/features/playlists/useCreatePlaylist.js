import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdatePlaylist } from "../../services/apiPlaylists";
import toast from "react-hot-toast";

export function useCreatePlaylist() {
  const queryClient = useQueryClient();

  const { mutate: createPlaylist, isPending: isCreating } = useMutation({
    mutationFn: createUpdatePlaylist,
    onSuccess: () => {
      toast.success("New playlist successfully created");
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createPlaylist, isCreating };
}
