import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

import { CircleEllipsis } from "lucide-react";
import { useOutsideClick } from "../hooks/useOutsideClick";

// const Menu = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
// `;

// const StyledToggle = styled.button`
//   background: none;
//   border: none;
//   padding: 0.4rem;
//   border-radius: var(--border-radius-sm);
//   transform: translateX(0.8rem);
//   transition: all 0.2s;

//   &:hover {
//     background-color: var(--color-grey-100);
//   }

//   & svg {
//     width: 2.4rem;
//     height: 2.4rem;
//     color: var(--color-grey-700);
//   }
// `;

// const StyledList = styled.ul`
//   position: fixed;
//   background-color: var(--color-grey-0);
//   box-shadow: var(--shadow-md);
//   border-radius: var(--border-radius-sm);
//   right: ${(props) => props.$position.x}px;
//   top: ${(props) => props.$position.y}px;
// `;

// const StyledButton = styled.button`
//   width: 100%;
//   text-align: left;
//   background: none;
//   border: none;
//   padding: 1.2rem 2.4rem;
//   font-size: 1.4rem;
//   transition: all 0.2s;

//   display: flex;
//   align-items: center;
//   gap: 1.6rem;

//   &:hover {
//     background-color: var(--color-grey-50);
//   }

//   & svg {
//     width: 1.6rem;
//     height: 1.6rem;
//     color: var(--color-grey-400);
//     transition: all 0.3s;
//   }
// `;

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
      x: window.innerWidth - rect.width - rect.x - 90,
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
