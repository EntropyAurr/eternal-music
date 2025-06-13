import supabase from "./supabase";

export async function getPlaylists() {
  const { data, error } = await supabase.from("playlists").select("*");

  if (error) throw new Error("Playlists could not be loaded");

  return data;
}
