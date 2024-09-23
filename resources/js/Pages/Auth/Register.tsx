import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { FormEventHandler } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon } from "@heroicons/react/24/outline";

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("register"), {
      onFinish: () => reset("password", "password_confirmation"),
    });
  };

  return (
    <GuestLayout>
      <Head title="Create Account" />
      <form className="p-5 mx-auto" onSubmit={submit}>
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
              Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                required
              />
  
              <span className="absolute right-4 top-4">
                <UserIcon className="w-6 h-6" />
              </span>
            </div>
            <p className="mt-2 text-red-500">{errors.name}</p>
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
                type="password"
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

        
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Re-Enter your password"
                  value={data.password_confirmation}
                  onChange={(e) => setData("password_confirmation", e.target.value)}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  required
                />
    
                <span className="absolute right-4 top-4">
                <LockClosedIcon className="w-6 h-6" />
                </span>
              </div>
              <p className="mt-2 text-red-500">{errors.password_confirmation}</p>
            </div>
        <button className="w-full mt-6 h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-indigo-800 transition-all duration-700 bg-indigo-600 shadow-sm mb-11">
          Register
        </button>
        <Link
          href={route("login")}
          className="flex justify-center text-base font-medium leading-6"
        >
          ALready have an account?
          <span className="text-indigo-500 font-semibold pl-3"> Sign In</span>
        </Link>
      </form>
    </GuestLayout>
  );
}
