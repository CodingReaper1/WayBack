import { motion } from "framer-motion";
import { FieldValues, UseFormRegister, Path } from "react-hook-form";

type InputTypes<T extends FieldValues> = {
  id: Path<T>;
  register: UseFormRegister<T>;
  type: string;
  validate?: (value: string) => string | true;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
};

function Input<T extends FieldValues>({
  id,
  register,
  type,
  validate,
  required = true,
  value,
  onChange,
  placeholder,
  error,
}: InputTypes<T>) {
  return (
    <motion.input
      whileFocus={{
        boxShadow: "0 0 7px -5px #000",
      }}
      animate={error ? "glitch" : "normal"}
      variants={{
        normal: {
          scale: 1,
          rotate: 0,
          x: 0,
          y: 0,
          skewX: "0deg",
          skewY: "0deg",
        },
        glitch: {
          rotate: [0, -1, 1, -1, 1, 0],
          transition: {
            duration: 0.2,
            // repeat: 1,
            repeatType: "reverse",
          },
        },
      }}
      id={id}
      className={`darkplaceholder-slate-900 w-full  rounded-xl bg-[#eee] px-8 py-8  text-3xl placeholder-slate-400 outline-none dark:bg-slate-900 dark:focus:bg-slate-900 sm:py-6 sm:text-2xl ${error ? "border border-red-600" : "border-none"}`}
      {...register(id, {
        required: required && "Required",
        validate: validate,
      })}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default Input;
