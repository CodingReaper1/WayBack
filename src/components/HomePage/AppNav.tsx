import Button from "../Button";

import { HiMapPin } from "react-icons/hi2";
import DarkModeToggle from "./DarkModeToggle";

function AppNav() {
  return (
    <nav className=" relative z-10 w-screen border-b border-stone-300 px-20 py-3 text-3xl font-semibold  lg:text-4xl">
      <ul className="flex items-center  justify-between ">
        <li className="">
          <Button type="navlink" to="/homepage">
            <HiMapPin className="mr-4 h-12 w-12 text-red-600" />
            Wayback
          </Button>
        </li>

        <div className="flex gap-5">
          <li>
            <DarkModeToggle  />
          </li>

          <li className="flex items-center ">
            <Button type="navlink" className={"md:inline"} to="/login">
              Sign in
            </Button>
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default AppNav;
