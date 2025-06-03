import { supabaseUrl } from "../services/supabase";

const songUrl = `${supabaseUrl}/storage/v1/object/public/songs/`;

export const songs = [
  {
    name: "Because You Live",
    artist: "Jesse McCartney",
    url: songUrl + "Because-You-Live-Jesse-McCartney.mp3",
    duration: 198,
  },
  {
    name: "I Have a Lover",
    artist: "Lee Eun Mi",
    url: songUrl + "I-Have-a-Lover-Lee-Eun-Mi.mp3",
    duration: 246,
  },
  {
    name: "Nam Thang Sau Nay, Mong Nguoi Hanh Phuc",
    artist: "Linh",
    url: songUrl + "Nam-Thang-Sau-Nay-Mong-Nguoi-Hanh-Phuc-Linh.mp3",
    duration: 288,
  },
];
