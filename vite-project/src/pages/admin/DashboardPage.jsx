import React, { useState } from "react";
import { MapPinned, Users, UserCog } from "lucide-react";
import TourManagement from "../../components/admin/dashboard/TourManagement";
import UserManagement from "../../components/admin/dashboard/UserManagement";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("tours");

  const pages = [
    { id: "tours", label: "Quản lý tour", icon: MapPinned },
    { id: "users", label: "Quản lý user", icon: Users },
    { id: "staff", label: "Quản lý nhân viên", icon: UserCog },
  ];

  const activePage = pages.find((page) => page.id === activeTab);

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-10 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 rounded-lg border border-blue-100 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-500">
              Admin Dashboard
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-800">
              {activePage?.label}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-medium text-slate-500 sm:block">
              Xin chào, Quản trị viên
            </span>
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-500 font-bold text-white shadow-sm">
              Adm
            </div>
          </div>
        </div>

        <div className="mb-6 flex gap-2 overflow-x-auto rounded-lg border border-blue-100 bg-white p-2 shadow-sm">
          {pages.map((page) => {
            const Icon = page.icon;
            const isActive = activeTab === page.id;

            return (
              <button
                key={page.id}
                onClick={() => setActiveTab(page.id)}
                className={`flex min-w-max items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? "bg-blue-500 text-white shadow-sm"
                    : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <Icon size={18} />
                {page.label}
              </button>
            );
          })}
        </div>

        <section className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm sm:p-6">
          {activeTab === "tours" && <TourManagement />}
          {activeTab === "users" && <UserManagement title="Khách hàng" role="User" />}
          {activeTab === "staff" && <UserManagement title="Nhân viên" role="Staff" />}
        </section>
      </div>
    </main>
  );
}
