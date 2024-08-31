import ProductDisplay from "@/Components/ProductDisplay";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Guest from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

export default function Home({ auth, products }) {
  if (auth.user) {
    return (
      <AuthenticatedLayout
        user={auth.user}
        header={
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Home
          </h2>
        }
      >
        <Head title="Home" />
        <div className="flex flex-wrap justify-center">
          {products.map((product) => {
            return (
              <div className="lg:basis-1/5 md:basis-1/3 sm:basis-1/2 basis-full p-6">
                <ProductDisplay product={product} />
              </div>
            );
          })}
        </div>
      </AuthenticatedLayout>
    );
  }

  return (
    <Guest
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Home
        </h2>
      }
      auth={false}
    >
      <Head title="Home" />
        <div className="flex flex-wrap justify-center">
          {products.map((product) => {
            return (
              <div className="lg:basis-1/5 md:basis-1/3 sm:basis-1/2 basis-full px-10 md:p-6 lg:p-4 py-5">
                <ProductDisplay product={product} />
              </div>
            );
          })}
        </div>
    </Guest>
  );
}
