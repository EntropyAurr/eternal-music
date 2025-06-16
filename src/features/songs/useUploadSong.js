import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import supabase from "../../services/supabase";

export async function uploadSongToPlaylist(songForPlaylist) {
  const { songId } = songForPlaylist;

  const { data, error } = await supabase.from("playlists_songs").insert([{ playlist_id: 15, song_id: songId }]);

  if (error) throw new Error(error.message);

  return data;
}

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
