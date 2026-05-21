import React, { useMemo, useState } from "react";
import {
  CheckCircle2,
  ClipboardList,
  Clock3,
  UserRoundCheck,
  XCircle,
} from "lucide-react";

export default function StaffBookingPage() {
  const [bookings, setBookings] = useState([
    {
      id: "BK001",
      customerName: "Nguyễn Văn A",
      tourName: "Hành trình di sản Hội An",
      bookingDate: "2026-05-10",
      status: "Pending",
    },
    {
      id: "BK002",
      customerName: "Trần Thị B",
      tourName: "Khám phá động Phong Nha",
      bookingDate: "2026-05-12",
      status: "Pending",
    },
  ]);

  const pendingBookings = useMemo(
    () => bookings.filter((booking) => booking.status === "Pending"),
    [bookings]
  );

  const approvedCount = bookings.filter(
    (booking) => booking.status === "Approved"
  ).length;

  const rejectedCount = bookings.filter(
    (booking) => booking.status === "Rejected"
  ).length;

  const handleUpdateStatus = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-10 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 rounded-lg border border-blue-100 bg-white p-5 shadow-sm sm:p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-500">
              Staff Dashboard
            </p>
            <h1 className="text-3xl font-bold text-slate-900">
              Phê duyệt đặt tour
            </h1>
            <p className="mt-2 text-slate-500">
              Kiểm tra và xử lý các yêu cầu đặt tour đang chờ xác nhận.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-md bg-blue-50 px-4 py-2 font-semibold text-blue-600">
            <UserRoundCheck size={18} />
            Nhân viên hệ thống
          </div>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={Clock3}
            label="Đang chờ"
            value={pendingBookings.length}
            className="text-orange-500"
          />
          <StatCard
            icon={CheckCircle2}
            label="Đã duyệt"
            value={approvedCount}
            className="text-green-500"
          />
          <StatCard
            icon={XCircle}
            label="Đã từ chối"
            value={rejectedCount}
            className="text-red-500"
          />
        </div>

        <section className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Danh sách chờ phê duyệt
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {pendingBookings.length} yêu cầu đang cần xử lý.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-100">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-blue-50 text-slate-700">
                <tr>
                  <th className="p-3 font-semibold">Mã đơn</th>
                  <th className="p-3 font-semibold">Khách hàng</th>
                  <th className="p-3 font-semibold">Tour</th>
                  <th className="p-3 font-semibold">Ngày đặt</th>
                  <th className="p-3 font-semibold">Trạng thái</th>
                  <th className="p-3 text-right font-semibold">Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {pendingBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-t border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="p-3 font-bold text-slate-800">
                      #{booking.id}
                    </td>
                    <td className="p-3 font-medium text-slate-700">
                      {booking.customerName}
                    </td>
                    <td className="p-3 text-slate-600">{booking.tourName}</td>
                    <td className="p-3 text-slate-500">
                      {booking.bookingDate}
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 rounded-md bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
                        <Clock3 size={14} />
                        Chờ duyệt
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            handleUpdateStatus(booking.id, "Approved")
                          }
                          className="inline-flex items-center gap-1 rounded-md bg-green-500 px-3 py-2 font-semibold text-white transition hover:bg-green-600"
                        >
                          <CheckCircle2 size={16} />
                          Duyệt
                        </button>

                        <button
                          onClick={() =>
                            handleUpdateStatus(booking.id, "Rejected")
                          }
                          className="inline-flex items-center gap-1 rounded-md bg-red-50 px-3 py-2 font-semibold text-red-600 transition hover:bg-red-100"
                        >
                          <XCircle size={16} />
                          Từ chối
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {pendingBookings.length === 0 && (
              <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-md bg-blue-50 text-blue-500">
                  <ClipboardList size={28} />
                </div>
                <p className="text-lg font-bold text-slate-800">
                  Không có yêu cầu đang chờ
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Tất cả yêu cầu đặt tour đã được xử lý.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

const StatCard = ({ icon: label, value, className }) => (
  <div className="rounded-lg border border-blue-100 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold text-slate-500">{label}</p>
        <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
      </div>

      <div className={`flex h-12 w-12 items-center justify-center rounded-md bg-slate-50 ${className}`}>
        <Icon size={24} />
      </div>
    </div>
  </div>
);