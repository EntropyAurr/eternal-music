import MainNav from "./MainNav";

function Sidebar() {
  return (
    <aside className="flex flex-col border-2 border-orange-400 px-5 py-6">
      <div className="mb-5 flex items-center justify-center gap-2.5">
        <h2 className="text-3xl font-semibold">Aurora</h2>
      </div>

      <MainNav />
    </aside>
  );
}

export default Sidebar;
