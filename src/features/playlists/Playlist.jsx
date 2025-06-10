import styled from "styled-components";
import { useSongs } from "../songs/useSongs";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Song from "../songs/Song";
import { usePlaylist } from "./usePlaylist";
import Button from "../../ui/Button";
import CreateSongForm from "../songs/CreateSongForm";

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
  const { songs, isPending } = useSongs();
  const { playlist, isPendingPlaylist } = usePlaylist();

  if (isPending || isPendingPlaylist) return <Spinner />;
  if (!songs || !playlist) return <Empty />;

  return (
    <StyledPlaylist>
      <Header as="h2">{playlist.playlistName}</Header>

      <Songs>
        {songs.map((song) => (
          <Song song={song} key={song.id} />
        ))}
      </Songs>

      <Button $variation="primary" size="medium" onClick={() => {}}>
        Add song
      </Button>
      <CreateSongForm />
    </StyledPlaylist>
  );
}

export default Playlist;
