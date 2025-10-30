import supabase from "./supabase";

export async function getPlaylists() {
  const { data, error } = await supabase.from("playlist").select("*").order("id", { ascending: true });

  if (error) throw new Error("Playlists could not be loaded");

  return data;
}

export async function createUpdatePlaylist(newPlaylist, id) {
  let query;

  const playlistId = typeof id === "object" ? id?.id : id;

  // CREATE new playlist
  if (!playlistId) {
    query = await supabase
      .from("playlist")
      .insert([{ ...newPlaylist }])
      .select();
  }

  // UPDATE playlist
  if (playlistId) {
    query = await supabase
      .from("playlist")
      .update({ ...newPlaylist })
      .eq("id", playlistId)
      .select();
  }

  const { data, error } = query;

  if (error) throw new Error("Playlist could not be created");

  return data;
}

// GET song from playlist
export async function getSongFromPlaylist(playlistId) {
  if (!playlistId) {
    throw new Error("playlistId is required to fetch songs.");
  }

  const { data, error } = await supabase.from("playlist_song").select("*, song(name, artist, duration, url)").eq("playlist_id", playlistId);

  if (error) throw new Error("Song could not display for this playlist");

  return data;
}

// GET RANDOM song from playlist
export async function getRandomSongsFromPlaylist(playlistId) {
  const { data, error } = await supabase.rpc("get_random_songs_from_playlist", { pid: Number(playlistId) });

  if (error) {
    throw new Error("Error fetching random songs");
  }

  return data;
}

// DELETE playlist
export async function deletePlaylist(id) {
  // 1. Get songs in the current playlist
  const { data: songsInPlaylist, error: songsError } = await supabase.from("playlist_song").select("song_id").eq("playlist_id", id);
  if (songsError) throw new Error("Failed to fetch songs");

  const songIds = songsInPlaylist.map((song) => song.song_id);
  if (songIds.length === 0) {
    return supabase.from("playlist").delete().eq("id", id);
  }

  // 2. Find songs also in other playlists
  const { data: otherLinks } = await supabase.from("playlist_song").select("song_id").in("song_id", songIds).neq("playlist_id", id);

  const songsToDelete = songIds.filter((id) => !otherLinks?.some((song) => song.song_id === id));

  // 3. Delete playlist-song links
  await supabase.from("playlist_song").delete().eq("playlist_id", id);

  // 4. Delete unique songs from storage
  let uniqueFile = [];

  if (songsToDelete.length) {
    const { data: uniqueSongs } = await supabase.from("song").select("url").in("id", songsToDelete);
    uniqueFile = uniqueSongs.map((song) => song.url.split("/storage/v1/object/public/song-files/")[1]);

    await supabase.from("song").delete().in("id", songsToDelete);
  }

  // 5. Delete playlist
  await supabase.from("playlist").delete().eq("id", id);

  // 6. Delete file from storage
  if (uniqueFile.length) {
    await supabase.storage.from("song-files").remove(uniqueFile);
  }
}
