import { SlidersHorizontal } from "lucide-react";
import TourFilter from "../../components/shared/tours/TourFilter";
import TourItem from "../../components/shared/tours/TourItem";

export default function ToursPage() {
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
                  8 tour đang sẵn sàng cho bạn.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-md border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
                <SlidersHorizontal size={17} className="text-blue-500" />
                Sắp xếp phù hợp
              </div>
            </div>

            <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              <TourItem/>
              <TourItem />
              <TourItem />
              <TourItem />
              <TourItem />
              <TourItem />
              <TourItem />
              <TourItem />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}