import { useEffect, useState } from "react";
import { createTour, deleteTour, readTours, updateTour } from "../../../api/TourApi";
import { createSchedule } from "../../../api/ScheduleApi";
import InputManagement, { InputDropManagement, InputImage } from "./InputManagement";
import { CalendarPlus, Pencil, Plus, Trash2, X } from "lucide-react";

const emptyTour = {
  title: "",
  price: "",
  location: "",
  description: "",
  images: [""],
};

const emptySchedule = {
  startDate: "",
  endDate: "",
  slot: "",
};

 const locationOptions = [
  "An Giang", "Bà Rịa - Vũng Tàu", "Bạc Liêu", "Bắc Giang", "Bắc Kạn", "Bắc Ninh", 
  "Bến Tre", "Bình Dương", "Bình Định", "Bình Phước", "Bình Thuận", "Cà Mau", 
  "Cần Thơ", "Cao Bằng", "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên", 
  "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", 
  "Hà Tĩnh", "Hải Dương", "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên", 
  "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lạng Sơn", "Lào Cai", 
  "Lâm Đồng", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", 
  "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", 
  "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", 
  "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "TP. Hồ Chí Minh", "Trà Vinh", 
  "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
];
  

function getResult(data) {
  return data?.result || data;
}

function getCreatedTourId(result, fallbackId) {
  const tour = getResult(result);
  return tour?.id || tour?.tourId || fallbackId;
}

