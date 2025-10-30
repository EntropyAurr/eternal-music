import { useUploadSong } from "./useUploadSong";

function AddSongToPlaylist({ optionPlaylist, songIdForPlaylist, onCloseModal }) {
  const { uploadSong } = useUploadSong();

  function handleAdd(playlistId) {
    const songForPlaylist = {
      songIdForPlaylist,
      playlistId,
    };
    uploadSong(songForPlaylist);
    onCloseModal?.();
  }

  return (
    <div className="flex flex-col gap-5">
      <h2>Add to...</h2>
      <div className="flex flex-col gap-4">
        {songIdForPlaylist &&
          optionPlaylist.map((playlist) => (
            <button className="btn primary small" onClick={() => handleAdd(playlist.id)} key={playlist.id}>
              Add to {playlist.playlistName}
            </button>
          ))}
      </div>
    </div>
  );
}

export default AddSongToPlaylist;
