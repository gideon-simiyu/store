import InputLabel from "@/Components/InputLabel";
import Messaging from "@/Components/Messaging";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function View({ auth, category }) {
  const { data, setData, patch, errors } = useForm({
    id: category.id,
    name: "",
    description: "",
  });

  const [messaging, setMessaging] = useState({
    type: "",
    message: "",
    show: false,
  });

  const submit = (e) => {
    e.preventDefault();
    patch(route("categories.update", category.id), {
      onFinish: () => {
        setMessaging({
          type: "success",
          message: "Category updated successfully",
          show: true,
        });
      },
    });
  };

  const remove = (e) => {
    e.preventDefault();
    router.delete(route("categories.destroy"), {
      data: {
        id: category.id,
      },
      onFinish: () => {
        setMessaging({
          type: "success",
          message: "Category deleted successfully",
          show: true,
        });
      },
    });
  };

  useEffect(() => {
    setData({
      id: category.id,
      name: category.name,
      description: category.description,
    });
  }, [category]);

  return (
    <Authenticated user={auth.user}>
      <Messaging
        mtype={messaging.type}
        message={messaging.message}
        show={messaging.show}
        onClose={(e) => setMessaging({ show: false })}
      />
      <div className="bg-primary rounded-md p-6">
        <Head title={`Category | ${category.name.toUpperCase()}`} />
        <div className="flex justify-between py-3">
          <h1 className="text-2xl uppercase text-indigo-600 dark:text-indigo-400">
            {category.name} Category
          </h1>
        </div>
        <form onSubmit={submit}>
          <div className="flex flex-col lg:flex-row lg:space-x-4 items-start">
            <div className="my-4">
              <InputLabel for="name" value="Name" />
              <TextInput
                id="name"
                name="name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                required
              />
            </div>

            <div className="my-4">
              <InputLabel for="description" value="Description" />
              <TextInput
                id="description"
                name="description"
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
              />
            </div>

            <div className="my-4 lg:self-end flex space-x-4">
              <PrimaryButton className="uppercase text-xl px-8 py-3">
                Update
              </PrimaryButton>
              <PrimaryButton
                className="uppercase bg-red-600 hover:bg-red-500 text-xl px-8 py-3"
                type="button"
                onClick={remove}
              >
                Delete
              </PrimaryButton>
            </div>
          </div>
        </form>
      </div>
    </Authenticated>
  );
}
