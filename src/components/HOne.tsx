import { motion } from "framer-motion";
import { tw } from "../utils/tw";

type HOneTypes = {
  children: React.ReactNode;
  page: "Homepage" | "Login";
};

function HOne({ children, page }: HOneTypes) {
  const variantStyles = {
    common: tw(` flex justify-center font-bold  `),
    Homepage: tw(`mb-14 mt-20 text-5xl xxs:text-6xl lg:text-9xl`),
    Login: tw(
      `mb-10 mt-10 text-5xl xxs:text-6xl sm:text-5xl md:mb-20 md:text-6xl lg:text-[5rem]`,
    ),
  };

  return (
    <motion.h1
      className={`${variantStyles.common} ${variantStyles[page]}`}
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1 },
      }}
    >
      {children}
    </motion.h1>
  );
}

export default HOne;
