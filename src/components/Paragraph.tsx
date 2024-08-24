import { motion } from "framer-motion";
import { tw } from "../utils/tw";

type ParagraphTypes = {
  children: React.ReactNode;
  className?: string;
  page: "Homepage" | "Login";
};

function Paragraph({ children, className, page }: ParagraphTypes) {
  const variantStyles = {
    Homepage: tw(`text-2xl font-semibold lg:text-3xl`),
    Login: tw(
      `mr-[2rem] text-[1.8rem] font-semibold tracking-wider sm:text-2xl lg:text-2xl`,
    ),
  };

  return (
    <motion.p
      className={`${variantStyles[page]} ${className}`}
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
    >
      {children}
    </motion.p>
  );
}

export default Paragraph;
