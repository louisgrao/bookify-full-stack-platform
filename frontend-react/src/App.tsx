import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // State to hold the array of book arrays
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Replace with your actual FastAPI server URL and endpoint
        const response = await fetch("http://127.0.0.1:8000/");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []); // Empty dependency array means this runs once on mount

  if (isLoading) return <div>Loading books...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm text-heading">
          <tr>
            <th scope="col" className="px-6 py-3 font-semibold">
              #
            </th>
            <th scope="col" className="px-6 py-3 font-semibold">
              Title
            </th>
            <th scope="col" className="px-6 py-3 font-semibold">
              Author
            </th>
            <th scope="col" className="px-6 py-3 font-semibold">
              User
            </th>
            <th scope="col" className="px-6 py-3 font-semibold">
              Added
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            // Destructuring the inner array based on your exact data structure
            const [id, title, author, userId, timeStamp] = book;

            return (
              <tr className="bg-neutral-primary">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                >
                  {id}
                </th>
                <td className="px-6 py-4">{title}</td>
                <td className="px-6 py-4">{author}</td>
                <td className="px-6 py-4">{userId}</td>
                <td className="px-6 py-4">{timeStamp}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
