import { motion } from "framer-motion";
import { tw } from "../utils/tw";

type HTwoTypes = {
  children: React.ReactNode;
  page: "Homepage" | "Login" | "PasswordRecovery" | "Mainpage";
  onClick?: () => void;
};

function HTwo({ children, page, onClick }: HTwoTypes) {
  const variantStyles = {
    mainStyles: tw(``),
    Homepage: tw(`font-bold sm:text-6xl md:text-6xl lg:text-7xl`),
    Mainpage: tw(`cursor-pointer content-center  overflow-hidden text-3xl`),
    Login: tw(
      `mb-10 mt-10 text-5xl font-bold xxs:text-6xl sm:text-5xl md:mb-20 md:text-6xl lg:text-[5rem]`,
    ),
    PasswordRecovery: tw(`self-start text-5xl font-bold sm:text-6xl `),
  };

  return (
    <motion.h2
      className={`${variantStyles.mainStyles} ${variantStyles[page]}`}
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1 },
      }}
      onClick={onClick}
    >
      {children}
    </motion.h2>
  );
}

export default HTwo;
