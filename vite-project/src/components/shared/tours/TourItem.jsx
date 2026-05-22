import { useState } from "react";
import { faLocationDot, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function TourItem({
  title,
  description,
  price,
  location,
  image,
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  const tourImage =
    image ||
    "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=600&q=80";

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsFavorite((prev) => !prev);

    // Sau này gọi API ở đây:
    // addFavoriteTour(tourId)
    // removeFavoriteTour(tourId)
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-lg border border-blue-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          src={tourImage}
          alt={title || "Tour image"}
        />

        <div className="absolute left-3 top-3 rounded-md bg-white/90 px-3 py-1 text-sm font-semibold text-blue-600 shadow-sm backdrop-blur">
          Tour nổi bật
        </div>

        <button
          type="button"
          onClick={handleToggleFavorite}
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-md shadow-sm backdrop-blur transition ${
            isFavorite
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-white/90 text-slate-500 hover:bg-red-50 hover:text-red-500"
          }`}
          title={isFavorite ? "Bỏ yêu thích" : "Lưu tour yêu thích"}
        >
          <Heart
            size={20}
            fill={isFavorite ? "currentColor" : "none"}
            strokeWidth={2.4}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-500">
          <FontAwesomeIcon
            icon={faLocationDot}
            style={{ color: "rgb(116, 192, 252)" }}
          />
          <span className="line-clamp-1">{location || "Địa điểm du lịch"}</span>
        </div>

        <h2 className="mb-2 line-clamp-2 text-lg font-bold leading-snug text-slate-800 transition group-hover:text-blue-600">
          {title || "Tên tour du lịch"}
        </h2>

        <p className="mb-5 line-clamp-3 flex-1 text-sm leading-6 text-slate-500">
          {description ||
            "Mô tả ngắn về tour du lịch, lịch trình và trải nghiệm nổi bật."}
        </p>

        <div className="flex items-end justify-between gap-3 border-t border-blue-50 pt-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Giá từ
            </p>
            <strong className="text-lg font-bold text-blue-600">
              {price || "Liên hệ"}
            </strong>
          </div>

          <Link
            className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 active:bg-blue-800"
            to="/tourDetail"
          >
            Chi tiết
            <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </Link>
        </div>
      </div>
    </div>
  );
}