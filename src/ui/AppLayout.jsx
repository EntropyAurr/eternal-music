import { Outlet } from "react-router-dom";
import { SongPlayerProvider } from "../context/SongPlayerContext";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Player from "../features/player/Player";

function AppLayout() {
  return (
    <SongPlayerProvider>
      <div className="flex min-h-screen flex-col border">
        <Header />

        <main className="bg-background grid flex-1 grid-cols-[15rem_auto]">
          <Sidebar />

          <div className="flex border-2 border-b-pink-600">
            <Outlet />
          </div>
        </main>

        <Player />
      </div>
    </SongPlayerProvider>
  );
}

export default AppLayout;
