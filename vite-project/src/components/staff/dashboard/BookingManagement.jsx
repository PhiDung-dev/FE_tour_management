import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ClipboardList, Eye, Search, Ticket, Wallet, X, XCircle } from "lucide-react";
import { deleteBooking, readBookings } from "../../../api/bookingApi";
import { createPayment, readPayments } from "../../../api/paymentApi";
import { readTours } from "../../../api/tourApi";
import StatCard from "./StartCart";

function getResult(data) {
  return data?.result || data || [];
}

function formatDate(date) {
  if (!date) return "Chưa cập nhật";

  return new Date(date).toLocaleDateString("vi-VN");
}

function formatPrice(price) {
  return `${new Intl.NumberFormat("vi-VN").format(Number(price || 0))}đ`;
}

function DetailField({
  label,
  value,
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-800">
        {value || "Không có"}
      </p>
    </div>
  );
}

export default function BookingManagementPage() {
  const [bookings, setBookings] = useState([]);

  const [tours, setTours] = useState([]);

  const [payments, setPayments] = useState([]);

  const [keyword, setKeyword] = useState("");

  const [loading, setLoading] = useState(false);

  const [processingId, setProcessingId] =  useState("");

  const [
    selectedBooking,
    setSelectedBooking,
  ] = useState(null);

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

          const tourId =
            schedule.tourId ||
            schedule.tour?.id ||
            booking.tourId;

          const tour =
            schedule.tour ||
            tourById[String(tourId)] ||
            {};

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
            <table className="w-full min-w-[1040px] text-left text-sm">
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
                    Số lượng
                  </th>

                  <th className="p-3 font-semibold">
                    Tổng tiền
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

                      <td className="p-3">
                        <div className="flex flex-wrap justify-end gap-2">
                          <button
                            onClick={() =>
                              setSelectedBooking(
                                booking
                              )
                            }
                            className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-3 py-2 font-semibold text-blue-600 transition hover:bg-blue-100"
                          >
                            <Eye size={16} />
                            Xem chi tiết
                          </button>

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
                        colSpan="6"
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

        {selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 px-4 py-6">
            <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl">
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5">
                <div>
                  <p className="text-sm font-semibold text-blue-600">
                    Booking #{selectedBooking.id}
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-slate-900">
                    Chi tiết đặt tour
                  </h3>
                </div>

                <button
                  onClick={() =>
                    setSelectedBooking(null)
                  }
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                  aria-label="Đóng chi tiết booking"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid gap-5 p-5 sm:grid-cols-2">
                <DetailField
                  label="Khách hàng"
                  value={
                    selectedBooking.customerName
                  }
                />

                <DetailField
                  label="Liên hệ"
                  value={
                    selectedBooking.customerPhone ||
                    selectedBooking.customerEmail
                  }
                />

                <DetailField
                  label="Tour"
                  value={
                    selectedBooking.tourName
                  }
                />

                <DetailField
                  label="Lịch trình"
                  value={`${formatDate(
                    selectedBooking.startDate
                  )} - ${formatDate(
                    selectedBooking.endDate
                  )}`}
                />

                <DetailField
                  label="Số lượng"
                  value={
                    selectedBooking.quantity
                  }
                />

                <DetailField
                  label="Tổng tiền"
                  value={formatPrice(
                    selectedBooking.totalPrice
                  )}
                />

                <DetailField
                  label="Số chỗ"
                  value={
                    selectedBooking.slot
                  }
                />

                <DetailField
                  label="Trạng thái"
                  value={
                    selectedBooking.approved
                      ? "Đã duyệt"
                      : "Chờ duyệt"
                  }
                />

                <div className="sm:col-span-2">
                  <div className="rounded-lg bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase text-slate-400">
                      Ghi chú
                    </p>

                    <p className="mt-2 whitespace-pre-line text-sm text-slate-700">
                      {selectedBooking.description ||
                        "Không có"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end border-t border-slate-100 p-5">
                <button
                  onClick={() =>
                    setSelectedBooking(null)
                  }
                  className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
