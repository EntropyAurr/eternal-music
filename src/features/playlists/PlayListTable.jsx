import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import PlaylistRow from "./PlaylistRow";
import { usePlaylists } from "./usePlaylists";

function PlayListTable() {
  const { isPendingPlaylists, playlists } = usePlaylists();

  if (isPendingPlaylists) return <Spinner />;
  if (!playlists) return <Empty />;

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Playlist Name</div>
        <div>Number of songs</div>
        <div>Total time</div>
        <div></div>
      </Table.Header>

      <Table.Body data={playlists} render={(playlist) => <PlaylistRow key={playlist.id} playlist={playlist} />} />
    </Table>
  );
}

export default PlayListTable;
