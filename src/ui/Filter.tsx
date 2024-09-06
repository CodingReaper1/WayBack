import { useSearchParams } from "react-router-dom";
import FilterButton from "./FilterButton";

type FilterTypes = {
  filterField: string;
  options: { value: string; label: string }[];
};

function Filter({ filterField, options }: FilterTypes) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0)!.value;

  function handleClick(value: string) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  return (
    <div className=" flex min-w-[33rem] gap-2 rounded-lg  border-2 p-2 text-2xl font-medium">
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </div>
  );
}

export default Filter;
