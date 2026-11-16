import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { storeContext } from "../context/storeContext";
import { FiArrowUpRight, FiBookOpen, FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuth } = useContext(storeContext);
  const closeMenu = () => setIsOpen(false);
  const linkClassName = ({ isActive }) =>
    `block rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
      isActive
        ? "bg-violet-400/10 text-violet-200 shadow-inner shadow-violet-300/5"
        : "text-slate-300 hover:bg-white/[0.07] hover:text-white"
    }`;

  return (
    <nav className="fixed left-0 top-0 z-20 w-full border-b border-white/[0.08] bg-slate-950/85 px-4 shadow-lg shadow-slate-950/10 backdrop-blur-xl sm:px-6">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/70 to-transparent" />
      <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between py-3">
        <Link
          to="/"
          onClick={closeMenu}
          className="group flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        >
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 text-white shadow-lg shadow-violet-950/40 transition duration-300 group-hover:-rotate-3 group-hover:scale-105">
            <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
            <FiBookOpen aria-hidden="true" className="relative" size={21} />
          </span>
          <span className="text-xl font-bold tracking-tight text-white">
            Book<span className="text-violet-300">App</span>
          </span>
        </Link>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:border-violet-300/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 md:hidden"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? (
            <FiX aria-hidden="true" size={22} />
          ) : (
            <FiMenu aria-hidden="true" size={22} />
          )}
        </button>
        <div
          className={`${isOpen ? "block" : "hidden"} w-full pt-4 md:block md:w-auto md:pt-0`}
          id="navbar-default"
        >
          <ul className="flex flex-col gap-2 rounded-2xl border border-white/[0.08] bg-slate-900/70 p-3 md:flex-row md:items-center md:gap-1 md:rounded-none md:border-0 md:bg-transparent md:p-0">
            {isAuth ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    className={linkClassName}
                    onClick={closeMenu}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signout"
                    className={linkClassName}
                    onClick={closeMenu}
                  >
                    Sign out
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/register"
                    className={linkClassName}
                    onClick={closeMenu}
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 ${
                        isActive
                          ? "bg-gradient-to-r from-violet-600 to-blue-500 text-white"
                          : "bg-gradient-to-r from-violet-600 to-blue-500"
                      }`
                    }
                    onClick={closeMenu}
                  >
                    Login
                    <FiArrowUpRight aria-hidden="true" size={16} />
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
