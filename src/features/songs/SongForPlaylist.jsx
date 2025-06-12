import styled from "styled-components";
import { useAddSong } from "../../context/SongContext";
import { useSongPlayer } from "../../context/SongPlayerContext";
import { formatDuration } from "../../utils/helpers";

const StyledSong = styled.div`
  display: grid;
  grid-template-columns: 2fr 20rem 20rem 1fr;
  gap: 3rem;
  align-items: center;
  justify-content: space-between;
`;
const SongTitle = styled.p`
  cursor: pointer;
  font-size: 1.8rem;
  font-weight: 600;
`;

function SongForPlaylist() {
  const { song } = useAddSong();
  const { id: songId, name, artist, duration } = song;
  const { handlePlaySong } = useSongPlayer();

  return (
    <StyledSong>
      <SongTitle onClick={() => handlePlaySong(songId)}>{name}</SongTitle>
      <p>{artist}</p>
      <p>{formatDuration(duration)}</p>
    </StyledSong>
  );
}

export default SongForPlaylist;
