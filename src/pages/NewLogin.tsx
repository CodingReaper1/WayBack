import { motion } from "framer-motion";

import SignUp from "../components/Login/SignUp";
import SignIn from "../components/Login/SignIn";
import Toggle from "../components/Login/Toggle";
import DarkModeToggle from "../components/HomePage/DarkModeToggle";
function NewLogin() {
  return (
    <motion.div className=" relative h-[60rem]  w-full max-w-full   bg-white font-Montserrat text-stone-950  sm:flex  sm:h-screen sm:min-h-[48rem]  sm:flex-col sm:justify-center sm:overflow-x-hidden sm:overflow-y-hidden dark:bg-slate-800 dark:text-slate-200">
      <DarkModeToggle display={false} />
      <SignIn />

      <SignUp />

      <Toggle />
    </motion.div>
  );
}

export default NewLogin;
