import styled from "styled-components";
import Button from "../../ui/Button";
import { useSongs } from "../songs/useSongs";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useSongsPlayer } from "../../context/SongsPlayerContext";
import { useSong } from "../songs/useSong";

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
  const { song, isPendingSong } = useSong();
  const { playSong, pauseSong } = useSongsPlayer();

  console.log(song);
  if (isPending || isPendingSong) return <Spinner />;
  if (!songs || !song) return <Empty />;

  return (
    <StyledPlayer>
      <audio />
      <Button $variation="primary" size="medium" onClick={playSong(song.id)}>
        Play
      </Button>
      <Button $variation="primary" size="medium" onClick={pauseSong}>
        Pause
      </Button>
    </StyledPlayer>
  );
}

export default Player;
