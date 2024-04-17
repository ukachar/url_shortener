import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import TableLoader from "./TableLoader";

const ShortTable = () => {
  const [longUrl, setLongUrl] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await fetch("https://out.ukachar.com/api/all");
        if (!response.ok) {
          throw new Error("Failed to fetch URLs");
        }
        const data = await response.json();
        setLongUrl(data);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUrls();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {longUrl && (
        <table className="w-8/12 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 m-auto mt-6">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Long link
              </th>
              <th scope="col" className="px-6 py-3">
                Short Link
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {longUrl.map((item) =>
              !item ? (
                <TableLoader />
              ) : (
                <tr
                  key={item.short_url}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.original_url}
                  </th>
                  <td className="px-6 py-4">
                    <a
                      target="_blank"
                      href={"https://out.ukachar.com/" + item.short_url}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      {"https://out.ukachar.com/" + item.short_url}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          "https://out.ukachar.com/" + item.short_url
                        );
                        toast.success("Your url is copied!", {
                          duration: 2200,
                          position: "bottom-right",
                        });
                      }}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Copy
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
      <Toaster />
    </div>
  );
};

export default ShortTable;
