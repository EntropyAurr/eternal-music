import styled from "styled-components";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import PlayListTable from "../features/playlists/PlayListTable";
import { useSongs } from "../features/songs/useSongs";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";
import Song from "../features/songs/Song";

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

const AllSongsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 4rem;
`;

const Songs = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

function Playlists() {
  const { songs, isPending } = useSongs();

  if (isPending) return <Spinner />;
  if (!songs) return <Empty />;

  return (
    <StyledPlaylists>
      <Header>
        <Heading as="h2">Playlist #</Heading>
        <Button $variation="primary" size="large">
          Add song to playlist
        </Button>
      </Header>

      <AllSongsContainer>
        <Heading as="h3">All Songs</Heading>
        <Songs>
          {songs.map((song) => (
            <Song song={song} key={song.id} />
          ))}
        </Songs>
      </AllSongsContainer>

      {/* <PlayListTable /> */}
    </StyledPlaylists>
  );
}

export default Playlists;
