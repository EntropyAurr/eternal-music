import supabase from "./supabase";

export async function getSongs() {
  const { data, error } = await supabase.from("songs").select("*");

  if (error) throw new Error("Songs could not be loaded");

  return data;
}
