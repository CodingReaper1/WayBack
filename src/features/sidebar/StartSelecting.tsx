import FlexBox from "../../ui/FlexBox";

function StartSelecting() {
  return (
    <FlexBox className="h-screen flex-col items-center justify-center gap-12 overflow-auto">
      <span className="flex justify-center text-2xl">
        Start selecting places.
      </span>
      <span className="">
        And dont forget to press find after saving route for better experience
        :)
      </span>
    </FlexBox>
  );
}

export default StartSelecting;
