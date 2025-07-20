/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const SongPlayerContext = createContext();

function SongPlayerProvider({ children }) {
  const audioRef = useRef(new Audio());
  const songRef = useRef(null); // songRef.current: used to store the current song object
  const audio = audioRef.current;

  const [currentPlaylist, setCurrentPlaylist] = useState(null);
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
    (id, songList) => {
      const song = songList.find((song) => song.song_id === id);

      if (!song) return;
      setDuration(song.song.duration);

      if (!songRef.current || songRef.current.song_id !== id) {
        audio.src = song.song.url;
        audio.currentTime = 0;
        setCurrentSongTime(0);
        setProgress(0);
      } else {
        audio.currentTime = currentSongTime;
      }

      songRef.current = song;
      audio.play();

      setCurrentSongId(song.song_id);
      setCurrentPlaylist(songList);

      // because React's state updates are asynchronous => currentSongId still holds the old value until the next render => currentSongId !== song.id
    },
    [audio, currentSongTime]
  );

  // PAUSE song
  function handlePauseSong() {
    setCurrentSongTime(audio.currentTime);
    audio.pause();
  }

  // NEXT song
  const handleNext = useCallback(() => {
    if (!currentPlaylist || !currentPlaylist.length || currentSongId === null) return;

    const index = currentPlaylist.findIndex((song) => song.song_id === currentSongId);

    if (index === -1 || index === currentPlaylist.length - 1) return;

    const nextSong = currentPlaylist[index + 1];
    if (nextSong) handlePlaySong(nextSong.song_id, currentPlaylist);
  }, [currentPlaylist, currentSongId, handlePlaySong]);

  // PREVIOUS song
  const handlePrevious = useCallback(() => {
    if (!currentPlaylist || !currentPlaylist.length || currentSongId === null) return;

    const index = currentPlaylist.findIndex((song) => song.song_id === currentSongId);

    if (index === 0) return;

    const prevSong = currentPlaylist[index - 1];

    if (prevSong) handlePlaySong(prevSong.song_id, currentPlaylist);
  }, [currentPlaylist, currentSongId, handlePlaySong]);

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

  return <SongPlayerContext.Provider value={{ handlePlaySong, handlePauseSong, currentSongId, currentPlaylist, setCurrentPlaylist, duration, volume, setVolume, handleVolume, handleNext, handlePrevious, handleProgressSong, currentSongTime, progress, audioRef, songRef }}>{children}</SongPlayerContext.Provider>;
}

function useSongPlayer() {
  const context = useContext(SongPlayerContext);
  if (context === undefined) throw new Error("SongsPlayerContext is used outside of SongsPlayerProvider");
  return context;
}

export { SongPlayerProvider, useSongPlayer };
