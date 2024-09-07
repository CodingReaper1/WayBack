import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import React from "react";

type ButtonTypes = {
  children: React.ReactNode;
  to?: string | null;
  type: "homepage" | "mainpage" | "mainpage/cancelbtn";
  onClick?: () => void;
  className?: string;
  size?: "small";
};

function Button({ children, to, type, size, onClick }: ButtonTypes) {
  const mainStyles =
    "transition-all duration-300 flex items-center justify-center rounded-lg font-medium";
  return (
    <>
      {type === "homepage" && (
        <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
          <Link
            to={to!}
            onClick={onClick}
            className={`
            ${mainStyles} 
            group relative overflow-hidden rounded-lg border border-red-600 bg-red-600   text-white shadow-inner dark:text-stone-200 ${size === "small" ? " px-5 py-3 text-2xl" : "px-7 py-5 text-3xl "}`}
          >
            {" "}
            <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-white transition-all duration-200 group-hover:w-full dark:border-slate-900"></span>
            <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-white transition-all  duration-200 group-hover:w-full dark:border-slate-900"></span>
            <span className="ease absolute left-0 top-0 h-0 w-full bg-white transition-all delay-200 duration-300 group-hover:h-full dark:bg-slate-900"></span>
            <span className="ease absolute bottom-0 left-0 h-0 w-full bg-white transition-all delay-200 duration-300 group-hover:h-full dark:bg-slate-900"></span>
            <span className="absolute inset-0 h-full w-full bg-white opacity-0 delay-300 duration-300 group-hover:opacity-100 dark:bg-slate-900"></span>
            <span className="ease relative transition-colors delay-200 duration-300 group-hover:text-red-600 dark:group-hover:text-red-600">
              {children}
            </span>
          </Link>
        </motion.div>
      )}
      {type === "mainpage" && (
        <button
          onClick={onClick}
          className={`
          ${mainStyles} 
          group relative grow-0  overflow-hidden border-2 border-red-700 bg-slate-800 px-10  py-2.5 focus:outline-none focus:ring-4 focus:ring-red-300 `}
        >
          <span className="absolute mt-[30rem] h-96 w-[30rem]  bg-red-700 transition-all duration-300 group-hover:-mt-[1rem] group-hover:-rotate-45"></span>
          <span className="relative">{children}</span>
        </button>
      )}
      {type === "mainpage/cancelbtn" && (
        <button
          type="button"
          onClick={onClick}
          className={`
          ${mainStyles} 
          group relative max-w-80 grow-0 overflow-hidden  border-2 border-slate-700 bg-slate-800 px-10 py-2.5 focus:outline-none focus:ring-4 focus:ring-slate-300 `}
        >
          <span className="absolute mt-[30rem] h-96 w-[30rem]  bg-slate-600 transition-all duration-300 group-hover:-mt-[1rem] group-hover:-rotate-45"></span>
          <span className="relative">{children}</span>
        </button>
      )}
    </>
  );
}

export default Button;
