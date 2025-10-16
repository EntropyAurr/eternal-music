import supabase from "./supabase";

export async function getPlaylists() {
  const { data, error } = await supabase.from("playlist").select("*");

  if (error) throw new Error("Playlists could not be loaded");

  return data;
}

export async function createUpdatePlaylist(newPlaylist, id) {
  let query;

  const playlistId = typeof id === "object" ? id?.id : id;

  // Create new playlist
  if (!playlistId) {
    query = await supabase
      .from("playlist")
      .insert([{ ...newPlaylist }])
      .select();
  }

  // Update playlist
  if (playlistId) {
    query = await supabase
      .from("playlist")
      .update({ ...newPlaylist })
      .eq("id", playlistId)
      .select();
  }

  const { data, error } = query;

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
    throw new Error("Failed to delete playlist-song links");
  }

  const { error: songError } = await supabase.from("song").delete().eq("toPlaylistId", id);

  if (songError) {
    throw new Error("Failed to delete associated songs");
  }

  const { error: deleteError } = await supabase.from("playlist").delete().eq("id", id);

  if (deleteError) {
    throw new Error("Playlist could not be deleted");
  }
}

// idea: when deleting a playlist, if the song in this playlist belong to other playlist => the song still in the bucket storage; but if the songs in the target deleted playlist does not belong to other playlists => delete them in song tables and storage
