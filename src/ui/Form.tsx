import { motion } from "framer-motion";
import { tw } from "../utils/tw";
import useMainPageContext from "../context/useMainPageContext";

type FormTypes = {
  children: React.ReactNode;
  onSubmit: () => void;
  className?: string;
  page: "Mainpage" | "Login" | "PasswordRecovery";
};

function Form({ children, onSubmit, className, page }: FormTypes) {
  const { sideBarFormOpen } = useMainPageContext();

  const variantStyles = {
    Mainpage: tw(
      `flex flex-col gap-6  pb-5   text-3xl duration-700 ${
        sideBarFormOpen
          ? `flex max-h-[50rem] flex-col gap-6 opacity-100`
          : `pointer-events-none max-h-0 opacity-0`
      }`,
    ),
    Login: tw(
      `flex h-full flex-col   items-center  justify-center gap-5 text-3xl xxs:px-1 xs:px-2 sm:px-4 md:px-8 lg:px-[4rem] `,
    ),
    PasswordRecovery: tw(
      `mx-auto mt-32 flex  max-w-[50rem] transform flex-col  items-center justify-center gap-12 rounded-[3rem]  p-10`,
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
