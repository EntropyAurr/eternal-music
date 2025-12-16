import { Repeat, Repeat1, SkipBack, SkipForward } from "lucide-react";
import { useSongPlayer } from "../../context/SongPlayerContext";
import { formatDuration } from "../../utils/helpers";
import TogglePlay from "./TogglePlay";
import ToggleVolume from "./ToggleVolume";
import { useParams } from "react-router-dom";

function Player() {
  const { volume, handleVolume, handleNext, handlePrevious, handleProgressSong, currentSongTime, duration, progress, isLoopSong, handleLoopSong, getCurrentSong } = useSongPlayer();

  const currentSong = getCurrentSong();

  const { playlistId } = useParams();

  return (
    <div className="border-border col-span-full grid grid-cols-[20rem_auto] items-center justify-start border-t-2 px-15 py-3">
      <div className="flex flex-col">
        {currentSong && (
          <>
            <h2 className="text-xl font-semibold">{currentSong.name}</h2>
            <p className="text-md text-gray-400">{currentSong.artist}</p>
          </>
        )}
      </div>

      <div className="flex flex-col items-center gap-1">
        <div className="grid grid-cols-[5rem_20rem_4rem] items-center">
          <div></div>
          <div className="flex justify-center gap-7">
            <button className="button-icon" onClick={handlePrevious}>
              <SkipBack />
            </button>

            <TogglePlay type="song" currentPlaylistId={Number(playlistId)} />

            <button className="button-icon" onClick={handleNext}>
              <SkipForward />
            </button>

            <button className="button-icon" onClick={handleLoopSong}>
              {isLoopSong ? <Repeat1 /> : <Repeat />}
            </button>
          </div>

          <div className="group relative flex items-center">
            <ToggleVolume />
            <input type="range" min={0} max={100} value={volume} onChange={(e) => handleVolume(e.target.value)} className="w-0 opacity-0 transition-all duration-300 ease-out group-hover:w-30 group-hover:opacity-100" />
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="w-16 text-center text-lg">{formatDuration(currentSongTime)}</span>
          <input className="w-77" type="range" value={progress} min={0} max={100} step={0.1} onChange={(e) => handleProgressSong(e.target.value)} />
          <span className="w-16 text-center text-lg">{formatDuration(duration)}</span>
        </div>
      </div>
    </div>
  );
}

export default Player;
