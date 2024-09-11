import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { EyeIcon, StarIcon } from "@heroicons/react/20/solid";
import { PropsWithChildren } from "react";

export default function ProductDisplay({
    auth,
    product,
}: PropsWithChildren<{ auth: any; product: any }>) {
    const rating = parseInt(product.rating.toString());
    const unrated = 5 - rating;

    const discountedPrice =
        product.discount > 0
            ? product.price - (product.discount * product.price) / 100
            : product.price;

    return (
        <motion.div
            className="relative min-w-full flex w-full max-w-xs flex-col overflow-hidden rounded-lg text-slate-900 dark:text-white bg-white dark:bg-grey-800 shadow-md"
            whileHover={{
                y: -20,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }} // 'amount' controls when the animation starts (0.3 means 30% of the element is in view)
        >
            <Link
                href={`/product/${product.id}/view`}
                className="relative mx-3 mt-3 flex h-96 md:h-60 overflow-hidden rounded-xl bg-grey-300"
            >
                <motion.img
                    className="object-cover w-full"
                    src={`/storage/${product.image}`}
                    alt="product image"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                />
                {product.discount > 0 && (
                    <motion.span
                        className="absolute top-0 left-0 m-2 rounded-full bg-indigo-600 px-2 py-1 text-center text-sm font-medium text-white"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 1.5,
                        }}
                    >
                        {parseInt(product.discount)}% OFF
                    </motion.span>
                )}
            </Link>
            <div className="mt-4 px-5 pb-5 mb-2 flex flex-col items-center justify-between space-y-2">
                <a href="#">
                    <h5 className="text-xl tracking-tight">{product.name}</h5>
                </a>
                <p className="flex justify-center space-x-2 items-baseline">
                    <span className="text-3xl font-bold">
                        &pound; {discountedPrice}
                    </span>
                    {product.discount > 0 && (
                        <span className="text-sm line-through">
                            &pound; {product.price}
                        </span>
                    )}
                </p>
                <div className="flex items-center">
                    {rating > 0 &&
                        Array.from({ length: rating }, (_, i) => (
                            <StarIcon
                                key={i}
                                className="h-5 w-5 text-indigo-600 dark:text-indigo-400"
                            />
                        ))}
                    {rating > 0 &&
                        Array.from({ length: unrated }, (_, i) => (
                            <StarIcon
                                key={i}
                                className="h-5 w-5 text-grey-400"
                            />
                        ))}
                    <span className="mr-2 ml-3 rounded bg-indigo-600 text-white px-2.5 py-0.5 text-xs font-semibold">
                        {rating > 0 ? `${rating} stars` : "Unrated"}
                    </span>
                </div>
                <Link
                    href={route("products.view", { id: product.id })}
                    className="w-full"
                >
                    <motion.button
                        className="flex items-center justify-center rounded-md bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-500 dark:hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-500 w-full"
                        whileTap={{ scale: 0.9 }}
                    >
                        <EyeIcon className="h-6 w-6 me-2" />
                        View product
                    </motion.button>
                </Link>
            </div>
        </motion.div>
    );
}
