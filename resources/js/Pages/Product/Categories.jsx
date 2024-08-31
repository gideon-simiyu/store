import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import DataTable from "@/Components/DataTable";

export default function Categories({ auth, categories }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    description: "",
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("categories.create"), {
      onFinish: () => {
        reset("name", "description");
        closeModal();
      },
    });
  };

  const headers = ["Name", "Description", "Created On"];
  const columns = ["name", "description", "created_at"];

  const datax100 = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Category ${i + 1}`,
    description: `Category ${i + 1} description`,
    created_at: new Date().toLocaleDateString(),
  }));

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Categories
        </h2>
      }
    >
      <Head title="Category" />
      <div className="bg-primary shadow-lg p-6">
        <div className="flex justify-between py-3">
          <h1 className="text-2xl">Categories</h1>
          <button
            onClick={openModal}
            className="bg-indigo-500 text-white px-3 py-2"
          >
            Create Category
          </button>
        </div>
        <hr />
        <div className="mt-4">
          <DataTable data={datax100} columns={columns} headers={headers} />
        </div>
      </div>

      <Modal
        closeable={true}
        show={isModalOpen}
        onClose={closeModal}
        title="Create Product"
      >
        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-2xl py-3 font-semibold text-gray-800 dark:text-gray-200 leading-tight">
              Create Category
            </h2>
            <hr />
          </div>
          <form onSubmit={submit}>
            <div className="mb-4">
              <InputLabel htmlFor="name" value="Category Name" />
              <TextInput
                name="name"
                id="name"
                className="mt-1 block w-full"
                isFocused={true}
                onChange={(e) => setData("name", e.target.value)}
                value={data.name}
              />
            </div>

            <div className="mb-4">
              <InputLabel htmlFor="description" value="Category Description" />
              <TextInput
                name="description"
                id="description"
                className="mt-1 block w-full"
                onChange={(e) => setData("description", e.target.value)}
                value={data.description}
              />
            </div>

            <div className="mb-4 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </AuthenticatedLayout>
  );
}
