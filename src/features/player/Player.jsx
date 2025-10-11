import { SkipBack, SkipForward } from "lucide-react";
import { useSongPlayer } from "../../context/SongPlayerContext";
import { formatDuration } from "../../utils/helpers";
import TogglePlay from "./TogglePlay";
import ToggleVolume from "./ToggleVolume";

// const StyledPlayer = styled.div`
//   background-color: var(--color-grey-50);
//   grid-column: 1 / -1;
//   display: flex;
//   justify-content: center;
//   gap: 4rem;
//   padding: 2rem 2.2rem;
// `;

// const Volume = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 2rem;
// `;

// const VolumeBar = styled.input``;

// const SongTrack = styled.div`
//   display: flex;
//   gap: 1rem;
//   align-items: center;
// `;

// const TimeTrack = styled.span`
//   width: 6rem;
//   text-align: center;
//   line-height: 1.5;
//   font-size: 1.7rem;
//   font-family: "Ubuntu";
// `;

// const ProgressBar = styled.input`
//   width: 20rem;
// `;

function Player() {
  const { currentSongId, volume, handleVolume, handleNext, handlePrevious, handleProgressSong, currentSongTime, duration, progress } = useSongPlayer();

  return (
    <div className="col-span-full flex justify-center gap-10 border-2 border-b-cyan-400 px-5 py-6">
      <div className="flex items-center gap-5">
        <ToggleVolume />
        <input type="range" min={0} max={100} value={volume} onChange={(e) => handleVolume(e.target.value)} />
        <span>Volume: {volume}</span>
      </div>

      <button className="button-icon" onClick={() => handlePrevious(currentSongId)}>
        <SkipBack />
      </button>

      <TogglePlay type="song" />

      <button className="button-icon" onClick={() => handleNext(currentSongId)}>
        <SkipForward />
      </button>

      <div className="flex items-center gap-2.5">
        <span className="w-16 text-center text-lg">{formatDuration(currentSongTime)}</span>
        <input className="w-52" type="range" value={progress} min={0} max={100} step={0.1} onChange={(e) => handleProgressSong(e.target.value)} />
        <span className="w-16 text-center text-lg">{formatDuration(duration)}</span>
      </div>
    </div>
  );
}

export default Player;
