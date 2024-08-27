import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import useOutsideClick from "../hooks/useOutsideClick";

type MenusContextTypes = {
  openId: string;
  close: () => void;
  open: (id: string) => void;
  position: {
    x: number;
    y: number;
  } | null;
  setPosition: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    } | null>
  >;
};

type ButtonTypes = {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
};

const MenusContext = createContext<MenusContextTypes | null>(null);

function Menus({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = useState<string>("");
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null,
  );

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function useMenusContext() {
  const context = useContext(MenusContext);

  if (!context) {
    throw new Error("Toggle must be used within a Menus provider");
  }
  return context;
}

function Menu({ children }: { children: React.ReactNode }) {
  return (
    <div className=" flex items-center justify-end gap-20">{children}</div>
  );
}

function Toggle({ id, children }: { id: string; children: React.ReactNode }) {
  const { open, openId, close, setPosition } = useMenusContext();

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    const buttonElement = e.target as HTMLElement;
    const rect = buttonElement.closest("button")?.getBoundingClientRect();
    if (!rect) return;

    setPosition({
      x: rect.x - 25,
      y: rect.y + rect.height + 8,
    });

    if (openId === "" || openId !== id) {
      open(id);
    } else {
      close();
    }
  }

  return (
    <button
      className=" cursor-pointer rounded-md p-2 outline-none  transition-all duration-300 hover:bg-slate-600 focus:ring-2"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

function List({ id, children }: { id: string; children: React.ReactNode }) {
  const { openId, close, position } = useMenusContext();
  const { ref } = useOutsideClick<HTMLUListElement>(close, false);

  if (openId !== id) return null;
  if (position === null) return null;

  return createPortal(
    <ul
      ref={ref}
      className={`absolute flex  flex-col gap-1 rounded-md bg-slate-800  text-2xl text-white shadow-md shadow-slate-600`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      {children}
    </ul>,
    document.body,
  );
}

function Button({ children, icon, onClick }: ButtonTypes) {
  const { close } = useMenusContext();
  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <button
        onClick={handleClick}
        className="flex w-full items-center gap-2 px-6 py-3 hover:bg-slate-900"
      >
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
}

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
Menus.Menu = Menu;

export default Menus;
