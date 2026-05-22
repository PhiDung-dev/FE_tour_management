import { useEffect, useState } from "react";
import { createTour, deleteTour, readTours, updateTour } from "../../../api/TourApi";
import InputManagement from "./InputManagement";
import { Pencil, Plus, Trash2, X } from "lucide-react";

export default function TourManagement ()  {
  const [showForm, setShowForm] = useState(false);
  const [tours, setTours] = useState([]);
  const [editingTourId, setEditingTourId] = useState(null);
  const emptyTour = {
    id: "",
    title: "",
    price: "",
    description: "",
    images: [""],
    };
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
              <InputManagement label="Mã tour" value={newTour.id} onChange={(value) => setNewTour({ ...newTour, id: value })} />
              <InputManagement label="Tên tour" value={newTour.title} onChange={(value) => setNewTour({ ...newTour, title: value })} />
              <InputManagement label="Giá tour" type="number" value={newTour.price} onChange={(value) => setNewTour({ ...newTour, price: value })} />
              <InputManagement label="Hình ảnh" value={newTour.images[0] || ""} onChange={(value) => setNewTour({ ...newTour, images: [value] })} />

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
