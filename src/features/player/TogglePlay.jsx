import clsx from "clsx";
import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useSongPlayer } from "../../context/SongPlayerContext";

function TogglePlay({ type = "song", currentPlayedPlaylistId, songsFromPlaylist, randomSongs }) {
  const { handlePlaySong, handlePauseSong, currentSongId, currentPlayedPlaylist, setCurrentPlayedPlaylist, audioRef, songRef, songIndex, isPlaying, setIsPlaying, isEnding, setIsEnding, activePlaylistId, setActivePlaylistId, isShuffle, shuffleRef, isActivePlaylist, setIsActivePlaylist, getCurrentSong } = useSongPlayer();

  const currentSong = getCurrentSong();

  const [isTrigger, setIsTrigger] = useState(false);

  const isSamePlaylist = songRef?.current?.playlist_id === currentPlayedPlaylistId;

  const effectivePlaylist = isShuffle ? shuffleRef.current[currentPlayedPlaylistId] || randomSongs : songsFromPlaylist;

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

  function handleToggle() {
    if (!currentSongId) {
      if (type === "playlist") {
        setIsTrigger(true);

        if (isShuffle) {
          setCurrentPlayedPlaylist(randomSongs);
          handlePlaySong(randomSongs[0].song_id, randomSongs);
        } else {
          setCurrentPlayedPlaylist(songsFromPlaylist);
          handlePlaySong(songsFromPlaylist[0].song_id, songsFromPlaylist);
        }
      }

      return;
    }

    if (currentSong) {
      setIsActivePlaylist(true);
    }

    if (type === "playlist" && !isSamePlaylist) {
      setCurrentPlayedPlaylist(songsFromPlaylist);
      handlePlaySong(songsFromPlaylist[0].song_id, songsFromPlaylist);
      return;
    }

    if (songIndex === currentPlayedPlaylist.length - 1 && isEnding) {
      handlePlaySong(currentPlayedPlaylist[0].song_id, currentPlayedPlaylist);
      setIsEnding(false);
      return;
    }

    if (isPlaying) {
      handlePauseSong();
      setIsPlaying(false);
    } else {
      handlePlaySong(currentSongId, currentPlayedPlaylist);
      setIsPlaying(true);
    }
  }

  return (
    <button className={clsx("button-icon", type === "playlist" ? "bg-primary text-white" : "bg-gray-700 text-white hover:bg-gray-800")} onClick={handleToggle}>
      {type === "playlist" ? isSamePlaylist && isPlaying ? <Pause /> : <Play /> : isPlaying && songRef.current ? <Pause /> : <Play />}
    </button>
  );
}

export default TogglePlay;
