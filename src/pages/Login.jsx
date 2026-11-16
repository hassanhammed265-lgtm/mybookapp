import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { storeContext } from "../context/storeContext";
import Spinner from "../layouts/Spinner";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const {
    password,
    setPassword,
    email,
    setEmail,
    apiUrl,
    isLoading,
    setIsLoading,
    setIsAuth,
  } = useContext(storeContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function clearForm() {
    setEmail("");
    setPassword("");
  }

  async function loginUser() {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.access_token);
      toast.success("Login successful");
      setIsAuth(true);
      clearForm();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  }

  function submitHandler(event) {
    event.preventDefault();
    loginUser();
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070b18] px-4 py-24">
      <div
        aria-hidden="true"
        className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-600/20 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-600/20 blur-[100px]"
      />

      <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-violet-700 via-indigo-700 to-blue-950 p-10 lg:flex">
          <div
            aria-hidden="true"
            className="absolute -right-20 top-20 h-64 w-64 rounded-full border border-white/10"
          />
          <div
            aria-hidden="true"
            className="absolute -right-10 top-32 h-44 w-44 rounded-full border border-white/10"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-10 left-10 h-48 w-48 rounded-full bg-blue-400/20 blur-3xl"
          />

          <Link to="/" className="relative text-2xl font-extrabold text-white">
            Book<span className="text-blue-200">App</span>
          </Link>

          <div className="relative py-10">
            <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-3xl border border-white/20 bg-white/10 text-6xl shadow-xl backdrop-blur-sm">
              <span aria-hidden="true">📖</span>
            </div>
            <h1 className="text-4xl font-extrabold leading-tight text-white">
              Your next
              <span className="block text-blue-200">great read</span>
              starts here.
            </h1>
            <p className="mt-5 max-w-sm leading-7 text-indigo-100">
              Sign in to reserve your favorite books, manage your reservations,
              and discover something new to read.
            </p>
            <div className="mt-8 space-y-4 text-sm text-white/90">
              <p>✓ Reserve books with ease</p>
              <p>✓ Keep track of your reservations</p>
              <p>✓ Discover your next favorite book</p>
            </div>
          </div>

          <p className="relative text-sm text-indigo-200">
            Discover · Reserve · Read
          </p>
        </section>

        <section className="p-6 sm:p-10 lg:p-12">
          <Link
            to="/"
            className="mb-8 inline-block text-xl font-extrabold text-white lg:hidden"
          >
            Book<span className="text-violet-400">App</span>
          </Link>

          <div className="mb-8">
            <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-violet-300">
              Welcome back
            </span>
            <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl">
              Sign in to your account
            </h2>
            <p className="mt-3 leading-6 text-slate-400">
              Welcome back! Enter your details to continue your reading journey.
            </p>
          </div>

          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              console.log(credentialResponse.credential);
              // console.log(credentialResponse);
              try {
                setIsLoading(true);
                const response = await fetch(`${apiUrl}/auth/google`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    googleToken: credentialResponse.credential,
                  }),
                });
                const data = await response.json();

                if (!response.ok) {
                  toast.error(data.message || "Login failed");
                  return;
                }

                localStorage.setItem("token", data.access_token);
                toast.success("Login successful");
                setIsAuth(true);
                setIsLoading(false);
                navigate("/dashboard");


                // toast.success("Login successful");
                // navigate("/dashboard");
              } catch (error) {
                setIsLoading(false);
                console.error("Error:", error);
              }
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />

          <form onSubmit={submitHandler} className="space-y-6">
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
                  autoComplete="email"
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-4 pr-12 text-white outline-none transition duration-300 placeholder:text-slate-500 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                  required
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg"
                >
                  ✉️
                </span>
              </div>
            </div>

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
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-4 pr-14 text-white outline-none transition duration-300 placeholder:text-slate-500 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-violet-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="group flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-4 font-bold text-white shadow-lg shadow-violet-900/30 transition duration-300 hover:-translate-y-0.5 hover:from-violet-500 hover:to-blue-500 focus:outline-none focus:ring-4 focus:ring-violet-500/30"
            >
              Sign In
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>

            <p className="text-center text-sm text-slate-400">
              Don&apos;t have an account?{" "}
              <Link
                className="font-bold text-violet-400 transition hover:text-violet-300"
                to="/register"
              >
                Create account
              </Link>
            </p>
          </form>

          <div className="mt-8 border-t border-white/10 pt-5 text-center">
            <p className="text-xs text-slate-500">
              BookApp · Your next great read starts here.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
