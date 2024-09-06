import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import useLoginContext from "../../context/useLoginContext";
import HOne from "../../ui/HOne";
import LoginFormRow from "../../features/auth/LoginFormRow";
import LoginInput from "../../features/auth/LoginInput";
import Form from "../../ui/Form";
import LoginButton from "../../features/auth/LoginButton";
import { useState } from "react";
import useValidateEmail from "./useValidateEmail";
import useAuth from "./useAuth";
import Paragraph from "../../ui/Paragraph";

type OnSubmitTypes = {
  rePassword: string;
  firstName: string;
  signUpEmail: string;
  signUpPassword: string;
};

function SignUp() {
  const { signUpActive, isButtonReady, disableButton, enableButton, signIn } =
    useLoginContext();
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    reset,
    formState: { errors },
  } = useForm<OnSubmitTypes>();

  const [email, setEmail] = useState("");

  const { validateEmail, isValidatingEmail } = useValidateEmail(email);

  const { createAccount, isUploading } = useAuth(reset, setEmail);

  const isReady = isValidatingEmail || isUploading;

  async function onSubmit(formData: OnSubmitTypes) {
    disableButton();
    const { data } = await validateEmail();
    if (data?.data?.status !== "valid") {
      enableButton();
      return setError("signUpEmail", {
        message: "Invalid email try again",
      });
    }

    const {
      rePassword,
      signUpEmail: email,
      signUpPassword: password,
      ...dataToSubmit
    } = formData;

    createAccount({ email, password, ...dataToSubmit });
    enableButton();
  }

  return (
    <motion.div
      className={`absolute top-1/2 z-20 h-auto w-full xxs:px-1  xs:px-6 sm:left-0 sm:top-0 sm:h-full sm:w-1/2  sm:px-0   `}
      initial={{
        visibility: "hidden",
        y: window.innerWidth > 640 ? 0 : "-50%",
      }}
      animate={{
        x: signUpActive && window.innerWidth > 640 ? "100%" : 0,
        opacity: signUpActive ? [0, 0, 1, 1] : [1, 1, 0, 0],
        zIndex: signUpActive ? [1, 1, 5, 5] : [1, 1, 1, 1],
        pointerEvents: signUpActive ? "auto" : "none",
        visibility: signUpActive ? "visible" : "hidden",
      }}
      transition={{
        duration: window.innerWidth > 640 ? 0.6 : 0,

        times: [0, 0.5, 0.5, 1],
        ease: "linear",
      }}
    >
      <Form onSubmit={handleSubmit(onSubmit)} page="Login">
        <HOne page="Login">Create account</HOne>
        <LoginFormRow error={errors?.firstName?.message}>
          <LoginInput
            error={errors?.firstName?.message}
            id="firstName"
            type="text"
            placeholder="First Name"
            register={register}
          />
        </LoginFormRow>

        <LoginFormRow error={errors?.signUpEmail?.message}>
          <LoginInput
            error={errors?.signUpEmail?.message}
            id="signUpEmail"
            type="email"
            placeholder="Email"
            register={register}
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </LoginFormRow>

        <LoginFormRow error={errors?.signUpPassword?.message}>
          <LoginInput
            error={errors?.signUpPassword?.message}
            id="signUpPassword"
            type="password"
            placeholder="Password"
            register={register}
          />
        </LoginFormRow>

        <LoginFormRow error={errors?.rePassword?.message}>
          <LoginInput
            error={errors?.rePassword?.message}
            id="rePassword"
            type="password"
            placeholder="Retype password"
            register={register}
            validate={(value: string) => {
              if (value.length < 6)
                return "Password must be more than 5 characters";
              if (value !== getValues().signUpPassword)
                return "Passwords do not match";

              return true;
            }}
          />
        </LoginFormRow>

        <LoginButton disabled={isReady || isButtonReady}>Sign Up</LoginButton>

        <Paragraph page="Login" className="self-start py-10 sm:hidden">
          Already have an account?
          <a
            href="#"
            onClick={signIn}
            className="ml-5 font-semibold text-blue-600"
          >
            Sign In
          </a>
        </Paragraph>
      </Form>
    </motion.div>
  );
}

export default SignUp;
