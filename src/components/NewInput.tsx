import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type NewInputTypes<T extends FieldValues> = {
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

function NewInput<T extends FieldValues>({
  id,
  register,
  type,
  validate,
  required,
  value,
  onChange,
}: NewInputTypes<T>) {
  return (
    <input
      id={id}
      className={`rounded-sm border-b-4   bg-zinc-800 pt-2 text-3xl text-white  outline-none outline-1 transition-all duration-500  ease-in-out focus:border-red-600  `}
      {...register(id, {
        required: required ? "This field is required" : "",
        validate: validate,
      })}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
}

export default NewInput;
