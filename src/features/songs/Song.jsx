import styled from "styled-components";
import { formatDuration } from "../../utils/helpers";
import { useSongsPlayer } from "../../context/SongsPlayerContext";
import Button from "../../ui/Button";
import { useState } from "react";

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

  const [showTest, setShowTest] = useState(false);

  return (
    <StyledSong>
      <SongTitle onClick={() => handlePlaySong(songId)}>{name}</SongTitle>
      <p>Duration: {formatDuration(duration)}</p>
      <Button $variation="primary" size="small" onClick={() => {}}>
        Select
      </Button>
      {showTest && <p>TEST SUCCESSFULLY</p>}
    </StyledSong>
  );
}

export default Song;
