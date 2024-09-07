import useSignInWithGithub from "../features/auth/useSignInWithGithub";

function ButtonGithub() {
  const { signInWithGithub } = useSignInWithGithub();

  return (
    <button
      className="mx-1 mb-4 flex  items-center justify-center gap-5 rounded-xl border-2 border-solid border-slate-300 py-4 text-3xl font-medium transition-all duration-300 hover:scale-[1.01] hover:bg-slate-50 hover:shadow-md dark:hover:bg-slate-900 xxs:w-[30rem] xs:w-[35rem] sm:w-[31rem] lg:w-[40rem] xl:w-[50rem]"
      onClick={() => signInWithGithub()}
      type="button"
    >
      <i className="fa-brands fa-github  text-5xl text-black"></i>
      Continue using github
    </button>
  );
}

export default ButtonGithub;
