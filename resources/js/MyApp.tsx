import NProgress from "nprogress";
import { router } from "@inertiajs/react";
import Loader from "@/Components/Loader";
import { Inertia } from "@inertiajs/inertia";
import React, { useState, useEffect, Fragment } from "react";

const LoaderComponent = () => (
    <div
        style={{
            height: "100dvh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
        className="min-h-screen flex-col justify-center items-center"
    >
        <Loader />
    </div>
);

const MyApp = ({ children }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Show loader on Inertia start
        Inertia.on("start", () => setLoading(true));

        // Hide loader when Inertia finishes loading
        Inertia.on("finish", () => setLoading(false));
    }, []);

    return (
        <Fragment>
            {loading && <LoaderComponent />}
            <div className={loading ? "hidden" : ""}>{children}</div>
        </Fragment>
    );
};

export default MyApp;
