import { Outlet } from "react-router-dom";
import { SongPlayerProvider } from "../context/SongPlayerContext";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Player from "../features/player/Player";

function AppLayout() {
  return (
    <SongPlayerProvider>
      <div className="flex h-screen flex-col">
        <Header />

        <main className="bg-background grid flex-1 grid-cols-[18rem_auto] overflow-hidden">
          <Sidebar />

          <div className="flex overflow-auto">
            <Outlet />
          </div>
        </main>

        <Player />
      </div>
    </SongPlayerProvider>
  );
}

export default AppLayout;
