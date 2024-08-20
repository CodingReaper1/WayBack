import Button from "../Button";

import { HiMapPin } from "react-icons/hi2";

function AppNav() {
  return (
    <nav className=" relative z-10 w-screen border-b border-zinc-300 px-20 py-6 text-3xl font-semibold  lg:text-4xl">
      <ul className="flex  justify-between ">
        <li className="">
          <Button type="navlink" to="/homepage">
            <HiMapPin className="mr-4 h-12 w-12 text-red-600" />
            Wayback
          </Button>
        </li>

        <li className="flex gap-5">

          <Button type="navlink" className={"md:inline"} to="/login">
            Sign in
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
