import styled from "styled-components";
import { useAddSong } from "../../context/SongContext";
import { useEffect, useState } from "react";
import supabase from "../../services/supabase";
import Empty from "../../ui/Empty";
import Song from "./Song";
import { useSongs } from "./useSongs";

const StyledSong = styled.div`
  display: grid;
  grid-template-columns: 2fr 20rem 20rem 1fr;
  gap: 3rem;
  align-items: center;
  justify-content: space-between;
`;

function SongForPlaylist() {
  // const { songIds } = useAddSong();
  // const [songs, setSongs] = useState([]);

  const { songs } = useSongs();

  // useEffect(() => {
  //   if (!songIds || songIds.length === 0) return;

  //   async function fetchSong() {
  //     const { data, error } = await supabase.from("playlists").select("*").in("id", songIds);

  //     if (error) throw new Error("Songs could not be loaded");

  //     setSongs(data);
  //   }

  //   fetchSong();
  // }, [songIds]);

  if (!songs.length) return <Empty />;

  return (
    <StyledSong>
      {songs.map((song) => (
        <Song key={song.id} song={song} />
      ))}
    </StyledSong>
  );
}

export default SongForPlaylist;
