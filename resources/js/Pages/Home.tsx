import ProductDisplay from "@/Components/ProductDisplay";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Guest from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function Home({ auth, categories = [], products = [] }: any) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (auth.user) {
    return (
      <AuthenticatedLayout user={auth.user}>
        <div>
          <HomeComponent
            auth={auth}
            categories={categories}
            products={products}
          />
        </div>
      </AuthenticatedLayout>
    );
  }

  return (
    <Guest auth={false}>
      <div className="w-5/6 mx-auto">
        <HomeComponent
          auth={auth}
          categories={categories}
          products={products}
        />
      </div>
    </Guest>
  );

  if (auth.user) {
    return (
      <AuthenticatedLayout user={auth.user}>
        <Head title="Home" />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center"
        >
          {products.map((product: any) => {
            return (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="lg:basis-1/5 md:basis-1/3 sm:basis-1/2 basis-full p-6"
              >
                <ProductDisplay auth={auth} product={product} />
              </motion.div>
            );
          })}
        </motion.div>
      </AuthenticatedLayout>
    );
  }

  return (
    <Guest auth={false}>
      <Head title="Home" />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-center"
      >
        {products.map((product: any) => {
          return (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="lg:basis-1/5 md:basis-1/3 sm:basis-1/2 basis-full px-10 md:p-6 lg:p-4 py-5"
            >
              <ProductDisplay auth={auth} product={product} />
            </motion.div>
          );
        })}
      </motion.div>
    </Guest>
  );
}

const HomeComponent = ({ auth, categories, products }: any) => {
  return (
    <motion.div className="flex">
      <Head title="Home" />
      <div className=" basis-12/12 lg:basis-10/12 xl:basis-9/12 mx-auto">
        <section id="categories" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Shop By Category
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((category: any, index: any) => (
                <div
                  key={index}
                  className="group max-w-sm bg-grey-200 relative overflow-hidden shadow-lg rounded-lg"
                >
                  <img
                    src={`/storage/${category.products[0]?.image}`}
                    alt={category.name}
                    className="w-full h-full object-fill bg-white dark:bg-grey-800 transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bg-slate-900 inset-0 bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <h3 className="text-white text-2xl font-bold uppercase">
                      {category.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section id="featured-products" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 overflow-x-auto">
              {products.map((product: any, index: any) => (
                <div
                  key={index}
                  className="group relative overflow-hidden shadow-lg rounded-lg"
                >
                  <ProductDisplay auth={auth} product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 text-center bg-white dark:bg-grey-800">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Don't Miss Out on Our Latest Arrivals
          </h2>
          <p className="text-lg sm:text-xl mb-8">
            Sign up for exclusive discounts and be the first to know about new
            products.
          </p>
          <Link
            href={route("shop")}
            className="border border-indigo-600 uppercase py-5 px-8 text-xl transition duration-300 hover:bg-indigo-600 hover:text-white"
          >
            Shop Now &rarr;
          </Link>
        </section>
      </div>
    </motion.div>
  );
};
