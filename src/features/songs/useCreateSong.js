import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateSong } from "../../services/apiSongs";
import { toast } from "react-hot-toast";

export function useCreateSong() {
  const queryClient = useQueryClient();

  const { mutate: createSong, isPending: isCreating } = useMutation({
    mutationFn: createUpdateSong,
    onSuccess: () => {
      toast.success("New song successfully created");
      queryClient.invalidateQueries({
        queryKey: ["songs"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createSong, isCreating };
}
