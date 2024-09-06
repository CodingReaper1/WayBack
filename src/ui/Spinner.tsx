import { motion } from "framer-motion";
import { tw } from "../utils/tw";

type SpinnerTypes = {
  type: "small" | "big";
  center?: boolean;
};

function Spinner({ type, center }: SpinnerTypes) {
  const typeStyles = {
    small: tw(`relative h-8 w-8 rounded-full`),
    big: tw(` absolute left-1/2 top-1/2 h-24 w-24 rounded-full `),
  };

  return (
    <motion.div
      className={typeStyles[type]}
      initial={{ x: center ? "-50%" : 0, y: center ? "-50%" : 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, ease: "linear", repeat: Infinity }}
    >
      {/* Inner Circle 1 */}
      <motion.div
        className="absolute inset-0 box-border rounded-full border-4 border-white"
        animate={{
          clipPath: [
            "polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0)",
            "polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0)",
            "polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%)",
          ],
        }}
        transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
      />
      {/* Inner Circle 2 */}
      <motion.div
        className="absolute inset-0 box-border rounded-full border-4 border-black"
        style={{ transform: "rotate3d(90, 90, 0, 180deg)" }}
        animate={{
          clipPath: [
            "polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0)",
            "polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0)",
            "polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%)",
          ],
        }}
        transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
      />
    </motion.div>
  );
}

export default Spinner;
