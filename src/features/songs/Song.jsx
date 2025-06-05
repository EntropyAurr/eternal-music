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
  const { playSong, pauseSong } = useSongsPlayer();

  return (
    <StyledSong>
      <SongTitle onClick={() => playSong(song)}>{name}</SongTitle>
      <p>Duration: {formatDuration(duration)}</p>
      {/* <Button $variation="primary" size="medium" onClick={() => pauseSong(songId)}>
        Pause
      </Button> */}
    </StyledSong>
  );
}

export default Song;
