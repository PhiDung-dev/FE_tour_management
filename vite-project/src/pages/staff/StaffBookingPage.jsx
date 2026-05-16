import React, { useState } from 'react';

const StaffBookingPage = () => {
  // Giả lập dữ liệu danh sách đặt tour từ database
  const [bookings, setBookings] = useState([
    {
      id: "BK001",
      customerName: "Nguyễn Văn A",
      tourName: "Hành trình di sản Hội An",
      bookingDate: "2026-05-10",
      status: "Pending", // Trạng thái chờ phê duyệt
    },
    {
      id: "BK002",
      customerName: "Trần Thị B",
      tourName: "Khám phá động Phong Nha",
      bookingDate: "2026-05-12",
      status: "Pending",
    }
  ]);

  // Hàm xử lý phê duyệt hoặc từ chối
  const handleUpdateStatus = (id, newStatus) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedBookings);
    
    // Sau này bạn sẽ gọi API Spring Boot ở đây:
    // axios.put(`/api/staff/bookings/${id}/status`, { status: newStatus })
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl min-h-[600px]">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-slate-800">Phê duyệt Đặt Tour</h3>
        <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium">
          Nhân viên hệ thống
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 uppercase text-sm">
              <th className="pb-4 font-semibold">Mã đơn</th>
              <th className="pb-4 font-semibold">Khách hàng</th>
              <th className="pb-4 font-semibold">Tour</th>
              <th className="pb-4 font-semibold">Ngày đặt</th>
              <th className="pb-4 font-semibold text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {bookings.filter(b => b.status === "Pending").map((booking) => (
              <tr key={booking.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="py-4 font-medium text-slate-700">#{booking.id}</td>
                <td className="py-4 text-slate-600">{booking.customerName}</td>
                <td className="py-4 text-slate-600">{booking.tourName}</td>
                <td className="py-4 text-slate-500">{booking.bookingDate}</td>
                <td className="py-4 flex justify-center gap-3">
                  <button 
                    onClick={() => handleUpdateStatus(booking.id, "Approved")}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm transition-all shadow-sm"
                  >
                    Duyệt
                  </button>
                  <button 
                    onClick={() => handleUpdateStatus(booking.id, "Rejected")}
                    className="bg-red-50 hover:text-red-600 text-red-500 px-4 py-2 rounded-xl text-sm transition-all"
                  >
                    Từ chối
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bookings.filter(b => b.status === "Pending").length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 italic">Không có yêu cầu nào đang chờ phê duyệt.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffBookingPage;