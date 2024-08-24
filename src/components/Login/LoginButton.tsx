import { motion } from "framer-motion";

import Spinner from "../Spinner";

type LoginButtonTypes = {
  children: React.ReactNode;
  type?: "transparent";
  onClick?: () => void;
  disabled?: boolean;
};

function LoginButton({ children, type, onClick, disabled }: LoginButtonTypes) {
  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.9 }}
      whileFocus={{
        outline:
          type === "transparent" ? "2px solid white" : "2px solid #dc2626",
      }}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      className={`mt-20 flex items-center justify-center rounded-[0.8rem]  border-2 border-solid border-transparent px-[4.5rem] py-[1rem] text-xl  font-[600] uppercase tracking-widest text-white outline-none sm:mt-4  ${type === "transparent" ? "border-white bg-transparent" : " bg-red-600"} ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      onClick={onClick}
      disabled={disabled}
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1 },
      }}
    >
      {disabled ? (
        <div className="flex gap-5">Wait... {<Spinner type="small" />}</div>
      ) : (
        children
      )}
    </motion.button>
  );
}

export default LoginButton;
