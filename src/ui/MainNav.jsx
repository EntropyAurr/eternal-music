import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import { ChevronDown, ChevronUp, CircleUserRound, ListMusic, Menu } from "lucide-react";
import { usePlaylists } from "../features/playlists/usePlaylists";
import CreatePlaylistForm from "../features/playlists/CreatePlaylistForm";
import Empty from "./Empty";
import Modal from "./Modal";
import Spinner from "./Spinner";

function MainNav({ active, setActive }) {
  const [showPlaylists, setShowPlaylists] = useState(false);
  const { playlists, isPendingPlaylists } = usePlaylists();

  if (isPendingPlaylists) return <Spinner />;
  if (!playlists) return <Empty />;

  return (
    <nav className={clsx("navbar border-border border-r-2", { active })}>
      <div className="mb-5 flex h-12 w-full items-center justify-between gap-2.5">
        <h2 className={clsx("transition-all duration-300", active ? "text-2xl font-semibold opacity-100" : "opacity-0")}>Aurora</h2>

        <button
          className={clsx(active ? "left-full" : "absolute top-10 left-1/2 -translate-2/4 transition-all duration-300")}
          onClick={() => {
            setActive(!active);
            setShowPlaylists(false);
          }}
        >
          <Menu />
        </button>
      </div>

      <ul className="flex flex-col gap-4">
        <li className="w-full">
          <NavLink to="/home" className={clsx("navlink transition-all duration-300")}>
            <div className="flex items-center gap-4">
              {active ? (
                <button onClick={() => setShowPlaylists(!showPlaylists)}>
                  <ListMusic className={clsx("h-7 w-7", !active && "fixed left-2/4 -translate-2/4")} />
                </button>
              ) : (
                <ListMusic className={clsx("fixed left-2/4 h-7 w-7 -translate-x-2/4")} />
              )}

              <span className={clsx("transition-all duration-300", active ? "text-xl opacity-100" : "pointer-events-none opacity-0")}>Playlists</span>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                setShowPlaylists(!showPlaylists);
              }}
            >
              {active ? !showPlaylists ? <ChevronDown className="h-7 w-7" /> : <ChevronUp className="h-7 w-7" /> : ""}
            </button>
          </NavLink>

          {showPlaylists && (
            <>
              {playlists &&
                playlists.map((playlist) => (
                  <Link key={playlist.id} to={`/playlist/${playlist.id}`} className="link">
                    {playlist.playlistName}
                  </Link>
                ))}

              <Modal>
                <Modal.Open opens="playlist-form">
                  <button className="btn primary small">Add new playlist</button>
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
            <div className={clsx("flex items-center gap-4 transition-all duration-300")}>
              <button>
                <CircleUserRound className={clsx("h-7 w-7", !active && "fixed left-2/4 -translate-2/4")} />
              </button>

              <span className={clsx("transition-all duration-300", active ? "text-xl opacity-100" : "t pointer-events-none opacity-0")}>User</span>
            </div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
