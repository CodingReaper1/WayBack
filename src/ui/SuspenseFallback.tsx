import Spinner from "./Spinner";

function SuspenseFallback() {
  return (
    <div className="h-screen overflow-hidden bg-stone-50 dark:bg-slate-900 dark:text-slate-200">
      <Spinner type="big" center={true} />;
    </div>
  );
}

export default SuspenseFallback;
