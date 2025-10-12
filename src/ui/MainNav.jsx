import { ChevronDown, ChevronUp, CircleUserRound, ListMusic } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { usePlaylists } from "../features/playlists/usePlaylists";
import CreatePlaylistForm from "../features/playlists/CreatePlaylistForm";
import Empty from "./Empty";
import Modal from "./Modal";
import RenderBody from "./RenderBody";
import Spinner from "./Spinner";
import Button from "./Button";

function MainNav() {
  const [showPlaylists, setShowPlaylists] = useState(false);
  const { playlists, isPendingPlaylists } = usePlaylists();

  if (isPendingPlaylists) return <Spinner />;
  if (!playlists) return <Empty />;

  return (
    <nav>
      <ul className="flex flex-col gap-5">
        <li className="flex flex-col gap-2.5">
          <div className="navlink flex items-center justify-between">
            <NavLink to="/home" className="navlink">
              <ListMusic className="h-7 w-7" />
              <span className="text-xl">Playlists</span>
            </NavLink>

            <button className="button-icon" onClick={() => setShowPlaylists(!showPlaylists)}>
              {!showPlaylists ? <ChevronDown className="h-7 w-7" /> : <ChevronUp className="h-7 w-7" />}
            </button>
          </div>

          {showPlaylists && (
            <>
              <RenderBody
                data={playlists}
                render={(playlist) => (
                  <Link key={playlist.id} to={`/playlist/${playlist.id}`} className="link">
                    {playlist.playlistName}
                  </Link>
                )}
              />

              <Modal>
                <Modal.Open opens="playlist-form">
                  <Button variant="primary" size="small">
                    Add new playlist
                  </Button>
                </Modal.Open>

                <Modal.Window name="playlist-form">
                  <CreatePlaylistForm />
                </Modal.Window>
              </Modal>
            </>
          )}
        </li>

        <li className="flex flex-col gap-2.5">
          <NavLink to="/user" className="navlink">
            <CircleUserRound className="h-7 w-7" />
            <span className="text-xl">User</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
