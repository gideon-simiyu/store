import { useRef, FormEventHandler } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { LockOpenIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon } from "@heroicons/react/24/outline";

export default function UpdatePasswordForm({
  className = "",
}: {
  className?: string;
}) {
  const passwordInput = useRef<HTMLInputElement>(null);
  const currentPasswordInput = useRef<HTMLInputElement>(null);

  const { data, setData, errors, put, reset, processing, recentlySuccessful } =
    useForm({
      current_password: "",
      password: "",
      password_confirmation: "",
    });

  const updatePassword: FormEventHandler = (e) => {
    e.preventDefault();

    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors) => {
        if (errors.password) {
          reset("password", "password_confirmation");
          passwordInput.current?.focus();
        }

        if (errors.current_password) {
          reset("current_password");
          currentPasswordInput.current?.focus();
        }
      },
    });
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Update Password
        </h2>

        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Ensure your account is using a long, random password to stay secure.
        </p>
      </header>

      <form onSubmit={updatePassword} className="mt-6 space-y-6">
        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Current Password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="Enter your current password"
              value={data.current_password}
              onChange={(e) => setData("current_password", e.target.value)}
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              required
            />

            <span className="absolute right-4 top-4">
              <LockOpenIcon className="w-6 h-6" />
            </span>
          </div>
          <p className="mt-2 text-red-500">{errors.current_password}</p>
        </div>

        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            New Password
          </label>

          <div className="relative">
            <input
              id="password"
              ref={passwordInput}
              value={data.password}
              placeholder="Enter your new password"
              onChange={(e) => setData("password", e.target.value)}
              type="password"
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              required
            />

            <span className="absolute right-4 top-4">
              <LockClosedIcon className="w-6 h-6" />
            </span>
          </div>

          <p className="mt-2 text-red-500">{errors.password}</p>
        </div>

        <div className="relative">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Confirm Password
          </label>

          <div className="relative">
            <input
              id="password_confirmation"
              value={data.password_confirmation}
              onChange={(e) => setData("password_confirmation", e.target.value)}
              type="password"
              placeholder="Re-enter your new password"
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              required
            />

            <span className="absolute right-4 top-4">
              <LockClosedIcon className="w-6 h-6" />
            </span>
          </div>

          <p className="mt-2 text-red-500">{errors.password_confirmation}</p>
        </div>

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={processing}>Save</PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
