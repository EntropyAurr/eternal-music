import supabase from "./supabase";

export async function getPlaylists() {
  const { data, error } = await supabase.from("playlists").select("*");

  if (error) {
    console.error(error);
    throw new Error("Could not get playlist");
  }

  return data;
}
