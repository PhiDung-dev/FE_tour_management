import { useEffect, useMemo, useState } from "react";

import {
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Search,
  Ticket,
  Wallet,
  XCircle,
} from "lucide-react";

import {
  deleteBooking,
  readBookings,
} from "../../../api/bookingApi";

import {
  createPayment,
  readPayments,
} from "../../../api/paymentApi";

import { readTours } from "../../../api/tourApi";

import StatCard from "./StartCart";

function getResult(data) {
  return data?.result || data || [];
}

function formatDate(date) {
  if (!date) return "Chưa cập nhật";

  return new Date(date).toLocaleDateString(
    "vi-VN"
  );
}

function formatPrice(price) {
  return `${new Intl.NumberFormat(
    "vi-VN"
  ).format(Number(price || 0))}đ`;
}

export default function BookingManagementPage() {
  const [bookings, setBookings] =
    useState([]);

  const [tours, setTours] =
    useState([]);

  const [payments, setPayments] =
    useState([]);

  const [keyword, setKeyword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [processingId, setProcessingId] =
    useState("");

  const fetchData = async () => {
    try {
      setLoading(true);

      const [
        bookingData,
        tourData,
        paymentData,
      ] = await Promise.all([
        readBookings(),
        readTours(),
        readPayments(),
      ]);

      setBookings(
        getResult(bookingData)
      );

      setTours(
        getResult(tourData)
      );

      setPayments(
        getResult(paymentData)
      );
    } catch (error) {
      console.error(
        "Lỗi khi lấy booking:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const tourById = useMemo(() => {
    return tours.reduce(
      (map, tour) => {
        map[String(tour.id)] = tour;

        return map;
      },
      {}
    );
  }, [tours]);

  const normalizedBookings =
    useMemo(() => {
      return bookings.map(
        (booking) => {
          const schedule =
            booking.schedule || {};

          const tour =
            tourById[
              String(
                schedule.tourId
              )
            ] || {};

          const payment =
            payments.find(
              (item) =>
                String(
                  item.bookingId ||
                    item.booking?.id
                ) ===
                String(booking.id)
            );

          return {
            id: booking.id || "",

            quantity:
              booking.quantity || 0,

            description:
              booking.description ||
              "",

            totalPrice:
              booking.totalPrice ||
              0,

            customerName:
              booking.user
                ?.fullName ||
              "Chưa cập nhật",

            customerEmail:
              booking.user
                ?.email || "",

            customerPhone:
              booking.user
                ?.phoneNumber ||
              "",

            tourName:
              tour.title ||
              "Chưa cập nhật",

            startDate:
              schedule.startDate ||
              "",

            endDate:
              schedule.endDate ||
              "",

            slot:
              schedule.slot || 0,

            approved: !!payment,
          };
        }
      );
    }, [
      bookings,
      tourById,
      payments,
    ]);

  const filteredBookings =
    useMemo(() => {
      const searchValue =
        keyword
          .trim()
          .toLowerCase();

      return normalizedBookings.filter(
        (booking) => {
          const searchText = [
            booking.id,
            booking.customerName,
            booking.customerEmail,
            booking.customerPhone,
            booking.tourName,
            booking.description,
          ]
            .join(" ")
            .toLowerCase();

          return searchText.includes(
            searchValue
          );
        }
      );
    }, [
      keyword,
      normalizedBookings,
    ]);

  const stats = useMemo(() => {
    return normalizedBookings.reduce(
      (result, booking) => {
        result.quantity += Number(
          booking.quantity || 0
        );

        result.revenue += Number(
          booking.totalPrice || 0
        );

        return result;
      },
      {
        quantity: 0,
        revenue: 0,
      }
    );
  }, [normalizedBookings]);

  const handleApproveBooking =
    async (booking) => {
      const confirmed =
        window.confirm(
          `Duyệt booking #${booking.id}?`
        );

      if (!confirmed) return;

      try {
        setProcessingId(
          booking.id
        );

        await createPayment({
          status: "UNPAID",
          bookingId: booking.id,
        });

        await fetchData();

        alert(
          "Duyệt booking thành công!"
        );
      } catch (error) {
        console.error(
          "Lỗi khi duyệt booking:",
          error
        );

        alert(
          "Duyệt booking thất bại."
        );
      } finally {
        setProcessingId("");
      }
    };

  const handleRejectBooking =
    async (bookingId) => {
      const confirmed =
        window.confirm(
          `Từ chối booking #${bookingId}?`
        );

      if (!confirmed) return;

      try {
        setProcessingId(
          bookingId
        );

        await deleteBooking(
          bookingId
        );

        await fetchData();

        alert(
          "Đã từ chối booking."
        );
      } catch (error) {
        console.error(
          "Lỗi khi từ chối booking:",
          error
        );

        alert(
          "Từ chối booking thất bại."
        );
      } finally {
        setProcessingId("");
      }
    };

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-10 pt-2 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={ClipboardList}
            label="Tổng booking"
            value={
              normalizedBookings.length
            }
            className="text-blue-500"
          />

          <StatCard
            icon={Ticket}
            label="Tổng số vé"
            value={stats.quantity}
            className="text-orange-500"
          />

          <StatCard
            icon={Wallet}
            label="Tổng giá trị"
            value={formatPrice(
              stats.revenue
            )}
            className="text-green-500"
          />
        </div>

        <section className="mb-6 rounded-lg border border-blue-100 bg-white p-4 shadow-sm">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={keyword}
              onChange={(event) =>
                setKeyword(
                  event.target.value
                )
              }
              placeholder="Tìm theo mã booking, khách hàng, tour..."
              className="h-11 w-full rounded-md border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </section>

        <section className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              Danh sách đặt tour
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {loading
                ? "Đang tải dữ liệu..."
                : `Tìm thấy ${filteredBookings.length} booking phù hợp.`}
            </p>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-100">
            <table className="w-full min-w-[1320px] text-left text-sm">
              <thead className="bg-blue-50 text-slate-700">
                <tr>
                  <th className="p-3 font-semibold">
                    Mã booking
                  </th>

                  <th className="p-3 font-semibold">
                    Khách hàng
                  </th>

                  <th className="p-3 font-semibold">
                    Tour
                  </th>

                  <th className="p-3 font-semibold">
                    Lịch trình
                  </th>

                  <th className="p-3 font-semibold">
                    Số lượng
                  </th>

                  <th className="p-3 font-semibold">
                    Tổng tiền
                  </th>

                  <th className="p-3 font-semibold">
                    Ghi chú
                  </th>

                  <th className="p-3 text-right font-semibold">
                    Thao tác
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map(
                  (booking) => (
                    <tr
                      key={booking.id}
                      className="border-t border-slate-100 transition hover:bg-slate-50"
                    >
                      <td className="p-3 font-bold text-slate-800">
                        #{booking.id}
                      </td>

                      <td className="p-3">
                        <p className="font-semibold text-slate-800">
                          {
                            booking.customerName
                          }
                        </p>

                        <p className="text-xs text-slate-500">
                          {booking.customerPhone ||
                            booking.customerEmail}
                        </p>
                      </td>

                      <td className="p-3 text-slate-600">
                        {
                          booking.tourName
                        }
                      </td>

                      <td className="p-3 text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays
                            size={15}
                          />

                          {formatDate(
                            booking.startDate
                          )}{" "}
                          -
                          {" "}
                          {formatDate(
                            booking.endDate
                          )}
                        </span>
                      </td>

                      <td className="p-3 font-semibold text-slate-700">
                        {
                          booking.quantity
                        }
                      </td>

                      <td className="p-3 font-bold text-blue-600">
                        {formatPrice(
                          booking.totalPrice
                        )}
                      </td>

                      <td className="p-3 text-slate-500">
                        {booking.description ||
                          "Không có"}
                      </td>

                      <td className="p-3">
                        <div className="flex justify-end gap-2">
                          {booking.approved ? (
                            <span className="inline-flex items-center gap-1 rounded-md bg-green-50 px-3 py-2 font-semibold text-green-600">
                              <CheckCircle2
                                size={16}
                              />
                              Đã duyệt
                            </span>
                          ) : (
                            <>
                              <button
                                disabled={
                                  processingId ===
                                  booking.id
                                }
                                onClick={() =>
                                  handleApproveBooking(
                                    booking
                                  )
                                }
                                className="inline-flex items-center gap-1 rounded-md bg-green-500 px-3 py-2 font-semibold text-white transition hover:bg-green-600 disabled:opacity-70"
                              >
                                <CheckCircle2
                                  size={16}
                                />
                                Duyệt
                              </button>

                              <button
                                disabled={
                                  processingId ===
                                  booking.id
                                }
                                onClick={() =>
                                  handleRejectBooking(
                                    booking.id
                                  )
                                }
                                className="inline-flex items-center gap-1 rounded-md bg-red-50 px-3 py-2 font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-70"
                              >
                                <XCircle
                                  size={16}
                                />
                                Từ chối
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                )}

                {!loading &&
                  filteredBookings.length ===
                    0 && (
                    <tr>
                      <td
                        colSpan="8"
                        className="p-8 text-center text-slate-500"
                      >
                        Không tìm thấy
                        booking phù hợp.
                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}