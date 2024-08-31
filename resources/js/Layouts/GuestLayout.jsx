import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";

export default function Guest({ children, auth = true }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);
  return (
    <div
      className={`min-h-screen ${auth && "flex flex-col justify-between pt-6 sm:pt-0"} bg-gray-100 dark:bg-gray-900`}
    >
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="shrink-0 flex items-center">
                <Link href="/">
                  <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                </Link>
              </div>

              <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink href={route("home")} active={route().current("home")}>
                  Home
                </NavLink>
                <NavLink href={route("home")} active={route().current("home")}>
                  Shop
                </NavLink>
              </div>
            </div>

            <div className="hidden sm:flex sm:items-center sm:ms-6">
              <div className="ms-3 relative flex space-x-6">
                <NavLink
                  href={route("login")}
                  active={route().current("login")}
                >
                  Login
                </NavLink>
                <NavLink
                  href={route("register")}
                  active={route().current("register")}
                >
                  Register
                </NavLink>
              </div>
            </div>

            <div className="-me-2 flex items-center sm:hidden">
              <button
                onClick={() =>
                  setShowingNavigationDropdown(
                    (previousState) => !previousState,
                  )
                }
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    className={
                      !showingNavigationDropdown ? "inline-flex" : "hidden"
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className={
                      showingNavigationDropdown ? "inline-flex" : "hidden"
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          className={
            (showingNavigationDropdown ? "block" : "hidden") + " sm:hidden"
          }
        >
          <div className="pt-2 pb-3 space-y-1">
            <ResponsiveNavLink
              href={route("home")}
              active={route().current("home")}
            >
              Dashboard
            </ResponsiveNavLink>
            <ResponsiveNavLink
              href={route("home")}
              active={route().current("home")}
            >
              Shop
            </ResponsiveNavLink>
          </div>

          <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
            <div className="mt-3 space-y-1">
              <ResponsiveNavLink href={route("login")}>Login</ResponsiveNavLink>
              <ResponsiveNavLink href={route("register")}>
                Register
              </ResponsiveNavLink>
            </div>
          </div>
        </div>
      </nav>
      {auth ? (
        <div className="flex flex-col sm:justify-center items-center flex-grow">
          <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
            {children}
          </div>
        </div>
      ) : (
        <main>
          <div className="py-12">
            <div className=" mx-auto sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow-sm sm:rounded-lg">
                <div className="text-gray-900 dark:text-gray-100">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
