import ThemeToggle from "./ThemeToggle";

function Header() {
  return (
    <header className="border-border flex h-20 items-center justify-end gap-3 border-b-2 px-4 py-5 shadow-[var(--shadow-md)] backdrop-blur-3xl">
      <div className="flex gap-2">
        <img src="/avatar-1.jpg" className="block w-14 rounded-full object-cover object-center" />
      </div>

      <ul className="flex gap-2">
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </header>
  );
}

export default Header;
