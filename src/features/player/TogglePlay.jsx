import { useEffect } from "react";
import { Pause, Play } from "lucide-react";
import { useSongPlayer } from "../../context/SongPlayerContext";

function TogglePlay({ type = "song", currentPlaylistId, songsFromPlaylist }) {
  const { handlePlaySong, handlePauseSong, currentSongId, currentPlaylist, setCurrentPlaylist, audioRef, songRef, songIndex, isPlaying, setIsPlaying, isEnding, setIsEnding } = useSongPlayer();

  useEffect(function () {
    const audio = audioRef.current;

    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setIsEnding(true);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const isSamePlaylist = songRef?.current?.playlist_id === currentPlaylistId;

  function handleToggle() {
    if (!currentPlaylist || currentPlaylist.length === 0) return;

    if (!currentSongId && currentPlaylist?.length > 0) {
      handlePlaySong(currentPlaylist[0].song_id, currentPlaylist);
      return;
    }

    if (type === "playlist") {
      if (!isSamePlaylist) {
        setCurrentPlaylist(songsFromPlaylist);
        handlePlaySong(songsFromPlaylist[0].song_id, songsFromPlaylist);
        return;
      }
    }

    if (isPlaying) {
      handlePauseSong();
    } else {
      handlePlaySong(currentSongId, currentPlaylist);
    }

    if (songIndex === currentPlaylist.length - 1 && currentPlaylist.length > 1 && isEnding) {
      handlePlaySong(currentPlaylist[0].song_id, currentPlaylist);
    }
  }

  return (
    <button className="button-icon" onClick={handleToggle}>
      {type === "playlist" ? isSamePlaylist && isPlaying ? <Pause /> : <Play /> : isPlaying && songRef.current ? <Pause /> : <Play />}
    </button>
  );
}

export default TogglePlay;
