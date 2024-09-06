// import { cloneElement, useState } from "react";

type NewFormRowTypes = {
  label: string;
  children: React.ReactElement<HTMLInputElement>;
  error?: string;
};

function NewFormRow({ label, children, error }: NewFormRowTypes) {
  // const clonedChild = cloneElement(children, {
  //   onFocus: (e) => setFocused(!focused),
  // });

  return (
    <>
      <div className="flex w-full grow flex-col gap-1">
        {label && <label htmlFor={children?.props.id}>{label}</label>}
        {children}
      </div>
      <p className="flex  justify-center font-semibold text-red-600">{error}</p>
    </>
  );
}

export default NewFormRow;
