import { faBolt, faCircleInfo, faLocationDot, faShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CalendarDays, CheckCircle2, MapPinned } from "lucide-react";
import { Link } from "react-router-dom";

export default function TourDetailPage({ title, location, images, description, price }) {
  const tourTitle = title || "Khám phá vẻ đẹp Việt Nam";
  const tourLocation = location || "Việt Nam";
  const tourImage =
    images?.[0] ||
    images ||
    "https://images.unsplash.com/photo-1557409518-691ebcd96038?auto=format&fit=crop&w=1400&q=80";
  const tourPrice = price || "2.900.000 ₫";

  return (
    <main className="bg-slate-50 px-4 pb-14 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-md bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            <MapPinned size={18} />
            Chi tiết tour
          </div>

          <h1 className="max-w-4xl text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            {tourTitle}
          </h1>

          <p className="mt-4 flex items-center gap-2 text-base font-medium text-blue-500">
            <FontAwesomeIcon
              icon={faLocationDot}
              style={{ color: "rgb(116, 192, 252)" }}
            />
            {tourLocation}
          </p>
        </div>

        <div className="relative mb-8 h-[360px] overflow-hidden rounded-lg shadow-xl sm:h-[460px] lg:h-[540px]">
          <img
            src={tourImage}
            alt={tourTitle}
            className="h-full w-full object-cover transition duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <section className="rounded-lg border border-blue-100 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-slate-800">
              <FontAwesomeIcon
                icon={faCircleInfo}
                style={{ color: "rgb(116, 192, 252)" }}
              />
              Mô tả chi tiết
            </h2>

            <p className="leading-8 text-slate-600">
              {description ||
                "Hành trình đưa bạn qua những điểm đến nổi bật, kết hợp cảnh quan thiên nhiên, văn hóa địa phương và trải nghiệm nghỉ dưỡng đáng nhớ."}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Lịch trình rõ ràng", "Hỗ trợ tận tâm", "Dịch vụ chất lượng"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 rounded-md bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"
                  >
                    <CheckCircle2 size={18} className="text-blue-500" />
                    {item}
                  </div>
                )
              )}
            </div>
          </section>

          <aside className="rounded-lg border border-blue-100 bg-white p-5 shadow-xl lg:sticky lg:top-28">
            <div className="border-b border-slate-100 pb-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Giá từ
              </p>
              <div className="mt-2 text-3xl font-extrabold text-orange-500">
                {tourPrice}
                <span className="ml-1 text-sm font-medium text-slate-500">
                  / khách
                </span>
              </div>
            </div>

            <div className="py-5">
              <label className="mb-2 block text-sm font-bold text-slate-800">
                Chọn lịch trình
              </label>

              <div className="relative">
                <CalendarDays
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
                />
                <select className="h-12 w-full cursor-pointer rounded-md border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100">
                  <option value="">Đang cập nhật lịch trình</option>
                </select>
              </div>
            </div>

            <Link to={"/booking"} >
              <button className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-orange-500 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 active:scale-[0.98]">
                <FontAwesomeIcon icon={faBolt} />
                Bắt đầu đặt chỗ
              </button>
            </Link>

            <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs font-medium text-slate-400">
              <FontAwesomeIcon
                icon={faShield}
                style={{ color: "rgb(116, 192, 252)" }}
              />
              Thanh toán an toàn và bảo mật
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}