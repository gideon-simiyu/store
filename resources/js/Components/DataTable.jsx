import React, { useState } from "react";

export default function DataTable({
  data,
  columns,
  headers,
  actions = [],
  className = "",
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter the data based on the search term
  const filteredData = data.filter((item) =>
    columns.some((column) => {
      const columnValue = column.toString().includes(".")
        ? column.split(".").reduce((obj, i) => obj[i], item)
        : item[column.toLowerCase()];
      return columnValue
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    }),
  );

  // Calculate total pages based on filtered data
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Slice the filtered data to display only the current page rows
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to the first page when rows per page change
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when search term changes
  };

  const renderTable = () => (
    <div className="overflow-x-auto">
      <table className={`w-full ${className}`}>
        <thead className="border-b p-2 bg-indigo-500 text-white rounded-t-xl">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="text-left p-4 capitalize">
                {header}
              </th>
            ))}
            {actions.length > 0 && (
              <th className="text-left p-4">Quick Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr
              key={item.id}
              className="border-t border-gray-200 hover:bg-indigo-300 dark:border-slate-700 dark:hover:bg-indigo-700"
            >
              {columns.map((column, index) => (
                <td key={index} className="p-4 text-nowrap">
                  {column.toString().includes(".")
                    ? column.split(".").reduce((obj, i) => obj[i], item)
                    : item[column.toLowerCase()]}
                </td>
              ))}
              {actions.length > 0 && <td className="p-4">{/* actions */}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      {/* Search Input */}
      <div className="mb-4 flex justify-start">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="px-4 py-2 border rounded w-full text-black dark:text-white bg-white dark:bg-gray-800 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-600"
        />
      </div>

      {renderTable()}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>

        {/* Rows Per Page Dropdown */}
        <div className="flex items-center ml-4">
          <label
            htmlFor="rowsPerPage"
            className="mr-2 text-gray-700 dark:text-white"
          >
            Rows per page:
          </label>
          <select
            id="rowsPerPage"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="px-2 py-1 border rounded w-full text-black dark:text-white bg-white dark:bg-gray-800"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
    </div>
  );
}
