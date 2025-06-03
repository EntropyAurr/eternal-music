import styled from "styled-components";
import Heading from "../ui/Heading";

const StyledSidebar = styled.aside`
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  border: 1px solid green;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Heading as="h3">Sidebar</Heading>
    </StyledSidebar>
  );
}

export default Sidebar;
