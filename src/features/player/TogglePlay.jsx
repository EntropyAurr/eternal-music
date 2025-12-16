import clsx from "clsx";
import { Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { useSongPlayer } from "../../context/SongPlayerContext";

function TogglePlay({ type = "song", currentPlaylistId, songsFromPlaylist, randomSongs }) {
  const { handlePlaySong, handlePauseSong, currentSongId, currentPlaylist, setCurrentPlaylist, audioRef, songRef, songIndex, isPlaying, setIsPlaying, isEnding, setIsEnding, activePlaylistId, setActivePlaylistId, isShuffle, shuffleRef } = useSongPlayer();

  // const isSamePlaylist = songRef?.current?.playlist_id === currentPlaylistId;
  // const isSamePlaylist = activePlaylistId === currentPlaylistId;
  const isSamePlaylist = activePlaylistId === currentPlaylistId && songRef?.current?.playlist_id === currentPlaylistId;

  const effectivePlaylist = isShuffle ? shuffleRef.current[currentPlaylistId] || randomSongs : songsFromPlaylist;

  useEffect(function () {
    const audio = audioRef.current;

    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setIsEnding(true);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    if (!songsFromPlaylist) return;
    if (activePlaylistId !== currentPlaylistId) {
      return;
    }

    setCurrentPlaylist((prev) => {
      const currentSong = prev.find((song) => song.isPlaying);

      if (currentSong && songsFromPlaylist.some((song) => song.id === currentSong.id)) {
        return songsFromPlaylist.map((song) => ({
          ...song,
          isPlaying: song.id === currentSong.id,
        }));
      }

      return songsFromPlaylist;
    });
  }, [songsFromPlaylist, randomSongs, activePlaylistId, currentPlaylistId]);

  function handleToggle() {
    console.log(currentPlaylistId);
    console.log(activePlaylistId);
    console.log(isSamePlaylist);

    if (!currentSongId) {
      console.log("TEST-0");

      setActivePlaylistId(currentPlaylistId);

      if (isShuffle) {
        console.log("TEST-1");

        setCurrentPlaylist(randomSongs);
        handlePlaySong(randomSongs[0].song_id, randomSongs);
      } else {
        console.log("TEST-2");

        setCurrentPlaylist(songsFromPlaylist);
        handlePlaySong(songsFromPlaylist[0].song_id, songsFromPlaylist);
      }

      return;
    }

    if (type === "playlist" && !isSamePlaylist) {
      console.log("TEST-3");
      console.log(currentPlaylist);

      setActivePlaylistId(currentPlaylistId);

      handlePlaySong(currentPlaylist[0].song_id, currentPlaylist);

      return;
    }

    if (songIndex === currentPlaylist.length - 1 && isEnding) {
      handlePlaySong(currentPlaylist[0].song_id, currentPlaylist);
      setIsEnding(false);
      return;
    }

    if (isPlaying) {
      handlePauseSong();

      console.log("TEST-7");
    } else {
      handlePlaySong(currentSongId, currentPlaylist);

      console.log("TEST-8");
      console.log(currentSongId);
      console.log(currentPlaylist);
    }
  }

  return (
    <button className={clsx("button-icon", type === "playlist" ? "bg-primary text-white" : "bg-gray-700 text-white hover:bg-gray-800")} onClick={handleToggle}>
      {type === "playlist" ? isSamePlaylist && isPlaying ? <Pause /> : <Play /> : isPlaying && songRef.current ? <Pause /> : <Play />}
    </button>
  );
}

export default TogglePlay;
