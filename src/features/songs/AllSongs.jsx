import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import { useSongs } from "../songs/useSongs";

function AllSongs() {
  const { songs, isPending } = useSongs();

  if (isPending) return <Spinner />;
  if (!songs) return <Empty />;

  return <div>All songs display</div>;
}

export default AllSongs;
