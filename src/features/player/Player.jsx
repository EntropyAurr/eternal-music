import { Repeat, Repeat1, SkipBack, SkipForward, Snowflake } from "lucide-react";
import { useParams } from "react-router-dom";
import { useSongPlayer } from "../../context/SongPlayerContext";
import { formatDuration } from "../../utils/helpers";
import TogglePlay from "./TogglePlay";
import ToggleVolume from "./ToggleVolume";

function Player() {
  const { playlistId } = useParams();

  const { volume, handleVolume, handleNext, handlePrevious, handleProgressSong, currentSongTime, duration, progress, isLoopSong, handleLoopSong, getCurrentSong } = useSongPlayer();

  const currentSong = getCurrentSong();

  // TEST
  function handleTest() {
    console.log();
  }

  return (
    <div className="border-border col-span-full grid grid-cols-[17rem_auto] items-center justify-center gap-10 border-t-2 px-5 py-3 backdrop-blur-3xl">
      <div className="flex flex-col rounded-lg px-4 py-1">
        {currentSong && (
          <>
            <h2 className="text-xl font-semibold">{currentSong.name}</h2>
            <p className="text-md text-gray-400">{currentSong.artist}</p>
          </>
        )}
      </div>

      <div className="flex items-center gap-1 rounded-md p-2">
        <div className="grid grid-cols-[1fr_2fr_1fr] items-center gap-10">
          <div className="flex gap-7">
            <button className="button-icon text-orange-600" onClick={handleTest}>
              <Snowflake />
            </button>

            <button className="button-icon" onClick={handlePrevious}>
              <SkipBack />
            </button>

            <TogglePlay type="song" />

            <button className="button-icon" onClick={handleNext}>
              <SkipForward />
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="min-w-16 text-center text-lg">{formatDuration(currentSongTime)}</span>
            <input className="w-77 rounded-full" type="range" value={progress} min={0} max={100} step={0.1} onChange={(e) => handleProgressSong(e.target.value)} />
            <span className="min-w-16 text-center text-lg">{formatDuration(duration)}</span>
          </div>

          <div className="flex items-center gap-4">
            <button className="button-icon" onClick={handleLoopSong}>
              {isLoopSong ? <Repeat1 /> : <Repeat />}
            </button>

            <div className="group relative flex items-center">
              <ToggleVolume />
              <input type="range" min={0} max={100} value={volume} onChange={(e) => handleVolume(e.target.value)} className="w-0 rounded-full opacity-0 transition-all duration-300 ease-out group-hover:w-20 group-hover:opacity-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
