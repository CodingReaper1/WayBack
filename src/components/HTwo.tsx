import { motion } from "framer-motion";
import { tw } from "../utils/tw";

type HTwoTypes = {
  children: React.ReactNode;
  page: "Homepage" | "Login" | "PasswordRecovery";
};

function HTwo({ children, page }: HTwoTypes) {
  const variantStyles = {
    common: tw(`  font-bold  `),
    Homepage: tw(` sm:text-6xl md:text-6xl lg:text-7xl  `),
    Login: tw(
      `mb-10 mt-10 text-5xl xxs:text-6xl sm:text-5xl md:mb-20 md:text-6xl lg:text-[5rem]`,
    ),
    PasswordRecovery: tw(`self-start text-5xl sm:text-6xl `),
  };

  return (
    <motion.h2
      className={`${variantStyles.common} ${variantStyles[page]}`}
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1 },
      }}
    >
      {children}
    </motion.h2>
  );
}

export default HTwo;
