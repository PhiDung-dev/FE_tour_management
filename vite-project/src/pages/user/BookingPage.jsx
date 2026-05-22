import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, CheckCircle2, ClipboardCheck, MapPin, Minus, Plus, ShieldCheck, TicketCheck, UserRound } from "lucide-react";

export default function BookingPage() {
  const [guestCount, setGuestCount] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [note, setNote] = useState("");

  const tour = {
    id: "TOUR001",
    title: "Khám phá vẻ đẹp Việt Nam",
    location: "Đà Nẵng, Hội An",
    image:
      "https://images.unsplash.com/photo-1557409518-691ebcd96038?auto=format&fit=crop&w=1000&q=80",
    price: 2900000,
  };

  const totalPrice = useMemo(() => tour.price * guestCount, [guestCount]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN").format(price) + "đ";

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingData = {
      tourId: tour.id,
      guestCount,
      startDate,
      note,
      totalPrice,
    };

    console.log("Booking data:", bookingData);
    alert("Đặt tour thành công! Đơn của bạn đang chờ nhân viên phê duyệt.");

    // Sau này gọi API ở đây:
    // createBooking(bookingData)
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-10 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/tourDetail"
          className="mb-5 inline-flex items-center gap-2 font-semibold text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Quay lại chi tiết tour
        </Link>

        <section className="mb-6 rounded-lg border border-blue-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-500">
                VietTravel Booking
              </p>
              <h1 className="text-3xl font-bold text-slate-900">
                Xác nhận đặt tour
              </h1>
              <p className="mt-2 text-slate-500">
                Kiểm tra thông tin và hoàn tất yêu cầu đặt tour của bạn.
              </p>
            </div>

            <div className="inline-flex w-max items-center gap-2 rounded-md bg-green-50 px-4 py-2 font-semibold text-green-600">
              <ShieldCheck size={18} />
              Chờ phê duyệt sau khi đặt
            </div>
          </div>
        </section>

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 lg:grid-cols-[1fr_380px]"
        >
          <section className="rounded-lg border border-blue-100 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-slate-900">
              <ClipboardCheck size={22} className="text-blue-500" />
              Thông tin đặt tour
            </h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Ngày khởi hành
                </label>
                <div className="relative">
                  <CalendarDays
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
                  />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="h-12 w-full rounded-md border border-slate-200 bg-slate-50 pl-12 pr-4 text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Số khách
                </label>
                <div className="flex h-12 w-full max-w-xs items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3">
                  <button
                    type="button"
                    onClick={() => setGuestCount((prev) => Math.max(1, prev - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-slate-600 shadow-sm hover:text-blue-600"
                  >
                    <Minus size={16} />
                  </button>

                  <div className="flex items-center gap-2 font-bold text-slate-800">
                    <UserRound size={18} className="text-blue-500" />
                    {guestCount} khách
                  </div>

                  <button
                    type="button"
                    onClick={() => setGuestCount((prev) => prev + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-slate-600 shadow-sm hover:text-blue-600"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Ghi chú
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ví dụ: Tôi muốn phòng gần trung tâm, cần hỗ trợ trẻ nhỏ..."
                  className="min-h-32 w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </section>

          <aside className="rounded-lg border border-blue-100 bg-white p-5 shadow-xl lg:sticky lg:top-28">
            <img
              src={tour.image}
              alt={tour.title}
              className="mb-4 h-48 w-full rounded-md object-cover"
            />

            <h2 className="text-xl font-bold leading-snug text-slate-900">
              {tour.title}
            </h2>

            <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-blue-500">
              <MapPin size={17} />
              {tour.location}
            </p>

            <div className="mt-5 space-y-3 border-y border-slate-100 py-5">
              <PriceRow label="Giá / khách" value={formatPrice(tour.price)} />
              <PriceRow label="Số khách" value={`${guestCount} khách`} />
              <PriceRow
                label="Tổng tiền"
                value={formatPrice(totalPrice)}
                highlight
              />
            </div>

            <button
              type="submit"
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-orange-500 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 active:scale-[0.98]"
            >
              <TicketCheck size={19} />
              Xác nhận đặt tour
            </button>

            <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs font-medium text-slate-400">
              <CheckCircle2 size={15} className="text-green-500" />
              Booking sẽ được gửi đến nhân viên để phê duyệt.
            </p>
          </aside>
        </form>
      </div>
    </main>
  );
}

const PriceRow = ({ label, value, highlight = false }) => (
  <div className="flex items-center justify-between gap-4">
    <span className="text-sm font-medium text-slate-500">{label}</span>
    <span
      className={`font-bold ${
        highlight ? "text-2xl text-orange-500" : "text-slate-800"
      }`}
    >
      {value}
    </span>
  </div>
);