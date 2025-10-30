import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

import { CircleEllipsis } from "lucide-react";
import { useOutsideClick } from "../hooks/useOutsideClick";

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");

  return <MenusContext.Provider value={{ openId, close, setOpenId, position, setPosition }}>{children}</MenusContext.Provider>;
}

function Menu({ children }) {
  return <div className="flex items-center justify-end">{children}</div>;
}

function Toggle({ id }) {
  const { openId, close, setOpenId, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.width - rect.x + 25,
      y: rect.y + rect.height,
    });

    openId === "" || openId !== id ? setOpenId(id) : close();
  }

  return (
    <button onClick={handleClick}>
      <CircleEllipsis />
    </button>
  );
}

function List({ id, children }) {
  const { openId, close, position } = useContext(MenusContext);
  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;

  return (
    position &&
    createPortal(
      <ul ref={ref} className="fixed rounded-[var(--border-radius-sm)] bg-[var(--color-primary-50)] shadow-[var(--shadow-md)]" style={{ top: `${position.y}px`, right: `${position.x}px` }}>
        {children}
      </ul>,
      document.body,
    )
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <button onClick={handleClick} className="flex w-full items-center gap-4 px-3 py-6 text-left text-sm transition-all duration-200 hover:bg-[var(--color-primary-700)]">
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
