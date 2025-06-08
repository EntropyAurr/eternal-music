import { useEffect, useState } from "react";
import { useSongsPlayer } from "../../context/SongsPlayerContext";
import { HiOutlinePause, HiOutlinePlay } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";

function TogglePlaySong() {
  const { handlePlaySong, handlePauseSong, currentSongId, audioRef } = useSongsPlayer();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(
    function () {
      const audio = audioRef.current;

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

    [audioRef]
  );

  function handleToggle() {
    if (!isPlaying) {
      handlePlaySong(currentSongId);
    } else {
      handlePauseSong();
    }
    setIsPlaying((play) => !play);
  }

  return <ButtonIcon onClick={handleToggle}>{isPlaying ? <HiOutlinePause /> : <HiOutlinePlay />}</ButtonIcon>;
}

export default TogglePlaySong;
