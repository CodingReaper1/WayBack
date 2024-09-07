import useMyPositionContext from "../../context/useMyPositionContext";

function Fakecoords() {
  const { myPosition, changeMyPosition } = useMyPositionContext();

  return (
    <div className="absolute right-0 z-[999999] h-96 w-96 text-3xl">
      <div>
        <label>lat</label>
        <input
          value={myPosition[0]}
          onChange={(e) => changeMyPosition([+e.target.value, myPosition[1]])}
          className="h-40"
        />
      </div>

      <div>
        <label>lng</label>
        <input
          value={myPosition[1]}
          onChange={(e) => changeMyPosition([myPosition[0], +e.target.value])}
        />
      </div>
    </div>
  );
}

export default Fakecoords;
