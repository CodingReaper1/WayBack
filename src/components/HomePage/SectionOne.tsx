import Button from "../Button";
import HOne from "../HOne";
import MotionStaggarChildrenDiv from "../MotionStaggarChildrenDiv";
import Paragraph from "../Paragraph";
import AppNav from "./AppNav";
import Background from "./Background";

function SectionOne() {
  return (
    <section className="relative z-0 h-screen min-h-[64rem] overflow-hidden border-b bg-stone-50 text-stone-950 transition-all duration-300 dark:bg-slate-900 dark:text-slate-200">
      <Background />

      <AppNav />

      <MotionStaggarChildrenDiv
        className=" relative z-20 mx-5  flex flex-col   items-center justify-center gap-28 overflow-hidden px-4 py-10  backdrop-blur-sm lg:ml-auto lg:mr-auto lg:px-10 lg:py-20"
        time={0.25}
      >
        <HOne page="Homepage">Rediscover Your Journey</HOne>

        <Paragraph page="Homepage">
          Mark your favorite spots, and we will help you find your way back.
          Easily revisit the places that matter most.
        </Paragraph>

        <Button to="/login" type="homepage">
          Get started &rarr;
        </Button>
      </MotionStaggarChildrenDiv>
    </section>
  );
}

export default SectionOne;
