import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineHome, HiOutlineUser } from "react-icons/hi2";
import { PiPlaylist } from "react-icons/pi";
import ButtonIcon from "./ButtonIcon";
import Spinner from "./Spinner";
import Empty from "./Empty";
import Button from "./Button";
import RenderBody from "./RenderBody";
import { usePlaylists } from "../features/playlists/usePlaylists";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const List = styled.li`
  display: flex;
  flex-direction: column;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-200);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.2rem;
  background-color: var(--color-grey-400);
  color: var(--color-grey-50);
  border-radius: var(--border-radius-sm);
  padding: 1.5rem 2.4rem;
`;

function MainNav() {
  const [showPlaylists, setShowPlaylists] = useState(false);
  const { playlists, isPendingPlaylists } = usePlaylists();

  if (isPendingPlaylists) return <Spinner />;
  if (!playlists) return <Empty />;

  return (
    <nav>
      <NavList>
        <List>
          <StyledNavLink to="/home">
            <PiPlaylist />
            <span>Playlists</span>
            <ButtonIcon onClick={() => setShowPlaylists((show) => !show)}>{!showPlaylists ? <HiOutlineChevronDown /> : <HiOutlineChevronUp />}</ButtonIcon>
          </StyledNavLink>

          {showPlaylists && (
            <>
              <RenderBody
                data={playlists}
                render={(playlist) => (
                  <StyledLink key={playlist.id} to={`/playlist/${playlist.id}`}>
                    {playlist.playlistName}
                  </StyledLink>
                )}
              />
              <Button $variation="primary" size="medium">
                Create new playlist
              </Button>
            </>
          )}
        </List>

        <List>
          <StyledNavLink to="/user">
            <HiOutlineUser />
            <span>User</span>
          </StyledNavLink>
        </List>
      </NavList>
    </nav>
  );
}

export default MainNav;
