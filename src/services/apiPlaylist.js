import supabase from "./supabase";

export async function uploadSongToPlaylist(song) {
  const { data, error } = await supabase.from("playlist").insert([{ ...song }]);

  if (error) {
    console.error(error);
    throw new Error("Could not upload song to playlist");
  }

  return data;
}

export async function getPlaylists() {
  const { data, error } = await supabase.from("playlists").select("*");

  if (error) {
    console.error(error);
    throw new Error("Could not get playlist");
  }

  return data;
}
