import styled from "styled-components";
import Button from "../../ui/Button";
import { useSongs } from "../songs/useSongs";
import { useRef } from "react";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useSongsPlayer } from "../../context/SongsPlayerContext";

const StyledPlayer = styled.div`
  border: 1px solid #dd2d4a;
  grid-column: 1 / -1;
  display: flex;
  gap: 2rem;
  padding: 2rem 2.2rem;
  height: 10rem;
`;

function Player() {
  const { songs, isPending } = useSongs();
  const { songRef, playSong, pauseSong } = useSongsPlayer();

  if (isPending) return <Spinner />;
  if (!songs) return <Empty />;

  const songUrl = songs[1].url;

  return (
    <StyledPlayer>
      <audio ref={songRef} src={songUrl} />
      <Button $variation="primary" size="medium" onClick={playSong}>
        Play
      </Button>
      <Button $variation="primary" size="medium" onClick={pauseSong}>
        Pause
      </Button>
    </StyledPlayer>
  );
}

export default Player;
