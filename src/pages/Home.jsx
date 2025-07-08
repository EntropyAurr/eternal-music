import styled from "styled-components";
import Heading from "../ui/Heading";
import { useSongs } from "../features/songs/useSongs";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";
import Song from "../features/songs/Song";
import { usePlaylists } from "../features/playlists/usePlaylists";

const StyledHome = styled.div`
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

function Home() {
  const { songs, isPending } = useSongs();
  const { playlists, isPendingPlaylists } = usePlaylists();

  if (isPending || isPendingPlaylists) return <Spinner />;
  if (!songs || !playlists) return <Empty />;

  return (
    <StyledHome>
      <Header>
        <Heading as="h2">Playlist #</Heading>
      </Header>

      <AllSongsContainer>
        <Heading as="h3">All Songs</Heading>
        <Songs>
          {songs.map((song) => (
            <Song song={song} key={song.id} />
          ))}
        </Songs>
      </AllSongsContainer>
    </StyledHome>
  );
}

export default Home;
