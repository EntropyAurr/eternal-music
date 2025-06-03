import styled from "styled-components";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.7rem;
`;

function HeaderMenu() {
  return (
    <StyledHeaderMenu>
      <li>Icon 1</li>
      <li>Icon 2</li>
      <li>Icon 3</li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
