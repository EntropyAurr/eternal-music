import { Outlet } from "react-router-dom";
import { useState } from "react";
import clsx from "clsx";
import { SongPlayerProvider } from "../context/SongPlayerContext";
import Player from "../features/player/Player";
import Header from "./Header";
import MainNav from "./MainNav";

function AppLayout() {
  const [active, setActive] = useState(false);

  return (
    <div className="flex h-screen flex-col">
      <SongPlayerProvider>
        <Header />

        <main className="bg-background flex flex-1 overflow-hidden">
          <aside className={clsx("flex flex-col overflow-y-auto px-5 py-6 transition-all duration-500", active ? "w-[17rem]" : "w-[8rem]")}>
            <MainNav active={active} setActive={setActive} />
          </aside>

          <div className="flex-1 overflow-auto p-5">
            <Outlet />
          </div>
        </main>

        <Player />
      </SongPlayerProvider>
    </div>
  );
}

export default AppLayout;
