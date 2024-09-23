import { Link } from "@inertiajs/react";

export default function ShopButton({ href, children }: any) {
    return (
        <Link
            href={route("shop")}
            className="flex px-8 py-4 text-xl justify-center gap-2 items-center w-fit shadow-xl uppercase bg-transparent backdrop-blur-md lg:font-semibold isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-indigo-600 hover:text-grey-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 overflow-hidden border-2 rounded-full group"
        >
            shop now
            <svg
                className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-grey-50 text-grey-50 ease-linear duration-300 rounded-full border group-hover:border-none p-2 rotate-45"
                viewBox="0 0 16 19"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                    className="fill-grey-800 dark:fill-grey-100 group-hover:fill-grey-800"
                ></path>
            </svg>
        </Link>
    );
}
