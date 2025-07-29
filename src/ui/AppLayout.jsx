import { Outlet } from "react-router-dom";
import { SongPlayerProvider } from "../context/SongPlayerContext";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Player from "../features/player/Player";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 25rem 1fr;
  grid-template-rows: 8rem auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  padding: 2rem 2.2rem;
  background-color: var(--color-grey-200);
`;

const Container = styled.div``;

function AppLayout() {
  return (
    <SongPlayerProvider>
      <StyledAppLayout>
        <Sidebar />
        <Header />

        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>

        <Player />
      </StyledAppLayout>
    </SongPlayerProvider>
  );
}

export default AppLayout;
