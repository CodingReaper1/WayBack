import { motion } from "framer-motion";

type LoginFormRowTypes = {
  label?: string;
  children: React.ReactElement<HTMLInputElement>;
  error?: string;
};

function LoginFormRow({ label, children, error }: LoginFormRowTypes) {
  return (
    <motion.div
      className="relative   w-full text-xl"
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1 },
      }}
    >
      {label && <label htmlFor={children?.props.id}>{label}</label>}
      {children}
      <p
        className={`flex self-start   text-xl font-semibold  text-red-600 transition-all duration-300 sm:right-3 sm:top-6 md:absolute ${error ? "opacity-100" : "opacity-0"}  `}
      >
        {error}
      </p>
    </motion.div>
  );
}

export default LoginFormRow;
