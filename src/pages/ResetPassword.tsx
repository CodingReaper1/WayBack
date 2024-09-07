import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

import Form from "../ui/Form";
import LoginFormRow from "../features/auth/LoginFormRow";
import LoginInput from "../features/auth/LoginInput";
import HOne from "../ui/HOne";
import LoginButton from "../features/auth/LoginButton";
import useLoginContext from "../context/useLoginContext";
import AppNav from "../ui/AppNav";
import useResetPassword from "../features/auth/useResetPassword";
import { useEffect } from "react";
import Paragraph from "../ui/Paragraph";

type OnSubmitTypes = {
  password: string;
  rePassword: string;
};

function PasswordRecovery() {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<OnSubmitTypes>();

  const navigate = useNavigate();

  const { isButtonReady, disableButton } = useLoginContext();
  const { resetPassword } = useResetPassword();
  const [searchParams] = useSearchParams();
  const retrievedEmail: string | null = searchParams.get("email");

  useEffect(() => {
    if (!retrievedEmail) navigate("/");
  }, [navigate, retrievedEmail]);

  async function onSubmit({ password }: OnSubmitTypes) {
    disableButton();
    if (retrievedEmail === null || !retrievedEmail) return navigate("/");
    resetPassword({ password, retrievedEmail });
  }

  return (
    <div className="h-screen w-screen   overflow-x-hidden bg-stone-50 text-stone-950 transition-all duration-300 dark:bg-slate-800 dark:text-slate-200">
      <AppNav />
      <Form onSubmit={handleSubmit(onSubmit)} page="PasswordRecovery">
        <HOne page="PasswordRecovery">Reset your password</HOne>
        <Paragraph page="PasswordRecovery">
          Type new password for your user in both fields
        </Paragraph>

        <LoginFormRow error={errors?.password?.message}>
          <LoginInput
            error={errors?.password?.message}
            id="password"
            type="password"
            placeholder="New password"
            register={register}
          />
        </LoginFormRow>

        <LoginFormRow error={errors?.rePassword?.message}>
          <LoginInput
            error={errors?.rePassword?.message}
            id="rePassword"
            type="password"
            placeholder="Retype new password"
            register={register}
            validate={(value: string) => {
              if (value.length < 6)
                return "Password must be more than 5 characters";
              if (value !== getValues().password)
                return "Passwords do not match";

              return true;
            }}
          />
        </LoginFormRow>

        <LoginButton disabled={isButtonReady}>Reset password</LoginButton>
      </Form>
    </div>
  );
}

export default PasswordRecovery;
