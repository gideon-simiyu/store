import { Link, InertiaLinkProps } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    const class_name = active
        ? "bg-indigo-600 text-white hover:bg-indigo-500"
        : "text-black dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400";
    return (
        <motion.li
            initial={{ scale: 0, x: 100 }}
            animate={{ scale: 1, x: 0, transition: { duration: 0.3 } }}
            exit={{ scale: 0 }}
            className={`w-full h-full ${class_name} flex justify-start items-center rounded-md border border-transparent`}
        >
            <Link
                className="py-1.5 flex px-3 h-full gap-2 items-center text-nowrap transition-all duration-300 ease-in-out text-lg font-medium rounded-md"
                {...props}
            >
                {children}
            </Link>
        </motion.li>
    );
}
