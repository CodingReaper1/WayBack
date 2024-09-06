import { motion } from "framer-motion";

import useLoginContext from "../../context/useLoginContext";
import HOne from "../../ui/HOne";
import LoginButton from "./LoginButton";
import MotionStaggarChildrenDiv from "../../ui/MotionStaggarChildrenDiv";
import Paragraph from "../../ui/Paragraph";

function HelloFriend() {
  const { signUpActive, signUp } = useLoginContext();

  return (
    <motion.div
      className=" absolute right-0 top-0 flex h-full w-1/2  items-center justify-center  sm:px-4 md:px-8  lg:px-12"
      animate={{
        x: signUpActive ? "-200%" : 0,
        opacity: signUpActive ? [1, 0, 0, 0] : [0, 0, 1, 1],
        visibility: signUpActive ? "hidden" : "visible",
      }}
      transition={{ duration: 0.6, ease: "linear" }}
    >
      <MotionStaggarChildrenDiv className="flex flex-col items-center justify-center gap-10 text-center">
        <HOne page="Login">Hello, Friend!</HOne>

        <Paragraph page="Login">
          Register with your personal details to use all of site features
        </Paragraph>

        <LoginButton type="transparent" onClick={() => signUp()}>
          Sign Up
        </LoginButton>
      </MotionStaggarChildrenDiv>
    </motion.div>
  );
}

export default HelloFriend;
