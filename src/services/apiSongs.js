import supabase, { supabaseUrl } from "./supabase";

export async function getSongs() {
  const { data, error } = await supabase.from("songs").select("*");

  if (error) throw new Error("Songs could not be loaded");

  return data;
}

export async function createUpdateSong(newSong, songId) {
  const hasSongPath = newSong.url?.startsWith?.(supabaseUrl);
  const songName = `${newSong.url.name}`.replaceAll(" ", "-");
  const songPath = hasSongPath ? newSong.url : `${supabaseUrl}/storage/v1/object/public/song-files/${songName}`;

  if (!hasSongPath) {
    const { error: storageError } = await supabase.storage.from("song-files").upload(songName, newSong.url);

    if (storageError) {
      console.log(storageError);
      throw new Error("Song URL could not be found");
    }
  }

  let query;

  if (!songId) {
    query = supabase
      .from("songs")
      .insert([{ ...newSong, url: songPath }])
      .select()
      .single();
  }

  const { data: song, error: songError } = await query;

  if (songError) throw new Error("Song could not be created");

  const { error: linkError } = await supabase.from("playlists_songs").insert([{ playlist_id: newSong.toPlaylistId, song_id: song.id }]);

  if (linkError) throw new Error("There was an error why linking song and playlist");

  return song;
}
