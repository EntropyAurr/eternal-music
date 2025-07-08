import styled from "styled-components";
import Empty from "../../ui/Empty";
import Song from "./Song";
import { useSongs } from "./useSongs";

const StyledSong = styled.div`
  display: grid;
  grid-template-columns: 2fr 20rem 20rem 1fr;
  gap: 3rem;
  align-items: center;
  justify-content: space-between;
`;

function SongForPlaylist() {
  const { songs } = useSongs();

  if (!songs.length) return <Empty />;

  return (
    <StyledSong>
      {songs.map((song) => (
        <Song key={song.id} song={song} />
      ))}
    </StyledSong>
  );
}

export default SongForPlaylist;
