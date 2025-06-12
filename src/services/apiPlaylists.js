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

export async function createPlaylist() {
  // const { data: songsIds } = await supabase.from("songs").select("id").order("id");
  // const allSongIds = songsIds.map((song) => song.id);

  // const { data: playlists } = await supabase.from("playlists").select("*");
  // const { data: songs } = await supabase.from("songs").select("*");

  // const playlist = playlists.map((playlist) => {
  //   const song = songs.at(playlist.songId - 1);
  //   const numSongs = songs.length;
  //   const totalTime = song.duration;

  //   return { ...playlist, songId: allSongIds.at(playlist.songId - 1), numSongs, totalTime };
  // });

  // const { error } = await supabase.from("playlists").insert(playlist);
  // if (error) console.log(error.message);

  const { data: songs, error: songsError } = await supabase.from("songs").select("*");
  if (songsError) throw new Error(songsError.message);

  const { data: playlists, error: playlistsError } = await supabase.from("playlists").select("*");
  if (playlistsError) throw new Error(playlistsError.message);

  const songMap = new Map(songs.map((song) => [song.id, song]));

  const updatedPlaylists = playlists.map((playlist) => {
    const song = songMap.get(playlist.songId);
    const totalTime = song?.duration || 0;
    const numSongs = 4; // or change this if you have multiple songs per playlist

    return {
      ...playlist,
      totalTime,
      numSongs,
    };
  });

  const { error } = await supabase.from("playlists").upsert(updatedPlaylists);
  if (error) console.log(error.message);
}
