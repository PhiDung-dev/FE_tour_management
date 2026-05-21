import React, { useEffect, useState } from "react";
import { createTour, deleteTour, updateTour, readTours } from "../../api/TourApi";
import {
  MapPinned,
  Users,
  UserCog,
  Plus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

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

const emptyTour = {
  id: "",
  title: "",
  price: "",
  description: "",
  images: [""],
};

const TourManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [tours, setTours] = useState([]);
  const [editingTourId, setEditingTourId] = useState(null);
  const [newTour, setNewTour] = useState(emptyTour);

  const fetchToursData = async () => {
    try {
      const data = await readTours();
      setTours(data?.result || data || []);
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu:", error);
    }
  };

  useEffect(() => {
    readTours();
  }, []);

  const openCreateForm = () => {
    setNewTour(emptyTour);
    setEditingTourId(null);
    setShowForm(true);
  };

  const handleEditClick = (tour) => {
    setNewTour({
      id: tour.id || "",
      title: tour.title || "",
      price: tour.price || "",
      description: tour.description || "",
      images: tour.images?.length ? tour.images : [tour.imageUrl || ""],
    });
    setEditingTourId(tour.id);
    setShowForm(true);
  };

  const handleSaveTour = async () => {
    try {
      const payload = {
        ...newTour,
        images: Array.isArray(newTour.images) ? newTour.images : [newTour.images],
      };

      const result = editingTourId
        ? await updateTour(editingTourId, payload)
        : await createTour(payload);

      if (result) {
        alert(editingTourId ? "Cập nhật tour thành công!" : "Tạo tour thành công!");
        setShowForm(false);
        setEditingTourId(null);
        setNewTour(emptyTour);
        fetchToursData();
      }
    } catch (error) {
      console.error("Lỗi khi lưu tour:", error);
    }
  };

  const handleDeleteTour = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá tour này không?")) return;

    try {
      const result = await deleteTour(id);
      if (result) {
        setTours((prev) => prev.filter((tour) => tour.id !== id));
        alert("Xoá tour thành công!");
        fetchToursData();
      }
    } catch (error) {
      console.error("Lỗi khi xoá tour:", error);
    }
  };

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Danh sách tour du lịch</h2>
          <p className="text-sm text-slate-500">Quản lý thông tin, giá và hình ảnh tour.</p>
        </div>

        <button
          onClick={openCreateForm}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-500 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Thêm tour mới
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <h3 className="text-xl font-bold text-slate-800">
                {editingTourId ? "Cập nhật tour" : "Thêm tour mới"}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="rounded-md p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <Input label="Mã tour" value={newTour.id} onChange={(value) => setNewTour({ ...newTour, id: value })} />
              <Input label="Tên tour" value={newTour.title} onChange={(value) => setNewTour({ ...newTour, title: value })} />
              <Input label="Giá tour" type="number" value={newTour.price} onChange={(value) => setNewTour({ ...newTour, price: value })} />
              <Input label="Hình ảnh" value={newTour.images[0] || ""} onChange={(value) => setNewTour({ ...newTour, images: [value] })} />

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Mô tả</label>
                <textarea
                  className="min-h-24 w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  value={newTour.description}
                  onChange={(e) => setNewTour({ ...newTour, description: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 p-5">
              <button onClick={() => setShowForm(false)} className="rounded-md px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100">
                Hủy
              </button>
              <button onClick={handleSaveTour} className="rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-700">
                Lưu tour
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-slate-100">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-blue-50 text-slate-700">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Tên tour</th>
              <th className="p-3">Giá</th>
              <th className="p-3">Hình ảnh</th>
              <th className="p-3">Mô tả</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour) => (
              <tr key={tour.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-700">{tour.id}</td>
                <td className="p-3 font-medium text-slate-800">{tour.title}</td>
                <td className="p-3 font-semibold text-blue-600">{tour.price}đ</td>
                <td className="p-3">
                  <img
                    src={tour.imageUrl || tour.images?.[0]}
                    alt={tour.title}
                    className="h-14 w-20 rounded-md object-cover"
                  />
                </td>
                <td className="max-w-xs truncate p-3 text-slate-500">{tour.description}</td>
                <td className="p-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleEditClick(tour)} className="rounded-md p-2 text-blue-600 hover:bg-blue-50">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDeleteTour(tour.id)} className="rounded-md p-2 text-red-600 hover:bg-red-50">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Input = ({ label, value, onChange, type = "text" }) => (
  <div>
    <label className="mb-1 block text-sm font-semibold text-slate-700">{label}</label>
    <input
      type={type}
      className="w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const UserManagement = ({ title, role }) => (
  <div>
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Danh sách {title}</h2>
        <p className="text-sm text-slate-500">Theo dõi và quản lý tài khoản {role}.</p>
      </div>
      <button className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-500 px-4 py-2.5 font-semibold text-white hover:bg-blue-700">
        <Plus size={18} />
        Thêm {role}
      </button>
    </div>

    <div className="overflow-x-auto rounded-lg border border-slate-100">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="bg-blue-50 text-slate-700">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Họ tên</th>
            <th className="p-3">Email</th>
            <th className="p-3">Số điện thoại</th>
            <th className="p-3">Địa chỉ</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-slate-100 hover:bg-slate-50">
            <td className="p-3 font-semibold">#U01</td>
            <td className="p-3 font-medium text-slate-800">Nguyễn Văn A</td>
            <td className="p-3 text-slate-500">vana@example.com</td>
            <td className="p-3 text-slate-500">0123456789</td>
            <td className="p-3 text-slate-500">123 Đường ABC, Hà Nội</td>
            <td className="p-3 text-right">
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);