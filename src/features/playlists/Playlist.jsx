import { useEffect } from "react";
import styled from "styled-components";

import { usePlaylists } from "./usePlaylists";
import { useParams } from "react-router-dom";
import { usePlaylistSong } from "./usePlaylistSong";
import { useSongPlayer } from "../../context/SongPlayerContext";

import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Song from "../songs/Song";
import AddSong from "../songs/AddSong";
import Heading from "../../ui/Heading";
import TogglePlaylist from "./TogglePlaylist";

const StyledPlaylist = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 3.5rem;
`;

function Playlist() {
  const { playlistId } = useParams();

  const { songsFromPlaylist, isPending } = usePlaylistSong();
  const { playlists, isPendingPlaylists } = usePlaylists();
  const { handlePlaySong, setCurrentPlaylist, currentSongId } = useSongPlayer();

  useEffect(() => {
    if (songsFromPlaylist && !currentSongId) {
      setCurrentPlaylist(songsFromPlaylist);
    }
  }, [songsFromPlaylist, setCurrentPlaylist, currentSongId]);

  const handlePlay = (songId) => {
    handlePlaySong(songId, songsFromPlaylist);
  };

  if (isPendingPlaylists && isPending) return <Spinner />;
  if (!playlists || !songsFromPlaylist) return <Empty />;

  const playlist = playlists.find((playlist) => playlist.id === Number(playlistId));

  return (
    <StyledPlaylist>
      <Header>
        <Heading as="h2">{playlist.playlistName}</Heading>
        <TogglePlaylist currentPlaylistId={playlist.id} songsFromPlaylist={songsFromPlaylist} />
      </Header>

      {songsFromPlaylist.map((song) => (
        <Song songContain={song.song} songIdForPlaylist={song.song_id} playlistId={song.playlist_id} key={song.song_id} onPlay={handlePlay} />
      ))}

      <AddSong />
    </StyledPlaylist>
  );
}

export default Playlist;
