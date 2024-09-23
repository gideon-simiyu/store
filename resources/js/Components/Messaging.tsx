import ReactDOM from "react-dom";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Messaging({
    message,
    mtype,
    show,
    onClose,
}: {
    message: string;
    mtype: string;
    show: boolean;
    onClose: () => void;
}) {
    React.useEffect(() => {
        if (show) {
            // Start timer to automatically hide the message after 5 seconds
            const timer = setTimeout(() => {
                onClose();
            }, 5000);

            // Cleanup the timer on component unmount
            return () => clearTimeout(timer);
        }
    }, [show]);

    // Define animation variants
    const variants = {
        hidden: { opacity: 0, y: -50 }, // initial state: above the screen and invisible
        visible: { opacity: 1, y: 0 }, // animate to: visible and in place
        exit: { opacity: 0, y: -50 }, // exit animation: move back up and fade out
    };

    // Content of the messaging component
    const content = (
        <AnimatePresence>
            {show && (
                <motion.div
                    style={{ zIndex: 99999 }}
                    className="fixed h-fit w-fit right-4 top-4 z-50"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={variants}
                    transition={{ duration: 0.5, type: "spring" }}
                >
                    <div className="flex flex-col gap-2 w-fit text-lg z-50">
                        <div className="success-alert cursor-default flex items-center justify-between w-fit rounded-lg bg-indigo-500 px-[10px] shadow-lg">
                            <div className="flex gap-2">
                                <div className="text-white bg-white/5 backdrop-blur-xl p-3 rounded-lg">
                                    {mtype === "success" && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="green"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m4.5 12.75 6 6 9-13.5"
                                            ></path>
                                        </svg>
                                    )}

                                    {mtype === "error" && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1-18 0Zm-9 3.75h.008v.008H12v-.008Z"
                                            ></path>
                                        </svg>
                                    )}

                                    {mtype === "message" && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.8"
                                            stroke="currentColor"
                                            className="w-6 h-6 shadow-[#1c569e]"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                                            ></path>
                                        </svg>
                                    )}
                                </div>

                                <div>
                                    <p className="text-white font-bold">
                                        {mtype === "success"
                                            ? "Success"
                                            : mtype === "error"
                                            ? "Error"
                                            : "Message"}
                                    </p>
                                    <p className="text-gray-100 text-base">
                                        {message}
                                    </p>
                                </div>
                            </div>
                            <button
                                className="text-gray-100 hover:bg-white/5 p-1 rounded-md transition-colors ease-linear"
                                onClick={onClose}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18 18 6M6 6l12 12"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    // Use ReactDOM.createPortal to render the content into the body
    return ReactDOM.createPortal(content, document.body);
}
