import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useOutsideClick } from "../hooks/useOutsideClick";

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
