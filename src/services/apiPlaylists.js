import supabase from "./supabase";

export async function getPlaylists() {
  const { data, error } = await supabase.from("playlist").select("*");

  if (error) throw new Error("Playlists could not be loaded");

  return data;
}

export async function createUpdatePlaylist(newPlaylist, id) {
  let query = supabase.from("playlist");

  // Create new playlist
  if (!id) {
    query = query.insert([{ ...newPlaylist }]);
  }

  // Update playlist
  if (id) {
    query = query
      .update({ ...newPlaylist })
      .eq("id", id)
      .select();
  }

  const { data, error } = await query.select();

  if (error) throw new Error("Playlist could not be created");

  return data;
}

export async function getSongFromPlaylist(playlistId) {
  if (!playlistId) {
    throw new Error("playlistId is required to fetch songs.");
  }

  const { data, error } = await supabase.from("playlist_song").select("*, song(name, artist, duration, url)").eq("playlist_id", playlistId);

  if (error) throw new Error("Song could not display for this playlist");

  return data;
}

// Delete playlist
export async function deletePlaylist(id) {
  const { error: playlistError } = await supabase.from("playlist_song").delete().eq("playlist_id", id);

  if (playlistError) {
    throw new Error("Failed to delete the link between playlist and song");
  }

  const { error: deleteError } = await supabase.from("playlist").delete().eq("id", id);

  if (deleteError) {
    throw new Error("Playlist could not be deleted");
  }
}
