import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, User, ArrowRight, MapPinned } from "lucide-react";

import { login } from "../../api/authApi";
import { getRoleFromToken } from "../../utils/jwt";

import anhPcanh1 from "../../assets/images/anhPcanh1.png";
import anhPcanh2 from "../../assets/images/anhPcanh2.jpg";
import anhPcanh3 from "../../assets/images/anhPcanh3.jpg";
import anhPcanh4 from "../../assets/images/anhPcanh4.jpg";
import anhPcanh5 from "../../assets/images/anhPcanh5.png";

export default function LogInPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const travelImages = [anhPcanh1, anhPcanh2, anhPcanh3, anhPcanh4, anhPcanh5];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const data = await login(formData);
      const token = data.result.token;

      localStorage.setItem("token", token);

      const role = getRoleFromToken(token);

      if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (role === "STAFF") {
        navigate("/staff/bookings");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError("Sai tài khoản hoặc mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="hidden lg:block">
          <div className="mb-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">
              <MapPinned size={18} />
              VietTravel
            </div>

            <h1 className="max-w-xl text-5xl font-bold leading-tight text-slate-900">
              Khám phá Việt Nam theo cách của bạn
            </h1>

            <p className="mt-4 max-w-lg text-lg leading-8 text-slate-600">
              Đăng nhập để tiếp tục đặt tour, quản lý lịch trình và lưu lại
              những hành trình yêu thích.
            </p>
          </div>

          <div className="grid h-[470px] grid-cols-6 grid-rows-6 gap-4">
            <img
              src={travelImages[0]}
              alt="Du lịch Việt Nam"
              className="col-span-4 row-span-4 h-full w-full rounded-lg object-cover shadow-xl"
            />
            <img
              src={travelImages[1]}
              alt="Du lịch Việt Nam"
              className="col-span-2 row-span-3 h-full w-full rounded-lg object-cover shadow-lg"
            />
            <img
              src={travelImages[2]}
              alt="Du lịch Việt Nam"
              className="col-span-2 row-span-3 h-full w-full rounded-lg object-cover shadow-lg"
            />
            <img
              src={travelImages[3]}
              alt="Du lịch Việt Nam"
              className="col-span-2 row-span-2 h-full w-full rounded-lg object-cover shadow-lg"
            />
            <img
              src={travelImages[4]}
              alt="Du lịch Việt Nam"
              className="col-span-4 row-span-2 h-full w-full rounded-lg object-cover shadow-xl"
            />
          </div>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="mb-6 text-center lg:hidden">
            <div className="mb-3 inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">
              <MapPinned size={18} />
              VietTravel
            </div>
            <h1 className="text-3xl font-bold text-slate-900">
              Chào mừng trở lại
            </h1>
          </div>

          <div className="rounded-lg border border-white bg-white/90 p-6 shadow-2xl shadow-slate-200/70 backdrop-blur sm:p-8">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-500">
                Đăng nhập
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Tiếp tục hành trình
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Nhập thông tin tài khoản để truy cập hệ thống.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Tên đăng nhập
                </label>

                <div className="relative">
                  <User
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Nhập username"
                    className="h-12 w-full rounded-md border border-slate-200 bg-slate-50 pl-12 pr-4 text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Mật khẩu
                </label>

                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Nhập mật khẩu"
                    className="h-12 w-full rounded-md border border-slate-200 bg-slate-50 pl-12 pr-12 text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-md border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer rounded accent-blue-500"
                  />
                  Ghi nhớ
                </label>

                <a
                  href="#"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Quên mật khẩu?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-blue-500 font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                {!loading && <ArrowRight size={18} />}
              </button>

              <p className="pt-2 text-center text-sm text-slate-500">
                Bạn chưa có tài khoản?{" "}
                <Link
                  to="/signUp"
                  className="font-bold text-blue-600 hover:text-blue-700"
                >
                  Đăng ký ngay
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}