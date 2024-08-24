
import { createPortal } from "react-dom";

type SmallModalTypes = {
  smallModalPosition: {
    x: number;
    y: number;
  };
  children: React.ReactNode;
};

function SmallModal({ smallModalPosition, children }: SmallModalTypes) {
  return createPortal(
    <div
      className="absolute z-[999999999999999]   flex flex-col gap-3 rounded-md bg-zinc-600 p-3 text-3xl text-white shadow-sm shadow-zinc-950"
      style={{
        top: `${smallModalPosition.y}px`,
        right: `${smallModalPosition.x}px`,
      }}
    >
      {children}
    </div>,

    document.body,
  );
}

export default SmallModal;
