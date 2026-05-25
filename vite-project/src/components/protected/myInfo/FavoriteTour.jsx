import React, {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  ArrowRight,
  Heart,
  Trash2,
} from "lucide-react";

import {
  deleteFavoriteTour,
  readFavoriteTours,
} from "../../../api/favoriteTourApi";

function getResult(data) {
  return data?.result || data || [];
}

function formatPrice(price) {
  return new Intl.NumberFormat(
    "vi-VN",
    {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }
  ).format(Number(price || 0));
}

export default function FavoriteTour() {
  const [
    favoriteTours,
    setFavoriteTours,
  ] = useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const fetchFavoriteTours =
    async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await readFavoriteTours();

        setFavoriteTours(
          getResult(data)
        );
      } catch (error) {
        console.error(
          "Lỗi khi lấy favorite tours:",
          error
        );

        setError(
          "Không thể tải danh sách tour yêu thích."
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchFavoriteTours();
  }, []);

  const handleRemoveFavorite =
    async (id) => {
      const confirmed =
        window.confirm(
          "Xóa tour khỏi danh sách yêu thích?"
        );

      if (!confirmed) return;

      try {
        await deleteFavoriteTour(id);

        setFavoriteTours((prev) =>
          prev.filter(
            (tour) =>
              String(tour.id) !==
              String(id)
          )
        );

        alert(
          "Đã xóa khỏi yêu thích!"
        );
      } catch (error) {
        console.error(
          "Lỗi khi xóa favorite:",
          error
        );

        alert(
          "Xóa tour yêu thích thất bại."
        );
      }
    };

  return (
    <main className="min-h-screen bg-slate-50 pb-10 pt-2 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 rounded-lg border border-blue-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-red-50 text-red-500">
              <Heart
                size={23}
                fill="currentColor"
              />
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

        {loading && (
          <div className="rounded-lg border border-blue-100 bg-white px-4 py-16 text-center shadow-sm">
            <p className="text-slate-500">
              Đang tải danh sách tour yêu thích...
            </p>
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        {!loading &&
          favoriteTours.length >
            0 && (
            <div className="space-y-4">
              {favoriteTours.map(
                (favorite) => {
                  const tour =
                    favorite.tour ||
                    {};

                  return (
                    <div
                      key={
                        favorite.id
                      }
                      className="group overflow-hidden rounded-lg border border-blue-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <div className="grid gap-4 p-4 sm:grid-cols-[160px_1fr_auto] sm:items-center">
                        <img
                          src={
                            tour
                              .images?.[0] ||
                            "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80"
                          }
                          alt={
                            tour.title
                          }
                          className="h-44 w-full rounded-md object-cover sm:h-28 sm:w-40"
                        />

                        <div>
                          <h2 className="text-lg font-bold text-slate-900 transition group-hover:text-blue-600">
                            {tour.title ||
                              "Chưa cập nhật"}
                          </h2>

                          <div className="mt-2 flex flex-wrap gap-2 text-sm">
                            <span className="rounded-md bg-orange-50 px-3 py-1 font-bold text-orange-600">
                              {formatPrice(
                                tour.price
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2 sm:flex-col sm:items-end">
                          <Link
                            to={`/tourDetail/${tour.id}`}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 sm:flex-none"
                          >
                            Chi tiết

                            <ArrowRight
                              size={
                                16
                              }
                            />
                          </Link>

                          <button
                            onClick={() =>
                              handleRemoveFavorite(
                                favorite.id
                              )
                            }
                            className="inline-flex items-center justify-center rounded-md bg-red-50 px-4 py-2 font-semibold text-red-600 transition hover:bg-red-100"
                            title="Xóa khỏi yêu thích"
                          >
                            <Trash2
                              size={
                                18
                              }
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}

        {!loading &&
          favoriteTours.length ===
            0 && (
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

                <ArrowRight
                  size={17}
                />
              </Link>
            </div>
          )}
      </div>
    </main>
  );
}