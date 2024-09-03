import { useSearchParams } from "react-router-dom";
import useReadRouteUsage from "../../hooks/useReadRouteUsage";
import { eachDayOfInterval, format, subDays } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Spinner from "../Spinner";
import useDarkModeContext from "../../context/useDarkModeContext";

function Chart() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("last") || "7";

  const { isDarkMode } = useDarkModeContext();
  const { readRouteUsage } = useReadRouteUsage(filterValue);

  const interval = window.innerWidth < 1024 ? 6 : 4;

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), +filterValue - 1),
    end: new Date(),
  }).reverse();

  if (!readRouteUsage) return <Spinner type="big" center={true} />;

  const data = allDates
    .map((date) => {
      const datesOnWhichInfoExists = readRouteUsage
        .map((eachDay) => [
          eachDay.created_at.split("T")[0],
          eachDay.usageDaily,
        ])
        .find((infoExDate) => infoExDate[0] === format(date, "yyyy-MM-dd"));

      return {
        label: format(date, "MMM dd"),
        usage: datesOnWhichInfoExists ? datesOnWhichInfoExists[1] : 0,
      };
    })
    .reverse();

  return (
    <div className="col-span-full w-full bg-white px-10 pb-5 pt-14 dark:bg-slate-950">
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data} className="text-red-900">
          <XAxis
            dataKey="label"
            interval={filterValue === "7" ? 0 : interval}
            tick={{
              fontSize: "1.2rem",
              fontWeight: 500,
              fill: isDarkMode ? "#fff" : "#0c0a09",
            }}
          />
          <YAxis
            unit=" Times "
            tick={{
              fontSize: "1.2rem",
              fontWeight: 500,
              fill: isDarkMode ? "#fff" : "#0c0a09",
            }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ fontSize: "1.4rem" }} />
          <Area
            dataKey="usage"
            type="monotone"
            stroke={"#4f46e5"}
            fill={isDarkMode ? "#4f46e5" : "#c7d2fe"}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
