import { useEffect } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import { Pencil, Repeat, Repeat1, Shuffle, X } from "lucide-react";
import { useSongPlayer } from "../../context/SongPlayerContext";
import { usePlaylists } from "./usePlaylists";
import { usePlaylistSong } from "./usePlaylistSong";
import { useDeletePlaylist } from "./useDeletePlaylist";
import { useRandomSong } from "./useRandomSong";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import TogglePlay from "../player/TogglePlay";
import AddSong from "../songs/AddSong";
import Song from "../songs/Song";
import CreatePlaylistForm from "./CreatePlaylistForm";

function Playlist() {
  const { playlistId } = useParams();

  const { songsFromPlaylist, isPending } = usePlaylistSong();
  const { randomSongs } = useRandomSong();
  const { playlists, isPendingPlaylists } = usePlaylists();
  const { isDeleting, deletePlaylist } = useDeletePlaylist();
  const { handlePlaySong, setCurrentPlaylist, isLoopPlaylist, handleLoopPlaylist, isShuffle, handleShuffle, currentPlaylist, setActivePlaylistId } = useSongPlayer();

  useEffect(() => {
    if (playlistId) {
      setActivePlaylistId(Number(playlistId));
    }
  }, [playlistId]);

  // Shuffle songs in playlist
  useEffect(() => {
    /* if (!currentPlaylist) {
      setCurrentPlaylist(songsFromPlaylist);
    } */

    if (isShuffle && randomSongs?.length > 0) {
      setCurrentPlaylist(randomSongs);
    } /* else {
      setCurrentPlaylist(songsFromPlaylist);
    } */
  }, [songsFromPlaylist, randomSongs, isShuffle]);

  function handlePlay(songId) {
    handlePlaySong(songId, currentPlaylist);
  }

  if (isPendingPlaylists && isPending && isPendingRandom) return <Spinner />;
  if (!playlists || !songsFromPlaylist || !randomSongs) return <Empty />;

  const playlist = playlists.find((playlist) => playlist.id === Number(playlistId));

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-9">
        <h2 className="text-2xl font-semibold">{playlist.playlistName}</h2>

        <TogglePlay type="playlist" currentPlaylistId={playlist.id} songsFromPlaylist={songsFromPlaylist} randomSongs={randomSongs} />

        <button onClick={handleLoopPlaylist}>{isLoopPlaylist ? <Repeat1 /> : <Repeat />}</button>

        <button onClick={handleShuffle}>
          <Shuffle className={clsx(isShuffle && "text-primary")} />
        </button>

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
