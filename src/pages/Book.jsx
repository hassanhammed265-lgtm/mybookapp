import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {storeContext} from "../context/storeContext";
import {toast} from "react-toastify";
import Spinner from "../layouts/Spinner";


function Book() {
    const {token, apiUrl, isLoading, setIsLoading} = useContext(storeContext);
    const [book, setBook] = useState({});

  const params = useParams();
  const bookId = params.bookId;

  async function getBook() {
   try {
       setIsLoading(true);
       const response = await fetch(`${apiUrl}/book/single/${bookId}`, {
           method: "GET",
           headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
           }
       });
       const data = await response.json();
       if (response.ok) {
           toast.success(data.message);
           setBook(data.book);
       }

   } catch (error) {
       console.error("Error fetching book:", error);
       toast.error("Error fetching book");
   } finally {
       setIsLoading(false);
   }
 }
  useEffect(() => {
    getBook();
   }, []);



  if (isLoading) {
    return <Spinner/>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
      <div className="lg:col-start-1">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          {book.title || "Ali Goes To School"}
        </h2>
        <p className="mt-4 text-gray-500">
          {" "}
          {book.description || "This book describe why ali goes to school"}
        </p>

        <div className="mt-6">
          <p className="text-base text-gray-500">Author: {book.author || "Mary Doe"}</p>
          <p className="text-base text-gray-500">Price Requested: ${book.price || 3000}</p>
          <p className="text-base text-gray-500">Category: {book.category === undefined ? "fetching data..." : book.category.name}</p>
        </div>
      </div>
      <div className="mt-12 lg:mt-0 lg:col-start-2 lg:row-start-1">
        <img
          src="https://picsum.photos/500/300"
          alt="Book cover"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
}
export default Book;