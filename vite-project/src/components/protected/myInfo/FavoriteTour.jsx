import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Trash2 } from "lucide-react";

export default function FavoriteTour() {
  const [favoriteTours, setFavoriteTours] = useState([
    {
      id: 1,
      title: "Hành trình di sản Hội An",
      image:
        "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80",
      price: "1.200.000đ",
      duration: "2 ngày 1 đêm",
    },
    {
      id: 2,
      title: "Khám phá động Phong Nha",
      image:
        "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
      price: "2.500.000đ",
      duration: "3 ngày 2 đêm",
    },
  ]);

  const handleRemoveFavorite = (id) => {
    setFavoriteTours((prev) => prev.filter((tour) => tour.id !== id));
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-10 pt-2 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 rounded-lg border border-blue-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-red-50 text-red-500">
              <Heart size={23} fill="currentColor" />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-500">
                VietTravel
              </p>
              <h1 className="text-2xl font-bold text-slate-900">
                Tour yêu thích của tôi
              </h1>
            </div>
          </div>

          <p className="mt-4 text-slate-500">
            Lưu lại những hành trình bạn quan tâm để xem và đặt tour nhanh hơn.
          </p>
        </div>

        {favoriteTours.length > 0 ? (
          <div className="space-y-4">
            {favoriteTours.map((tour) => (
              <div
                key={tour.id}
                className="group overflow-hidden rounded-lg border border-blue-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="grid gap-4 p-4 sm:grid-cols-[160px_1fr_auto] sm:items-center">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="h-44 w-full rounded-md object-cover sm:h-28 sm:w-40"
                  />

                  <div>
                    <h2 className="text-lg font-bold text-slate-900 transition group-hover:text-blue-600">
                      {tour.title}
                    </h2>

                    <div className="mt-2 flex flex-wrap gap-2 text-sm">
                      <span className="rounded-md bg-orange-50 px-3 py-1 font-bold text-orange-600">
                        {tour.price}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 sm:flex-col sm:items-end">
                    <Link
                      to={`/tourDetail/${tour.id}`}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 sm:flex-none"
                    >
                      Chi tiết
                      <ArrowRight size={16} />
                    </Link>

                    <button
                      onClick={() => handleRemoveFavorite(tour.id)}
                      className="inline-flex items-center justify-center rounded-md bg-red-50 px-4 py-2 font-semibold text-red-600 transition hover:bg-red-100"
                      title="Xóa khỏi yêu thích"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-blue-100 bg-white px-4 py-16 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-md bg-red-50 text-red-500">
              <Heart size={28} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Chưa có tour yêu thích
            </h2>
            <p className="mt-2 text-slate-500">
              Hãy khám phá danh sách tour và lưu lại hành trình bạn thích.
            </p>
            <Link
              to="/tours"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-orange-500 px-5 py-2.5 font-bold text-white transition hover:bg-orange-600"
            >
              Khám phá tour
              <ArrowRight size={17} />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}