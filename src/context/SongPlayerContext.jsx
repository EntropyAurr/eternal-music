/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const SongPlayerContext = createContext();

function SongPlayerProvider({ children }) {
  const audioRef = useRef(new Audio());
  const songRef = useRef(null); // songRef.current: used to store the current song object
  const shuffleRef = useRef({});

  const audio = audioRef.current;

  const [currentPlayedPlaylist, setCurrentPlayedPlaylist] = useState([]);
  const [currentSongId, setCurrentSongId] = useState(null);
  const [activePlaylistId, setActivePlaylistId] = useState(null);
  const [songIndex, setSongIndex] = useState(null);
  const [duration, setDuration] = useState(null);
  const [currentSongTime, setCurrentSongTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(15);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
  const [isLoopPlaylist, setIsLoopPlaylist] = useState(false);
  const [isLoopSong, setIsLoopSong] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  // VOLUME adjustment
  if (!songRef.current) audio.volume = volume / 100; // default volume: 15

  function handleVolume(value) {
    audio.volume = value / 100;
    setVolume(value);
  }

  function getCurrentSong() {
    return currentPlayedPlaylist?.find((song) => song.song_id === currentSongId)?.song ?? songRef.current?.song ?? null;
  }

  // PLAY song
  const handlePlaySong = useCallback(
    (id, songList) => {
      const effectiveList = songList || currentPlayedPlaylist;

      if (!effectiveList) {
        console.log("No playlist available");
        return;
      }

      const song = effectiveList.find((song) => song.song_id === id);
      const index = effectiveList.indexOf(song);

      if (!song) return;

      if (!songRef.current || songRef.current.song_id !== id) {
        audio.src = song.song.url;
        audio.currentTime = 0;
        setCurrentSongTime(0);
        setProgress(0);
      }

      songRef.current = song;
      setDuration(song.song.duration);

      audio.play().catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Playback failed:", error);
        }
      });

      setCurrentSongId(song.song_id);
      setSongIndex(index);
    },
    [audio],
  );

  // PAUSE song
  function handlePauseSong() {
    setCurrentSongTime(audio.currentTime);
    audio.pause();
  }

  // NEXT song
  const handleNext = useCallback(() => {
    if (!currentPlayedPlaylist?.length || currentSongId === null) return;

    if (songIndex === -1 || songIndex === currentPlayedPlaylist.length - 1) return;

    const nextIndex = (songIndex + 1) % currentPlayedPlaylist.length || null;
    const nextSong = currentPlayedPlaylist[nextIndex];

    if (nextSong) handlePlaySong(nextSong.song_id, currentPlayedPlaylist);
  }, [songIndex, currentPlayedPlaylist]);

  // PREVIOUS song
  const handlePrevious = useCallback(() => {
    if (!currentPlayedPlaylist || !currentPlayedPlaylist.length || currentSongId === null) return;

    if (songIndex === -1 || songIndex === 0) return;

    const prevSong = currentPlayedPlaylist[songIndex - 1];

    if (prevSong) handlePlaySong(prevSong.song_id, currentPlayedPlaylist);
  }, [songIndex, currentPlayedPlaylist]);

  // PROGRESS of a song
  function handleProgressSong(value) {
    audio.currentTime = (value * duration) / 100;
    setCurrentSongTime(value);
  }

  // SHUFFLE
  function handleShuffle() {
    setIsShuffle((toggle) => !toggle);
  }

  // LOOP
  // Loop playlist
  function handleLoopPlaylist() {
    setIsLoopPlaylist((toggle) => !toggle);
  }

  if (isLoopPlaylist && songIndex === currentPlayedPlaylist.length - 1 && audio.currentTime === audio.duration) {
    handlePlaySong(currentPlayedPlaylist[0].song_id, currentPlayedPlaylist);
    return;
  }

  // Loop single song
  function handleLoopSong() {
    setIsLoopSong((toggle) => !toggle);
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
        if (!isLoopSong) {
          handleNext();
        } else {
          handlePlaySong(currentPlayedPlaylist[songIndex].song_id, currentPlayedPlaylist);
        }
      }

      audio.addEventListener("timeupdate", handleProgressUpdate);
      audio.addEventListener("ended", handleEnded);

      return () => {
        audio.removeEventListener("timeupdate", handleProgressUpdate);
        audio.removeEventListener("ended", handleEnded);
      };
    },
    [handleNext, audio, duration, isLoopSong],
  );

  return <SongPlayerContext.Provider value={{ handlePlaySong, handlePauseSong, currentSongId, currentPlayedPlaylist, setCurrentPlayedPlaylist, duration, volume, setVolume, handleVolume, handleNext, handlePrevious, handleProgressSong, currentSongTime, setCurrentSongTime, progress, audioRef, songRef, songIndex, isPlaying, setIsPlaying, isEnding, setIsEnding, currentPlayedPlaylist, isLoopPlaylist, setIsLoopPlaylist, handleLoopPlaylist, isLoopSong, setIsLoopSong, handleLoopSong, isShuffle, setIsShuffle, handleShuffle, getCurrentSong, activePlaylistId, setActivePlaylistId, shuffleRef }}>{children}</SongPlayerContext.Provider>;
}

function useSongPlayer() {
  const context = useContext(SongPlayerContext);
  if (context === undefined) throw new Error("SongsPlayerContext is used outside of SongsPlayerProvider");
  return context;
}

export { SongPlayerProvider, useSongPlayer };
