import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import React from "react";

type ButtonTypes = {
  children: React.ReactNode;
  to?: string;
  type: string;
  onClick?: () => void;
  className?: string;
};

function Button({ children, to, type, onClick, className }: ButtonTypes) {
  const mainStyles =
    "transition-all duration-300 flex items-center justify-center rounded-lg font-medium hover:scale-[1.05] ";

  if (type === "mainpage/link")
    return (
      <Link
        onClick={onClick}
        // type="button"
        className={
          mainStyles +
          className +
          "   text-3xl outline-none  hover:text-red-500 focus:outline-none focus:ring-4 focus:ring-red-700"
        }
        to={to!}
      >
        {children}
      </Link>
    );

  if (type === "mainpage/find")
    return (
      <button
        onClick={onClick}
        className={`
          text-3xl  outline-none hover:text-red-500
          ${mainStyles} 
          ${className} 
        `}
      >
        {children}
      </button>
    );

  if (type === "navlink")
    return (
      <NavLink
        to={to!}
        className={() =>
          // isActive
          //   ? `${mainStyles}  ${className}  text-zinc-500 hover:text-zinc-500 focus:outline-none`
          //   : `${mainStyles} ${className} hover:text-zinc-500 focus:outline-none`
          ` focus:outline-none ${mainStyles} ${className}`
        }
      >
        {children}
      </NavLink>
    );

  if (type === "homepage")
    return (
      <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
        <Link
          to={to!}
          onClick={onClick}
          className={
            mainStyles +
            "group relative overflow-hidden rounded-lg border border-red-700 bg-red-700 px-7 py-5 text-3xl font-medium text-white shadow-inner"
          }
        >
          {" "}
          <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-white transition-all duration-200 group-hover:w-full"></span>
          <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-white transition-all duration-200 group-hover:w-full"></span>
          <span className="ease absolute left-0 top-0 h-0 w-full bg-white transition-all delay-200 duration-300 group-hover:h-full"></span>
          <span className="ease absolute bottom-0 left-0 h-0 w-full bg-white transition-all delay-200 duration-300 group-hover:h-full"></span>
          <span className="absolute inset-0 h-full w-full bg-white opacity-0 delay-300 duration-300 group-hover:opacity-100"></span>
          <span className="ease relative transition-colors delay-200 duration-300 group-hover:text-red-600">
            {children}
          </span>
        </Link>
      </motion.div>
    );

  if (type === "mainpage")
    return (
      <button
        onClick={onClick}
        className={
          mainStyles +
          "group relative grow-0  overflow-hidden border-2 border-red-700 bg-zinc-800 px-10  py-2.5 focus:outline-none focus:ring-4 focus:ring-red-300 "
        }
      >
        <span className="absolute mt-[30rem] h-96 w-[30rem]  bg-red-700 transition-all duration-300 group-hover:-mt-[1rem] group-hover:-rotate-45"></span>
        <span className="relative">{children}</span>
      </button>
    );

  if (type === "mainpage/cancelbtn")
    return (
      <button
        type="button"
        onClick={onClick}
        className={
          mainStyles +
          "group relative max-w-80 grow-0 overflow-hidden  border-2 border-zinc-700 bg-zinc-800 px-10 py-2.5 focus:outline-none focus:ring-4 focus:ring-zinc-300 "
        }
      >
        <span className="absolute mt-[30rem] h-96 w-[30rem]  bg-zinc-700 transition-all duration-300 group-hover:-mt-[1rem] group-hover:-rotate-45"></span>
        <span className="relative">{children}</span>
      </button>
    );

  if (type === "auth/log")
    return (
      <button
        onClick={onClick}
        className={
          mainStyles +
          "group relative max-w-80 shrink  grow-0 overflow-hidden  border-2 border-zinc-800 bg-zinc-800 px-10 py-2.5 focus:outline-none focus:ring-4 focus:ring-red-300 lg:px-20 "
        }
      >
        <span className="absolute mt-[30rem] h-96 w-[30rem]  bg-red-700 transition-all duration-1000 group-hover:-mt-[1rem] group-hover:-rotate-45"></span>
        <span className="relative">{children}</span>
      </button>
    );
}

export default Button;
