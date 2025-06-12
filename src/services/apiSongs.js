import supabase, { supabaseUrl } from "./supabase";

export async function getSongs() {
  const { data, error } = await supabase.from("songs").select("*").in("id", [12, 13]);
  // dynamically use (function,...) the id list array: [12, 13,...] to filter the song being fetched to playlist
  // songIds = [] ,then write the function to update songIds array when we click on the Add to playlist button
  // const { data, error } = await supabase.from("songs").select("*").in("id", songIds);
  // songIds lives in SongContext ??? But we cannot use context inside regular function

  if (error) throw new Error("Songs could not be loaded");

  return data;
}

export async function getSong(id) {
  const { data, error } = await supabase.from("songs").select("*").eq("id", id).single();

  if (error) throw new Error("Current song could not be loaded");

  return data;
}

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
    console.log(error);
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
