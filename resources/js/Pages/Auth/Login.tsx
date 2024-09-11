import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { LockOpenIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon } from "@heroicons/react/24/outline";

export default function Login({
  status,
  canResetPassword,
}: {
  status?: string;
  canResetPassword: boolean;
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("login"), {
      onFinish: () => reset("password"),
    });
  };
  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && (
        <div className="mb-4 font-medium text-green-600">{status}</div>
      )}
      <form className="mx-auto p-4" onSubmit={submit}>
        <div className="flex justify-center w-full">
          <ApplicationLogo />
        </div>
        <div className="mb-4">
          <h1 className="text-center font-manrope text-3xl font-bold leading-10 mb-2">
            Welcome Back
          </h1>
          <p className="text-indigo-500 text-center text-base font-medium leading-6">
            Log in to your account to continue
          </p>
        </div>
        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              required
            />

            <span className="absolute right-4 top-4">
              <EnvelopeIcon className="w-6 h-6" />
            </span>
          </div>
          <p className="mt-2 text-red-500">{errors.email}</p>
        </div>

        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Password
          </label>
          <div className="relative">
            <input
              type={passwordShown ? "text" : "password"}
              placeholder="Enter your password"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              required
            />

            <span className="absolute right-4 top-4">
            <LockClosedIcon className="w-6 h-6" />
            </span>
          </div>
          <p className="mt-2 text-red-500">{errors.password}</p>
        </div>
        <div className="flex justify-between mt-6">
          <label
            htmlFor="show_password"
            className="flex items-center cursor-pointer"
          >
            <Checkbox
              name="show_password"
              id="show_password"
              checked={data.remember}
              onChange={togglePasswordVisiblity}
            />
            <span className="ms-2">Show password</span>
          </label>

          {canResetPassword && (
            <Link
              href={route("password.request")}
              className="underline text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800"
            >
              Forgot your password?
            </Link>
          )}
        </div>
        <button className="w-full mt-6 h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-indigo-800 transition-all duration-700 bg-indigo-600 shadow-sm mb-11">
          Login
        </button>
        <Link
          href={route("register")}
          className="flex justify-center text-base font-medium leading-6"
        >
          Don’t have an account?
          <span className="text-indigo-500 font-semibold pl-3"> Sign Up</span>
        </Link>
      </form>
    </GuestLayout>
  );
}
