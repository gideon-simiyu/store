import DangerButton from "@/Components/DangerButton";
import Messaging from "@/Components/Messaging";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import AdminLayout, { formatDate } from "@/Layouts/AdminLayout";
import { Link, router, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";

function List({ auth, categories = [] }: any) {
  const [showModal, setShowModal] = useState(false);
  const { data, setData, post, reset, errors } = useForm({
    name: "",
    description: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("categories.create"), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setShowModal(false);
        setMessaging({
          type: "success",
          message: "Category added successfully.",
          show: true,
        });
      },
    });
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState<any>(null);

  const toggleDeleteModal = (category: any) => {
    setDeleteCategory(category);
    setShowDeleteModal(true);
  };

  const [messaging, setMessaging] = useState({
    type: "",
    message: "",
    show: false,
  });

  const confirmDelete =  (e: any) => {
    e.preventDefault();
    router.delete(route("categories.delete", [deleteCategory.id]), {
      preserveScroll: true,
      onSuccess: () => {
        setShowDeleteModal(false);
        setDeleteCategory(null);
        setMessaging({
          type: "success",
          message: "Category deleted successfully.",
          show: true,
        });
      }
    });
  };

  const onClose = () => {
    setMessaging({...messaging, show: false});
  }

  return (
    <AdminLayout user={auth.user}>
      <Messaging onClose={onClose} mtype={messaging.type} message={messaging.message} show={messaging.show} />
      <div className="rounded-sm bg-white py-6 px-3 md:px-7.5 shadow-default dark:bg-boxdark">
        <div className="flex justify-between items-center">
          <h1 className="text-title-md font-bold text-black dark:text-white">
            Categories
          </h1>
          <PrimaryButton onClick={() => setShowModal(true)}>
            Create category
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
              {categories.map((category: any, index: any) => (
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
                      {category.name}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {category.description}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {formatDate(category.created_at)}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {formatDate(category.updated_at)}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white flex gap-5">
                      <Link
                        href={route("categories.view", [category.id])}
                        className="text-blue-600 dark:text-blue-400"
                      >
                        View
                      </Link>
                      <span
                        className="text-red-600 dark:text-red-400 cursor-pointer"
                        onClick={() => toggleDeleteModal(category)}
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
              Category Name
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
              Category Description
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
            <PrimaryButton>Create Category</PrimaryButton>
          </div>
        </form>
      </Modal>

      <Modal onClose={() => setShowDeleteModal(false)} show={showDeleteModal}>
        <div className="p-5">
          <p className="text-white">
            Are you sure you want to delete category "{deleteCategory?.name}"
          </p>
          <div className="flex justify-end gap-4 mt-3">
            <PrimaryButton onClick={() => setShowDeleteModal(false)}>Cancel</PrimaryButton>
            <DangerButton onClick={confirmDelete}>Delete</DangerButton>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}

export default List;
