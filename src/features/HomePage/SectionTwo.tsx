import Filter from "../../ui/Filter";
import HTwo from "../../ui/HTwo";
import MotionStaggarChildrenDiv from "../../ui/MotionStaggarChildrenDiv";
import Chart from "./Chart";

function SectionTwo() {
  return (
    <section className="relative z-0 hidden  h-screen min-h-[60rem] overflow-hidden bg-stone-50 text-stone-950 transition-all duration-300 dark:bg-slate-900 dark:text-slate-200 md:block">
      <MotionStaggarChildrenDiv className=" mt-40 grid h-screen content-start items-end justify-start justify-items-start gap-y-10 px-5 sm:px-10 md:grid-cols-[70fr_30fr] md:gap-y-20 md:px-16 lg:px-40">
        <HTwo page="Homepage">Route displaied and updated</HTwo>
        <Filter
          filterField="last"
          options={[
            { value: "7", label: "Last 7 days" },
            { value: "30", label: "Last 30 days" },
            { value: "90", label: "Last 90 days" },
          ]}
        />

        <Chart />
      </MotionStaggarChildrenDiv>
    </section>
  );
}

export default SectionTwo;
