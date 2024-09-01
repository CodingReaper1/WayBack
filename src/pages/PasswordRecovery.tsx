import { useForm } from "react-hook-form";
import Form from "../components/Form";
import LoginFormRow from "../components/Login/LoginFormRow";
import LoginInput from "../components/Login/LoginInput";
import HOne from "../components/HOne";
import LoginButton from "../components/Login/LoginButton";
import useLoginContext from "../context/useLoginContext";
import AppNav from "../components/HomePage/AppNav";
import useSendResetPasswordEmail from "../hooks/useSendResetPasswordEmail";
import { useState } from "react";
import Paragraph from "../components/Paragraph";

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
          <a href="/login" className="ml-5 font-semibold text-blue-600">
            Sign Up
          </a>
        </Paragraph>
      </Form>
    </div>
  );
}

export default PasswordRecovery;
