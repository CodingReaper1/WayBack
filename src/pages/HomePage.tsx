import AppNav from "../components/HomePage/AppNav";
import Button from "../components/Button";
import HOne from "../components/HOne";
import Paragraph from "../components/Paragraph";
import MotionStaggarChildrenDiv from "../components/MotionStaggarChildrenDiv";
import Background from "../components/HomePage/Background";

function HomePage() {
  return (
    <div className="relative z-0 h-screen bg-stone-50 text-stone-950">
      <Background />

      <AppNav />

      <MotionStaggarChildrenDiv
        className=" relative z-20 mx-5  flex flex-col   items-center justify-center gap-28 overflow-y-auto px-4 py-10  backdrop-blur-sm lg:ml-auto lg:mr-auto lg:px-10 lg:py-20"
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
    </div>
  );
}

export default HomePage;
