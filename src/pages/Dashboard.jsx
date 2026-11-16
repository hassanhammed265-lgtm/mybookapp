import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { storeContext } from "../context/storeContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import Spinner from "../layouts/Spinner";
import {
  FiArrowUpRight,
  FiBookOpen,
  FiBookmark,
  FiEdit2,
  FiEye,
  FiLayers,
  FiPlus,
  FiTag,
  FiTrash2,
} from "react-icons/fi";

function Dashboard() {
  const { token, apiUrl, books, isLoading, setIsLoading, getAllBooks } =
    useContext(storeContext);
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [bookId, setBookId] = useState("");

  useEffect(() => {
    // get all books on dashboard loading
    getAllBooks();
  }, []);


   function clearForm() {
     setTitle("");
     setPrice("");
     setDescription("");
     setAuthor("");
     setCategoryId("");
     setBookId("");
     setEditMode(false);
   }


  async function updateHandler(e) {
    e.preventDefault()
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/book/update`, {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          priceRequest: Number(price),
          description: description,
          author: author,
          categoryId: Number(categoryId),
          bookId: Number(bookId)
          
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        getAllBooks();

        clearForm();

        // setBooks(data);
      }

        setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
  

  async function deleteBook(bookId) {
    try {
      const userConfirmed = window.confirm(
        "Are you sure you want to delete this book?"
      )

      if (!userConfirmed) {
        toast.error("Book deletion canceled.");
        return;
      }


      setIsLoading(true); 
        const response = await fetch(`${apiUrl}/book/delete/${bookId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });
      
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);

        getAllBooks();
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
      
    
  


 
  async function createBooks() {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/book/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          priceRequest: Number(price),
          description: description,
          author: author,
          categoryId: Number(categoryId),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        getAllBooks();
        clearForm();

        setIsLoading(false);

        // setBooks(data);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  

  function submitHandler(e) {
    e.preventDefault();
    createBooks();
  }
  if (isLoading) {
    return <Spinner />;
  }
  return (

<div className="relative isolate min-h-screen overflow-hidden bg-slate-100 pt-16 text-slate-800">
  <div className="pointer-events-none absolute -right-32 top-20 -z-10 h-96 w-96 rounded-full bg-violet-300/30 blur-3xl" />
  <div className="pointer-events-none absolute bottom-0 left-1/4 -z-10 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
  <div className="flex min-h-[calc(100vh-4rem)]">

    {/* Sidebar */}
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 flex-col border-r border-white/10 bg-slate-950 p-6 text-white md:flex">
      <div className="mb-12">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-950/40">
            <FiBookOpen aria-hidden="true" size={20} />
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Book<span className="text-violet-400">Space</span>
          </h1>
        </div>
        <p className="mt-3 text-sm text-slate-400">
          Your personal library
        </p>
      </div>

      <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">
        Workspace
      </p>

      <nav className="space-y-2">
        <a href="#dashboard" className="flex items-center gap-3 rounded-xl bg-violet-500/15 px-4 py-3 font-semibold text-violet-200 ring-1 ring-inset ring-violet-400/20">
          <FiLayers aria-hidden="true" size={18} /> Dashboard
        </a>
        <a href="#book-form" className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-white/[0.06] hover:text-white">
          <FiPlus aria-hidden="true" size={18} /> Add a Book
        </a>
        <a href="#book-list" className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-white/[0.06] hover:text-white">
          <FiBookmark aria-hidden="true" size={18} /> My Collection
        </a>
      </nav>

      <div className="mt-auto rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-900/60 p-4">
        <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
          <FiBookOpen aria-hidden="true" size={18} />
        </span>
        <p className="font-semibold">Keep reading</p>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Every book opens a new world.
        </p>
      </div>
    </aside>

    {/* Main content */}
    <main id="dashboard" className="mx-auto w-full min-w-0 max-w-[1600px] flex-1 p-4 sm:p-7 lg:p-10">

      {/* Header */}
      <header className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 px-6 py-8 text-white shadow-xl shadow-indigo-950/10 sm:px-9 sm:py-10">
        <div className="pointer-events-none absolute -right-12 -top-28 h-72 w-72 rounded-full border-[36px] border-white/[0.04]" />
        <div className="pointer-events-none absolute right-24 top-1/2 hidden -translate-y-1/2 rotate-12 text-white/[0.04] sm:block">
          <FiBookOpen size={190} />
        </div>
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-violet-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Your workspace
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Your library, <span className="text-violet-300">your story.</span>
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-slate-300 sm:text-base">
              Keep your favorite reads close and your collection beautifully organized.
            </p>
          </div>

          <a href="#book-form"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-950">
            <FiPlus aria-hidden="true" size={18} /> Add New Book
            <FiArrowUpRight aria-hidden="true" size={16} className="ml-1 text-slate-500" />
          </a>
        </div>
      </header>

      {/* Statistics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-9">

        <div className="group rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Total Books</p>
            <span className="rounded-xl bg-violet-50 p-3 text-violet-600 transition group-hover:bg-violet-100"><FiBookOpen aria-hidden="true" size={20} /></span>
          </div>
          <h3 className="mt-4 text-3xl font-extrabold tracking-tight">
            {books.length}
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            Books in your collection
          </p>
        </div>

        <div className="group rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Categories</p>
            <span className="rounded-xl bg-blue-50 p-3 text-blue-600 transition group-hover:bg-blue-100"><FiTag aria-hidden="true" size={20} /></span>
          </div>
          <h3 className="mt-4 text-3xl font-extrabold tracking-tight">
            {[...new Set(books.map(book => book.categoryId))].filter(Boolean).length}
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            Categories represented
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 p-6 text-white shadow-lg shadow-violet-900/10 sm:col-span-2 xl:col-span-1">
          <FiBookOpen aria-hidden="true" className="absolute -bottom-5 -right-3 rotate-12 text-white/10" size={112} />
          <p className="relative text-sm text-violet-100">A little inspiration</p>
          <h3 className="relative mt-4 text-2xl font-bold">
            Read. Learn. Grow.
          </h3>
          <p className="relative mt-2 max-w-xs text-sm leading-6 text-violet-100">
            Keep your favourite books organized in one place.
          </p>
        </div>
      </section>

      {/* Book form */}
      <section id="book-form" className="mb-9 scroll-mt-24 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm sm:p-8">
        <div className="mb-7 flex items-start gap-4">
          <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 sm:flex">
            {editMode ? <FiEdit2 aria-hidden="true" size={20} /> : <FiPlus aria-hidden="true" size={20} />}
          </span>
          <div>
            <h3 className="text-xl font-bold tracking-tight">
              {editMode ? "Update Book" : "Add a New Book"}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {editMode
                ? "Edit the details of your selected book."
                : "Fill in the details to add a book to your collection."}
            </p>
          </div>
        </div>

        <form
          onSubmit={editMode ? updateHandler : submitHandler}
          className="space-y-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold mb-2">
                Book Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter book title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />
            </div>

            <div>
              <label htmlFor="author" className="block text-sm font-semibold mb-2">
                Author
              </label>
              <input
                id="author"
                type="text"
                placeholder="Enter author's name"
                value={author}
                onChange={e => setAuthor(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-semibold mb-2">
                Price
              </label>
              <input
                id="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter price"
                value={price}
                onChange={e => setPrice(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-semibold mb-2">
                Category
              </label>
              <select
                id="category"
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
              >
                <option value="">Choose a category</option>
                <option value="3">Fantasy</option>
                <option value="4">Politics</option>
                <option value="5">Marketing</option>
                <option value="1">My Love</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold mb-2">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              placeholder="Write a short description of the book..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              className={`rounded-xl px-6 py-3 font-semibold transition ${
                editMode
                  ? "bg-amber-400 text-slate-900 hover:bg-amber-500"
                  : "bg-violet-600 text-white shadow-lg shadow-violet-200 hover:bg-violet-700"
              }`}
            >
              {editMode ? "Save Changes" : "＋ Add Book"}
            </button>

            {editMode && (
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setBookId(null);
                  setTitle("");
                  setAuthor("");
                  setPrice("");
                  setDescription("");
                  setCategoryId("");
                }}
                className="rounded-xl border border-slate-200 px-6 py-3 font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Book list */}
      <section id="book-list" className="scroll-mt-24 overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm">
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <FiBookmark aria-hidden="true" size={19} />
              </span>
              <h3 className="text-xl font-bold tracking-tight">Your Collection</h3>
            </div>
            <p className="mt-2 text-sm text-slate-500 sm:ml-[52px]">
              All the books you have added.
            </p>
          </div>
          <span className="self-start rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-sm font-semibold text-violet-700">
            {books.length} books
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left">
            <thead className="border-y border-slate-100 bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-4 font-semibold">Book</th>
                <th className="px-5 py-4 font-semibold">Author</th>
                <th className="px-5 py-4 font-semibold">Price</th>
                <th className="px-5 py-4 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {books.map(book => (
                <tr key={book.id} className="transition-colors hover:bg-violet-50/40">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3 min-w-40">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-blue-100 text-violet-700">
                        <FiBookOpen aria-hidden="true" size={20} />
                      </div>
                      <span className="font-semibold text-slate-800">
                        {book.title}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-slate-500">
                    {book.author}
                  </td>

                  <td className="px-5 py-4 font-semibold whitespace-nowrap">
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-sm text-slate-700">
                      {book.priceRequest}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        to={`/book/${book.id}`}
                        aria-label={`View ${book.title}`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                      >
                        <FiEye aria-hidden="true" size={15} /> View
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          setEditMode(true);
                          setAuthor(book.author);
                          setCategoryId(String(book.categoryId ?? ""));
                          setDescription(book.description);
                          setPrice(String(book.priceRequest));
                          setTitle(book.title);
                          setBookId(book.id);
                          document.getElementById("book-form")?.scrollIntoView({
                            behavior: "smooth"
                          });
                        }}
                        aria-label={`Edit ${book.title}`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                      >
                        <FiEdit2 aria-hidden="true" size={14} /> Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteBook(book.id)}
                        aria-label={`Delete ${book.title}`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                      >
                        <FiTrash2 aria-hidden="true" size={14} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {books.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-16 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 text-violet-500">
                      <FiBookOpen aria-hidden="true" size={29} />
                    </div>
                    <p className="font-semibold text-slate-700">
                      Your collection is empty
                    </p>
                    <p className="text-sm text-slate-500 mt-2">
                      Add your first book using the form above.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="py-8 text-center text-xs font-medium tracking-wide text-slate-400">
        BookSpace · Your library, beautifully organized.
      </footer>
    </main>
  </div>
</div>

  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  );
}

export default Dashboard;
