import React from "react";
import { Link } from "react-router-dom";

type ButtonTextTypes = {
  children: React.ReactNode;
  type: "link" | "normal" | "fakeLink";
  onClick?: () => void;
  className?: string;
  to?: string;
};

function ButtonText({
  children,
  type,
  onClick,
  className,
  to,
}: ButtonTextTypes) {
  const mainStyles =
    "transition-all duration-300 flex items-center justify-center rounded-lg font-medium";

  return (
    <>
      {type === "normal" && (
        <button
          onClick={onClick}
          className={`
      text-[1.75rem]  font-medium outline-none hover:text-red-500 ${mainStyles} ${className} `}
        >
          {children}
        </button>
      )}

      {type === "link" && (
        <Link
          onClick={onClick}
          className={`text-4xl font-semibold outline-none ${mainStyles} ${className} `}
          to={to!}
        >
          {children}
        </Link>
      )}

      {type === "fakeLink" && (
        <button
          onClick={onClick}
          type="button"
          className="ml-5 font-semibold text-blue-600"
        >
          {children}
        </button>
      )}
    </>
  );
}

export default ButtonText;
