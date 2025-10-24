/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const SongPlayerContext = createContext();

function SongPlayerProvider({ children }) {
  const audioRef = useRef(new Audio());
  const songRef = useRef(null); // songRef.current: used to store the current song object
  const audio = audioRef.current;

  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [currentSongId, setCurrentSongId] = useState(null);
  const [songIndex, setSongIndex] = useState(null);
  const [duration, setDuration] = useState(null);
  const [currentSongTime, setCurrentSongTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(15);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnding, setIsEnding] = useState(false);

  const [nextSong, setNextSong] = useState(null);
  const [nextSongIndex, setNextSongIndex] = useState(null);

  // VOLUME adjustment
  if (!songRef.current) audio.volume = volume / 100; // default volume: 15

  function handleVolume(value) {
    audio.volume = value / 100;
    setVolume(value);
  }

  const currentPlaylistRef = useRef(currentPlaylist);

  useEffect(() => {
    currentPlaylistRef.current = currentPlaylist;
  }, [currentPlaylist]);

  // PLAY song
  const handlePlaySong = useCallback(
    (id, songList) => {
      const effectiveList = songList || currentPlaylistRef.current;

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
      } else {
        audio.currentTime = currentSongTime;
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

      const nextIndex = (index + 1) % songList.length || null;
      const playNextSong = effectiveList[nextIndex];

      setNextSong(playNextSong);
      setNextSongIndex(nextIndex);

      // because React's state updates are asynchronous => currentSongId still holds the old value until the next render => currentSongId !== song.id
    },
    [audio, currentSongTime, currentPlaylistRef.current],
  );

  // PAUSE song
  function handlePauseSong() {
    setCurrentSongTime(audio.currentTime);
    audio.pause();
  }

  // NEXT song
  const handleNext = useCallback(() => {
    const playlist = currentPlaylistRef.current;

    if (!playlist || !playlist.length || currentSongId === null) return;

    // const index = playlist.findIndex((song) => song.song_id === currentSongId);

    // if (index === -1 || index === playlist.length - 1) return;
    if (songIndex === -1 || songIndex === playlist.length - 1) return;

    const nextIndex = (songIndex + 1) % playlist.length;
    const playNextSong = playlist[nextIndex];

    if (playNextSong) handlePlaySong(playNextSong.song_id, playlist);
  }, [songIndex, currentPlaylistRef.current]);

  // PREVIOUS song
  const handlePrevious = useCallback(() => {
    const playlist = currentPlaylistRef.current;
    if (!playlist || !playlist.length || currentSongId === null) return;

    const index = playlist.findIndex((song) => song.song_id === currentSongId);

    if (index === 0) return;

    const prevSong = playlist[index - 1];

    if (prevSong) handlePlaySong(prevSong.song_id, playlist);
  }, [currentSongId, handlePlaySong]);

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
    [handleNext, audio, duration],
  );

  return <SongPlayerContext.Provider value={{ handlePlaySong, handlePauseSong, currentSongId, currentPlaylist, setCurrentPlaylist, duration, volume, setVolume, handleVolume, handleNext, handlePrevious, handleProgressSong, currentSongTime, setCurrentSongTime, progress, audioRef, songRef, songIndex, isPlaying, setIsPlaying, isEnding, setIsEnding, currentPlaylist, nextSong, nextSongIndex }}>{children}</SongPlayerContext.Provider>;
}

function useSongPlayer() {
  const context = useContext(SongPlayerContext);
  if (context === undefined) throw new Error("SongsPlayerContext is used outside of SongsPlayerProvider");
  return context;
}

export { SongPlayerProvider, useSongPlayer };
