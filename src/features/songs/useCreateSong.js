import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateSong } from "../../services/apiSongs";

export function useCreateSong() {
  const queryClient = useQueryClient();

  const { mutate: createSong, isPending: isCreating } = useMutation({
    mutationFn: createUpdateSong,
  });

  return { createSong, isCreating };
}
