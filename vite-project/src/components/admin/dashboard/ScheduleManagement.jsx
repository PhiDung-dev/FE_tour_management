import { useEffect, useMemo, useState } from "react";

const API_BASE_URL = "http://localhost:8080";

const emptyForm = {
  tourId: "",
  startDate: "",
  endDate: "",
  slot: "",
};

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("vi-VN");
}

function normalizeSchedule(schedule) {
  return {
    id: schedule.id ?? schedule.Id,
    tourId: schedule.tourId ?? schedule.TourId ?? schedule.tour?.id,
    tourTitle: schedule.tourTitle ?? schedule.tour?.title ?? "",
    startDate: schedule.startDate ?? schedule.StartDate,
    endDate: schedule.endDate ?? schedule.EndDate,
    slot: schedule.slot ?? schedule.Slot,
  };
}

async function request(path, options = {}) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Co loi xay ra khi goi API");
  }

  if (response.status === 204) return null;
  return response.json();
}

export default function ScheduleManagement() {
  const [schedules, setSchedules] = useState([]);
  const [tours, setTours] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [tourFilter, setTourFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const [scheduleData, tourData] = await Promise.all([
        request("/schedules"),
        request("/tours"),
      ]);

      setSchedules((scheduleData || []).map(normalizeSchedule));
      setTours(tourData || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const tourNameById = useMemo(() => {
    return tours.reduce((map, tour) => {
      map[String(tour.id)] = tour.title;
      return map;
    }, {});
  }, [tours]);

  const filteredSchedules = useMemo(() => {
    const query = keyword.trim().toLowerCase();

    return schedules.filter((schedule) => {
      const tourTitle = schedule.tourTitle || tourNameById[String(schedule.tourId)] || "";
      const matchKeyword =
        !query ||
        String(schedule.id).includes(query) ||
        tourTitle.toLowerCase().includes(query);
      const matchTour = tourFilter === "all" || String(schedule.tourId) === tourFilter;

      return matchKeyword && matchTour;
    });
  }, [keyword, schedules, tourFilter, tourNameById]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function validateForm() {
    if (!form.tourId) return "Vui long chon tour";
    if (!form.startDate) return "Vui long chon ngay bat dau";
    if (!form.endDate) return "Vui long chon ngay ket thuc";
    if (new Date(form.startDate) > new Date(form.endDate)) {
      return "Ngay bat dau khong duoc lon hon ngay ket thuc";
    }
    if (!form.slot || Number(form.slot) <= 0) return "Slot phai lon hon 0";
    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationMessage = validateForm();
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    const payload = {
      tourId: Number(form.tourId),
      startDate: form.startDate,
      endDate: form.endDate,
      slot: Number(form.slot),
    };

    try {
      setSaving(true);
      setError("");

      if (editingId) {
        await request(`/schedules/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await request("/schedules", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(schedule) {
    setEditingId(schedule.id);
    setForm({
      tourId: String(schedule.tourId || ""),
      startDate: schedule.startDate || "",
      endDate: schedule.endDate || "",
      slot: String(schedule.slot || ""),
    });
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("Ban co chac muon xoa lich trinh nay?");
    if (!confirmed) return;

    try {
      setError("");
      await request(`/schedules/${id}`, { method: "DELETE" });
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  function handleCancel() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  }

  const inputClass =
    "min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100";
  const labelClass = "grid gap-2 text-sm font-bold text-slate-700";

  return (
    <main className="min-h-screen bg-slate-50 p-5 text-slate-900 md:p-8">
      <section className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-500">Admin</p>
          <h1 className="text-2xl font-bold leading-tight md:text-3xl">
            Quan ly lich trinh tour
          </h1>
        </div>
        <button
          className="min-h-10 rounded-lg bg-blue-600 px-4 font-bold text-white transition hover:bg-blue-700"
          type="button"
          onClick={loadData}
        >
          Tai lai
        </button>
      </section>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-semibold text-red-700">
          {error}
        </div>
      )}

      <section className="grid gap-5 lg:grid-cols-[360px_1fr]">
        <form
          className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-bold">
            {editingId ? "Cap nhat lich trinh" : "Them lich trinh"}
          </h2>

          <label className={labelClass}>
            Tour
            <select className={inputClass} name="tourId" value={form.tourId} onChange={handleChange}>
              <option value="">Chon tour</option>
              {tours.map((tour) => (
                <option key={tour.id} value={tour.id}>
                  {tour.title}
                </option>
              ))}
            </select>
          </label>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <label className={labelClass}>
              Ngay bat dau
              <input
                className={inputClass}
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={handleChange}
              />
            </label>

            <label className={labelClass}>
              Ngay ket thuc
              <input
                className={inputClass}
                name="endDate"
                type="date"
                value={form.endDate}
                onChange={handleChange}
              />
            </label>
          </div>

          <label className={labelClass}>
            So cho
            <input
              className={inputClass}
              name="slot"
              type="number"
              min="1"
              value={form.slot}
              onChange={handleChange}
              placeholder="Vi du: 30"
            />
          </label>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row">
            <button
              className="min-h-10 rounded-lg bg-blue-600 px-4 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              disabled={saving}
            >
              {saving ? "Dang luu..." : editingId ? "Luu thay doi" : "Them moi"}
            </button>
            {editingId && (
              <button
                className="min-h-10 rounded-lg bg-slate-100 px-4 font-bold text-slate-900 transition hover:bg-slate-200"
                type="button"
                onClick={handleCancel}
              >
                Huy
              </button>
            )}
          </div>
        </form>

        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 p-4 md:flex-row">
            <input
              className={inputClass}
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Tim theo ma lich hoac ten tour"
            />
            <select
              className={`${inputClass} md:max-w-60`}
              value={tourFilter}
              onChange={(event) => setTourFilter(event.target.value)}
            >
              <option value="all">Tat ca tour</option>
              {tours.map((tour) => (
                <option key={tour.id} value={tour.id}>
                  {tour.title}
                </option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse">
              <thead>
                <tr className="bg-slate-50 text-left text-xs uppercase text-slate-500">
                  <th className="border-b border-slate-200 px-4 py-3">Ma</th>
                  <th className="border-b border-slate-200 px-4 py-3">Tour</th>
                  <th className="border-b border-slate-200 px-4 py-3">Bat dau</th>
                  <th className="border-b border-slate-200 px-4 py-3">Ket thuc</th>
                  <th className="border-b border-slate-200 px-4 py-3">Slot</th>
                  <th className="border-b border-slate-200 px-4 py-3">Thao tac</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="px-4 py-8 text-center text-slate-500" colSpan="6">
                      Dang tai du lieu...
                    </td>
                  </tr>
                ) : filteredSchedules.length > 0 ? (
                  filteredSchedules.map((schedule) => (
                    <tr key={schedule.id} className="border-b border-slate-100 last:border-0">
                      <td className="px-4 py-4 font-semibold">#{schedule.id}</td>
                      <td className="px-4 py-4">
                        {schedule.tourTitle || tourNameById[String(schedule.tourId)] || "Khong ro"}
                      </td>
                      <td className="px-4 py-4">{formatDate(schedule.startDate)}</td>
                      <td className="px-4 py-4">{formatDate(schedule.endDate)}</td>
                      <td className="px-4 py-4">{schedule.slot}</td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <button
                            className="min-h-9 rounded-lg bg-slate-100 px-3 font-bold text-slate-900 transition hover:bg-slate-200"
                            type="button"
                            onClick={() => handleEdit(schedule)}
                          >
                            Sua
                          </button>
                          <button
                            className="min-h-9 rounded-lg bg-red-100 px-3 font-bold text-red-700 transition hover:bg-red-200"
                            type="button"
                            onClick={() => handleDelete(schedule.id)}
                          >
                            Xoa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-4 py-8 text-center text-slate-500" colSpan="6">
                      Chua co lich trinh phu hop
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}
