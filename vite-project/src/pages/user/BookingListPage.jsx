import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  CalendarDays,
  Eye,
  MapPinned,
  Trash2,
} from "lucide-react";

import {
  readBookingsByUserId,
  deleteBooking,
} from "../../api/bookingApi";

function getResult(data) {
  return data?.result || [];
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

export default function BookingListPage() {

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const fetchBookings =
    async () => {

      try {

        setLoading(true);

        setError("");

        const userId =
          localStorage.getItem(
            "userId"
          );

        const data =
          await readBookingsByUserId(
            userId
          );
        console.log(getResult(data));
        setBookings(
          getResult(data)
        );

      } catch (error) {

        console.error(
          "Lỗi khi lấy booking:",
          error
        );

        setError(
          "Không thể tải danh sách booking."
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking =
    async (bookingId) => {

      const confirmed =
        window.confirm(
          "Bạn có chắc muốn huỷ booking này?"
        );

      if (!confirmed) return;

      try {

        await deleteBooking(
          bookingId
        );

        setBookings((prev) =>
          prev.filter(
            (item) =>
              item.id !== bookingId
          )
        );

        alert(
          "Huỷ booking thành công."
        );

      } catch (error) {

        console.error(
          "Lỗi khi huỷ booking:",
          error
        );

        alert(
          "Huỷ booking thất bại."
        );
      }
    };

  return (

    <main className="min-h-screen bg-slate-50 px-4 pb-10 pt-24 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-6 rounded-lg border border-blue-100 bg-white p-5 shadow-sm">

          <h1 className="text-2xl font-bold text-slate-900">
            Booking của tôi
          </h1>

          <p className="mt-2 text-slate-500">
            Theo dõi các tour đã đặt.
          </p>

        </div>

        {/* LOADING */}
        {loading && (

          <div className="rounded-lg bg-white p-10 text-center shadow-sm">

            <p>
              Đang tải dữ liệu...
            </p>

          </div>
        )}

        {/* ERROR */}
        {error && (

          <div className="mb-4 rounded-md bg-red-50 px-4 py-3 font-semibold text-red-600">

            {error}

          </div>
        )}

        {/* LIST */}
        {!loading &&
          bookings.length > 0 && (

          <div className="space-y-4">

            {bookings.map(
              (booking) => {

                const schedule =
                  booking.schedule || {};

                const tour =
                  schedule.tour || {};

                return (

                  <div
                    key={booking.id}
                    className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm"
                  >

                    <div className="grid gap-4 md:grid-cols-[160px_1fr_auto]">

                      <img
                        src={
                          tour.images?.[0] ||
                          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                        }
                        alt={
                          tour.title
                        }
                        className="h-40 w-full rounded-md object-cover md:h-28 md:w-40"
                      />

                      <div>

                        <h2 className="text-lg font-bold text-slate-900">
                          {tour.title ||
                            "Chưa cập nhật"}
                        </h2>

                        <div className="mt-3 space-y-2 text-sm text-slate-600">

                          <div className="flex items-center gap-2">

                            <MapPinned size={16} />

                            <span>
                              {
                                tour.destination
                              }
                            </span>

                          </div>

                          <div className="flex items-center gap-2">

                            <CalendarDays size={16} />

                            <span>
                              Khởi hành:
                              {" "}
                              {
                                schedule.startDate ||
                                "Chưa cập nhật"
                              }
                            </span>

                          </div>

                          <div className="flex items-center gap-2">

                            <CalendarDays size={16} />

                            <span>
                              Số người:
                              {" "}
                              {
                                booking.quantity
                              }
                            </span>

                          </div>

                          {booking.description && (

                            <p className="text-sm text-slate-500">

                              Ghi chú:
                              {" "}
                              {
                                booking.description
                              }

                            </p>
                          )}

                        </div>

                        <div className="mt-3">

                          <span className="rounded-md bg-orange-50 px-3 py-1 text-sm font-bold text-orange-600">

                            {formatPrice(
                              booking.totalPrice
                            )}

                          </span>

                        </div>

                      </div>

                      <div className="flex gap-2 items-end md:items-center">

                        <Link
                          to={`/tourDetail/${tour.id}`}
                          className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
                        >

                          <Eye size={18} />

                          Chi tiết

                        </Link>

                        <button
                          onClick={() =>
                            handleCancelBooking(
                              booking.id
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
                        >

                          <Trash2 size={18} />

                          Huỷ

                        </button>

                      </div>

                    </div>

                  </div>
                );
              }
            )}

          </div>
        )}

        {/* EMPTY */}
        {!loading &&
          bookings.length === 0 && (

          <div className="rounded-lg bg-white px-4 py-16 text-center shadow-sm">

            <h2 className="text-xl font-bold text-slate-900">
              Chưa có booking nào
            </h2>

            <p className="mt-2 text-slate-500">
              Hãy đặt tour để bắt đầu hành trình.
            </p>

          </div>
        )}

      </div>

    </main>
  );
}