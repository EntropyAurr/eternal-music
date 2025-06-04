import styled from "styled-components";
import SongItem from "../songs/SongItem";
import { useSongs } from "../songs/useSongs";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";

const StyledPlaylists = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledSong = styled.ul`
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
      <StyledSong>
        {songs.map((song) => (
          <SongItem song={song} key={song.id} />
        ))}
      </StyledSong>
    </StyledPlaylists>
  );
}

export default Playlists;
