import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../ui/Button";
import Empty from "../../ui/Empty";
import CreateSongForm from "../../features/songs/CreateSongForm";
import { usePlaylists } from "./usePlaylists";
import { useParams } from "react-router-dom";
import { usePlaylistSong } from "./usePlaylistSong";
import Spinner from "../../ui/Spinner";
import Song from "../songs/Song";
import { useSongPlayer } from "../../context/SongPlayerContext";

const StyledPlaylist = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
`;

function Playlist() {
  const { songsFromPlaylist, isPending } = usePlaylistSong();
  const { playlists, isPendingPlaylists } = usePlaylists();

  const { handlePlaySong, setCurrentPlaylist, currentSongId } = useSongPlayer();
  const { playlistId } = useParams();
  const [showForm, setShowForm] = useState(false);

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

  function handleShowForm() {
    setShowForm((show) => !show);
  }

  const playlist = playlists.find((playlist) => playlist.id === Number(playlistId));

  return (
    <StyledPlaylist>
      <Header as="h2">{playlist.playlistName}</Header>

      {songsFromPlaylist.map((song) => (
        <Song songContain={song.song} songIdForPlaylist={song.song_id} key={song.song_id} onPlay={handlePlay} />
      ))}

      <Button $variation="primary" size="medium" onClick={handleShowForm}>
        Add new song
      </Button>
      {showForm && <CreateSongForm />}
    </StyledPlaylist>
  );
}

export default Playlist;
