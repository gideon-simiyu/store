import { Fragment, PropsWithChildren, useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import Footer from "@/Components/Footer";
import {
  BuildingStorefrontIcon,
  HomeIcon,
  LockOpenIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";
import ThemeSwitcher from "@/Components/ThemeSwitcher";
import Harmbuger from "@/Components/Harmbuger";
import { PageProps } from "@/types";

export default function Guest({
  children,
  auth = true,
}: PropsWithChildren<{ auth?: boolean }>) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  return (
    <div
      className={`relative min-h-screen ${auth && "flex flex-col justify-between pt-6 sm:pt-0"}`}
    >
      <nav className="bg-white shadow-lg dark:bg-grey-950 py-3.5 px-6  w-full lg:shadow-none fixed z-50">
        <div className="flex items-center justify-between gap-1 sm:gap-6 lg:flex-row flex-col">
          <div className="flex justify-between items-center lg:w-auto w-full">
            <ThemeSwitcher className="lg:hidden" />
            <a href="#" className="block">
              <ApplicationLogo />
            </a>
            <button
              id="navbar-toggle"
              type="button"
              className="inline-flex items-center mr-3 text-sm rounded-lg lg:hidden focus:outline-none "
              aria-controls="navbar-default"
              aria-expanded="false"
              onClick={() =>
                setShowingNavigationDropdown(!showingNavigationDropdown)
              }
            >
              <span className="sr-only">Open main menu</span>

              <Harmbuger checked={showingNavigationDropdown} />
            </button>
          </div>
          <div
            id="mobile-navbar"
            className={`${!showingNavigationDropdown && "hidden"} lg:flex flex-row w-full flex-1`}
          >
            <ul className="text-center flex lg:flex-row flex-col lg:gap-2 xl:gap-4 gap-2 items-start lg:ml-auto">
              <NavLink href={route("home")} active={route().current("home")}>
                <span className="ms-2">Home</span>
              </NavLink>
              <NavLink href={route("shop")} active={route().current("shop")}>
                <span className="ms-2">Shop</span>
              </NavLink>
              <NavLink href={route("login")} active={route().current("login")}>
                <span className="ms-2">Login</span>
              </NavLink>
              <NavLink
                href={route("register")}
                active={route().current("register")}
              >
                <span className="ms-2">Register</span>
              </NavLink>
            </ul>
            <div className="text-center lg:flex  items-center gap-1  sm:gap-4 lg:ml-auto">
              <div className=" flex items-center lg:justify-start justify-center gap-1 sm:gap-2">
                <ThemeSwitcher className="hidden lg:inline-flex" />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="pt-[68px] bg-grey-200 text-grey-900 dark:text-grey-100 dark:bg-grey-900 flex-grow flex flex-col">
        <div
          className={`w-full p-8 flex-grow ${auth && "flex flex-col justify-center items-center"}`}
        >
          {auth ? (
            <div className="w-full">
              <div className="mx-auto max-w-2xl px-6 lg:px-8 rounded-2xl bg-white dark:bg-grey-800 shadow-xl">
                {children}
              </div>
            </div>
          ) : (
            <div>{children} </div>
          )}
        </div>
      </div>
    </div>
  );
}
