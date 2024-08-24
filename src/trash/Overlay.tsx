import { createPortal } from "react-dom";

import useMainPageContext from "../context/useMainPageContext";

function Overlay() {
  // const { closeModal } = useMainPageContext();

  return createPortal(
    <div
      className="absolute bottom-0 left-0 right-0 top-0 z-[999999999999999999999999999] "
      onClick={() => closeModal()}
    ></div>,
    document.body,
  );
}

export default Overlay;
