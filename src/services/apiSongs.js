import supabase, { supabaseUrl } from "./supabase";

export async function getSongs() {
  const { data, error } = await supabase.from("song").select("*");

  if (error) throw new Error("Songs could not be loaded");

  return data;
}

export async function createUpdateSong(newSong, id) {
  const hasSongPath = newSong.url?.startsWith?.(supabaseUrl);
  const songName = `${newSong.url.name}`.replaceAll(/[^\w.-]/g, "_");
  const songPath = hasSongPath ? newSong.url : `${supabaseUrl}/storage/v1/object/public/song-files/${songName}`;

  let query = supabase.from("song");

  // Create new song
  if (!id) {
    query = query.insert([{ ...newSong, url: songPath }]);
  }

  // Update song
  if (id) {
    query = query
      .update({ ...newSong, url: songPath })
      .eq("id", id)
      .select();
  }

  const { data: song, error: songError } = await query.select().single();

  if (songError) throw new Error("Song could not be created");
  if (hasSongPath) return song;

  if (!hasSongPath) {
    const { error: storageError } = await supabase.storage.from("song-files").upload(songName, newSong.url);

    if (storageError) {
      throw new Error("Song URL could not be found");
    }
  }

  // Link song and playlist
  const { error: linkError } = await supabase.from("playlist_song").insert([{ playlist_id: newSong.toPlaylistId, song_id: song.id }]);

  if (linkError) throw new Error("There was an error while linking song and playlist");

  return song;
}

// Delete song
export async function deleteSong(id) {
  // Remove related playlist entries first
  const { error: playlistError } = await supabase.from("playlist_song").delete().eq("song_id", id);

  if (playlistError) {
    throw new Error("Failed to remove song from playlist");
  }

  // Then delete the song itself
  const { error: deleteError } = await supabase.from("song").delete().eq("id", id);

  if (deleteError) {
    throw new Error("Song could not be deleted");
  }
}

// Remove song from playlist
export async function removeSong({ songId, playlistId }) {
  const { error: removeError } = await supabase.from("playlist_song").delete().match({ song_id: songId, playlist_id: playlistId });

  if (removeError) {
    throw new Error("Song could not be removed from this playlist");
  }
}
