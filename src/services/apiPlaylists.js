import supabase from "./supabase";

export async function getPlaylists() {
  const { data, error } = await supabase.from("playlists").select("*");

  if (error) throw new Error("Playlists could not be loaded");

  return data;
}

export async function createUpdatePlaylist(newPlaylist) {
  const { data, error } = await supabase.from("playlists").insert([newPlaylist]).select();

  if (error) throw new Error("Playlist could not be created");

  return data;
}

export async function getSongFromPlaylist(playlistId) {
  const { data, error } = await supabase.from("playlists_songs").select("*, songs(name, artist, duration)").eq("playlist_id", playlistId);

  if (error) throw new Error("Song could not display for this playlist");

  return data;
}
