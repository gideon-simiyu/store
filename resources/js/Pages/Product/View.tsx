import InputLabel from "@/Components/InputLabel";
import Messaging from "@/Components/Messaging";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/outline";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler, Fragment, useEffect, useState } from "react";

export default function View({ auth, product, sizes = [], reviews = [] }: any) {
  const rating = parseInt(product.rating.toString());
  const unrated = 5 - rating;
  const [message, setMessage] = useState({
    type: "",
    message: "",
    show: false,
  });

  const { data, setData, post, processing, errors, reset, patch } = useForm({
    product_id: product.id,
    size: "",
    quantity: 1,
    name: product.name,
    description: product.description,
    price: product.price,
    discount: product.discount,
    category_id: product.category_id,
    product_type_id: product.product_type_id,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    if (auth?.user?.is_staff) {
      patch(route("products.update", product.id), {
        onFinish: () => {
          setMessage({
            type: "success",
            message: "Product updated successfully",
            show: true,
          });
        },
        onError: () => {
          setMessage({
            type: "error",
            message: "An error occurred. Please try again",
            show: true,
          });
        },
      });
      return;
    }

    post(route("cart.add"), {
      onFinish: () => reset("quantity"),
      onSuccess: () => {
        setMessage({
          type: "success",
          message: "Product added to cart",
          show: true,
        });
      },
      onError: () => {
        setMessage({
          type: "error",
          message: "An error occurred. Please try again",
          show: true,
        });
      },
    });
  };

  const onClose = () => {
    setMessage({...message, show: false});
  }

  return (
    <Authenticated user={auth.user}>
      <Messaging
        mtype={message.type}
        message={message.message}
        show={message.show}
        onClose={onClose}
      />
      <div className="mx-auto mt-16">
        <section className="relative max-w-6xl mx-auto">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2 ">
              <div className="img">
                <div className="h-full max-lg:mx-auto rounded-xl bg-gray-300 dark:bg-gray-800 p-2">
                  <img
                    src={`/storage/${product.image}`}
                    alt={product.name}
                    className="max-lg:mx-auto lg:ml-auto h-full rounded-lg"
                  />
                </div>
              </div>
              <div className="data w-full lg:pr-8 pr-0 xl:justify-start justify-center flex items-start max-lg:pb-10 xl:my-2 lg:my-5 my-0">
                <div className="data w-full max-w-xl">
                  <p className="text-lg font-medium leading-8 text-indigo-600 mb-4">
                    <span className="capitalize">{product.category.name}</span>
                    &nbsp; /&nbsp;{" "}
                    <span className="capitalize">
                      {product.product_type.name}
                    </span>
                  </p>
                  <h2 className="font-manrope font-bold text-3xl leading-10 mb-2 capitalize">
                    {product.name}
                  </h2>
                  <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                    <h6 className="font-manrope font-semibold text-2xl leading-9 pr-5 sm:border-r border-gray-200 mr-5">
                      &pound;{product.price}
                    </h6>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
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
                              className="h-5 w-5 text-gray-400"
                            />
                          ))}
                        <span className="mr-2 ml-3 rounded bg-indigo-600 text-white px-2.5 py-0.5 text-xs font-semibold">
                          {rating > 0 ? `${rating} stars` : "Unrated"}
                        </span>
                      </div>
                      <span className="pl-2 font-normal leading-7 text-sm ">
                        {reviews.length} reviews
                      </span>
                    </div>
                  </div>
                  <p className="text-base font-normal mb-5">
                    {product.description}
                  </p>

                  {sizes.length > 0 && (
                    <Fragment>
                      <p className=" text-lg leading-8 font-medium mb-4">
                        Size
                      </p>
                      <div className="w-full pb-8 border-b border-gray-100 flex-wrap">
                        <div className="grid grid-cols-3 min-[400px]:grid-cols-5 gap-3 max-w-md">
                          {sizes.map((size: any) => (
                            <button className="text-center py-1.5 px-6 w-full font-semibold text-lg leading-8 border border-indigo-600 flex items-center rounded-full justify-center transition-all duration-300 hover:bg-indigo-600 hover:text-white">
                              {size.size}
                            </button>
                          ))}
                        </div>
                      </div>
                    </Fragment>
                  )}
                  {auth?.user?.is_staff ? (
                    <form onSubmit={submit} className="flex flex-col">
                      <div className="my-3">
                        <InputLabel htmlFor="name" value="Product Name" />
                        <TextInput
                          id="name"
                          name="name"
                          value={data.name}
                          onChange={(e) => setData("name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="my-3">
                        <InputLabel
                          htmlFor="description"
                          value="Product Description"
                        />
                        <TextInput
                          id="description"
                          name="description"
                          value={data.description}
                          onChange={(e) =>
                            setData("description", e.target.value)
                          }
                        />
                      </div>
                      <div className="my-3">
                        <InputLabel htmlFor="price" value="Product Price" />
                        <TextInput
                          id="price"
                          name="price"
                          value={data.price}
                          onChange={(e) => setData("price", e.target.value)}
                          required
                        />
                      </div>
                      <div className="my-3">
                        <InputLabel
                          htmlFor="discount"
                          value="Product Discount"
                        />
                        <TextInput
                          id="discount"
                          name="discount"
                          value={data.discount}
                          onChange={(e) => setData("discount", e.target.value)}
                          required
                        />
                      </div>
                      <div className="my-3 flex justify-end">
                        <PrimaryButton className="py-3 px-8">
                          Update Product
                        </PrimaryButton>
                      </div>
                    </form>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-8">
                      <div className="flex sm:items-center sm:justify-center w-full">
                        <button
                          onClick={() => {
                            if (data.quantity > 1) {
                              setData("quantity", data.quantity - 1);
                            }
                          }}
                          className="group py-4 px-6 border border-indigo-600 rounded-l-full bg-transparent transition-all duration-300 hover:bg-indigo-600 hover:text-white"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="font-semibold cursor-pointer text-lg py-[13px] px-6 w-full sm:max-w-[118px] outline-0 border-y border-indigo-600 bg-transparent placeholder: text-center hover:bg-indigo-600 hover:text-white transition-all duration-300"
                          value={data.quantity}
                          readOnly
                        />
                        <button
                          onClick={() => setData("quantity", data.quantity + 1)}
                          className="group py-4 px-6 border border-indigo-600 rounded-r-full transition-all duration-300 hover:bg-indigo-600 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={submit}
                        className="group py-4 px-5 rounded-full text-white bg-indigo-950 font-semibold text-lg w-full flex items-center justify-center gap-2 transition-all duration-500 hover:bg-indigo-600 hover:text-white"
                      >
                        <ShoppingCartIcon className="h-6 w-6" />
                        Add to cart
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Authenticated>
  );
}
