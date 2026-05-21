import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Lock,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  User,
} from "lucide-react";

export default function MyInforPage() {
  const [userInfo, setUserInfo] = useState({
    fullName: "Tuan Anh",
    email: "tuananh@example.com",
    phone: "0123456789",
    address: "Đà Nẵng, Việt Nam",
  });

  const handleChange = (field, value) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-10 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="mb-6 rounded-lg border border-blue-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-500">
                Tài khoản
              </p>
              <h1 className="text-3xl font-bold text-slate-900">
                Thông tin cá nhân
              </h1>
              <p className="mt-2 text-slate-500">
                Quản lý họ tên, email, số điện thoại và địa chỉ của bạn.
              </p>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <aside className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm lg:sticky lg:top-28">
            <div className="mb-5 rounded-lg bg-blue-50 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white">
                <User size={24} />
              </div>
              <h2 className="mt-3 text-xl font-bold text-slate-900">
                {userInfo.fullName}
              </h2>
              <p className="mt-1 text-sm text-slate-500">{userInfo.email}</p>
            </div>

            <div className="space-y-2">
              <button className="flex w-full items-center gap-3 rounded-md bg-orange-50 px-4 py-3 font-semibold text-orange-600">
                <User size={18} />
                Thông tin cá nhân
              </button>

              <Link
                to="/myfavoriteTour"
                className="flex w-full items-center gap-3 rounded-md px-4 py-3 font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
              >
                <Heart size={18} />
                Tour yêu thích
              </Link>

              <button className="flex w-full items-center gap-3 rounded-md px-4 py-3 font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-600">
                <Lock size={18} />
                Đổi mật khẩu
              </button>
            </div>
          </aside>

          <section className="rounded-lg border border-blue-100 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6 border-b border-slate-100 pb-5">
              <h2 className="text-2xl font-bold text-slate-900">
                Chi tiết tài khoản
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Cập nhật thông tin để VietTravel hỗ trợ bạn tốt hơn.
              </p>
            </div>

            <form className="grid gap-5 md:grid-cols-2">
              <InputField
                icon={User}
                label="Họ và tên"
                value={userInfo.fullName}
                onChange={(value) => handleChange("fullName", value)}
              />

              <InputField
                icon={Mail}
                label="Email"
                type="email"
                value={userInfo.email}
                disabled
              />

              <InputField
                icon={Phone}
                label="Số điện thoại"
                value={userInfo.phone}
                onChange={(value) => handleChange("phone", value)}
              />

              <InputField
                icon={MapPin}
                label="Địa chỉ"
                value={userInfo.address}
                onChange={(value) => handleChange("address", value)}
              />

              <div className="mt-3 flex flex-col-reverse gap-3 md:col-span-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  className="rounded-md px-5 py-3 font-semibold text-slate-600 transition hover:bg-slate-100"
                >
                  Hủy bỏ
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-orange-500 px-6 py-3 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 active:scale-[0.98]"
                >
                  <Save size={18} />
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

const InputField = ({
  icon: Icon,
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
}) => (
  <div>
    <label className="mb-2 block text-sm font-semibold text-slate-700">
      {label}
    </label>

    <div className="relative">
      <Icon
        size={19}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className={`h-12 w-full rounded-md border pl-12 pr-4 outline-none transition ${
          disabled
            ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-500"
            : "border-slate-200 bg-slate-50 text-slate-800 focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
        }`}
      />
    </div>
  </div>
);