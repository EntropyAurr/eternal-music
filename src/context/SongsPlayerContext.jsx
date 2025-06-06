/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useRef, useState } from "react";
import { useSongs } from "../features/songs/useSongs";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";

const SongsPlayerContext = createContext();

function SongsPlayerProvider({ children }) {
  const audioRef = useRef(new Audio());
  const audio = audioRef.current;
  const songRef = useRef(null); // songRef.current: used to store the current song object

  const { songs, isPending } = useSongs();

  const [currentSongId, setCurrentSongId] = useState(null);
  const [currentSongTime, setCurrentSongTime] = useState(0);
  const [volume, setVolume] = useState(15);

  if (isPending) return <Spinner />;
  if (!songs) return <Empty />;

  console.log(songRef);
  console.log(audio.volume);
  console.log(volume);

  // VOLUME adjustment
  function handleVolume(value) {
    if (!songRef.current) audio.volume = volume / 100;
    console.log(audio.volume);

    audio.volume = value / 100;
    setVolume(value);
  }

  // PLAY song
  function handlePlaySong(id) {
    const song = songs.find((song) => song.id === id);

    if (!song) return;

    if (!songRef.current || songRef.current.id !== id) {
      audio.src = song.url;
      audio.currentTime = 0;
    } else {
      audio.currentTime = currentSongTime;
    }

    songRef.current = song;
    audio.play();
    setCurrentSongId(song.id);
    // because React's state updates are asynchronous => currentSongId still holds the old value until the next render => currentSongId !== song.id
  }

  // PAUSE song
  function handlePauseSong() {
    setCurrentSongTime(audio.currentTime);
    audio.pause();
  }

  // NEXT song
  function handleNext() {}

  return <SongsPlayerContext.Provider value={{ handlePlaySong, handlePauseSong, currentSongId, volume, handleVolume }}>{children}</SongsPlayerContext.Provider>;
}

function useSongsPlayer() {
  const context = useContext(SongsPlayerContext);
  if (context === undefined) throw new Error("SongsPlayerContext is used outside of SongsPlayerProvider");
  return context;
}

export { SongsPlayerProvider, useSongsPlayer };
