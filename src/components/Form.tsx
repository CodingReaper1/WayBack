import { motion } from "framer-motion";
import { tw } from "../utils/tw";

type FormTypes = {
  children: React.ReactNode;
  onSubmit: () => void;
  className?: string;
  page: "Mainpage" | "Login";
};

function Form({ children, onSubmit, className, page }: FormTypes) {
  const variantStyles = {
    Mainpage: tw(`flex flex-col gap-6  pb-5   text-3xl duration-700`),
    Login: tw(
      `flex h-full flex-col   items-center  justify-center gap-5 text-3xl xxs:px-1 xs:px-2 sm:px-4 md:px-8 lg:px-[4rem] `,
    ),
  };

  return (
    <motion.form
      className={`${variantStyles[page]} ${className}`}
      onSubmit={onSubmit}
      variants={{
        hidden: { opacity: page === "Login" ? 0 : "" },
        show: {
          opacity: page === "Login" ? 1 : "",
          transition: { staggerChildren: 0.25 },
        },
      }}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.form>
  );
}

export default Form;
