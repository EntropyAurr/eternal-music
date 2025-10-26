/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePlaylistSong } from "../features/playlists/usePlaylistSong";

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

  const { songsFromPlaylist, isPending } = usePlaylistSong();

  // VOLUME adjustment
  if (!songRef.current) audio.volume = volume / 100; // default volume: 15

  function handleVolume(value) {
    audio.volume = value / 100;
    setVolume(value);
  }

  // const currentPlaylistRef = useRef(currentPlaylist);
  // const currentPlaylistRef = useRef(songsFromPlaylist);

  // useEffect(() => {
  //   currentPlaylistRef.current = currentPlaylist;
  // }, [currentPlaylist]);

  // PLAY song
  const handlePlaySong = useCallback(
    (id, songList) => {
      const effectiveList = songList || currentPlaylist;
      // const effectiveList = songList || songsFromPlaylist;

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

      // test - s
      const nextIndex = (index + 1) % effectiveList.length || null;
      const playNextSong = effectiveList[nextIndex];

      setNextSong(playNextSong);
      setNextSongIndex(nextIndex);
      // test - e

      // because React's state updates are asynchronous => currentSongId still holds the old value until the next render => currentSongId !== song.id
    },
    [audio, currentSongTime, songsFromPlaylist],
  );

  // PAUSE song
  function handlePauseSong() {
    setCurrentSongTime(audio.currentTime);
    audio.pause();
  }

  // NEXT song
  const handleNext = useCallback(() => {
    console.log(currentPlaylist);

    if (!currentPlaylist || !currentPlaylist.length || currentSongId === null) return;

    if (songIndex === -1 || songIndex === currentPlaylist.length - 1) return;

    const nextIndex = (songIndex + 1) % currentPlaylist.length || null;
    const playNextSong = currentPlaylist[nextIndex];

    if (playNextSong) handlePlaySong(playNextSong.song_id, currentPlaylist);
  }, [songIndex, currentPlaylist]);

  // PREVIOUS song
  const handlePrevious = useCallback(() => {
    if (!currentPlaylist || !currentPlaylist.length || currentSongId === null) return;

    if (songIndex === -1 || songIndex === 0) return;

    const prevSong = currentPlaylist[songIndex - 1];

    if (prevSong) handlePlaySong(prevSong.song_id, currentPlaylist);
  }, [songIndex, currentPlaylist]);

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

  // if (isPending) return <Spinner />;
  // if (!songsFromPlaylist) return <Empty />;

  return <SongPlayerContext.Provider value={{ handlePlaySong, handlePauseSong, currentSongId, currentPlaylist, setCurrentPlaylist, duration, volume, setVolume, handleVolume, handleNext, handlePrevious, handleProgressSong, currentSongTime, setCurrentSongTime, progress, audioRef, songRef, songIndex, isPlaying, setIsPlaying, isEnding, setIsEnding, currentPlaylist, nextSong, nextSongIndex }}>{children}</SongPlayerContext.Provider>;
}

function useSongPlayer() {
  const context = useContext(SongPlayerContext);
  if (context === undefined) throw new Error("SongsPlayerContext is used outside of SongsPlayerProvider");
  return context;
}

export { SongPlayerProvider, useSongPlayer };
