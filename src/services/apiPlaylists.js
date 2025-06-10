import supabase from "./supabase";

export async function getPlaylists() {
  const { data, error } = await supabase.from("playlists").select("*");

  if (error) throw new Error("Playlists could not be loaded");

  return data;
}

export async function getPlaylist(id) {
  const { data, error } = await supabase.from("playlists").select("*, songs(*)").eq("id", id).single();

  if (error) {
    console.error(error);
    throw new Error("Playlist not found");
  }

  return data;
}
