import { motion } from "framer-motion";

import SignUp from "../components/Login/SignUp";
import SignIn from "../components/Login/SignIn";
import Toggle from "../components/Login/Toggle";
function NewLogin() {
  return (
    <motion.div className=" relative h-[15rem] w-full max-w-full   bg-white font-Montserrat text-stone-800  sm:flex  sm:h-screen sm:min-h-[48rem]  sm:flex-col sm:justify-center sm:overflow-x-hidden sm:overflow-y-hidden">
      <SignIn />

      <SignUp />

      <Toggle />
    </motion.div>
  );
}

export default NewLogin;
