import { useForm } from "react-hook-form";

import Form from "../ui/Form";
import LoginFormRow from "../features/auth/LoginFormRow";
import LoginInput from "../features/auth/LoginInput";
import HOne from "../ui/HOne";
import LoginButton from "../features/auth/LoginButton";
import useLoginContext from "../context/useLoginContext";
import AppNav from "../ui/AppNav";
import useSendResetPasswordEmail from "../features/auth/useSendResetPasswordEmail";
import { useState } from "react";
import Paragraph from "../ui/Paragraph";
import { Link } from "react-router-dom";

type OnSubmitTypes = {
  recoveryEmail: string;
};

function PasswordRecovery() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<OnSubmitTypes>();
  const { isButtonReady, disableButton } = useLoginContext();
  const [email, setEmail] = useState("");
  const { sendResetPasswordEmail } = useSendResetPasswordEmail();

  async function onSubmit({ recoveryEmail }: OnSubmitTypes) {
    disableButton();
    sendResetPasswordEmail(recoveryEmail);
  }
  return (
    <div className="h-screen w-screen   overflow-x-hidden bg-stone-50 text-stone-950 transition-all duration-300 dark:bg-slate-800 dark:text-slate-200">
      <AppNav />
      <Form onSubmit={handleSubmit(onSubmit)} page="PasswordRecovery">
        <HOne page="PasswordRecovery">Reset your password</HOne>
        <Paragraph page="PasswordRecovery">
          Type in your email and we will send link to reset your password
        </Paragraph>

        <LoginFormRow
          error={errors?.recoveryEmail?.message as string | undefined}
        >
          <LoginInput
            error={errors?.recoveryEmail?.message as string | undefined}
            id="recoveryEmail"
            type="email"
            placeholder="Email"
            register={register}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </LoginFormRow>

        <LoginButton disabled={isButtonReady}>Send reset email</LoginButton>
        <Paragraph page="PasswordRecovery">
          Dont have an account?
          <Link to="/login" className="ml-5 font-semibold text-blue-600">
            Sign Up
          </Link>
        </Paragraph>
      </Form>
    </div>
  );
}

export default PasswordRecovery;
