import styled from "styled-components";
import Button from "../../ui/Button";
import { formatDuration } from "../../utils/helpers";
import { useSongPlayer } from "../../context/SongPlayerContext";
import { useUploadSong } from "./useUploadSong";
import { usePlaylists } from "../playlists/usePlaylists";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";

const StyledSong = styled.div`
  display: grid;
  grid-template-columns: 2fr 20rem 10rem auto auto;
  gap: 3rem;
  align-items: center;
  justify-content: space-between;
`;
const SongTitle = styled.p`
  cursor: pointer;
  font-size: 1.8rem;
  font-weight: 600;
`;

function Song({ song, songIdForPlaylist }) {
  const { id: songId, name, artist, duration } = song;
  const { handlePlaySong } = useSongPlayer();
  const { uploadSong } = useUploadSong();
  const { playlists, isPendingPlaylists } = usePlaylists();

  if (isPendingPlaylists) return <Spinner />;
  if (!playlists) return <Empty />;

  function handleAdd(playlistId) {
    const songForPlaylist = {
      songId,
      playlistId,
    };
    uploadSong(songForPlaylist);
  }

  return (
    <StyledSong>
      <SongTitle onClick={() => handlePlaySong(songId ?? songIdForPlaylist)}>{name}</SongTitle>
      <p>{artist}</p>
      <p>{formatDuration(duration)}</p>
      {songId &&
        playlists.map((playlist) => (
          <Button $variation="primary" size="small" onClick={() => handleAdd(playlist.id)} key={playlist.id}>
            Add to {playlist.playlistName}
          </Button>
        ))}
    </StyledSong>
  );
}

export default Song;
