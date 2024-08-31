import { motion } from "framer-motion";
import { CartIcon } from "./Icons";
import { Link } from "@inertiajs/react";

export default function ProductDisplay({ auth, product }) {
  // get random between 10, 15, 20
  const discount = Math.floor(Math.random() * 3) * 5 + 10;
  const discountedPrice = product.price + (product.price * discount) / 100;

  return (
    <motion.div
      className="relative min-w-full flex w-full max-w-xs flex-col overflow-hidden rounded-lg text-slate-900 dark:text-white bg-white dark:bg-gray-800 shadow-md"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/product/${product.id}/view`} className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl bg-gray-300">
        <motion.img
          className="object-cover w-full"
          src={`/storage/${product.image}`}
          alt="product image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
        <span className="absolute top-0 left-0 m-2 rounded-full bg-indigo-600 px-2 text-center text-sm font-medium text-white">
          15% OFF
        </span>
      </Link>
      <div className="mt-4 px-5 pb-5 mb-2 flex flex-col items-center justify-between space-y-2">
        <a href="#">
          <h5 className="text-xl tracking-tight">{product.name}</h5>
        </a>
        <p className="flex justify-center space-x-2 items-baseline">
          <span className="text-3xl font-bold">&pound; {product.price}</span>
          <span className="text-sm line-through">
            &pound; {(product.price * 1.15).toFixed(2)}
          </span>
        </p>
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => (
            <motion.svg
              key={index}
              aria-hidden="true"
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 1 }}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </motion.svg>
          ))}
          <span className="mr-2 ml-3 rounded bg-indigo-600 text-white px-2.5 py-0.5 text-xs font-semibold">
            5.0
          </span>
        </div>
        <button className="flex items-center justify-center rounded-md bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-500 dark:hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-500 w-full">
          <CartIcon className="h-5 w-5 mr-2" />
          Add to cart
        </button>
      </div>
    </motion.div>
  );
}
