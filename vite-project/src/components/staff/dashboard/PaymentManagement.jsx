import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Clock3, Search } from "lucide-react";

import { readPayments, updatePayment } from "../../../api/paymentApi";
import { readTours } from "../../../api/tourApi";
import StatCard from "./StartCart";

function getResult(data) {
  return data?.result || data || [];
}

function formatPrice(price) {
  return `${new Intl.NumberFormat("vi-VN").format(Number(price || 0))}đ`;
}

function formatDate(date) {
  if (!date) return "Chưa cập nhật";

  return new Date(date).toLocaleDateString("vi-VN");
}

function normalizeStatus(status) {
  return String(status || "").toUpperCase();
}

function getStatusLabel(status) {
  const value = normalizeStatus(status);

  if (value === "PAID") return "Đã thanh toán";
  if (value === "CANCELLED") return "Đã hủy";

  return "Chưa thanh toán";
}

function getStatusClass(status) {
  const value = normalizeStatus(status);

  if (value === "PAID") return "bg-green-50 text-green-700";
  if (value === "CANCELLED") return "bg-red-50 text-red-700";

  return "bg-orange-50 text-orange-700";
}

export default function PaymentManagementPage() {
  const [payments, setPayments] = useState([]);
  const [tours, setTours] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);

      const [paymentData, tourData] = await Promise.all([
        readPayments(),
        readTours(),
      ]);

      setPayments(getResult(paymentData));
      setTours(getResult(tourData));
    } catch (error) {
      console.error("Lỗi khi lấy danh sách payment:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const tourById = useMemo(() => {
    return tours.reduce((map, tour) => {
      map[String(tour.id)] = tour;
      return map;
    }, {});
  }, [tours]);

  const normalizedPayments = useMemo(() => {
    return payments.map((payment) => {
      const booking = payment.booking || {};
      const user = booking.user || {};
      const schedule = booking.schedule || {};
      const tour = tourById[String(schedule.tourId)] || {};

      return {
        id: payment.id || "",
        amount: payment.amount,
        status: normalizeStatus(payment.status),
        bookingId: booking.id || "",
        customerName: user.fullName || "Chưa cập nhật",
        customerEmail: user.email || "",
        customerPhone: user.phoneNumber || "",
        tourTitle: tour.title || schedule.tourTitle || "Chưa cập nhật",
        startDate: schedule.startDate || "",
        endDate: schedule.endDate || "",
        quantity: booking.quantity || 0,
        description: booking.description || "",
      };
    });
  }, [payments, tourById]);

  const filteredPayments = useMemo(() => {
    const searchValue = keyword.trim().toLowerCase();

    return normalizedPayments.filter((payment) => {
      const searchText = [
        payment.id,
        payment.bookingId,
        payment.customerName,
        payment.customerEmail,
        payment.customerPhone,
        payment.tourTitle,
        payment.status,
      ]
        .join(" ")
        .toLowerCase();

      return searchText.includes(searchValue);
    });
  }, [keyword, normalizedPayments]);

  const stats = useMemo(() => {
    return normalizedPayments.reduce(
      (result, payment) => {
        if (payment.status === "PAID") {
          result.paid += 1;
          result.paidAmount += Number(payment.amount || 0);
        } else {
          result.unpaid += 1;
        }

        return result;
      },
      {
        paid: 0,
        unpaid: 0,
        paidAmount: 0,
      }
    );
  }, [normalizedPayments]);

  const handleUpdateStatus = async (paymentId, status) => {
    const label = getStatusLabel(status);
    const confirmed = window.confirm(`Cập nhật payment thành "${label}"?`);

    if (!confirmed) return;

    try {
      setUpdatingId(paymentId);

      await updatePayment(paymentId, { status });
      await fetchData();

      alert("Cập nhật trạng thái thanh toán thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật payment:", error);

      alert("Cập nhật trạng thái thanh toán thất bại.");
    } finally {
      setUpdatingId("");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-10 pt-2 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="mb-6 grid gap-4 md:grid-cols-3">
          <StatCard
            label="Chưa thanh toán"
            value={stats.unpaid}
            icon={Clock3}
            className="text-orange-500"
          />

          <StatCard
            label="Đã thanh toán"
            value={stats.paid}
            icon={CheckCircle2}
            className="text-green-500"
          />
        </section>

        <section className="mb-6 rounded-lg border border-blue-100 bg-white p-4 shadow-sm">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Tìm theo mã payment, booking, khách hàng, tour..."
              className="h-11 w-full rounded-md border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </section>

        <section className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              Danh sách thanh toán
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {loading
                ? "Đang tải dữ liệu..."
                : `Tìm thấy ${filteredPayments.length} payment phù hợp.`}
            </p>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-100">
            <table className="w-full min-w-[1150px] text-left text-sm">
              <thead className="bg-blue-50 text-slate-700">
                <tr>
                  <th className="p-3">Mã payment</th>
                  <th className="p-3">Mã booking</th>
                  <th className="p-3">Khách hàng</th>
                  <th className="p-3">Tour</th>
                  <th className="p-3">Lịch trình</th>
                  <th className="p-3">Số tiền</th>
                  <th className="p-3">Trạng thái</th>
                  <th className="p-3 text-right">Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {filteredPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-t border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="p-3 font-bold text-slate-800">
                      #{payment.id}
                    </td>

                    <td className="p-3 font-semibold text-slate-700">
                      #{payment.bookingId}
                    </td>

                    <td className="p-3">
                      <p className="font-semibold text-slate-800">
                        {payment.customerName}
                      </p>

                      <p className="text-xs text-slate-500">
                        {payment.customerPhone || payment.customerEmail}
                      </p>
                    </td>

                    <td className="p-3 text-slate-600">
                      {payment.tourTitle}
                    </td>

                    <td className="p-3 text-slate-500">
                      {formatDate(payment.startDate)} - {formatDate(payment.endDate)}
                    </td>

                    <td className="p-3 font-bold text-blue-600">
                      {formatPrice(payment.amount)}
                    </td>

                    <td className="p-3">
                      <span
                        className={`rounded-md px-3 py-1 text-xs font-bold ${getStatusClass(
                          payment.status
                        )}`}
                      >
                        {getStatusLabel(payment.status)}
                      </span>
                    </td>

                    <td className="p-3 text-right">
                      {payment.status !== "PAID" ? (
                        <button
                          type="button"
                          disabled={updatingId === payment.id}
                          onClick={() => handleUpdateStatus(payment.id, "PAID")}
                          className="inline-flex items-center gap-1 rounded-md bg-green-500 px-3 py-2 font-semibold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          <CheckCircle2 size={16} />
                          Đã thanh toán
                        </button>
                      ) : (
                        <span className="text-sm font-semibold text-slate-400">
                          Hoàn tất
                        </span>
                      )}
                    </td>
                  </tr>
                ))}

                {!loading && filteredPayments.length === 0 && (
                  <tr>
                    <td colSpan="8" className="p-8 text-center text-slate-500">
                      Không tìm thấy payment phù hợp.
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
