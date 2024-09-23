import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import AdminLayout, { formatDate } from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";

function List({
    auth,
    products = [],
    categories = [],
    productTypes = [],
}: any) {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, post, reset, errors } = useForm({
        category_id: "",
        product_type_id: "",
        name: "",
        description: "",
        price: "",
        image: null,
        quantity: "0",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("products.create"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setShowModal(false);
            },
        });
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState<any>(null);

    const toggleDeleteModal = (Product: any) => {
        setDeleteProduct(Product);
        setShowDeleteModal(true);
    };

    // const deleteProduct = (id: string) => (e: any) => {
    //     e.preventDefault();
    //     post(route("products.delete", id), {
    //         preserveScroll: true,
    //     });
    // };

    console.log(products[0]);

    return (
        <AdminLayout user={auth.user}>
            <div className="rounded-sm bg-white py-6 px-3 md:px-7.5 shadow-default dark:bg-boxdark">
                <div className="flex justify-between items-center">
                    <h1 className="text-title-md font-bold text-black dark:text-white">
                        Products
                    </h1>
                    <PrimaryButton onClick={() => setShowModal(true)}>
                        Create Product
                    </PrimaryButton>
                </div>
                <div className="max-w-full overflow-x-auto mt-4">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Product
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Description
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Category
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Product Type
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Created On
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">
                                    Updated On
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((Product: any, index: any) => (
                                <tr
                                    key={index}
                                    className={`${
                                        index % 2 === 0
                                            ? "bg-grey-100 dark:bg-grey-900"
                                            : "bg-grey-200 dark:bg-grey-800"
                                    }`}
                                >
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex gap-2">
                                            <img
                                                src={
                                                    "/storage/" + Product.image
                                                }
                                                alt=""
                                                className="h-12 w-12"
                                            />
                                            <div className="flex flex-col">
                                                <h5 className="font-medium text-black dark:text-white">
                                                    {Product.name}
                                                </h5>
                                                <p>&pound; {Product.price}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {Product.description}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {Product.category.name}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {Product.product_type.name}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {formatDate(Product.created_at)}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {formatDate(Product.updated_at)}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white flex gap-5">
                                            <Link
                                                href={route("products.view",[Product.id])}
                                                className="text-blue-600 dark:text-blue-400"
                                            >
                                                View
                                            </Link>
                                            <span
                                                className="text-red-600 dark:text-red-400 cursor-pointer"
                                                onClick={() =>
                                                    toggleDeleteModal(Product)
                                                }
                                            >
                                                Delete
                                            </span>
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal onClose={() => setShowModal(false)} show={showModal}>
                <form onSubmit={submit} className="p-3">
                    <div className="mb-4">
                        <label htmlFor="category" className="form-label">
                            Category
                        </label>
                        <select
                            name="category"
                            id="category"
                            className="form-input"
                            value={data.category_id}
                            onChange={(e) =>
                                setData("category_id", e.target.value)
                            }
                        >
                            <option value="">Select Category</option>
                            {categories.map((category: any) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <p className="mt-2 text-red-500">
                            {errors.category_id}
                        </p>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="product_type" className="form-label">
                            Product Type
                        </label>
                        <select
                            name="product_type"
                            id="product_type"
                            className="form-input"
                            value={data.product_type_id}
                            onChange={(e) =>
                                setData("product_type_id", e.target.value)
                            }
                        >
                            <option value="">Select Product Type</option>
                            {productTypes.map((productType: any) => (
                                <option
                                    key={productType.id}
                                    value={productType.id}
                                >
                                    {productType.name}
                                </option>
                            ))}
                        </select>
                        <p className="mt-2 text-red-500">
                            {errors.product_type_id}
                        </p>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="name" className="form-label">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="form-input"
                        />
                        <p className="mt-2 text-red-500">{errors.name}</p>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="name" className="form-label">
                            Product Description
                        </label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="form-input"
                        />
                        <p className="mt-2 text-red-500">
                            {errors.description}
                        </p>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="name" className="form-label">
                            Product Price
                        </label>
                        <input
                            type="text"
                            name="price"
                            id="price"
                            value={data.price}
                            onChange={(e) => setData("price", e.target.value)}
                            className="form-input"
                        />
                        <p className="mt-2 text-red-500">{errors.price}</p>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="image" className="form-label">
                            Product Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            className="form-input"
                            onChange={(e) =>
                                setData("image", e.target.files[0])
                            }
                        />
                        <p className="mt-2 text-red-500">{errors.image}</p>
                    </div>

                    <div className="flex justify-end">
                        <PrimaryButton type="submit">
                            Create Product
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            <Modal
                onClose={() => setShowDeleteModal(false)}
                show={showDeleteModal}
            >
                <div className="p-3">
                    <p className="text-white">
                        Are you sure you want to delete Product "
                        {deleteProduct?.name}"
                    </p>
                    resources/js/Pages/Admin/Type/List.tsx
                </div>
            </Modal>
        </AdminLayout>
    );
}

export default List;
