import Spinner from "./Spinner";

function Fallback() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-stone-50 dark:bg-slate-900">
      <Spinner type="big" center={true} />
    </div>
  );
}

export default Fallback;
