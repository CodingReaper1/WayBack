import { motion } from "framer-motion";

import WelcomeBack from "./WelcomeBack";
import HelloFriend from "./HelloFriend";
import useLoginContext from "../../context/useLoginContext";

function Toggle() {
  const { signUpActive } = useLoginContext();

  return (
    <motion.div
      className={` absolute left-1/2 top-0 z-[1000] hidden h-full w-1/2 overflow-hidden sm:block  `}
      animate={{
        x: signUpActive ? "-100%" : 0,
        borderRadius: signUpActive
          ? ["15px 0 0 15px", "0 15px 15px 0"]
          : ["0 15px 15px 0", "15px 0 0 15px"],
      }}
      transition={{ duration: 0.6, ease: "linear", times: [0, 0.5, 1] }}
    >
      <motion.div
        className=" relative -left-full h-full w-[200%]  bg-gradient-to-r from-red-600 to-red-700 text-white dark:from-slate-900 dark:to-slate-950 dark:text-slate-200 "
        animate={{ x: signUpActive ? "50%" : 0 }}
        transition={{ ease: "linear", duration: 0.6 }}
      >
        <WelcomeBack />

        <HelloFriend />
      </motion.div>
    </motion.div>
  );
}

export default Toggle;
