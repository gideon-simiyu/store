import ProductDisplay from "@/Components/ProductDisplay";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Guest from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import bannerImage1 from "@/images/banner-image-3.png";
import bannerImage2 from "@/images/banner-image-2.png";
import bannerImage3 from "@/images/banner-image-1.png";
import { ArrowRightIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import ShopButton from "@/Components/ShopButton";
import { useState, useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

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
            <div className="">
                <HomeComponent
                    auth={auth}
                    categories={categories}
                    products={products}
                />
            </div>
        </Guest>
    );
}

const HomeComponent = ({ auth, categories, products }: any) => {
    const images = [bannerImage1, bannerImage2, bannerImage3];
    const [imageIndex, setImageIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const imageCount = images.length;

    // Handle automatic slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 3000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, [imageIndex]);

    // Next image handler
    const handleNext = () => {
        if (isAnimating) return; // Prevent rapid clicks
        setIsAnimating(true);
        setImageIndex((prevIndex) => (prevIndex + 1) % imageCount);
    };

    // Previous image handler
    const handlePrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setImageIndex((prevIndex) =>
            prevIndex === 0 ? imageCount - 1 : prevIndex - 1
        );
    };

    // Motion variants for sliding effect
    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" },
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            transition: { duration: 0.8, ease: "easeIn" },
        }),
    };

    const titleVariants = {
        hidden: { opacity: 0, y: -100 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 0.8, duration: 0.8, ease: "easeOut" },
        },
    };

    const buttonVariants = {
        hidden: { opacity: 0, y: 100 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 0.8, duration: 0.8, ease: "easeOut" },
        },
    };

    const subtitleVariants = {
        hidden: { opacity: 0, x: -300 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { delay: 0.8, duration: 0.8, ease: "easeOut" },
        },
    };

    const descriptionVariants = {
        hidden: { opacity: 0, x: 300 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { delay: 0.6, duration: 0.8, ease: "easeOut" },
        },
    };

    const evenImageVariants = {
        hidden: { opacity: 0, x: 300, y: 100 },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { delay: 0.6, duration: 0.8, ease: "easeOut" },
        },
    };

    const oddImageVariants = {
        hidden: { opacity: 0, x: 300, y: -100 },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { delay: 0.6, duration: 0.8, ease: "easeOut" },
        },
    };

    return (
        <motion.div initial="hidden" animate="visible">
            <Head title="Home" />

            <div className="relative min-h-203 -m-6 -mx-8 flex flex-col justify-center bg-indigo-200 dark:bg-indigo-950 overflow-hidden">
                <AnimatePresence initial={false} custom={imageIndex}>
                    {/* Image Slide */}
                    {images.map(
                        (image: any, index: number) =>
                            index === imageIndex && (
                                <motion.div
                                    key={index}
                                    custom={index}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    variants={variants}
                                    onAnimationComplete={() =>
                                        setIsAnimating(false)
                                    }
                                    className="absolute w-full h-full p-5 flex gap-10 justify-center items-center"
                                >
                                    {/* Text Section */}
                                    <motion.div
                                        className="flex absolute lg:relative bg-indigo-800 w-screen bg-opacity-60 text-center p-4 lg:text-start lg:w-full lg:bg-inherit flex-col gap-7 h-full justify-center basis-1/3"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        <motion.h1
                                            className="text-7xl font-bold"
                                            variants={titleVariants}
                                            initial="hidden"
                                            animate="visible"
                                        >
                                            Up To <br />
                                            <p className="flex text-nowrap mt-5">
                                                <span className="text-indigo-600 me-2">
                                                    30%
                                                </span>
                                                Discount
                                            </p>
                                        </motion.h1>
                                        <motion.p
                                            className="text-5xl"
                                            variants={subtitleVariants}
                                            initial="hidden"
                                            animate="visible"
                                        >
                                            {new Date().getFullYear()}{" "}
                                            Collection
                                        </motion.p>
                                        <motion.p
                                            className="text-3xl"
                                            variants={descriptionVariants}
                                            initial="hidden"
                                            animate="visible"
                                        >
                                            New Modern Stylish Fashionable
                                            Women, Men, and Kids Wear
                                        </motion.p>
                                        <motion.div
                                            className="flex w-fit mx-auto lg:mx-0"
                                            variants={buttonVariants}
                                            initial="hidden"
                                            animate="visible"
                                        >
                                            <ShopButton />
                                        </motion.div>
                                    </motion.div>

                                    {/* Image Section */}
                                    <div className="w-screen flex lg:block justify-center lg:w-fit">
                                        <motion.img
                                            src={image}
                                            variants={
                                                index % 2 == 0
                                                    ? oddImageVariants
                                                    : evenImageVariants
                                            }
                                            initial="hidden"
                                            animate="visible"
                                            alt=""
                                            className="h-full w-auto object-cover"
                                        />
                                    </div>
                                </motion.div>
                            )
                    )}
                </AnimatePresence>

                {/* Navigation Controls */}
                <div className="absolute bottom-10 right-10 flex gap-4">
                    <button
                        onClick={handlePrev}
                        className="bg-indigo-600 text-white rounded-full p-2"
                    >
                        <ArrowLeftIcon className="h-6 w-6" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="bg-indigo-600 text-white rounded-full p-2"
                    >
                        <ArrowRightIcon className="h-6 w-6" />
                    </button>
                </div>
            </div>

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
                                    className="group mx-auto max-w-sm bg-grey-200 relative overflow-hidden shadow-lg rounded-full h-70 w-70 border-2 dark:border-8 border-indigo-600"
                                >
                                    <img
                                        src={`/storage/${category.products[0]?.image}`}
                                        alt={category.name}
                                        className="w-full h-full object-fill bg-white transition duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute bg-slate-900 inset-0 bg-opacity-75 flex items-center justify-center opacity-100 lg:opacity-0 group-hover:opacity-100 transition duration-300">
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
                <section
                    id="featured-products"
                    className="py-16 bg-indigo-200 dark:bg-indigo-950 -mx-8"
                >
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            Featured Products
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 overflow-x-auto">
                            {products.map((product: any, index: any) => (
                                <div
                                    key={index}
                                    className="group relative overflow-hidden rounded-lg"
                                >
                                    <ProductDisplay
                                        auth={auth}
                                        product={product}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </motion.div>
    );
};
