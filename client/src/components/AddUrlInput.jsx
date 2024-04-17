import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AddUrlInput = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetch data with the originalUrl
    const response = await fetch("https://out.ukachar.com/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ original_url: longUrl }), // Use "original_url" instead of "longUrl"
    });

    // Check if the response status is okay
    if (response.ok) {
      setLongUrl(""); // Clear the longUrl state
      toast.success("Your shorter url has been created, find it below!", {
        duration: 2200,
        position: "top-center",
      });
      setTimeout(() => {
        location.reload();
      }, 2200);
    } else {
      // Handle error
      console.error("Error:", response.status);
    }
  };

  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Tiny
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-link-45deg w-4 h-4 text-white"
            viewBox="0 0 16 16"
          >
            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          name="original_url"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="http://longlink.com/45234fgddf&dfdsd45fdf5t4354"
          required=""
          onChange={(e) => setLongUrl(e.target.value)}
          value={longUrl}
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Short it
        </button>
      </div>

      <div>
        {shortUrl && (
          <p> Your short url is: https://out.ukachar.com/{shortUrl} </p>
        )}
      </div>
      <Toaster />
    </form>
  );
};

export default AddUrlInput;
