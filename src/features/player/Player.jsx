import styled from "styled-components";
import { useSongsPlayer } from "../../context/SongsPlayerContext";
import { useSongs } from "../songs/useSongs";
import { formatDuration } from "../../utils/helpers";
import { RxTrackNext, RxTrackPrevious } from "react-icons/rx";
import ButtonIcon from "../../ui/ButtonIcon";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import TogglePlaySong from "./TogglePlaySong";
import ToggleVolume from "./ToggleVolume";

const StyledPlayer = styled.div`
  border: 1px solid #dd2d4a;
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  gap: 4rem;
  padding: 2rem 2.2rem;
  height: 10rem;
`;

const Volume = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const VolumeBar = styled.input``;

const SongTrack = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const TimeTrack = styled.span`
  width: 6rem;
  text-align: center;
  line-height: 1.5;
  font-size: 1.7rem;
  font-family: "Ubuntu";
`;

const ProgressBar = styled.input`
  width: 20rem;
`;

function Player() {
  const { songs, isPending } = useSongs();
  const { currentSongId, volume, handleVolume, handleNext, handlePrevious, handleProgressSong, currentSongTime, duration, progress } = useSongsPlayer();

  if (isPending) return <Spinner />;
  if (!songs) return <Empty />;

  return (
    <StyledPlayer>
      <Volume>
        <ToggleVolume />
        <VolumeBar type="range" min={0} max={100} value={volume} onChange={(e) => handleVolume(e.target.value)} />
        <span>Volume: {volume}</span>
      </Volume>

      <ButtonIcon onClick={() => handlePrevious(currentSongId)}>
        <RxTrackPrevious />
      </ButtonIcon>

      <TogglePlaySong />

      <ButtonIcon onClick={() => handleNext(currentSongId)}>
        <RxTrackNext />
      </ButtonIcon>

      <SongTrack>
        <TimeTrack>{formatDuration(currentSongTime)}</TimeTrack>
        <ProgressBar type="range" value={progress} min={0} max={100} step={0.1} onChange={(e) => handleProgressSong(e.target.value)} />
        <TimeTrack>{formatDuration(duration)}</TimeTrack>
      </SongTrack>
    </StyledPlayer>
  );
}

export default Player;
