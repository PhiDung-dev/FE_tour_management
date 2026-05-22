import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Lock, Mail, MapPin, Phone, Save, ShieldCheck, User } from "lucide-react";
import FavoriteTourPage from "../../components/protected/myInfo/FavoriteTour";
import ChangePasswordPage from "../../components/protected/myInfo/ChangePassword";
import LogoutButton from "../../components/protected/myInfo/LogoutButton";
import MyInforForm from "../../components/protected/myInfo/myInfoForm";

export default function MyInforPage() {

  const userInfo = {
        fullName: "Tuan Anh",
        email: "tuananh@example.com",
        phone: "0123456789",
        address: "Đà Nẵng, Việt Nam",
  }

  const [activeTab, setActiveTab] = useState("profile");

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-10 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="flex justify-between mb-6 rounded-lg border border-blue-100 bg-white p-5 shadow-sm sm:p-7">
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
          <LogoutButton className={"mt-auto"}/>
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
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex w-full items-center gap-3 rounded-md px-4 py-3 font-semibold transition
                ${
                  activeTab === "profile"
                    ? "bg-orange-50 text-orange-600"
                    : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <User size={18} />
                Thông tin cá nhân
              </button>

              <button
                onClick={() => setActiveTab("favorite")}
                className="flex w-full items-center gap-3 rounded-md px-4 py-3 font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
              >
                <Heart size={18} />
                Tour yêu thích
              </button>

              <button 
                onClick={() => setActiveTab("changePassword")}
                className="flex w-full items-center gap-3 rounded-md px-4 py-3 font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-600">
                <Lock size={18} />
                Đổi mật khẩu
              </button>
            </div>
          </aside>

          <section className="rounded-lg border border-blue-100 bg-white p-5 shadow-sm sm:p-7">

            {activeTab === "profile" && (
              <MyInforForm userInfoProp={userInfo} />
            )} 

            {activeTab === "favorite" && (
              <FavoriteTourPage />
            )}

            {activeTab === "changePassword" && (
              <ChangePasswordPage />
            )}

          </section>
        </div>
      </div>
    </main>
  );
}