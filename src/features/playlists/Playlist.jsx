import { useEffect } from "react";
import styled from "styled-components";
import { HiPencil, HiTrash } from "react-icons/hi2";

import { usePlaylists } from "./usePlaylists";
import { useParams } from "react-router-dom";
import { usePlaylistSong } from "./usePlaylistSong";
import { useSongPlayer } from "../../context/SongPlayerContext";

import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Song from "../songs/Song";
import AddSong from "../songs/AddSong";
import Heading from "../../ui/Heading";
import TogglePlay from "../player/TogglePlay";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import CreatePlaylistForm from "./CreatePlaylistForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeletePlaylist } from "./useDeletePlaylist";

const StyledPlaylist = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 3.5rem;
`;

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
    <StyledPlaylist>
      <Header>
        <Heading as="h2">{playlist.playlistName}</Heading>
        <TogglePlay type="playlist" currentPlaylistId={playlist.id} songsFromPlaylist={songsFromPlaylist} />

        <div>
          <Modal>
            <Menus>
              <Menus.Menu>
                <Menus.Toggle id={playlist.id} />

                <Menus.List id={playlist.id}>
                  <Modal.Open opens="edit">
                    <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                  </Modal.Open>

                  <Modal.Open opens="delete">
                    <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
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
      </Header>

      {songsFromPlaylist.map((song) => (
        <Song songContain={song.song} songIdForPlaylist={song.song_id} playlistId={song.playlist_id} key={song.song_id} onPlay={handlePlay} />
      ))}

      <AddSong />
    </StyledPlaylist>
  );
}

export default Playlist;
