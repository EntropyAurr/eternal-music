import styled from "styled-components";
import { useSongs } from "../songs/useSongs";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Song from "../songs/Song";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";

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

function Playlists() {
  const { songs, isPending } = useSongs();

  if (isPending) return <Spinner />;
  if (!songs) return <Empty />;

  return (
    <StyledPlaylist>
      <Header>
        <Heading as="h2">Playlist name</Heading>
        <Button $variation="primary" size="large">
          Add song to playlist
        </Button>
      </Header>

      <Songs>
        {songs.map((song) => (
          <Song song={song} key={song.id} />
        ))}
      </Songs>
    </StyledPlaylist>
  );
}

export default Playlists;
