import { Fragment, PropsWithChildren, useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import ThemeSwitcher from "@/Components/ThemeSwitcher";
import Harmbuger from "@/Components/Harmbuger";
import { PageProps, User } from "@/types";

export default function Authenticated({
    user,
    children,
}: PropsWithChildren<{ user: User }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);


    return (
        <div className="relative flex flex-col min-h-screen">
            <nav className="bg-white shadow-lg dark:bg-slate-950 py-3.5 px-6  w-full lg:shadow-none fixed z-50">
                <div className="flex items-center justify-between gap-1 sm:gap-6 lg:flex-row flex-col">
                    <div className="flex justify-between items-center lg:w-auto w-full">
                        <ThemeSwitcher className="lg:hidden" />
                        <a href="#" className="block">
                            <ApplicationLogo />
                        </a>
                        <button
                            id="navbar-toggle"
                            type="button"
                            className="inline-flex items-center p-2 ml-3 text-sm  rounded-lg lg:hidden focus:outline-none "
                            aria-controls="navbar-default"
                            aria-expanded="false"
                            onClick={() =>
                                setShowingNavigationDropdown(
                                    !showingNavigationDropdown
                                )
                            }
                        >
                            <span className="sr-only">Open main menu</span>
                            <Harmbuger checked={showingNavigationDropdown} />
                        </button>
                    </div>
                    <div
                        id="mobile-navbar"
                        className={`${
                            !showingNavigationDropdown && "hidden"
                        } lg:flex flex-row w-full flex-1`}
                        style={{ zIndex: 1000 }}
                    >
                        <ul className="text-center flex lg:flex-row flex-col lg:gap-2 xl:gap-4 gap-2 items-start lg:ml-auto">
                            {user.is_staff == 1 ? (
                                <Fragment>
                                    <NavLink
                                        href={route("dashboard")}
                                        active={route().current("dashboard")}
                                    >
                                        <span className="ms-2">Dashboard</span>
                                    </NavLink>
                                    <NavLink
                                        href={route("categories")}
                                        active={route().current("categories")}
                                    >
                                        <span className="ms-2">Categories</span>
                                    </NavLink>
                                    <NavLink
                                        href={route("product_types")}
                                        active={route().current(
                                            "product_types"
                                        )}
                                    >
                                        <span className="ms-2">Types</span>
                                    </NavLink>
                                    <NavLink
                                        href={route("products")}
                                        active={route().current("products")}
                                    >
                                        <span className="ms-2">Products</span>
                                    </NavLink>
                                    <NavLink
                                        href={route("dashboard")}
                                        active={route().current("orders")}
                                    >
                                        <span className="ms-2">Orders</span>
                                    </NavLink>

                                    <NavLink
                                        href={route("profile.edit")}
                                        active={route().current("profile.edit")}
                                    >
                                        Profile
                                    </NavLink>
                                    <NavLink
                                        href={route("logout")}
                                        method="post"
                                        active={route().current("logout")}
                                        as="button"
                                    >
                                        Log Out
                                    </NavLink>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <NavLink
                                        href={route("home")}
                                        active={route().current("home")}
                                    >
                                        <span className="ms-2">Home</span>
                                    </NavLink>
                                    <NavLink
                                        href={route("shop")}
                                        active={route().current("shop")}
                                    >
                                        <span className="ms-2">Shop</span>
                                    </NavLink>
                                    <NavLink
                                        href={route("cart")}
                                        active={route().current("cart")}
                                    >
                                        <span className="ms-2">Cart</span>
                                    </NavLink>
                                    <NavLink
                                        href={route("home")}
                                        active={route().current("orders")}
                                    >
                                        <span className="ms-2">Orders</span>
                                    </NavLink>
                                    <NavLink
                                        href={route("profile.edit")}
                                        active={route().current("profile.edit")}
                                    >
                                        <span className="ms-2">Profile</span>
                                    </NavLink>
                                    <NavLink
                                        href={route("logout")}
                                        active={route().current("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        <span className="ms-2">Logout</span>
                                    </NavLink>
                                </Fragment>
                            )}
                        </ul>
                        <div className="text-center lg:flex  items-center gap-1  sm:gap-4 lg:ml-auto">
                            <div className=" flex items-center lg:justify-start justify-center gap-1 sm:gap-2 ">
                                <ThemeSwitcher className="hidden lg:inline-flex" />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="pt-[68px] flex-grow flex flex-col bg-grey-200 text-grey-900 dark:text-grey-100 dark:bg-grey-900">
                <div className="w-full flex-grow p-8">{children}</div>
            </div>
        </div>
    );
}
