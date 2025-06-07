/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useRef, useState } from "react";
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
  const [duration, setDuration] = useState(null);
  const [currentSongTime, setCurrentSongTime] = useState(0);
  const [volume, setVolume] = useState(15);
  const [progress, setProgress] = useState(0);

  useEffect(
    function () {
      if (songRef.current) {
        audio.addEventListener("timeupdate", () => setProgress((audio.currentTime / duration) * 100));
        audio.addEventListener("timeupdate", () => setCurrentSongTime(audio.currentTime));
      }

      setProgress(0);
      setCurrentSongTime(0);
      audio.currentTime = 0;

      return () => {
        audio.removeEventListener("timeupdate", () => setProgress((audio.currentTime / duration) * 100));
        audio.removeEventListener("timeupdate", () => setCurrentSongTime(audio.currentTime));
      };
    },
    [audio, duration]
  );

  if (isPending) return <Spinner />;
  if (!songs) return <Empty />;

  if (!songRef.current) audio.volume = volume / 100;

  // VOLUME adjustment
  function handleVolume(value) {
    audio.volume = value / 100;
    setVolume(value);
  }

  // PROGRESS of a song
  function handleProgressSong(value) {
    audio.currentTime = (value * duration) / 100;
  }

  // PLAY song
  function handlePlaySong(id) {
    const song = songs.find((song) => song.id === id);

    if (!song) return;
    setDuration(song.duration);

    if (!songRef.current || songRef.current.id !== id) {
      audio.src = song.url;
      audio.currentTime = 0;
    }

    songRef.current = song;
    audio.currentTime = currentSongTime;
    audio.play();

    setCurrentSongId(song.id);
    // because React's state updates are asynchronous => currentSongId still holds the old value until the next render => currentSongId !== song.id
  }

  // PAUSE song
  function handlePauseSong() {
    audio.pause();
    setCurrentSongTime(audio.currentTime);
  }

  // NEXT song
  function handleNext(id) {
    const song = songs.find((song) => song.id === id);

    if (!songRef.current || song.id === songs.length - 1) return;

    songRef.current = songs[id + 1];
    audio.src = songs[id + 1].url;
    setCurrentSongId(song.id + 1);
    audio.play();
  }

  // PREVIOUS song
  function handlePrevious(id) {
    const song = songs.find((song) => song.id === id);

    if (!songRef.current || song.id === 0) return;

    songRef.current = songs[id - 1];
    audio.src = songs[id - 1].url;
    setCurrentSongId(song.id - 1);
    audio.play();
  }

  return <SongsPlayerContext.Provider value={{ handlePlaySong, handlePauseSong, currentSongId, duration, volume, handleVolume, handleNext, handlePrevious, handleProgressSong, currentSongTime, progress }}>{children}</SongsPlayerContext.Provider>;
}

function useSongsPlayer() {
  const context = useContext(SongsPlayerContext);
  if (context === undefined) throw new Error("SongsPlayerContext is used outside of SongsPlayerProvider");
  return context;
}

export { SongsPlayerProvider, useSongsPlayer };
