import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadSongToPlaylist } from "../../services/apiPlaylist";
import toast from "react-hot-toast";

export function useUploadSong() {
  const queryClient = useQueryClient();

  const { mutate: uploadSong, isPending: isUploading } = useMutation({
    mutationFn: uploadSongToPlaylist,
    onSuccess: () => {
      toast.success("Song successfully uploaded to playlist");
      queryClient.invalidateQueries({ queryKey: ["playlist"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { uploadSong, isUploading };
}
