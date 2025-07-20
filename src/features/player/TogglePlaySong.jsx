import { useEffect, useState } from "react";
import { useSongPlayer } from "../../context/SongPlayerContext";
import { HiOutlinePause, HiOutlinePlay } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useParams } from "react-router-dom";

function TogglePlaySong() {
  const { handlePlaySong, handlePauseSong, currentSongId, currentPlaylist, audioRef, songRef } = useSongPlayer();
  const [isPlaying, setIsPlaying] = useState(false);
  const { playlistId } = useParams();
  const audio = audioRef.current;

  useEffect(
    function () {
      if (!audio) return;

      audio.addEventListener("play", () => setIsPlaying(true));
      audio.addEventListener("pause", () => setIsPlaying(false));
      audio.addEventListener("ended", () => setIsPlaying(false));

      return () => {
        audio.removeEventListener("play", () => setIsPlaying(true));
        audio.removeEventListener("pause", () => setIsPlaying(false));
        audio.removeEventListener("ended", () => setIsPlaying(false));
      };
    },

    [audio]
  );

  function handleToggle() {
    if (currentPlaylist && !isPlaying) {
      handlePlaySong(currentPlaylist[0].song_id, currentPlaylist);
    }

    if (currentPlaylist.playlist_id !== playlistId && isPlaying) {
      handlePlaySong(currentSongId, currentPlaylist);
    }

    if ((!isPlaying && !currentSongId) || (!isPlaying && !currentPlaylist)) return;

    if (isPlaying) {
      handlePauseSong();
    }

    setIsPlaying((play) => !play);
  }

  return <ButtonIcon onClick={handleToggle}>{isPlaying && songRef.current ? <HiOutlinePause /> : <HiOutlinePlay />}</ButtonIcon>;
}

export default TogglePlaySong;
