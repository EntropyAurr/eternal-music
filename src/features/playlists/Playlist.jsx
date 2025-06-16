import { useState } from "react";
import styled from "styled-components";
import Button from "../../ui/Button";
import Empty from "../../ui/Empty";
import CreateSongForm from "../../features/songs/CreateSongForm";
import { usePlaylist } from "../../context/PlaylistContext";

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

const SongTitle = styled.p`
  cursor: pointer;
  font-size: 1.8rem;
  font-weight: 600;
`;

function Playlist() {
  const [showForm, setShowForm] = useState(false);
  const { playlist } = usePlaylist();

  if (!playlist) return <Empty />;

  const { playlistName, songId } = playlist;

  function handleShowForm() {
    setShowForm((show) => !show);
  }

  return (
    <StyledPlaylist>
      <Header as="h2">{playlistName}</Header>

      <SongTitle></SongTitle>

      <Button $variation="primary" size="medium" onClick={handleShowForm}>
        Add new song
      </Button>
      {showForm && <CreateSongForm />}
    </StyledPlaylist>
  );
}

export default Playlist;
