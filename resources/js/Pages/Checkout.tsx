import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Checkout({
    auth,
    cart,
    products = [],
    total,
    shippings = [
        {
            id: 1,
            name: "Standard",
            delivery:'2-4 Days',
            fee: 10,
        },
        {
            id: 2,
            name: "Express",
            delivery:'1-2 days',
            fee: 30,
        },
    ],
}: any) {
    const { data, setData, reset, errors, post } = useForm({
        email: auth.user.email,
        name: auth.user.name,
        card_number: "",
        cvc: "",
        expiry: "",
        address: "",
        state: "",
        zip: "",
    });

    const handleSubmit = (event: any) => {};

    const [shipping_fee, setShippingFee] = useState(shippings[0].fee);

    const handleShippingChange = (event: any) => {
        const shipping_id = event.target.value;

        setShippingFee(
            shippings.find((shipping: any) => shipping.id == shipping_id).fee
        );
    };

    useEffect(() => {}, []);

    return (
        <Authenticated user={auth.user}>
            <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 bg-white dark:bg-grey-800">
                <div className="px-4 pt-8">
                    <p className="text-xl font-medium">Order Summary</p>
                    <p className="text-grey-400">
                        Check your items. And select a suitable shipping method.
                    </p>
                    <div className="mt-8 h-70 overflow-y-auto space-y-3 rounded-lg border border-grey-200 dark:border-grey-700 bg-white dark:bg-grey-800 px-2 py-4 sm:px-6">
                        {products.map((product: any, index: any) => {
                            return (
                                <div
                                    key={index}
                                    className="flex"
                                >
                                    <img
                                        className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                                        src={"/storage/" + product.image}
                                        alt=""
                                    />
                                    <div className="flex w-full flex-col px-4 py-4">
                                        <span className="font-semibold">
                                            {product.name}
                                        </span>
                                        <span className="float-right text-grey-400">
                                            &pound; {product.price} X{" "}
                                            {product.pivot.quantity}
                                        </span>
                                        <p className="text-lg font-bold">
                                            &pound;{" "}
                                            {product.price *
                                                product.pivot.quantity}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <p className="mt-8 text-lg font-medium">Shipping Methods</p>
                    <form onSubmit={handleSubmit} className="mt-5 grid gap-6">
                        {shippings.map((shipping: any, index: any) => (
                            <div className="relative" key={index}>
                                <input
                                    className="peer hidden"
                                    id={"shipping_" + shipping.id}
                                    type="radio"
                                    name="shipping"
                                    onChange={handleShippingChange}
                                    value={shipping.id}
                                />
                                <span className="peer-checked:border-indigo-700 dark:peer-checked:border-indigo-500 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-grey-300"></span>
                                <label
                                    className="peer-checked:border-2 peer-checked:border-indigo-700 dark:peer-checked:border-indigo-500 flex cursor-pointer select-none rounded-lg border border-grey-300 p-4"
                                    htmlFor={"shipping_" + shipping.id}
                                >
                                    <div className="ml-5">
                                        <span className="mt-2 font-semibold">
                                            {shipping.name} @ <span>&pound; {shipping.fee}</span>
                                        </span>
                                        <p className="text-slate-500 text-sm leading-6">
                                            Delivery: {shipping.delivery}
                                        </p>
                                    </div>
                                </label>
                            </div>
                        ))}
                    </form>
                </div>
                <form className="mt-10 bg-white dark:bg-grey-800 px-4 pt-8 lg:mt-0">
                    <p className="text-xl font-medium">Payment Details</p>
                    <p className="text-grey-400">
                        Complete your order by providing your payment details.
                    </p>
                    <div className="">
                        <label
                            htmlFor="email"
                            className="mt-4 mb-2 block text-sm font-medium"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="email"
                                name="email"
                                className="form-input px-8"
                                placeholder="your.email@gmail.com"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />
                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-grey-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                    />
                                </svg>
                            </div>
                        </div>
                        <label
                            htmlFor="card-holder"
                            className="mt-4 mb-2 block text-sm font-medium"
                        >
                            Card Holder
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="card-holder"
                                name="card-holder"
                                className="form-input px-8"
                                placeholder="Your full name here"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-grey-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <label
                            htmlFor="card-no"
                            className="mt-4 mb-2 block text-sm font-medium"
                        >
                            Card Details
                        </label>
                        <div className="flex gap-3">
                            <div className="relative w-7/12 flex-shrink-0">
                                <input
                                    type="text"
                                    id="card-no"
                                    name="card-no"
                                    className="form-input px-8"
                                    placeholder="xxxx-xxxx-xxxx-xxxx"
                                    value={data.card_number}
                                    onChange={(e) =>
                                        setData("card_number", e.target.value)
                                    }
                                    required
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <svg
                                        className="h-4 w-4 text-grey-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                                        <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                                    </svg>
                                </div>
                            </div>
                            <input
                                type="text"
                                name="credit-expiry"
                                className="form-input"
                                placeholder="MM/YY"
                                value={data.expiry}
                                onChange={(e) =>
                                    setData("expiry", e.target.value)
                                }
                                required
                            />
                            <input
                                type="text"
                                name="credit-cvc"
                                className="form-input"
                                placeholder="CVC"
                                value={data.cvc}
                                onChange={(e) => setData("cvc", e.target.value)}
                                required
                            />
                        </div>
                        <label
                            htmlFor="billing-address"
                            className="mt-4 mb-2 block text-sm font-medium"
                        >
                            Billing Address
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-shrink-0 sm:w-7/12">
                                <input
                                    type="text"
                                    id="billing-address"
                                    name="billing-address"
                                    className="form-input"
                                    placeholder="Street Address"
                                    value={data.address}
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <select
                                name="billing-state"
                                className="form-input px-8"
                                value={data.state}
                                onChange={(e) =>
                                    setData("state", e.target.value)
                                }
                            >
                                <option value="State">State</option>
                            </select>
                            <input
                                type="text"
                                name="billing-zip"
                                className="form-input px-8"
                                placeholder="ZIP"
                                value={data.zip}
                                onChange={(e) => setData("zip", e.target.value)}
                                required
                            />
                        </div>

                        <div className="mt-6 border-t border-b py-2">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">Subtotal</p>
                                <p className="font-semibold">&pound; {total}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">Shipping</p>
                                <p className="font-semibold">
                                    &pound; {shipping_fee}
                                </p>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                            <p className="text-sm font-medium">Total</p>
                            <p className="text-2xl font-semibold">
                                &pound; {total + shipping_fee}
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end my-4">
                        <PrimaryButton>Place Order</PrimaryButton>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
}
