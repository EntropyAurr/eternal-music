import { useParams } from "react-router-dom";
import { HiPencil, HiTrash, HiXMark } from "react-icons/hi2";
import styled from "styled-components";

import { formatDuration } from "../../utils/helpers";
import { useUploadSong } from "./useUploadSong";
import { useDeleteSong } from "./useDeleteSong";
import { usePlaylists } from "../playlists/usePlaylists";
import Spinner from "../../ui/Spinner";

import Empty from "../../ui/Empty";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import CreateSongForm from "../songs/CreateSongForm";
import ConfirmDelete from "../../ui/ConfirmDelete";

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

function Song({ songContain, songIdForPlaylist, onPlay }) {
  const { name, artist, duration } = songContain;
  const { uploadSong } = useUploadSong();
  const { playlists, isPendingPlaylists } = usePlaylists();
  const { playlistId } = useParams();
  const { isDeleting, deleteSong } = useDeleteSong();

  if (isPendingPlaylists) return <Spinner />;
  if (!playlists) return <Empty />;

  const optionPlaylist = playlists.filter((playlist) => playlist.id !== Number(playlistId));

  function handleAdd(playlistId) {
    const songForPlaylist = {
      songIdForPlaylist,
      playlistId,
    };
    uploadSong(songForPlaylist);
  }

  return (
    <StyledSong>
      <SongTitle onClick={() => onPlay(songIdForPlaylist)}>{name}</SongTitle>
      <p>{artist}</p>
      <p>{formatDuration(duration)}</p>
      {songIdForPlaylist &&
        optionPlaylist.map((playlist) => (
          <Button $variation="primary" size="small" onClick={() => handleAdd(playlist.id)} key={playlist.id}>
            Add to {playlist.playlistName}
          </Button>
        ))}

      <div>
        <Modal>
          <Menus>
            <Menus.Menu>
              <Menus.Toggle id={songIdForPlaylist} />

              <Menus.List id={songIdForPlaylist}>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="remove">
                  <Menus.Button icon={<HiXMark />}>Remove</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="edit">
                <CreateSongForm songToUpdate={songContain} id={songIdForPlaylist} />
              </Modal.Window>

              <Modal.Window name="remove"></Modal.Window>

              <Modal.Window name="delete">
                <ConfirmDelete resourceName="song" disabled={isDeleting} onConfirm={() => deleteSong(songIdForPlaylist)} />
              </Modal.Window>
            </Menus.Menu>
          </Menus>
        </Modal>
      </div>
    </StyledSong>
  );
}

export default Song;
