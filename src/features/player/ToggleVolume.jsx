import { useState } from "react";
import ButtonIcon from "../../ui/ButtonIcon";
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from "react-icons/hi2";
import { useSongPlayer } from "../../context/SongPlayerContext";

function ToggleVolume() {
  const { audioRef, volume, setVolume } = useSongPlayer();
  const audio = audioRef.current;

  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(audio?.volume ?? volume / 100);

  function handleToggle() {
    if (isMuted || audio.volume === 0) {
      audio.volume = prevVolume;
      setIsMuted(false);
      setVolume(Math.floor(prevVolume * 100));
    } else {
      setPrevVolume(audio.volume);
      audio.volume = 0;
      setIsMuted(true);
      setVolume(0);
    }
  }

  return <ButtonIcon onClick={handleToggle}>{isMuted || audio.volume === 0 ? <HiOutlineSpeakerXMark /> : <HiOutlineSpeakerWave />}</ButtonIcon>;
}

export default ToggleVolume;
