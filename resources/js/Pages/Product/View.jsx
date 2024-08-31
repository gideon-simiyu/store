import { BreadCrumbIcon, CartIcon } from "@/Components/Icons";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

export default function View({ auth, product }) {
  return (
    <Authenticated
      user={auth.user}
      header={
        <div className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight flex space-x-2">
          <Link className="breadcrumb-link" href={route("home")}>
            Home
          </Link>
          <BreadCrumbIcon />
          <Link className="breadcrumb-link" href={route("products")}>
            Products
          </Link>{" "}
          <BreadCrumbIcon />
          <span>{product.name}</span>
        </div>
      }
    >
      <div className="container mx-auto bg-primary rounded-lg p-6 flex justify-center">
        <div class="flex-col md:flex-row justify-between flex gap-4 items-start mx-4 py-12">
          <div class="flex  md:space-x-6 bg-white rounded-lg dark:bg-gray-800 flex-col md:flex-row">
            <div class="relative w-full max-w-sm flex justify-center items-center">
              <img
                src={`/storage/${product.image}`}
                alt="shopping image"
                class="object-cover h-full max-w-xs md:h-full rounded-lg"
              />
            </div>
            <form class="flex-auto mt-3 md:mt-0">
              <div class="flex flex-wrap">
                <h1 class="flex-auto text-xl font-semibold dark:text-gray-50">
                  {product.name}
                </h1>
                <div class="text-xl font-semibold text-gray-500 dark:text-gray-300">
                &pound; {product.price}
                </div>
                <div class="flex-none w-full mt-2 text-sm font-medium text-gray-500 dark:text-gray-300">
                  {" "}
                  stock{" "}
                </div>
              </div>
              <div class="flex items-baseline mt-4 mb-6 text-gray-700 dark:text-gray-300">
                <div class="flex space-x-2">
                  <label class="text-center">
                    <input
                      type="radio"
                      class="flex items-center justify-center w-6 h-6 accent-violet-600"
                      name="size"
                      value="xs"
                    />
                    XS
                  </label>
                  <label class="text-center">
                    <input
                      type="radio"
                      class="flex items-center justify-center w-6 h-6 accent-violet-600"
                      name="size"
                      value="s"
                    />
                    S
                  </label>
                  <label class="text-center">
                    <input
                      type="radio"
                      class="flex items-center justify-center w-6 h-6 accent-violet-600"
                      name="size"
                      value="m"
                    />
                    M
                  </label>
                  <label class="text-center">
                    <input
                      type="radio"
                      class="flex items-center justify-center w-6 h-6 accent-violet-600"
                      name="size"
                      value="l"
                    />
                    L
                  </label>
                  <label class="text-center">
                    <input
                      type="radio"
                      class="flex items-center justify-center w-6 h-6 accent-violet-600"
                      name="size"
                      value="xl"
                    />
                    XL
                  </label>
                </div>
              </div>
              <div class="flex mb-4 text-sm font-medium">
                <button
                  type="button"
                  class="py-2 flex justify-center px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold  focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
                >
                  <CartIcon />
                  Add to cart
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
