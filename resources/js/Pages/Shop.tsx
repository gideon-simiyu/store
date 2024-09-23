import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Guest from "@/Layouts/GuestLayout";
import ApplicationLogo from "@/Components/ApplicationLogo";
import ProductDisplay from "@/Components/ProductDisplay";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Shop({
  auth,
  products = [],
  categories = [],
  product_types = []
}: any) {
  if (auth.user) {
    return (
      <Authenticated user={auth.user}>
        <Head title="Shop" />
        <ShopComponent {...{ auth, products, categories, product_types }} />
      </Authenticated>
    );
  }

  return (
    <Guest auth={false}>
      <Head title="Shop" />
      <ShopComponent {...{ auth, products, categories, product_types }} />
    </Guest>
  );
}

const ShopComponent = ({ auth, products, categories, product_types }: any) => {
  console.log(products);
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

  const [displayProducts, setDisplayProducts] = useState<any>([]);

  const { data, setData, post, processing, errors, reset } = useForm<any>({
    category: [],
    product_type: [],
  });

  const handleCategory = (e: any) => {
    let category = data.category;
    if (e.target.checked) {
      category.push(e.target.value);
    } else {
      category = category.filter((item: any) => item !== e.target.value);
    }
    setData("category", category);
  };

  const handleProductType = (e: any) => {
    let product_type = data.product_type;
    if (e.target.checked) {
      product_type.push(e.target.value);
    } else {
      product_type = product_type.filter(
        (item: any) => item !== e.target.value,
      );
    }
    setData("product_type", product_type);
  };

  const filter = (e: any) => {
    e.preventDefault();

    post(route("products.filter"), {
      onFinish: (data) => {
        console.log(data);
      },
      data: data,
      preserveState: true,
    });
  };

  const clearFilter = () => {
    setData("category", []);
    setData("product_type", []);
    post(route("products.filter"), {
      onFinish: (data) => {
        console.log(data);
      },
      data: data,
      preserveState: true,
    });
  };

  const sort = (e: any) => {
    e.preventDefault();
    const sortOrder = e.target.value;

    // Make a copy of the products array to avoid mutating the original
    const sortedProducts = [...products];

    if (sortOrder === "high") {
      sortedProducts.sort((a, b) => b.price - a.price);
      setDisplayProducts(sortedProducts);
    } else if (sortOrder === "low") {
      sortedProducts.sort((a, b) => a.price - b.price);
      setDisplayProducts(sortedProducts);
    } else {
      setDisplayProducts(products);
    }
  };

  useEffect(() => {
    setDisplayProducts(products);
  }, [products]);

  return (
    <section className="relative">
      <div className="w-full mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center max-lg:gap-4 justify-between w-full">
          <p className="text-lg hidden md:block font-medium leading-8 text-indigo-600 mb-4">
            <ApplicationLogo />
          </p>
          <div className="relative w-full max-w-sm">
            <svg
              className="absolute top-1/2 -translate-y-1/2 left-4 text-grey-900 dark:text-grey-200"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5555 3.33203H3.44463C2.46273 3.33203 1.66675 4.12802 1.66675 5.10991C1.66675 5.56785 1.84345 6.00813 2.16004 6.33901L6.83697 11.2271C6.97021 11.3664 7.03684 11.436 7.0974 11.5068C7.57207 12.062 7.85127 12.7576 7.89207 13.4869C7.89728 13.5799 7.89728 13.6763 7.89728 13.869V16.251C7.89728 17.6854 9.30176 18.6988 10.663 18.2466C11.5227 17.961 12.1029 17.157 12.1029 16.251V14.2772C12.1029 13.6825 12.1029 13.3852 12.1523 13.1015C12.2323 12.6415 12.4081 12.2035 12.6683 11.8158C12.8287 11.5767 13.0342 11.3619 13.4454 10.9322L17.8401 6.33901C18.1567 6.00813 18.3334 5.56785 18.3334 5.10991C18.3334 4.12802 17.5374 3.33203 16.5555 3.33203Z"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
              />
            </svg>
            <select
              id="Offer"
              onChange={sort}
              className="h-12 border border-indigo-700 text-grey-900 dark:text-grey-200 pl-11 text-base font-normal leading-7 rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-transparent transition-all duration-500 hover:border-grey-400"
            >
              <option value="relevance" className="dark:bg-grey-800 bg-white" selected>
                Sort by relevance
              </option>
              <option value="high" className="dark:bg-grey-800 bg-white">
                Sort by price(high to low)
              </option>
              <option value="low" className="dark:bg-grey-800 bg-white">
                Sort by price(low to high)
              </option>
            </select>
            <svg
              className="absolute top-1/2 -translate-y-1/2 right-4 z-50"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609"
                stroke="#111827"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <hr className="my-6" />
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-3 w-full max-md:max-w-md max-md:mx-auto md:max-w-sm">
            <div className="dark:bg-grey-800 bg-white p-6 rounded-lg">
              <div className="mb-7">
                <p className="font-medium text-sm leading-6 mb-3">Category</p>
                <div className="box flex gap-4 flex-wrap">
                  {categories.map((category: any, index: any) => (
                    <div key={index} className="flex items-center mb-1">
                      <input
                        id={`category-${category.id}`}
                        type="checkbox"
                        name="category"
                        value={category.id}
                        onClick={handleCategory}
                        className="w-5 h-5 appearance-none border border-grey-300  rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]"
                      />
                      <label
                        htmlFor={`category-${category.id}`}
                        className="text-sm capitalize font-normal leading-4 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-200 transition-all duration-500"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-7">
                <p className="font-medium text-sm leading-6 mb-3">Category</p>
                <div className="box flex flex-wrap gap-4">
                  {product_types.map((product_type: any, index: any) => (
                    <div className="flex items-center mb-1">
                      <input
                        id={`product_type-${product_type.id}`}
                        type="checkbox"
                        name="category"
                        value={product_type.id}
                        onClick={handleProductType}
                        className="w-5 h-5 appearance-none border border-grey-300  rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]"
                      />
                      <label
                        htmlFor={`product_type-${product_type.id}`}
                        className="text-sm capitalize font-normal leading-4 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-200 transition-all duration-500"
                      >
                        {product_type.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={filter}
                className="w-full bg-indigo-600 text-white py-3 rounded-md font-medium text-sm leading-6 hover:bg-indigo-700 transition-all duration-500"
              >
                Apply Filters
              </button>
            </div>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center col-span-12 md:col-span-9"
          >
            {displayProducts.map((product: any, index: any) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="lg:basis-1/4 md:basis-1/2 basis-full  md:p-6 lg:p-4 py-5"
              >
                <ProductDisplay auth={auth} product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
