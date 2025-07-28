import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import supabase from "../../services/supabase";

// Create an API request to update (insert) data: playlist_id, song_id
export async function uploadSongToPlaylist(songForPlaylist) {
  const { songIdForPlaylist, playlistId } = songForPlaylist;

  const { data, error } = await supabase.from("playlist_song").insert([{ playlist_id: playlistId, song_id: songIdForPlaylist }]);

  if (error) throw new Error(error.message);

  return data;
}

// Add this data (song) to a playlist
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
