import Table from "../../ui/Table";

function PlaylistRow({ playlist }) {
  const { playlistName, numSongs, totalTime } = playlist;

  return (
    <Table.Row>
      <div></div>
      <div>{playlistName}</div>
      <div>{numSongs}</div>
      <div>{totalTime}</div>
      <div></div>
    </Table.Row>
  );
}

export default PlaylistRow;
