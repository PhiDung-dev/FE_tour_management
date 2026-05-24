import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function StaffNavbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: "Trang chủ", to: "/" },
    { label: "Danh sách tour", to: "/tours" },
    { label: "Dashboard", to: "/staff/dashboard" },
    { label: "My info", to: "/staff/myInfor" },
  ];

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 w-full border-b border-blue-100 bg-white/95 shadow-sm backdrop-blur">
      <div className="container m-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <FontAwesomeIcon
                className="text-3xl"
                icon={faPaperPlane}
                style={{ color: "rgb(116, 192, 252)" }}
              />
              <span className="text-3xl font-bold tracking-wide text-primary">
                VietTravel
              </span>
            </Link>
          </div>
        </div>

        <div className="hidden items-center space-x-24 text-xl font-medium text-blue-500 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="relative whitespace-nowrap transition-colors duration-200 hover:text-blue-700 active:text-blue-800 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-blue-500 after:transition-all after:duration-200 hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-blue-500 transition hover:bg-blue-50 hover:text-blue-700 lg:hidden"
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={open ? faXmark : faBars} className="text-2xl" />
        </button>
      </div>

      {open && (
        <div className="border-t border-blue-100 bg-white px-4 pb-4 shadow-sm lg:hidden">
          <div className="container m-auto flex flex-col gap-2">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-base font-medium text-blue-500 transition hover:bg-blue-50 hover:text-blue-700 active:text-blue-800"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}