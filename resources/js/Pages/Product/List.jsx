import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import DataTable from "@/Components/DataTable";
import FormSelect from "@/Components/FormSelect";

export default function List({ auth, products, productTypes, categories }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    category_id: categories[0].id,
    product_type_id: productTypes[0].id,
    name: "",
    description: "",
    price: "",
    image: null,
    discount: 0,
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("products.create"), {
      onFinish: () => {
        reset(
          "category_id",
          "product_type_id",
          "name",
          "description",
          "price",
          "image",
          "discount"
        );
        closeModal();
      },
      onError: () => {
        setShowErrorModal(true);
      },
    });
  };

  useEffect(() => {
    if (productTypes.length > 0) {
      setData("product_type_id", productTypes[0].id);
    }
    if (categories.length > 0) {
      setData("category_id", categories[0].id);
    }
  }, [categories, productTypes]);

  const headers = [
    "name",
    "category",
    "product type",
    "description",
    "price",
    "Discount (%)"
  ];
  const columns = [
    "name",
    "category.name",
    "product_type.name",
    "description",
    "price",
    "discount"
  ];

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Products
        </h2>
      }
    >
      <Head title="Products" />
      <div className="bg-primary shadow-lg p-6 h-full">
        <div className="flex justify-between py-3">
          <h1 className="text-2xl">Products</h1>
          <button
            onClick={openModal}
            className="bg-indigo-500 text-white px-3 py-2"
          >
            Create Product
          </button>
        </div>
        <hr />

        <div className="mt-4">
          <DataTable image="image" route="/product" actions view remove headers={headers} columns={columns} data={products} />
        </div>
      </div>

      {/* Error Modal */}
      <Modal
        closeable={true}
        show={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Validation Errors"
      >
        <div className="p-6">
          <h2 className="text-2xl py-3 font-semibold text-gray-800 dark:text-gray-200 leading-tight">
            Validation Errors
          </h2>
          <hr />
          <ul className="mt-4 list-disc pl-5">
            {Object.keys(errors).map((key) => (
              <li key={key} className="text-red-600">
                {errors[key]}
              </li>
            ))}
          </ul>
        </div>
      </Modal>

      {/* Create Product Modal */}
      <Modal
        closeable={true}
        show={isModalOpen}
        onClose={closeModal}
        title="Create Product"
      >
        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-2xl py-3 font-semibold text-gray-800 dark:text-gray-200 leading-tight">
              Create Product
            </h2>
            <hr />
          </div>
          <form>
            <div className="mb-4">
              <InputLabel htmlFor="category_id" value="Product Category" />
              <FormSelect
                name="category_id"
                id="category_id"
                className="mt-1"
                onChange={(e) => setData("category_id", e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </FormSelect>
            </div>
            <div className="mb-4">
              <InputLabel htmlFor="product_type_id" value="Product Type" />
              <FormSelect
                name="product_type_id"
                id="product_type_id"
                className="mt-1"
                onChange={(e) => setData("product_type_id", e.target.value)}
              >
                {productTypes.map((productType) => (
                  <option key={productType.id} value={productType.id}>
                    {productType.name}
                  </option>
                ))}
              </FormSelect>
            </div>
            <div className="mb-4">
              <InputLabel htmlFor="name" value="Product Name" />
              <TextInput
                id="name"
                name="name"
                className="mt-1 block w-full"
                onChange={(e) => setData("name", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <InputLabel htmlFor="description" value="Product Description" />
              <TextInput
                id="description"
                name="description"
                className="mt-1 block w-full"
                onChange={(e) => setData("description", e.target.value)}
              />
            </div>

            <div className="mb-4">
              <InputLabel htmlFor="price" value="Product Price" />
              <TextInput
                type="number"
                id="price"
                name="price"
                className="mt-1 block w-full"
                onChange={(e) => setData("price", e.target.value)}
              />
            </div>

            <div className="mb-4">
              <InputLabel htmlFor="image" value="Product Image" />
              <input
                type="file"
                id="image"
                name="image"
                className="mt-1 block w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                onChange={(e) => setData("image", e.target.files[0])}
              />
            </div>

            <div className="mb-4 flex justify-end">
              <button
                onClick={submit}
                className="bg-indigo-500 text-white px-3 py-2"
                disabled={processing}
              >
                {processing ? "Creating..." : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </AuthenticatedLayout>
  );
}
