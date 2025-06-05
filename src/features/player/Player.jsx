import styled from "styled-components";
import Button from "../../ui/Button";
import { useSongsPlayer } from "../../context/SongsPlayerContext";
import { useSongs } from "../songs/useSongs";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";

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
  const { playSong, pauseSong, currentSongId } = useSongsPlayer();

  if (isPending) return <Spinner />;
  if (!songs) return <Empty />;

  return (
    <StyledPlayer>
      <Button $variation="primary" size="medium" onClick={() => playSong(currentSongId)}>
        Play
      </Button>
      <Button $variation="primary" size="medium" onClick={() => pauseSong(currentSongId)}>
        Pause
      </Button>
    </StyledPlayer>
  );
}

export default Player;
