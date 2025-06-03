import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 35rem 1fr;
  grid-template-rows: 1rf auto 1fr;
  height: 100vh;
`;

const Main = styled.main``;

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
    </StyledAppLayout>
  );
}

export default AppLayout;
