function List() {
  return (
    <div className="rounded-sm bg-white py-6 px-3 md:px-7.5 shadow-default dark:bg-boxdark">
      <h1 className="text-title-md font-bold text-black dark:text-white">Customers</h1>
        <div className="max-w-full overflow-x-auto mt-4">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Package
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Invoice date
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
    </div>
  );
}

export default List;
