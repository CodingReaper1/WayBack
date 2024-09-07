function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  console.error(error);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-20  font-medium dark:bg-slate-900 dark:text-white">
      <h1 className="text-5xl font-bold">Something went wrong 😨</h1>
      <p className="text-3xl">Error: {error.message}</p>

      <button
        onClick={resetErrorBoundary}
        className={`
            group relative overflow-hidden rounded-lg border border-red-600 bg-red-600   px-7 py-5 text-3xl text-white shadow-inner dark:text-stone-200 `}
      >
        {" "}
        <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-white transition-all duration-200 group-hover:w-full dark:border-slate-900"></span>
        <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-white transition-all  duration-200 group-hover:w-full dark:border-slate-900"></span>
        <span className="ease absolute left-0 top-0 h-0 w-full bg-white transition-all delay-200 duration-300 group-hover:h-full dark:bg-slate-900"></span>
        <span className="ease absolute bottom-0 left-0 h-0 w-full bg-white transition-all delay-200 duration-300 group-hover:h-full dark:bg-slate-900"></span>
        <span className="absolute inset-0 h-full w-full bg-white opacity-0 delay-300 duration-300 group-hover:opacity-100 dark:bg-slate-900"></span>
        <span className="ease relative transition-colors delay-200 duration-300 group-hover:text-red-600 dark:group-hover:text-red-600">
          Try Again
        </span>
      </button>
    </div>
  );
}

export default ErrorFallback;
