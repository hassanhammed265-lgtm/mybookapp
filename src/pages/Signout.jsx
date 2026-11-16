import { useContext } from "react";
import { storeContext } from "../context/storeContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiBookOpen,
  FiLogOut,
} from "react-icons/fi";

function Signout() {
  const { setIsAuth } = useContext(storeContext);
  const navigate = useNavigate();

  function signOutHandler() {
    localStorage.removeItem("token");
    toast.success("Signed out successfully");
    setIsAuth(false);
    navigate("/login");
  }

  return (
    <main className="relative isolate flex min-h-[calc(100svh-20rem)] items-center overflow-hidden bg-[#eff4ef] px-5 pb-16 pt-28 text-[#18271f] sm:px-8 lg:min-h-[calc(100svh-19rem)] lg:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full border-[1px] border-[#cad9cc] sm:h-[28rem] sm:w-[28rem]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-36 h-56 w-56 rounded-full border-[1px] border-[#cad9cc] sm:h-80 sm:w-80"
      />

      <div className="relative mx-auto grid w-full max-w-6xl overflow-hidden border border-[#d9e2d9] bg-[#f8faf6] shadow-[0_24px_80px_rgba(27,50,37,0.12)] md:grid-cols-[0.95fr_1.05fr]">
        <div
          className="relative flex min-h-64 items-end bg-cover bg-center p-7 text-white sm:min-h-80 sm:p-10 md:min-h-[34rem]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(17, 29, 22, 0.06) 15%, rgba(17, 29, 22, 0.8) 100%), url('https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=85')",
          }}
        >
          <div className="absolute left-7 top-7 flex h-12 w-12 items-center justify-center border border-white/35 bg-[#17261e]/30 backdrop-blur-sm sm:left-10 sm:top-10">
            <FiBookOpen aria-hidden="true" size={23} />
          </div>
          <div className="relative max-w-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#d9e7d8]">
              A little pause
            </p>
            <p className="font-serif text-3xl leading-tight sm:text-4xl">
              Every good story knows when to turn the page.
            </p>
          </div>
        </div>

        <section className="flex flex-col justify-center px-7 py-10 sm:px-12 sm:py-14 lg:px-16">
          <p className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#5a765f]">
            <span className="h-px w-8 bg-[#e17b58]" /> BookApp / Account
          </p>
          <h1 className="font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Closing this chapter?
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-[#607065] sm:text-lg">
            You&apos;ll be signed out of your account on this device. Your
            library will be here when you return.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#b9503a] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#9f402f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b9503a] focus-visible:ring-offset-2"
              onClick={signOutHandler}
            >
              <FiLogOut aria-hidden="true" size={17} />
              Sign out
            </button>
            <Link
              to="/dashboard"
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#cbd8cc] px-6 py-3 text-sm font-semibold text-[#294333] transition-colors hover:border-[#294333] hover:bg-[#edf3ec] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5a765f] focus-visible:ring-offset-2"
            >
              <FiArrowLeft aria-hidden="true" size={17} />
              Back to my library
            </Link>
          </div>
          <p className="mt-9 flex items-center gap-2 border-t border-[#e1e8df] pt-5 text-sm text-[#7b887e]">
            <FiArrowUpRight aria-hidden="true" size={15} />
            Your next read is waiting.
          </p>
        </section>
      </div>
    </main>
  );
}
export default Signout;
