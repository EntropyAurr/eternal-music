import styled from "styled-components";
import Button from "../../ui/Button";
import { useSongsPlayer } from "../../context/SongsPlayerContext";
import { useSongs } from "../songs/useSongs";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { IoVolumeMedium } from "react-icons/io5";
import { RxTrackNext } from "react-icons/rx";

const StyledPlayer = styled.div`
  border: 1px solid #dd2d4a;
  grid-column: 1 / -1;
  display: flex;
  gap: 2rem;
  padding: 2rem 2.2rem;
  height: 10rem;
`;

const VolumeBar = styled.input``;

function Player() {
  const { songs, isPending } = useSongs();
  const { handlePlaySong, handlePauseSong, currentSongId, volume, handleVolume } = useSongsPlayer();

  if (isPending) return <Spinner />;
  if (!songs) return <Empty />;

  return (
    <StyledPlayer>
      <Button $variation="primary" size="medium" onClick={() => handlePlaySong(currentSongId)}>
        Play
      </Button>

      <Button $variation="primary" size="medium" onClick={handlePauseSong}>
        Pause
      </Button>

      <Button $variation="primary" size="medium" onClick={() => {}}>
        <IoVolumeMedium />
      </Button>
      <VolumeBar type="range" min={0} max={100} value={volume} onChange={(e) => handleVolume(e.target.value)} />
      <span>Volume: {volume}</span>

      <Button $variation="primary" size="medium" onClick={() => {}}>
        <RxTrackNext />
      </Button>
    </StyledPlayer>
  );
}

export default Player;
