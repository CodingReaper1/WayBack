import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import useLoginContext from "../../context/useLoginContext";
import LoginInput from "../../features/auth/LoginInput";
import LoginFormRow from "../../features/auth/LoginFormRow";
import HOne from "../../ui/HOne";
import Form from "../../ui/Form";
import LoginButton from "../../features/auth/LoginButton";
import useLogIn from "./useLogIn";
import Paragraph from "../../ui/Paragraph";
import ButtonText from "../../ui/ButtonText";
import Or from "../../ui/Or";
import ButtonGithub from "../../ui/ButtonGithub";

type OnSubmitTypes = {
  signInEmail: string;
  signInPassword: string;
};

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnSubmitTypes>();

  const { signUpActive, signUp, isButtonReady, disableButton, enableButton } =
    useLoginContext();
  const { logIn } = useLogIn();

  async function onSubmit(formData: OnSubmitTypes) {
    disableButton();
    const { signInEmail: email, signInPassword: password } = formData;
    logIn({ email, password });
    enableButton();
  }

  return (
    <motion.div
      className=" absolute top-1/2 z-[20]   w-full  xxs:px-1  xs:px-6 sm:left-0 sm:top-0 sm:h-full sm:w-1/2 sm:px-0 "
      initial={{ x: 0, y: window.innerWidth > 640 ? 0 : "-50%" }}
      animate={{
        x: window.innerWidth > 640 ? (signUpActive ? "100%" : 0) : 0,
        opacity: signUpActive ? [1, 1, 0, 0] : [0, 0, 1, 1],
        zIndex: signUpActive ? [1, 1, 5, 5] : [1, 1, 1, 1],
        pointerEvents: signUpActive ? "none" : "auto",
      }}
      transition={{
        duration: window.innerWidth > 640 ? 0.6 : 0,
        times: [0, 0.5, 0.5, 1],
        ease: "linear",
      }}
    >
      <Form onSubmit={handleSubmit(onSubmit)} page="Login">
        <HOne page="Login">Sign In</HOne>

        <ButtonGithub />

        <Or />
        <LoginFormRow error={errors?.signInEmail?.message}>
          <LoginInput
            error={errors?.signInEmail?.message}
            id="signInEmail"
            type="email"
            placeholder="Email"
            register={register}
          />
        </LoginFormRow>

        <LoginFormRow error={errors?.signInPassword?.message}>
          <LoginInput
            error={errors?.signInPassword?.message}
            id="signInPassword"
            type="password"
            placeholder="Password"
            register={register}
          />
        </LoginFormRow>

        <motion.p
          className="self-start text-2xl  hover:underline"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1 },
          }}
        >
          <Link to="/password-recovery">Forget Your Password?</Link>
        </motion.p>

        <LoginButton disabled={isButtonReady}>Sign In</LoginButton>
        <Paragraph page="Login" className="mt-10 self-start sm:hidden">
          Dont have an account?
          <ButtonText type="fakeLink" onClick={signUp}>
            Sign Up
          </ButtonText>
        </Paragraph>
      </Form>
    </motion.div>
  );
}

export default SignIn;
