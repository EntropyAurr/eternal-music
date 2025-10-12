import { X } from "lucide-react";
import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";

// const Overlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100vh;
//   background-color: var(--backdrop-color);
//   backdrop-filter: blur(4px);
//   z-index: 100;
//   transition: all 0.5s;
// `;

// const StyledModal = styled.div`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background-color: var(--border-radius-lg);
//   box-shadow: var(--shadow-lg);
//   padding: 3.2rem 4rem;
//   transition: all 0.5s;
// `;

// const Button = styled.button`
//   position: absolute;
//   top: 1.2rem;
//   right: 1.9rem;
//   background: none;
//   border: none;
//   padding: 0.4rem;
//   border-radius: var(--border-radius-sm);
//   transform: translateX(0.8rem);
//   transition: all 0.2s;

//   &:hover {
//     background-color: var(--color-grey-100);
//   }
// `;

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");

  return <ModalContext.Provider value={{ openName, setOpenName, close }}>{children}</ModalContext.Provider>;
}

function Open({ children, opens: opensWindowName, onOpen }) {
  const { setOpenName } = useContext(ModalContext);

  function handleClick() {
    onOpen?.();
    setOpenName(opensWindowName);
  }

  return cloneElement(children, { onClick: handleClick });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed top-0 left-0 z-100 h-screen w-full bg-[var(--backdrop-color)] backdrop-blur-sm transition-all duration-500">
      <div ref={ref} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[var(--border-radius-sm)] px-8 py-10 shadow-[var(--shadow-lg)] transition-all duration-500">
        <button onClick={close} className="rounded-[var(--border-radius-sm) translate-x-2] absolute top-3 right-5 bg-none transition-all duration-200">
          <X />
        </button>

        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
