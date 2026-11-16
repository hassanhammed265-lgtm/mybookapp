import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";

function Footer() {
  const currentYear = new Date().getFullYear();

  const linkClass =
    "inline-flex text-sm text-slate-400 transition-colors hover:text-violet-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-3/4 -translate-x-1/2 rounded-full bg-violet-600/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_2fr] md:gap-16">
          <div>
            <Link to="/" className="group inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 shadow-lg shadow-violet-950/40 transition-transform group-hover:-rotate-3">
                <FiBookOpen aria-hidden="true" size={23} />
              </span>
              <span className="text-2xl font-bold tracking-tight">
                Book<span className="text-violet-300">App</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              Buy, sell, and discover books you love. Your next great read is
              just a click away.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/5 px-3 py-1.5 text-xs font-medium tracking-wide text-violet-200">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-violet-300"
              />
              READ. DISCOVER. REPEAT.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            <div>
              <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
                Company
              </h2>
              <ul className="space-y-4">
                <li>
                  <a href="#" className={linkClass}>
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className={linkClass}>
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className={linkClass}>
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
                Account
              </h2>
              <ul className="space-y-4">
                <li>
                  <Link to="/login" className={linkClass}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className={linkClass}>
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className={linkClass}>
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
                Legal
              </h2>
              <ul className="space-y-4">
                <li>
                  <a href="#" className={linkClass}>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className={linkClass}>
                    Terms &amp; Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className={linkClass}>
                    Licensing
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-slate-500">
            © {currentYear}{" "}
            <Link to="/" className="font-medium text-slate-300 transition-colors hover:text-violet-300">
              BookApp
            </Link>
            . All rights reserved.
          </span>
          <div className="flex items-center gap-2">
            {[
              { label: "Facebook", Icon: FaFacebookF },
              { label: "Twitter", Icon: FaTwitter },
              { label: "Instagram", Icon: FaInstagram },
              { label: "LinkedIn", Icon: FaLinkedinIn },
              { label: "GitHub", Icon: FaGithub },
            ].map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={`BookApp on ${label}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:-translate-y-0.5 hover:border-violet-400/40 hover:bg-violet-400/10 hover:text-violet-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
