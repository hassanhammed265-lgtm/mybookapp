import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Background effects */}
      <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl"></div>

      {/* Navbar */}
      {/* <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link to="/" className="text-2xl font-extrabold tracking-tight">
          📖 Book<span className="text-violet-400">Reserve</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-violet-300">
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-300 transition hover:text-white"
          >
            About
          </Link>
          <Link
            to="/books"
            className="text-gray-300 transition hover:text-white"
          >
            Books
          </Link>
          <Link
            to="/contact"
            className="text-gray-300 transition hover:text-white"
          >
            Contact
          </Link>
        </div>

        <div className="flex gap-2 sm:gap-3">
          <Link
            to="/login"
            className="rounded-full border border-white/30 px-4 py-2 font-semibold transition hover:bg-white/10 sm:px-6"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-full bg-gradient-to-r from-violet-600 to-blue-500 px-4 py-2 font-semibold shadow-lg shadow-violet-500/20 transition hover:scale-105 sm:px-6"
          >
            Register
          </Link>
        </div>
      </nav> */}

      {/* Hero content */}
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/10 px-4 py-2 text-sm text-violet-200">
            📚 More Books. More Possibilities.
          </span>

          <h1 className="mt-7 text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Book Reservation
            <span className="mt-2 block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Made Simple.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
            Save your time and reserve your favourite books today. Your next
            great read is just a few clicks away.
          </p>

          {/* Features */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <span className="text-2xl">⚡</span>
              <p className="mt-2 font-semibold">Quick & Easy</p>
              <p className="mt-1 text-sm text-slate-400">Simple reservations</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <span className="text-2xl">📚</span>
              <p className="mt-2 font-semibold">Wide Range</p>
              <p className="mt-1 text-sm text-slate-400">
                Explore your library
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <span className="text-2xl">🛡️</span>
              <p className="mt-2 font-semibold">Organized</p>
              <p className="mt-1 text-sm text-slate-400">Manage your books</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/login"
              className="rounded-full bg-gradient-to-r from-violet-600 to-blue-500 px-8 py-4 font-bold shadow-lg shadow-violet-500/25 transition hover:-translate-y-1 hover:shadow-violet-500/40"
            >
              Login <span className="ml-2">→</span>
            </Link>

            <Link
              to="/register"
              className="rounded-full border border-violet-400/60 px-8 py-4 font-bold transition hover:bg-violet-500/10"
            >
              Create Account <span className="ml-2">↗</span>
            </Link>
          </div>

          <p className="mt-8 text-sm text-slate-400">
            ✨ A better way to organize your reading journey.
          </p>
        </div>

        {/* Book illustration */}
        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute inset-10 rounded-full bg-violet-600/20 blur-3xl"></div>

          <div className="relative rounded-3xl border border-white/15 bg-gradient-to-br from-indigo-900/80 to-slate-900/90 p-8 shadow-2xl backdrop-blur-sm sm:p-12">
            <div className="absolute right-6 top-6 rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-2 text-xs font-semibold text-violet-200">
              YOUR NEXT READ
            </div>

            <div className="py-10 text-center">
              <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-3xl border border-violet-300/20 bg-gradient-to-br from-violet-500/30 to-blue-500/20 text-7xl shadow-xl shadow-violet-900/40">
                📚
              </div>

              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
                Discover · Reserve · Read
              </p>

              <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">
                Every Book
                <span className="block text-violet-300">
                  Opens a New World.
                </span>
              </h2>

              <p className="mx-auto mt-4 max-w-sm leading-7 text-slate-400">
                Find your next favourite story and keep your book collection
                organized.
              </p>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
              <div>
                <p className="font-semibold">Your reading journey</p>
                <p className="mt-1 text-sm text-slate-400">
                  Starts right here.
                </p>
              </div>
              <span className="text-3xl">✨</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 px-6 py-6 text-center text-sm text-slate-400">
        BookReserve · Discover your next great read.
      </footer>
    </section>
  );
}
export default Hero;
