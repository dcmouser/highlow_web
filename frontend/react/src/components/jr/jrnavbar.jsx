// see https://www.material-tailwind.com/docs/react/navbar

// react
import React from "react";
import { NavLink } from "react-router-dom";

// material tailwind
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";

// icons
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";





export function JrNavLinkSet(props) {
    return (
        <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {props.children}
        </ul>
    );
}



export function JrNavLink(props) {
  const { hidden = false } = props;
  let className = "flex items-center hover:text-blue-500 transition-colors [&.active]:text-blue-800"
  if (hidden === "notactive") {
    // notactive state means show it ONLY if we are actually on that page
    className += " hidden [&.active]:flex"
  }
  return (
      <>
          {hidden!== true && (
              <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
                  <NavLink to={props.to} activestyle="true" className={className} >
                      {props.children}
                  </NavLink>
              </Typography>
          )}
      </>
  );
}





export function NavbarSimple(props) {
  const [openNav, setOpenNav] = React.useState(false);
 
  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);
 
  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
 
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
 
  return (
    <Navbar className="mx-auto max-w-screen-xl px-6 py-3">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5"
        >
          {props.label}
        </Typography>
        <div className="hidden lg:block">
            <JrNavLinkSet>
                {props.children}
            </JrNavLinkSet>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <JrNavLinkSet>
            {props.children}
        </JrNavLinkSet>
      </Collapse>
    </Navbar>
  );
}



export default NavbarSimple;
