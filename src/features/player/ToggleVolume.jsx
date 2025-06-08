import { useState } from "react";
import ButtonIcon from "../../ui/ButtonIcon";
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from "react-icons/hi2";
import { useSongsPlayer } from "../../context/SongsPlayerContext";

function ToggleVolume() {
  const [isMuted, setIsMuted] = useState(false);
  const { audioRef, volume, setVolume } = useSongsPlayer();
  const audio = audioRef.current;
  const [prevVolume, setPrevVolume] = useState(audio?.volume ?? volume / 100);

  function handleToggle() {
    if (isMuted) {
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

  return <ButtonIcon onClick={handleToggle}>{isMuted ? <HiOutlineSpeakerXMark /> : <HiOutlineSpeakerWave />}</ButtonIcon>;
}

export default ToggleVolume;
