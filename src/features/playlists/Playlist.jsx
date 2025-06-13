import { useState } from "react";
import styled from "styled-components";
import Button from "../../ui/Button";
import Empty from "../../ui/Empty";

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

function Playlist({ playlist }) {
  const [showForm, setShowForm] = useState(false);

  if (!playlist) return <Empty />;

  const { playlistName, songId } = playlist;

  function handleShowForm() {
    setShowForm((show) => !show);
  }

  return (
    <StyledPlaylist>
      <Header as="h2">{playlistName}</Header>

      <Button $variation="primary" size="medium" onClick={handleShowForm}>
        Add new song
      </Button>
      {showForm && <CreateSongForm />}
    </StyledPlaylist>
  );
}

export default Playlist;
