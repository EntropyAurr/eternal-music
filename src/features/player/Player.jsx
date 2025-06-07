import styled from "styled-components";
import Button from "../../ui/Button";
import { useSongsPlayer } from "../../context/SongsPlayerContext";
import { useSongs } from "../songs/useSongs";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { IoVolumeMedium } from "react-icons/io5";
import { RxTrackNext, RxTrackPrevious } from "react-icons/rx";
import { formatDuration } from "../../utils/helpers";

const StyledPlayer = styled.div`
  border: 1px solid #dd2d4a;
  grid-column: 1 / -1;
  display: flex;
  gap: 2rem;
  padding: 2rem 2.2rem;
  height: 10rem;
`;

const VolumeBar = styled.input``;

const SongTrack = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ProgressBar = styled.input`
  width: 20rem;
`;

function Player() {
  const { songs, isPending } = useSongs();
  const { handlePlaySong, handlePauseSong, currentSongId, volume, handleVolume, handleNext, handlePrevious, handleProgressSong, currentSongTime, duration, progress } = useSongsPlayer();

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

      <Button $variation="primary" size="medium" onClick={() => handlePrevious(currentSongId)}>
        <RxTrackPrevious />
      </Button>

      <Button $variation="primary" size="medium" onClick={() => handleNext(currentSongId)}>
        <RxTrackNext />
      </Button>

      <SongTrack>
        <span>{formatDuration(currentSongTime)}</span>
        <ProgressBar type="range" value={progress} min={0} max={100} step={0.1} onChange={(e) => handleProgressSong(e.target.value)} />
        <span>{formatDuration(duration)}</span>
      </SongTrack>
    </StyledPlayer>
  );
}

export default Player;
