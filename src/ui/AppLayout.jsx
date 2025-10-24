import { Outlet } from "react-router-dom";
import { SongPlayerProvider } from "../context/SongPlayerContext";
import Header from "./Header";
import Player from "../features/player/Player";
import MainNav from "./MainNav";

function AppLayout() {
  return (
    <SongPlayerProvider>
      <div className="flex h-screen flex-col">
        <Header />

        <main className="bg-background grid flex-1 grid-cols-[18rem_1fr] overflow-hidden">
          <aside className="flex flex-col overflow-y-auto px-5 py-6">
            <div className="mb-5 flex items-center justify-center gap-2.5">
              <h2 className="text-3xl font-semibold">Aurora</h2>
            </div>

            <MainNav />
          </aside>

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
