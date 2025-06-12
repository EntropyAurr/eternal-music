/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useSongs } from "../features/songs/useSongs";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";

const SongPlayerContext = createContext();

function SongPlayerProvider({ children }) {
  const audioRef = useRef(new Audio());
  const songRef = useRef(null); // songRef.current: used to store the current song object
  const audio = audioRef.current;

  const { songs, isPending } = useSongs();
  const [currentSongId, setCurrentSongId] = useState(null);
  const [duration, setDuration] = useState(null);
  const [currentSongTime, setCurrentSongTime] = useState(0);
  const [volume, setVolume] = useState(15);
  const [progress, setProgress] = useState(0);

  // VOLUME adjustment
  if (!songRef.current) audio.volume = volume / 100;

  function handleVolume(value) {
    audio.volume = value / 100;
    setVolume(value);
  }

  // PLAY song
  const handlePlaySong = useCallback(
    (id) => {
      const song = songs.find((song) => song.id === id);

      if (!song) return;
      setDuration(song.duration);

      if (!songRef.current || songRef.current.id !== id) {
        audio.src = song.url;
        audio.currentTime = 0;
        setCurrentSongTime(0);
        setProgress(0);
      } else {
        audio.currentTime = currentSongTime;
      }

      songRef.current = song;
      audio.play();

      setCurrentSongId(song.id);

      // because React's state updates are asynchronous => currentSongId still holds the old value until the next render => currentSongId !== song.id
    },
    [songs, audio, currentSongTime]
  );

  // PAUSE song
  function handlePauseSong() {
    setCurrentSongTime(audio.currentTime);
    audio.pause();
  }

  // NEXT song
  const handleNext = useCallback(() => {
    if (!songs.length || currentSongId === null) return;

    const index = songs.findIndex((song) => song.id === currentSongId);

    if (index === -1 || index === songs.length - 1) return;

    const nextSong = songs[index + 1];
    if (nextSong) handlePlaySong(nextSong.id);
  }, [songs, currentSongId, handlePlaySong]);

  // PREVIOUS song
  const handlePrevious = useCallback(() => {
    if (!songs.length || currentSongId === null) return;

    const index = songs.findIndex((song) => song.id === currentSongId);

    if (index === 0) return;

    const prevSong = songs[index - 1];

    if (prevSong) handlePlaySong(prevSong.id);
  }, [songs, currentSongId, handlePlaySong]);

  // PROGRESS of a song
  function handleProgressSong(value) {
    audio.currentTime = (value * duration) / 100;
    setCurrentSongTime(value);
  }

  useEffect(
    function () {
      if (!songRef.current) return;

      function handleProgressUpdate() {
        if (!audio.duration) {
          setProgress(0);
          return;
        }
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentSongTime(audio.currentTime);
      }

      function handleEnded() {
        handleNext();
      }

      audio.addEventListener("timeupdate", handleProgressUpdate);
      audio.addEventListener("ended", handleEnded);

      return () => {
        audio.removeEventListener("timeupdate", handleProgressUpdate);
        audio.removeEventListener("ended", handleEnded);
      };
    },
    [handleNext, audio, duration]
  );

  if (isPending) return <Spinner />;
  if (!songs) return <Empty />;

  return <SongPlayerContext.Provider value={{ handlePlaySong, handlePauseSong, currentSongId, duration, volume, setVolume, handleVolume, handleNext, handlePrevious, handleProgressSong, currentSongTime, progress, audioRef, songRef }}>{children}</SongPlayerContext.Provider>;
}

function useSongPlayer() {
  const context = useContext(SongPlayerContext);
  if (context === undefined) throw new Error("SongsPlayerContext is used outside of SongsPlayerProvider");
  return context;
}

export { SongPlayerProvider, useSongPlayer };
