import supabase from "./supabase";

export async function getPlaylists() {
  const { data, error } = await supabase.from("playlist").select("*");

  if (error) throw new Error("Playlists could not be loaded");

  return data;
}

export async function createUpdatePlaylist(newPlaylist) {
  const { data, error } = await supabase.from("playlist").insert([newPlaylist]).select();

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
