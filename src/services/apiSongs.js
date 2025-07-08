import supabase, { supabaseUrl } from "./supabase";

export async function getSongs() {
  const { data, error } = await supabase.from("songs").select("*");

  if (error) throw new Error("Songs could not be loaded");

  return data;
}

export async function getSongIds() {
  const { data, error } = await supabase.from("songs").select("id");

  if (error) throw new Error("SongIds could not be loaded");

  return data;
}

// export async function getSongs(songIds) {
//   const { data, error } = await supabase.from("songs").select("*").in("id", songIds);

//   if (error) throw new Error("Songs could not be loaded");

//   return data;
// }

// export async function getSong(id) {
//   const { data, error } = await supabase.from("songs").select("*").eq("id", id).single();

//   if (error) throw new Error("Current song could not be loaded");

//   return data;
// }

export async function createUpdateSong(newSong, id) {
  const hasSongPath = newSong.url?.startsWith?.(supabaseUrl);
  const songName = `${newSong.url.name}`.replaceAll(" ", "-");
  const songPath = hasSongPath ? newSong.url : `${supabaseUrl}/storage/v1/object/public/song-files//${songName}`;

  let query = supabase.from("songs");

  if (!id) {
    query = query.insert([{ ...newSong, url: songPath }]);
  }

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Song could not be created");
  }

  if (hasSongPath) return data;

  const { error: storageError } = await supabase.storage.from("song-files").upload(songName, newSong.url);

  if (storageError) {
    console.log(storageError);
    throw new Error("Song URL could not be found");
  }

  return data;
}
