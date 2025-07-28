import { useEffect, useState } from "react";
import { useSongPlayer } from "../../context/SongPlayerContext";
import { HiOutlinePause, HiOutlinePlay } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useParams } from "react-router-dom";

function TogglePlaySong() {
  const { handlePlaySong, handlePauseSong, currentSongId, currentPlaylist, audioRef, songRef, songIndex } = useSongPlayer();
  const { playlistId } = useParams();

  const [isPlaying, setIsPlaying] = useState(false);

  const audio = audioRef.current;

  useEffect(
    function () {
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
    },
    [audio]
  );

  function handleToggle() {
    const currentPlaylistId = currentPlaylist?.[0]?.playlist_id;
    const isSamePlaylist = Number(playlistId) === currentPlaylistId;

    // If nothing has played yet, start first song in the current playlist
    if (!currentSongId && currentPlaylist?.length > 0) {
      handlePlaySong(currentPlaylist[0].song_id, currentPlaylist);
      return;
    }

    // If a song is paused & user is on a new playlist
    if (!isSamePlaylist && !isPlaying) {
      handlePlaySong(currentSongId, currentPlaylist);
      return;
    }

    // Toggle play/pause
    if (isPlaying) {
      handlePauseSong();
    } else {
      handlePlaySong(currentSongId, currentPlaylist);
    }

    if (songIndex === currentPlaylist.length - 1 && currentPlaylist.length > 1) {
      handlePlaySong(currentPlaylist[0].song_id, currentPlaylist);
    }
  }

  return <ButtonIcon onClick={handleToggle}>{isPlaying && songRef.current ? <HiOutlinePause /> : <HiOutlinePlay />}</ButtonIcon>;
}

export default TogglePlaySong;
