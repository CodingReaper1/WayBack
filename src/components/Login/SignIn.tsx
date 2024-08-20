import { motion } from "framer-motion";
import { FieldValues, useForm, UseFormRegister } from "react-hook-form";


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
  register: UseFormRegister<FieldValues>;
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

  const { signUpActive, signUp, isButtonReady } = useLoginContext();
  const { logIn } = useLogIn();

  async function onSubmit(formData: OnSubmitTypes) {
    const { signInEmail: email, signInPassword: password } = formData;
    logIn({ email, password });
  }

  return (
    <motion.div
      className=" absolute top-[20rem] z-[20] h-full w-full bg-white xxs:px-1 xs:px-12 sm:left-0 sm:top-0 sm:w-1/2 sm:px-0 "
      initial={{ x: 0 }}
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
        {/* <div className="social-icons my-8">
          <a
            href="#"
            className="mx-1 mb-[1rem] mt-[1.5rem] inline-flex h-16 w-16 items-center justify-center rounded-[20%] border-2 border-solid border-[#ccc] text-xl text-[#333] no-underline"
          >
            <i className="fa-brands fa-google-plus-g"></i>
          </a>
          <a
            href="#"
            className="mx-1 mb-[1rem] mt-[1.5rem] inline-flex h-16 w-16 items-center justify-center rounded-[20%] border-2 border-solid border-[#ccc] text-xl text-[#333] no-underline"
          >
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a
            href="#"
            className="mx-1 mb-[1rem] mt-[1.5rem] inline-flex h-16 w-16 items-center justify-center rounded-[20%] border-2 border-solid border-[#ccc] text-xl text-[#333] no-underline"
          >
            <i className="fa-brands fa-github"></i>
          </a>
          <a
            href="#"
            className="mx-1 mb-[1rem] mt-[1.5rem] inline-flex h-16 w-16 items-center justify-center rounded-[20%] border-2 border-solid border-[#ccc] text-xl text-[#333] no-underline"
          >
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
        </div> */}
        {/* <span className="text-xl">or use your own email password</span> */}
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
          Forget Your Password?
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
