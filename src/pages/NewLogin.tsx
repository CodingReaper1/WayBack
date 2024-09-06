import SignUp from "../features/auth/SignUp";
import SignIn from "../features/auth/SignIn";
import Toggle from "../features/auth/Toggle";

function NewLogin() {
  return (
    <div className=" relative h-screen min-h-[65rem]  w-full max-w-full   bg-white font-Montserrat text-stone-950  dark:bg-slate-800  dark:text-slate-200 sm:flex  sm:h-screen sm:min-h-[48rem] sm:flex-col sm:justify-center sm:overflow-x-hidden sm:overflow-y-hidden">
      <SignIn />

      <SignUp />

      <Toggle />
    </div>
  );
}

export default NewLogin;
