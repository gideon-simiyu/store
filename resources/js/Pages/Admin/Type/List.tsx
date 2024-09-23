import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import AdminLayout, { formatDate } from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";

function List({ auth, product_types = [] }: any) {
  const [showModal, setShowModal] = useState(false);
  const { data, setData, post, reset, errors } = useForm({
    name: "",
    description: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("product_types.create"), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setShowModal(false);
      },
    });
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductType, setDeleteProductType] = useState<any>(null);

  const toggleDeleteModal = (productType: any) => {
    setDeleteProductType(productType);
    setShowDeleteModal(true);
  };

  const deleteproductType = (id: string) => (e: any) => {
    e.preventDefault();
    post(route("product_types.delete", id), {
      preserveScroll: true,
    });
  };

  return (
    <AdminLayout user={auth.user}>
      <div className="rounded-sm bg-white py-6 px-3 md:px-7.5 shadow-default dark:bg-boxdark">
        <div className="flex justify-between items-center">
          <h1 className="text-title-md font-bold text-black dark:text-white">
            Product Types
          </h1>
          <PrimaryButton onClick={() => setShowModal(true)}>
            Create product Type
          </PrimaryButton>
        </div>
        <div className="max-w-full overflow-x-auto mt-4">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Name
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Description
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
              {product_types.map((productType: any, index: any) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0
                      ? "bg-grey-100 dark:bg-grey-900"
                      : "bg-grey-200 dark:bg-grey-800"
                  }`}
                >
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <h5 className="font-medium text-black dark:text-white">
                      {productType.name}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {productType.description}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {formatDate(productType.created_at)}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {formatDate(productType.updated_at)}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white flex gap-5">
                      <Link
                        href={`/admin/product-types/${productType.id}/edit`}
                        className="text-blue-600 dark:text-blue-400"
                      >
                        View
                      </Link>
                      <span
                        className="text-red-600 dark:text-red-400 cursor-pointer"
                        onClick={() => toggleDeleteModal(productType)}
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
            <label htmlFor="name" className="form-label">
              ProductType Name
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
              ProductType Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
              className="form-input"
            />
            <p className="mt-2 text-red-500">{errors.description}</p>
          </div>
          <div className="flex justify-end">
            <PrimaryButton type="submit">Create Product Type</PrimaryButton>
          </div>
        </form>
      </Modal>

      <Modal onClose={() => setShowDeleteModal(false)} show={showDeleteModal}>
        <div className="p-3">
          <p className="text-white">
            Are you sure you want to delete product type "{deleteProductType?.name}"
          </p>
        </div>
      </Modal>
    </AdminLayout>
  );
}

export default List;
