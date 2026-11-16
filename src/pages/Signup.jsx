import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storeContext } from "../context/storeContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Spinner from "../layouts/Spinner";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";




function Register() {
  const {password, setPassword, email, setEmail,apiUrl,isLoading,setIsLoading} = useContext(storeContext);
   const [showPassword, setShowPassword] = useState(false);
   
   const navigate = useNavigate();

   function clearForm() {
    setEmail("");
    setPassword("");
  }

 async function registerUser() {
  try {
    setIsLoading(true);
    const response = await fetch(`${apiUrl}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        email, 
        password: password
      }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Registration successful");
      clearForm();
      navigate("/login");
    }else {
      console.log(data);
      toast.error(data.message || "Registration failed");
    }

    setIsLoading(false);
  } catch (error) {
    console.error("Error:", error);
    toast.error("An error occurred during registration");
    setIsLoading(false);
  }

}

 function submitHandler(e) {
    e.preventDefault();
    registerUser();
  }


  function toggle() {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  }

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080d20] px-4 py-12">
        {/* Background glow */}
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl"></div>

        <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-2xl lg:grid-cols-2">
          {/* Left panel */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-violet-700 via-indigo-700 to-blue-900 p-10 lg:flex">
            <div className="absolute -right-20 top-20 h-64 w-64 rounded-full border border-white/10"></div>
            <div className="absolute -right-10 top-32 h-44 w-44 rounded-full border border-white/10"></div>
            <div className="absolute bottom-10 left-10 h-48 w-48 rounded-full bg-blue-400/20 blur-3xl"></div>

            <Link
              to="/"
              className="relative text-2xl font-extrabold text-white"
            >
              📚 BookReserve
            </Link>

            <div className="relative py-10">
              <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-3xl border border-white/20 bg-white/10 text-7xl shadow-xl backdrop-blur-sm">
                📖
              </div>

              <h2 className="text-4xl font-extrabold leading-tight text-white">
                Your next
                <span className="block text-blue-200">great read</span>
                starts here.
              </h2>

              <p className="mt-5 max-w-sm leading-7 text-indigo-100">
                Discover books, organize your collection, and make reserving
                your favourite reads simple.
              </p>

              <div className="mt-8 space-y-4 text-sm text-white/90">
                <p>✓ Simple book reservations</p>
                <p>✓ An organized reading experience</p>
                <p>✓ Your library, all in one place</p>
              </div>
            </div>

            <p className="relative text-sm text-indigo-200">
              Discover · Reserve · Read
            </p>
          </div>

          {/* Right panel: registration form */}
          <div className="p-6 sm:p-10 lg:p-12">
            <Link
              to="/"
              className="mb-8 inline-block text-xl font-extrabold text-white lg:hidden"
            >
              📚 Book<span className="text-violet-400">Reserve</span>
            </Link>

            <div className="mb-8">
              <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-violet-300">
                Get started for free
              </span>

              <h1 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl">
                Create account
              </h1>

              <p className="mt-3 text-slate-400">
                Join us and start your reading journey today.
              </p>
            </div>

            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                submitHandler(e);
              }}
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-200"
                >
                  Email address
                </label>

                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg">
                    ✉️
                  </span>
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-200"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-4 pr-14 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <button
                    type="button"
                    onClick={toggle}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-violet-300"
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-4 font-bold text-white shadow-lg shadow-violet-900/30 transition duration-300 hover:-translate-y-0.5 hover:from-violet-500 hover:to-blue-500 focus:outline-none focus:ring-4 focus:ring-violet-500/30"
              >
                Create My Account <span className="ml-2">→</span>
              </button>

              <p className="text-center text-sm text-slate-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-bold text-violet-400 transition hover:text-violet-300"
                >
                  Sign in
                </Link>
              </p>
            </form>

            <div className="mt-8 border-t border-white/10 pt-5 text-center">
              <p className="text-xs text-slate-500">
                BookReserve · Your next great read starts here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
 }

export default Register;
