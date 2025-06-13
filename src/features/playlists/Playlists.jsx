import { usePlaylists } from "./usePlaylists";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Playlist from "./Playlist";

function Playlists() {
  const { playlists, isPendingPlaylists } = usePlaylists();

  if (isPendingPlaylists) return <Spinner />;
  if (!playlists) return <Empty />;

  return (
    <div>
      {playlists.map((playlist) => (
        <Playlist key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
}

export default Playlists;