export default function TourManagement() {
  const [showForm, setShowForm] = useState(false);
  const [tours, setTours] = useState([]);
  const [editingTourId, setEditingTourId] = useState(null);
  const [newTour, setNewTour] = useState(emptyTour);
  const [schedules, setSchedules] = useState([{ ...emptySchedule }]);
  const [saving, setSaving] = useState(false);

  const fetchToursData = async () => {
    try {
      const data = await readTours();
      setTours(data?.result || data || []);
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu:", error);
    }
  };

  useEffect(() => {
    fetchToursData();
  }, []);

  const openCreateForm = () => {
    setNewTour(emptyTour);
    setSchedules([{ ...emptySchedule }]);
    setEditingTourId(null);
    setShowForm(true);
  };

  const handleEditClick = (tour) => {
    setNewTour({
      id: tour.id || "",
      title: tour.title || "",
      price: tour.price || "",
      location: tour.location || "",
      description: tour.description || "",
      images: tour.images?.length ? tour.images : [tour.imageUrl || ""],
    });
    setSchedules([{ ...emptySchedule }]);
    setEditingTourId(tour.id);
    setShowForm(true);
  };

  const handleScheduleChange = (index, field, value) => {
    setSchedules((current) =>
      current.map((schedule, scheduleIndex) =>
        scheduleIndex === index ? { ...schedule, [field]: value } : schedule
      )
    );
  };

  const addScheduleRow = () => {
    setSchedules((current) => [...current, { ...emptySchedule }]);
  };

  const removeScheduleRow = (index) => {
    setSchedules((current) => current.filter((_, scheduleIndex) => scheduleIndex !== index));
  };

  const validateSchedules = () => {
    if (editingTourId) return true;

    const validSchedules = schedules.filter(
      (schedule) => schedule.startDate || schedule.endDate || schedule.slot
    );

    if (validSchedules.length === 0) {
      alert("Vui lòng nhập ít nhất một lịch trình cho tour.");
      return false;
    }

    for (const schedule of validSchedules) {
      if (!schedule.startDate || !schedule.endDate || !schedule.slot) {
        alert("Vui lòng nhập đủ ngày bắt đầu, ngày kết thúc và số chỗ.");
        return false;
      }

      if (new Date(schedule.startDate) > new Date(schedule.endDate)) {
        alert("Ngày bắt đầu không được lớn hơn ngày kết thúc.");
        return false;
      }

      if (Number(schedule.slot) <= 0) {
        alert("Số chỗ phải lớn hơn 0.");
        return false;
      }
    }

    return true;
  };

  const handleSaveTour = async () => {
    if (!validateSchedules()) return;

    try {
      setSaving(true);

      const payload = {
        ...newTour,
        price: Number(newTour.price),
        images: newTour.images.filter((image) => image.trim() !== ""),
      };

      const result = editingTourId
        ? await updateTour(editingTourId, payload)
        : await createTour(payload);

      const tourId = editingTourId || getCreatedTourId(result, newTour.id);

      if (!editingTourId) {
        const validSchedules = schedules.filter(
          (schedule) => schedule.startDate && schedule.endDate && schedule.slot
        );

        await Promise.all(
          validSchedules.map((schedule) =>
            createSchedule({
              tourId,
              startDate: schedule.startDate,
              endDate: schedule.endDate,
              slot: Number(schedule.slot),
            })
          )
        );
      }

      alert(editingTourId ? "Cập nhật tour thành công!" : "Tạo tour và lịch trình thành công!");
      setShowForm(false);
      setEditingTourId(null);
      setNewTour(emptyTour);
      setSchedules([{ ...emptySchedule }]);
      fetchToursData();
    } catch (error) {
      console.error("Lỗi khi lưu tour:", error);
      alert("Lưu tour thất bại. Vui lòng kiểm tra API tour và schedule.");
    } finally {
      setSaving(false);
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
          <p className="text-sm text-slate-500">Quản lý thông tin, giá, hình ảnh và lịch trình tour.</p>
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
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white shadow-xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white p-5">
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

            <div className="space-y-5 p-5">
              <section className="space-y-4">
                <h4 className="font-bold text-slate-800">Thông tin tour</h4>
                <InputManagement
                  label="Tên tour"
                  value={newTour.title}
                  onChange={(value) => setNewTour({ ...newTour, title: value })}
                />
                <InputManagement
                  label="Giá tour"
                  type="number"
                  value={newTour.price}
                  onChange={(value) => setNewTour({ ...newTour, price: value })}
                />
                <InputDropManagement label="Địa điểm" value={newTour.location} onChange={(value) => setNewTour({ ...newTour, location: value })} options={locationOptions} />
                <InputImage
                  value={newTour.images}
                  onChange={(images) => setNewTour({ ...newTour, images })}
                />

                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">Mô tả</label>
                  <textarea
                    className="min-h-24 w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    value={newTour.description}
                    onChange={(e) => setNewTour({ ...newTour, description: e.target.value })}
                  />
                </div>
              </section>

              {!editingTourId && (
                <section className="rounded-lg border border-blue-100 bg-blue-50/60 p-4">
                  <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h4 className="flex items-center gap-2 font-bold text-slate-800">
                        <CalendarPlus size={18} className="text-blue-600" />
                        Lịch trình khởi hành
                      </h4>
                      <p className="text-sm text-slate-500">
                        Nhập lịch trình ngay khi tạo tour để user có thể chọn ngày đặt tour.
                      </p>
                    </div>
                    <button
                      onClick={addScheduleRow}
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-100"
                    >
                      <Plus size={16} />
                      Thêm lịch
                    </button>
                  </div>

                  <div className="space-y-3">
                    {schedules.map((schedule, index) => (
                      <div
                        key={index}
                        className="grid gap-3 rounded-lg border border-slate-200 bg-white p-3 md:grid-cols-[1fr_1fr_120px_auto]"
                      >
                        <div>
                          <label className="mb-1 block text-sm font-semibold text-slate-700">
                            Ngày bắt đầu
                          </label>
                          <input
                            type="date"
                            value={schedule.startDate}
                            onChange={(e) => handleScheduleChange(index, "startDate", e.target.value)}
                            className="w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-sm font-semibold text-slate-700">
                            Ngày kết thúc
                          </label>
                          <input
                            type="date"
                            value={schedule.endDate}
                            onChange={(e) => handleScheduleChange(index, "endDate", e.target.value)}
                            className="w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-sm font-semibold text-slate-700">
                            Số chỗ
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={schedule.slot}
                            onChange={(e) => handleScheduleChange(index, "slot", e.target.value)}
                            className="w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                          />
                        </div>

                        <div className="flex items-end">
                          <button
                            type="button"
                            onClick={() => removeScheduleRow(index)}
                            disabled={schedules.length === 1}
                            className="rounded-md p-2 text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <div className="sticky bottom-0 flex justify-end gap-2 border-t border-slate-100 bg-white p-5">
              <button
                onClick={() => setShowForm(false)}
                className="rounded-md px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveTour}
                disabled={saving}
                className="rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving ? "Đang lưu..." : editingTourId ? "Lưu tour" : "Lưu tour và lịch trình"}
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
              <th className="p-3">Địa điểm</th>
              <th className="p-3">Hình ảnh</th>
              <th className="p-3 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour) => (
              <tr key={tour.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-700">{tour.id}</td>
                <td className="p-3 font-medium text-slate-800">{tour.title}</td>
                <td className="p-3 font-semibold text-blue-600">{tour.price}đ</td>
                <td className="p-3 text-slate-600">{tour.location}</td>
                <td className="p-3">
                  <img
                    src={tour.imageUrl || tour.images?.[0]}
                    alt={tour.title}
                    className="h-14 w-20 rounded-md object-cover"
                  />
                </td>
                <td className="p-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEditClick(tour)}
                      className="rounded-md p-2 text-blue-600 hover:bg-blue-50"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteTour(tour.id)}
                      className="rounded-md p-2 text-red-600 hover:bg-red-50"
                    >
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
}
