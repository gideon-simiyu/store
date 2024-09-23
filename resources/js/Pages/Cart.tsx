import Messaging from "@/Components/Messaging";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Cart({
  auth,
  cart,
  products,
  total,
  deliveryCharge = 0,
}: {
  auth: any;
  cart: any;
  products: productModel[];
  total: number;
  deliveryCharge: number;
}) {
  const [messaging, setMessaging] = useState({
    type: "",
    message: "",
    show: false,
  });

  const handleRemove = (product: any) => (event: any) => {
    const data = {
      product_id: product.id,
    };
    router.post(route("cart.remove"), data, {
      preserveScroll: true,
      onSuccess: () => {
        setMessaging({
          type: "success",
          message: "Product removed from cart",
          show: true,
        });
      },
      onError: () => {
        setMessaging({
          type: "error",
          message: "Product removal failed",
          show: true,
        });
      },
    });
  };

  const handleReduce = (product: any) => (event: any) => {
    const data = {
      product_id: product.id,
      quantity: product.pivot.quantity - 1,
    };

    router.post(route("cart.update"), data, {
      preserveScroll: true,
      onSuccess: () => {
        setMessaging({
          type: "success",
          message: "Cart updated successfully",
          show: true,
        });
      },
      onError: () => {
        setMessaging({
          type: "error",
          message: "Cart update failed",
          show: true,
        });
      },
    });
  };

  const handleIncrease = (product: any) => (event: any) => {
    const data = {
      product_id: product.id,
      quantity: product.pivot.quantity + 1,
    };
    router.post(route("cart.update"), data, {
      preserveScroll: true,
      onSuccess: () => {
        setMessaging({
          type: "success",
          message: "Cart updated successfully",
          show: true,
        });
      },
      onError: () => {
        setMessaging({
          type: "error",
          message: "Cart update failed",
          show: true,
        });
      },
    });
  };

  const onClose = () => {
    setMessaging({...messaging, show: false});
  }

  return (
    <Authenticated user={auth.user}>
      <Messaging
        message={messaging.message}
        mtype={messaging.type}
        show={messaging.show}
        onClose={onClose}
      />
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center">
            Shopping Cart
          </h2>
          <div className="hidden lg:grid grid-cols-2 py-6">
            <div className="font-normal text-xl leading-8">Product</div>
            <p className="font-normal text-xl leading-8 flex items-center w-full mx-auto justify-between">
              <div className="basis-1/2 flex justify-end">
                <span className="w-full max-w-[260px] text-center ">
                  Quantity
                </span>
              </div>
              <div className="basis-1/2 flex justify-end">
                <span className="w-full max-w-[200px] text-center">Total</span>
              </div>
            </p>
          </div>

          {products.map((product: any, index) => (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-grey-800 dark:border-grey-200 py-6"
            >
              <div className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                <div className="img-box">
                  <img
                    src={`/storage/${product.image}`}
                    alt={product.name}
                    className="xl:w-[140px] rounded-xl"
                  />
                </div>
                <div className="pro-data w-full max-w-sm">
                  <h5 className="font-semibold text-xl leading-8 max-[550px]:text-center">
                    {product.name}
                  </h5>
                  <p className="font-normal text-lg leading-8 my-2 min-[550px]:my-3 max-[550px]:text-center">
                    <span className="capitalize">{product.category?.name}</span>{" "}
                    <span className="text-indigo-600"> / </span>{" "}
                    <span className="capitalize">
                      {product.product_type?.name}
                    </span>
                  </p>
                  <h6 className="font-medium text-lg leading-8 text-indigo-600 max-[550px]:text-center">
                    &pound; {product.price}
                  </h6>
                </div>
              </div>
              <div className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
                <div className="flex items-center w-full mx-auto justify-center">
                  <button
                    onClick={handleReduce(product)}
                    type="button"
                    className="group rounded-l-full px-6 py-[18px] border border-indigo-600 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500"
                  >
                    <svg
                      className="stroke-grey-800 dark:stroke-grey-200"
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                    >
                      <path
                        d="M16.5 11H5.5"
                        stroke=""
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  <input
                    type="text"
                    className="border-y border-indigo-600 outline-none focus:outline-none focus:ring-0 focus:border-indigo-600 font-semibold text-lg w-full max-w-[118px] min-w-[80px] py-[15px] text-center bg-transparent"
                    value={product.pivot.quantity}
                    readOnly
                  />
                  <button
                    onClick={handleIncrease(product)}
                    className="group rounded-r-full px-6 py-[18px] border border-indigo-600 flex items-center justify-center hover:shadow-lg"
                  >
                    <svg
                      className="stroke-grey-800 dark:stroke-grey-200"
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                    >
                      <path
                        d="M11 5.5V16.5M16.5 11H5.5"
                        stroke=""
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
                <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
                  &pound; {product.price * product.pivot.quantity}
                </h6>
              </div>
            </div>
          ))}
          <div className="rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
            <div className="flex items-center justify-between w-full mb-6">
              <p className="font-normal text-xl leading-8">Sub Total</p>
              <h6 className="font-semibold text-xl leading-8">
                &pound; {total}
              </h6>
            </div>
            <div className="flex items-center justify-between w-full pb-6 border-b border-grey-800 dark:border-grey-200">
              <p className="font-normal text-xl leading-8">Delivery Charge</p>
              <h6 className="font-semibold text-xl leading-8">
                &pound; {deliveryCharge}
              </h6>
            </div>
            <div className="flex items-center justify-between w-full py-6">
              <p className="font-manrope font-medium text-2xl leading-9 text-grey-900">
                Total
              </p>
              <h6 className="font-manrope font-medium text-2xl leading-9 text-indigo-500">
                &pound; {total + deliveryCharge}
              </h6>
            </div>
          </div>
          <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
            <Link
              href={route("shop")}
              className="rounded-full py-4 w-full max-w-[280px]  flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100"
            >
              <span className="px-2 font-semibold text-lg leading-8 text-indigo-600">
                Contine Shopping
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <path
                  d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998"
                  stroke="#4F46E5"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              href={route("cart.checkout")}
              className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700"
            >
              Continue to Payment
              <svg
                className="ml-2"
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
              >
                <path
                  d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </Authenticated>
  );
}
