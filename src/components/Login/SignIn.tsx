import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import useLoginContext from "../../context/useLoginContext";
import LoginInput from "./LoginInput";
import LoginFormRow from "./LoginFormRow";
import HOne from "../HOne";
import Form from "../Form";
import LoginButton from "./LoginButton";
import useLogIn from "../../hooks/useLogIn";
import Paragraph from "../Paragraph";

type OnSubmitTypes = {
  signInEmail: string;
  signInPassword: string;
  // register: UseFormRegister<FieldValues>;
};

function SignIn() {
  const {
    register,
    handleSubmit,
    // reset,
    // setError,
    // getValues,
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

        <a
          href="#"
          className="mx-1 mb-4 flex w-[50rem] items-center justify-center gap-5 rounded-xl border-2 border-solid border-slate-300 py-4 text-3xl font-medium transition-all duration-300 hover:scale-[1.01] hover:bg-slate-50 hover:shadow-md dark:hover:bg-slate-900"
        >
          <i className="fa-brands fa-github  text-5xl text-black"></i>
          Continue using github
        </a>

        <div className="flex w-full items-center">
          <div className="flex-grow border-t border-stone-700 dark:border-stone-400"></div>
          <span className="mx-4">or</span>
          <div className="flex-grow border-t border-stone-700 dark:border-stone-400"></div>
        </div>
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

        <motion.a
          href="#"
          className="self-start text-2xl  hover:underline"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1 },
          }}
        >
          <Link to="/password-recovery">Forget Your Password?</Link>
        </motion.a>

        <LoginButton disabled={isButtonReady}>Sign In</LoginButton>
        <Paragraph page="Login" className="mt-10 self-start sm:hidden">
          Dont have an account?
          <a
            href="#"
            onClick={signUp}
            className="ml-5 font-semibold text-blue-600"
          >
            Sign Up
          </a>
        </Paragraph>
      </Form>
    </motion.div>
  );
}

export default SignIn;
