import styled from "styled-components";
import { songs } from "../data/data-songs";

const StyledPlayer = styled.div`
  border: 1px solid #dd2d4a;
  grid-column: 1 / -1;
  padding: 2rem 2.2rem;
`;

function Player() {
  const song = new Audio(songs.at(0).url);

  function PlaySong() {
    song.play();
  }

  function PauseSong() {
    song.pause();
  }

  return (
    <StyledPlayer>
      <button onClick={() => PlaySong()}>Play</button>
      <button onClick={() => PauseSong()}>Pause</button>
    </StyledPlayer>
  );
}

export default Player;
