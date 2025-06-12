import supabase from "../../services/supabase";
import { useAddSong } from "../../context/SongContext";

function SongAdd() {
  const { songIds } = useAddSong();

  async function getSongs() {
    const { data, error } = await supabase.from("songs").select("*").in("id", songIds);

    if (error) throw new Error("Songs could not be loaded");

    return data;
  }

  return <div></div>;
}

export default SongAdd;
