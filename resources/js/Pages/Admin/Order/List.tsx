import AdminLayout from "@/Layouts/AdminLayout";

function List({ auth, orders = [] }: any) {
    return (
        <AdminLayout user={auth.user}>
            <div className="rounded-sm bg-white py-6 px-3 md:px-7.5 shadow-default dark:bg-boxdark">
                <h1 className="text-title-md font-bold text-black dark:text-white">
                    Orders
                </h1>
                <div className="max-w-full overflow-x-auto mt-4">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    User
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Products
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Amount
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Shipping Fee
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Total
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Status
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order: any, index: any) => (
                                <tr
                                    key={index}
                                    className={`${
                                        index % 2 === 0
                                            ? "bg-grey-100 dark:bg-grey-900"
                                            : "bg-grey-200 dark:bg-grey-800"
                                    }`}
                                >
                                    <td className="py-4 px-4 font-medium text-black dark:text-white">
                                        {order.user.name}
                                    </td>
                                    <td className="py-4 px-4 font-medium text-black dark:text-white">
                                        {order.products}
                                    </td>
                                    <td className="py-4 px-4 font-medium text-black dark:text-white">
                                        {order.amount}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}

export default List;
