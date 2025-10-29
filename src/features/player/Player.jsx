import { Repeat, Repeat1, SkipBack, SkipForward } from "lucide-react";
import { useSongPlayer } from "../../context/SongPlayerContext";
import { formatDuration } from "../../utils/helpers";
import TogglePlay from "./TogglePlay";
import ToggleVolume from "./ToggleVolume";

function Player() {
  const { volume, handleVolume, handleNext, handlePrevious, handleProgressSong, currentSongTime, duration, progress, isLoopSong, handleLoopSong } = useSongPlayer();

  return (
    <div className="border-border col-span-full flex h-20 items-center justify-center gap-10 border-t-2">
      <div className="flex items-center gap-5">
        <ToggleVolume />
        <input type="range" min={0} max={100} value={volume} onChange={(e) => handleVolume(e.target.value)} />
        <span>Volume: {volume}</span>
      </div>

      <button className="button-icon" onClick={handlePrevious}>
        <SkipBack />
      </button>

      <TogglePlay type="song" />

      <button className="button-icon" onClick={handleNext}>
        <SkipForward />
      </button>

      <button onClick={handleLoopSong}>{isLoopSong ? <Repeat1 /> : <Repeat />}</button>

      <div className="flex items-center gap-2.5">
        <span className="w-16 text-center text-lg">{formatDuration(currentSongTime)}</span>
        <input className="w-52" type="range" value={progress} min={0} max={100} step={0.1} onChange={(e) => handleProgressSong(e.target.value)} />
        <span className="w-16 text-center text-lg">{formatDuration(duration)}</span>
      </div>
    </div>
  );
}

export default Player;
