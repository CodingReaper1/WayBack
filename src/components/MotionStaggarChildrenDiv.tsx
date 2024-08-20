import { motion } from "framer-motion";

type MotionStaggarChildrenDivTyes = {
  children: React.ReactNode;
  className?: string;
  time?: number;
};

function MotionStaggarChildrenDiv({
  children,
  className,
  time,
}: MotionStaggarChildrenDivTyes) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: time ? time : 0.5 },
        },
      }}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default MotionStaggarChildrenDiv;
