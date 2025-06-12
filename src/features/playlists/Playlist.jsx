import { useState } from "react";
import styled from "styled-components";
import { useSongs } from "../songs/useSongs";
import { usePlaylist } from "./usePlaylist";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Song from "../songs/Song";
import Button from "../../ui/Button";
import CreateSongForm from "../songs/CreateSongForm";
import SongForPlaylist from "../songs/SongForPlaylist";

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

const Songs = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

function Playlist() {
  const { playlist, isPendingPlaylist } = usePlaylist();
  const { songs, isPending } = useSongs();

  const [showForm, setShowForm] = useState(false);

  if (isPending || isPendingPlaylist) return <Spinner />;
  if (!songs || !playlist) return <Empty />;

  const { id, playlistName } = playlist;

  function handleShowForm() {
    setShowForm((show) => !show);
  }

  return (
    <StyledPlaylist>
      <Header as="h2">{playlistName}</Header>

      {id === 1 ? (
        <Songs>
          {songs.map((song) => (
            <Song song={song} key={song.id} />
          ))}
        </Songs>
      ) : (
        <SongForPlaylist />
      )}

      <Button $variation="primary" size="medium" onClick={handleShowForm}>
        Add song
      </Button>
      {showForm && <CreateSongForm />}
    </StyledPlaylist>
  );
}

export default Playlist;
