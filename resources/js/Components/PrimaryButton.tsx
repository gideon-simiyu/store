import { ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";

export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}: any) {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-indigo-600  border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-indigo-500  focus:bg-indigo-500  active:bg-indigo-700  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </motion.button>
    );
}
