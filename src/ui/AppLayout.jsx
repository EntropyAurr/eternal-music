import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Player from "./Player";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 25rem 1fr;
  grid-template-rows: 8rem 40rem auto;
  height: 100vh;
`;

const Main = styled.main`
  padding: 2rem 2.2rem;
`;

const Container = styled.div`
  display: flex;
`;

function AppLayout() {
  return (
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
  );
}

export default AppLayout;
