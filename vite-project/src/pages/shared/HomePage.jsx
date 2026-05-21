import { Link } from "react-router-dom";
import { CalendarDays, MapPin, Search, ArrowRight, Sparkles } from "lucide-react";
import TourItem from "../../components/shared/tours/TourItem";

function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative min-h-[620px] overflow-hidden pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-slate-950/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-slate-50" />

        <div className="relative mx-auto flex min-h-[620px] max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-white">
            <div className="mb-5 inline-flex items-center gap-2 rounded-md bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
              <Sparkles size={17} />
              Tour du lịch Việt Nam
            </div>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Khám phá vẻ đẹp Việt Nam theo cách trọn vẹn nhất
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-100 sm:text-lg">
              Tìm tour phù hợp, đặt lịch nhanh chóng và tận hưởng những hành
              trình đáng nhớ cùng VietTravel.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
                to="/tours"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-blue-500 px-6 font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-600 active:scale-[0.98]"
            >
                Khám phá tour ngay
                <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-500">
              Gợi ý cho bạn
            </p>
            <h2 className="text-3xl font-bold text-slate-900">
              Tour nổi bật nhất
            </h2>
            <p className="mt-2 text-slate-500">
              Những hành trình được nhiều du khách yêu thích.
            </p>
          </div>

          <Link
            to="/tours"
            className="inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-700"
          >
            Xem tất cả
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <TourItem />
          <TourItem />
          <TourItem />
          <TourItem />
        </div>
      </section>
    </main>
  );
}

export default HomePage;