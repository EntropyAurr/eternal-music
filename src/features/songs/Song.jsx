import { Pencil, Plus, Trash, X } from "lucide-react";
import { formatDuration } from "../../utils/helpers";
import { usePlaylists } from "../playlists/usePlaylists";
import { useDeleteSong } from "./useDeleteSong";
import { useRemoveSong } from "./useRemoveSong";

import ConfirmDelete from "../../ui/ConfirmDelete";
import ConfirmRemove from "../../ui/ConfirmRemove";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import CreateSongForm from "../songs/CreateSongForm";
import AddSongToPlaylist from "./AddSongToPlaylist";

function Song({ songContain, songIdForPlaylist, playlistId, onPlay }) {
  const { name, artist, duration } = songContain;

  const { playlists, isPendingPlaylists } = usePlaylists();
  const { isDeleting, deleteSong } = useDeleteSong();
  const { isRemoving, removeSong } = useRemoveSong();

  if (isPendingPlaylists) return <Spinner />;
  if (!playlists) return <Empty />;

  const optionPlaylist = playlists.filter((playlist) => playlist.id !== playlistId);

  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_auto] items-center justify-between gap-7">
      <p onClick={() => onPlay(songIdForPlaylist)} className="cursor-pointer text-xl font-semibold">
        {name}
      </p>

      <p>{artist}</p>

      <p>{formatDuration(duration)}</p>

      <div>
        <Modal>
          <Menus>
            <Menus.Menu>
              <Menus.Toggle id={songIdForPlaylist} />

              <Menus.List id={songIdForPlaylist}>
                <Modal.Open opens="add">
                  <Menus.Button icon={<Plus />}>Add</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="edit">
                  <Menus.Button icon={<Pencil />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="remove">
                  <Menus.Button icon={<X />}>Remove</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<Trash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="add">
                <AddSongToPlaylist optionPlaylist={optionPlaylist} songToUpdate={songContain} songIdForPlaylist={songIdForPlaylist} />
              </Modal.Window>

              <Modal.Window name="edit">
                <CreateSongForm songToUpdate={songContain} id={songIdForPlaylist} />
              </Modal.Window>

              <Modal.Window name="remove">
                <ConfirmRemove resourceName="song" disabled={isRemoving} onConfirm={() => removeSong({ songId: songIdForPlaylist, playlistId })} />
              </Modal.Window>

              <Modal.Window name="delete">
                <ConfirmDelete resourceName="song" disabled={isDeleting} onConfirm={() => deleteSong(songIdForPlaylist)} />
              </Modal.Window>
            </Menus.Menu>
          </Menus>
        </Modal>
      </div>
    </div>
  );
}

export default Song;
