import clsx from "clsx";
import { Pause, Play } from "lucide-react";
import { useEffect } from "react";
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

  useEffect(() => {
    if (type === "playlist" && (!currentPlaylist || currentPlaylist.length === 0)) {
      setCurrentPlaylist(songsFromPlaylist);
      return;
    }
  }, []);

  function handleToggle() {
    if (!currentSongId) {
      handlePlaySong(currentPlaylist[0].song_id, currentPlaylist);
      return;
    }

    if (type === "playlist" && !isSamePlaylist) {
      setCurrentPlaylist(songsFromPlaylist);
      handlePlaySong(songsFromPlaylist[0].song_id, songsFromPlaylist);
      return;
    }

    if (songIndex === currentPlaylist.length - 1 && isEnding) {
      handlePlaySong(currentPlaylist[0].song_id, currentPlaylist);
      setIsEnding(false);
      return;
    }

    if (type === "song" && isPlaying) {
      handlePauseSong();
    } else {
      handlePlaySong(currentSongId, currentPlaylist);
    }

    if (type === "playlist" && isPlaying) {
      handlePauseSong();
    } else {
      handlePlaySong(currentSongId, currentPlaylist);
    }
  }

  return (
    <button className={clsx("button-icon", type === "playlist" ? "bg-primary text-white" : "bg-gray-700 text-white hover:bg-gray-800")} onClick={handleToggle}>
      {type === "playlist" ? isSamePlaylist && isPlaying ? <Pause /> : <Play /> : isPlaying && songRef.current ? <Pause /> : <Play />}
    </button>
  );
}

export default TogglePlay;
