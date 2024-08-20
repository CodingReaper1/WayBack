import { motion } from "framer-motion";

import useLoginContext from "../../context/useLoginContext";
import HOne from "../HOne";
import LoginButton from "./LoginButton";
import Paragraph from "../Paragraph";

function WelcomeBack() {
  const { signUpActive, signIn } = useLoginContext();

  return (
    <motion.div
      className="toggle-panel toggle-left absolute top-0 flex h-full w-1/2  flex-col items-center justify-center gap-10 text-center sm:px-4 md:px-8 lg:px-12"
      initial={{ opacity: 0, visibility: "hidden" }}
      animate={{
        x: signUpActive ? "0" : "200%",
        opacity: signUpActive ? [0, 0, 1, 1] : [1, 0, 0, 0],
        visibility: signUpActive ? "visible" : "hidden",
      }}
      transition={{
        duration: 0.6,
        times: [0, 0.5, 0.5, 1],
        ease: "linear",
      }}
    >
      <HOne page="Login">Welcome Back!</HOne>
      <Paragraph page="Login">
        Enter personal details to use all of site features
      </Paragraph>

      <LoginButton onClick={() => signIn()} type="transparent">
        Sign In
      </LoginButton>
    </motion.div>
  );
}

export default WelcomeBack;
