import Messaging from "@/Components/Messaging";
import PrimaryButton from "@/Components/PrimaryButton";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";

function View({ auth, category = {} }: any) {
    const { data, setData, reset, patch, errors } = useForm({
        name: "",
        description: "",
    });

    const [messaging, setMessaging] = useState({
        type: "",
        message: "",
        show: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route("categories.update", [category.id]), {
            preserveScroll: true,
            onSuccess: () => {
                setMessaging({
                    type: "success",
                    message: "Category updated successfully.",
                    show: true,
                });
            },
        });
    };

    useEffect(() => {
        setData(category);
    }, [category]);

    const onClose = () => {
        setMessaging({ ...messaging, show: false });
    };

    return (
        <AdminLayout user={auth.user}>
            <Messaging
                onClose={onClose}
                message={messaging.message}
                mtype={messaging.type}
                show={messaging.show}
            />
            <div className="rounded-sm bg-white py-6 px-7.5 shadow-default dark:bg-boxdark">
                <h1 className="text-title-md font-bold text-black dark:text-white capitalize">
                    {category.name} Category
                </h1>
                <form onSubmit={submit} className="max-w-xl mt-4">
                    <div className="mb-4">
                        <label htmlFor="name">Category Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="form-input"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />

                        <p className="text-red-500">{errors.name}</p>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description">
                            Category Description
                        </label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            className="form-input"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />

                        <p className="text-red-500">{errors.description}</p>
                    </div>

                    <div className="flex justify-end">
                        <PrimaryButton type="submit">Update</PrimaryButton>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

export default View;
