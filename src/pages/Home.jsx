import styled from "styled-components";
import Heading from "../ui/Heading";

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
`;

function Home() {
  return (
    <StyledHome>
      <Header>
        <Heading as="h2">Home</Heading>
      </Header>
    </StyledHome>
  );
}

export default Home;
