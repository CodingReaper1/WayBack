import React from "react";

type FilterButtonTypes = {
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
};

function FilterButton({ children, onClick, active }: FilterButtonTypes) {
  return (
    <button
      className={`rounded-lg p-2 transition-all duration-300 hover:bg-red-600 hover:text-white ${active ? "bg-red-600 text-white" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default FilterButton;
