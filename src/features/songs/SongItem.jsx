import styled from "styled-components";
import Button from "../../ui/Button";
import { useSongsPlayer } from "../../context/SongsPlayerContext";
import { formatDuration } from "../../utils/helpers";

const StyledSongItem = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
const SongTitle = styled.p`
  cursor: pointer;
  font-size: 1.8rem;
  font-weight: 600;
`;

function SongItem({ song }) {
  const { id: songId, name, artist, url, duration } = song;

  const { playSong, pauseSong } = useSongsPlayer();

  return (
    <StyledSongItem>
      <audio src={url} />
      <SongTitle onClick={playSong(songId)}>{name}</SongTitle>
      <p>Duration: {formatDuration(duration)}</p>
      <Button $variation="primary" size="medium" onClick={pauseSong}>
        Pause
      </Button>
    </StyledSongItem>
  );
}

export default SongItem;
