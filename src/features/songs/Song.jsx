import styled from "styled-components";
import Button from "../../ui/Button";
import { formatDuration } from "../../utils/helpers";
import { useSongPlayer } from "../../context/SongPlayerContext";
import { useUploadSong } from "./useUploadSong";

const StyledSong = styled.div`
  display: grid;
  grid-template-columns: 2fr 20rem 20rem 1fr;
  gap: 3rem;
  align-items: center;
  justify-content: space-between;
`;
const SongTitle = styled.p`
  cursor: pointer;
  font-size: 1.8rem;
  font-weight: 600;
`;

function Song({ song }) {
  const { id: songId, name, artist, duration } = song;
  const { handlePlaySong } = useSongPlayer();
  const { uploadSong } = useUploadSong();

  function handleAdd() {
    const songForPlaylist = {
      songId: songId,
    };
    uploadSong(songForPlaylist);
  }

  return (
    <StyledSong>
      <SongTitle onClick={() => handlePlaySong(songId)}>{name}</SongTitle>
      <p>{artist}</p>
      <p>{formatDuration(duration)}</p>
      <Button $variation="primary" size="small" onClick={() => handleAdd()}>
        Add to playlist
      </Button>
    </StyledSong>
  );
}

export default Song;
