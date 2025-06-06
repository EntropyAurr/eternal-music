import styled from "styled-components";
import Button from "../../ui/Button";
import { formatDuration } from "../../utils/helpers";
import { useSongsPlayer } from "../../context/SongsPlayerContext";

const StyledSong = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
const SongTitle = styled.p`
  cursor: pointer;
  font-size: 1.8rem;
  font-weight: 600;
`;

function Song({ song }) {
  const { id: songId, name, artist, url, duration } = song;
  const { handlePlaySong } = useSongsPlayer();

  return (
    <StyledSong>
      <SongTitle onClick={() => handlePlaySong(songId)}>{name}</SongTitle>
      <p>Duration: {formatDuration(duration)}</p>
    </StyledSong>
  );
}

export default Song;
