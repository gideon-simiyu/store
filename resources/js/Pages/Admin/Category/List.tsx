import AdminLayout, { formatDate } from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";

function List({ auth, categories = [] }: any) {
  return (
    <AdminLayout user={auth.user}>
      <div className="rounded-sm bg-white py-6 px-7.5 shadow-default dark:bg-boxdark">
        <h1 className="text-title-md font-bold text-black dark:text-white">
          Categories
        </h1>
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
                        href={`/admin/categories/${category.id}/edit`}
                        className="text-blue-600 dark:text-blue-400"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/categories/${category.id}/edit`}
                        className="text-red-600 dark:text-red-400"
                      >
                        Delete
                      </Link>
                    </p>
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
