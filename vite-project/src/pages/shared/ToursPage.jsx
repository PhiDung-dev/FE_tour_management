import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import TourFilter from "../../components/shared/tours/TourFilter";
import TourItem from "../../components/shared/tours/TourItem";
import { readTours } from "../../api/TourApi";

function getToursArray(data) {
  return data?.result || data || [];
}

export default function ToursPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTours = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await readTours();
      setTours(getToursArray(data));
    } catch (err) {
      console.error("Lỗi khi lấy danh sách tour:", err);
      setError("Không thể tải danh sách tour. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const normalizedTours = useMemo(() => {
    return tours.map((tour) => ({
      id: tour.id,
      title: tour.title || "",
      description: tour.description || "",
      price: tour.price,
      location: tour.location || "Chưa cập nhật",
      images: Array.isArray(tour.images) ? tour.images : [],
    }));
  }, [tours]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-14 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-lg border border-blue-100 bg-white p-5 shadow-sm sm:p-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-500">
            VietTravel
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Danh sách tour</h1>
          <p className="mt-2 max-w-2xl text-slate-500">
            Khám phá những hành trình nổi bật và chọn tour phù hợp cho chuyến đi
            tiếp theo của bạn.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_1fr] lg:items-start">
          <aside className="lg:sticky lg:top-28">
            <TourFilter />
          </aside>

          <section>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Tất cả tour
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {loading
                    ? "Đang tải danh sách tour..."
                    : `${normalizedTours.length} tour đang sẵn sàng cho bạn.`}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-md border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
                <SlidersHorizontal size={17} className="text-blue-500" />
                Sắp xếp phù hợp
              </div>
            </div>

            {error && (
              <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </div>
            )}

            {loading && (
              <div className="rounded-lg border border-blue-100 bg-white p-8 text-center text-slate-500">
                Đang tải dữ liệu...
              </div>
            )}

            {!loading && normalizedTours.length === 0 && !error && (
              <div className="rounded-lg border border-blue-100 bg-white p-8 text-center">
                <p className="font-semibold text-slate-700">Chưa có tour nào</p>
                <p className="mt-1 text-sm text-slate-500">
                  Vui lòng quay lại sau.
                </p>
              </div>
            )}

            {!loading && normalizedTours.length > 0 && (
              <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {normalizedTours.map((tour) => (
                  <TourItem
                    key={tour.id}
                    id={tour.id}
                    title={tour.title}
                    description={tour.description}
                    price={tour.price}
                    location={tour.location}
                    images={tour.images}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
