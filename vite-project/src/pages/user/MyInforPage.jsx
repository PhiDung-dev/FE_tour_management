import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const MyInfoPage = () => {
  // Giả lập dữ liệu từ Backend (Spring Boot)
  const [userInfo, setUserInfo] = useState({
    fullName: "Tuan Anh",
    email: "tuananh@example.com",
    phone: "0123456789",
    address: "Đà Nẵng, Việt Nam",
    avatar: "https://via.placeholder.com/150" 
  });

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-40 flex justify-center">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl flex flex-col items-center border border-slate-100">
            <div className="relative group">
              <img 
                src={userInfo.avatar} 
                alt="Avatar" 
                className="w-32 h-32 rounded-full object-cover border-4 border-orange-100 shadow-md"
              />
              <button className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full text-white shadow-lg hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                </svg>
              </button>
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-800">{userInfo.fullName}</h2>
            <p className="text-slate-500 text-sm italic">Thành viên thân thiết</p>
            
            <div className="w-full mt-8 space-y-3">
              <button className="w-full py-3 px-4 bg-orange-50 text-orange-600 rounded-xl font-semibold text-left transition-all hover:bg-orange-100">
                Thông tin cá nhân
              </button>
              
              <button className="w-full py-3 px-4 text-slate-600 rounded-xl font-medium text-left transition-all hover:bg-slate-100">
                <Link to="/myfavoriteTour">Tour yêu thích</Link>
              </button>
              <button className="w-full py-3 px-4 text-slate-600 rounded-xl font-medium text-left transition-all hover:bg-slate-100">
                Đổi mật khẩu
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-800 mb-8 border-b pb-4">Chi tiết tài khoản</h3>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Họ và tên</label>
                <input 
                  type="text" 
                  value={userInfo.fullName}
                  className="px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Email</label>
                <input 
                  type="email" 
                  value={userInfo.email}
                  disabled
                  className="px-5 py-3 rounded-2xl bg-slate-100 border border-slate-200 text-slate-500 cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Số điện thoại</label>
                <input 
                  type="text" 
                  value={userInfo.phone}
                  className="px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Địa chỉ</label>
                <input 
                  type="text" 
                  value={userInfo.address}
                  className="px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-4 mt-6">
                <button type="button" className="px-6 py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 transition-all">
                  Hủy bỏ
                </button>
                <button type="submit" className="px-10 py-3 rounded-xl bg-orange-500 text-white font-bold shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all active:scale-95">
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyInfoPage;