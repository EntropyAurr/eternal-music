import { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSongPlayer } from "../../context/SongPlayerContext";
import { usePlaylists } from "./usePlaylists";
import { usePlaylistSong } from "./usePlaylistSong";

import { Pencil, X } from "lucide-react";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";
import Heading from "../../ui/Heading";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import TogglePlay from "../player/TogglePlay";
import AddSong from "../songs/AddSong";
import Song from "../songs/Song";
import CreatePlaylistForm from "./CreatePlaylistForm";
import { useDeletePlaylist } from "./useDeletePlaylist";

function Playlist() {
  const { playlistId } = useParams();

  const { songsFromPlaylist, isPending } = usePlaylistSong();
  const { playlists, isPendingPlaylists } = usePlaylists();
  const { isDeleting, deletePlaylist } = useDeletePlaylist();
  const { handlePlaySong, setCurrentPlaylist, currentSongId } = useSongPlayer();

  useEffect(() => {
    if (songsFromPlaylist && !currentSongId) {
      setCurrentPlaylist(songsFromPlaylist);
    }
  }, [songsFromPlaylist, setCurrentPlaylist, currentSongId]);

  const handlePlay = (songId) => {
    handlePlaySong(songId, songsFromPlaylist);
  };

  if (isPendingPlaylists && isPending) return <Spinner />;
  if (!playlists || !songsFromPlaylist) return <Empty />;

  const playlist = playlists.find((playlist) => playlist.id === Number(playlistId));

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-9">
        <Heading as="h2">{playlist.playlistName}</Heading>
        <TogglePlay type="playlist" currentPlaylistId={playlist.id} songsFromPlaylist={songsFromPlaylist} />

        <div>
          <Modal>
            <Menus>
              <Menus.Menu>
                <Menus.Toggle id={playlist.id} />

                <Menus.List id={playlist.id}>
                  <Modal.Open opens="edit">
                    <Menus.Button icon={<Pencil />}>Edit</Menus.Button>
                  </Modal.Open>

                  <Modal.Open opens="delete">
                    <Menus.Button icon={<X />}>Delete</Menus.Button>
                  </Modal.Open>
                </Menus.List>

                <Modal.Window name="edit">
                  <CreatePlaylistForm id={playlist.id} playlistToUpdate={playlist} />
                </Modal.Window>

                <Modal.Window name="delete">
                  <ConfirmDelete resourceName="playlist" onConfirm={() => deletePlaylist(playlist.id)} disabled={isDeleting} />
                </Modal.Window>
              </Menus.Menu>
            </Menus>
          </Modal>
        </div>
      </div>

      {songsFromPlaylist.map((song) => (
        <Song songContain={song.song} songIdForPlaylist={song.song_id} playlistId={song.playlist_id} key={song.song_id} onPlay={handlePlay} />
      ))}

      <AddSong />
    </div>
  );
}

export default Playlist;
