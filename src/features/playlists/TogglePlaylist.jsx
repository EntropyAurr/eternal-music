import { useEffect } from "react";
import { HiOutlinePause, HiOutlinePlay } from "react-icons/hi2";

import { useSongPlayer } from "../../context/SongPlayerContext";
import ButtonIcon from "../../ui/ButtonIcon";

function TogglePlaylist({ currentPlaylistId, songsFromPlaylist }) {
  const { handlePlaySong, handlePauseSong, currentSongId, currentPlaylist, setCurrentPlaylist, audioRef, songRef, isPlaying, setIsPlaying } = useSongPlayer();

  useEffect(function () {
    const audio = audioRef.current;

    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

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
    if (!currentSongId && currentPlaylist?.length > 0) {
      handlePlaySong(currentPlaylist[0].song_id, currentPlaylist);
      return;
    }

    if (!isSamePlaylist) {
      setCurrentPlaylist(songsFromPlaylist);
      handlePlaySong(songsFromPlaylist[0].song_id, songsFromPlaylist);
      return;
    }

    if (isPlaying) {
      handlePauseSong();
    } else {
      handlePlaySong(currentSongId, currentPlaylist);
    }
  }

  return <ButtonIcon onClick={handleToggle}>{isSamePlaylist && isPlaying ? <HiOutlinePause /> : <HiOutlinePlay />}</ButtonIcon>;
}

export default TogglePlaylist;
