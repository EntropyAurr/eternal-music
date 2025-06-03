import styled from "styled-components";
import UserAvatar from "../features/authentication/UserAvatar";
import HeaderMenu from "./HeaderMenu";

const StyledHeader = styled.header`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  align-items: center;
  border: 1px solid orange;
`;

function Header() {
  return (
    <StyledHeader>
      <HeaderMenu />
      <UserAvatar />
    </StyledHeader>
  );
}

export default Header;
