import styled from "styled-components";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import PlayListTable from "../features/playlists/PlayListTable";

const StyledPlaylists = styled.div`
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

function Playlists() {
  return (
    <StyledPlaylists>
      <Header>
        <Heading as="h2">Playlist #</Heading>
        <Button $variation="primary" size="large">
          Add song to playlist
        </Button>
      </Header>

      {/* <PlayListTable /> */}
    </StyledPlaylists>
  );
}

export default Playlists;
