import clsx from "clsx";
import { Pencil, Repeat, Repeat1, Shuffle, Snowflake, X } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSongPlayer } from "../../context/SongPlayerContext";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import TogglePlay from "../player/TogglePlay";
import AddSong from "../songs/AddSong";
import Song from "../songs/Song";
import CreatePlaylistForm from "./CreatePlaylistForm";
import { useDeletePlaylist } from "./useDeletePlaylist";
import { usePlaylists } from "./usePlaylists";
import { usePlaylistSong } from "./usePlaylistSong";
import { useRandomSong } from "./useRandomSong";

function Playlist() {
  const { playlistId } = useParams();

  const { songsFromPlaylist, isPending } = usePlaylistSong();
  const { randomSongs } = useRandomSong();
  const { playlists, isPendingPlaylists } = usePlaylists();
  const { isDeleting, deletePlaylist } = useDeletePlaylist();
  const { handlePlaySong, setCurrentPlayedPlaylist, isLoopPlaylist, handleLoopPlaylist, isShuffle, handleShuffle, currentPlayedPlaylist, isActivePlaylist, setIsActivePlaylist, updatePlaylist, setUpdatePlaylist } = useSongPlayer();

  useEffect(() => {
    let listToUse = songsFromPlaylist;

    if (isShuffle && randomSongs?.length > 0) {
      listToUse = randomSongs;
    }

    if (listToUse?.length > 0) {
      setUpdatePlaylist(listToUse);
    }

    if (Number(playlistId) === currentPlayedPlaylist[0]?.playlist_id) {
      setCurrentPlayedPlaylist(updatePlaylist); // it will take effect after sometime, maybe to load the song ??
    }
  }, [songsFromPlaylist, randomSongs, isShuffle]);

  function handlePlay(songId) {
    handlePlaySong(songId, songsFromPlaylist);
  }

  if (isPendingPlaylists && isPending && isPendingRandom) return <Spinner />;
  if (!playlists || !songsFromPlaylist || !randomSongs) return <Empty />;

  const playlist = playlists.find((playlist) => playlist.id === Number(playlistId));

  // TEST
  function handleTest() {
    console.log(currentPlayedPlaylist);
    console.log(updatePlaylist);
    console.log(isActivePlaylist);
  }

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-9">
        <h2 className="text-2xl font-semibold">{playlist.playlistName}</h2>

        <TogglePlay type="playlist" currentPlayedPlaylistId={playlist.id} songsFromPlaylist={songsFromPlaylist} randomSongs={randomSongs} isActivePlaylist={isActivePlaylist} setIsActivePlaylist={setIsActivePlaylist} />

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

        <button className="button-icon text-green-600" onClick={handleTest}>
          <Snowflake />
        </button>
      </div>

      {songsFromPlaylist.map((song) => (
        <Song songContain={song.song} songIdForPlaylist={song.song_id} playlistId={song.playlist_id} key={song.song_id} onPlay={handlePlay} />
      ))}

      <AddSong />
    </div>
  );
}

export default Playlist;
