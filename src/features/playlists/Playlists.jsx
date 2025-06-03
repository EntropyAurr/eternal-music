import styled from "styled-components";
import { songs } from "../../data/data-songs";
import SongItem from "../songs/SongItem";

const StyledPlaylists = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledSong = styled.ul``;

function Playlists() {
  return (
    <StyledPlaylists>
      <StyledSong>
        {songs.map((song) => (
          <SongItem song={song} key={song.name} />
        ))}
      </StyledSong>
    </StyledPlaylists>
  );
}

export default Playlists;
