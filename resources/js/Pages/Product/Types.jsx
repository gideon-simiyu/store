import DataTable from "@/Components/DataTable";
import FormSelect from "@/Components/FormSelect";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Types({ auth, productTypes }) {
  console.log(productTypes);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    description: "",
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("product_types.create"), {
      onFinish: () => {
        reset("name", "description");
        closeModal();
      },
    });
  };

  const headers = ["name", "description", "Creates On"];
  const columns = ["name", "description", "created_at"];

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Product Types
        </h2>
      }
    >
      <Head title="Product Types" />
      <div className="bg-primary shadow-lg p-6">
        <div className="flex justify-between py-3">
          <h1 className="text-2xl">Product Types</h1>
          <button
            onClick={openModal}
            className="bg-indigo-500 text-white px-3 py-2"
          >
            Create Type
          </button>
        </div>
        <hr />
        <div className="mt-4">
          <DataTable headers={headers} columns={columns} data={productTypes} actions view />
        </div>
      </div>
      <Modal
        closeable={true}
        show={isModalOpen}
        onClose={closeModal}
        title="Create Product Type"
      >
        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-2xl py-3 font-semibold text-gray-800 dark:text-gray-200 leading-tight">
              Create Product Type
            </h2>
            <hr />
          </div>
          <form onSubmit={submit}>
            <div className="mb-4">
              <InputLabel htmlFor="name" value="Product Type Name" />
              <TextInput
                name="name"
                id="name"
                className="mt-1 block w-full"
                onChange={(e) => setData("name", e.target.value)}
                value={data.name}
              />
            </div>

            <div className="mb-4">
              <InputLabel
                htmlFor="description"
                value="Product Type Description"
              />
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
