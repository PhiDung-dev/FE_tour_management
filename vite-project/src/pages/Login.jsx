import React from 'react';
import { Link } from 'react-router-dom';


import anhPcanh1 from '../assets/anhPcanh1.png';
import anhPcanh2 from '../assets/sapa.png';
import anhPcanh3 from '../assets/phongnha.jpg';
import anhPcanh4 from '../assets/codohue.jpg';
import anhPcanh5 from '../assets/hoian.jpg';

function Login() {
  const travelImages = [anhPcanh1, anhPcanh2, anhPcanh3, anhPcanh4, anhPcanh5];

  return (
    
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      
      
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white/40 backdrop-blur-lg border border-white/20 p-8 rounded-[2.5rem] shadow-2xl">
        
       
        <div className="space-y-6 overflow-hidden">
          <div className="px-4">
            <h1 className="text-3xl font-bold text-slate-800">
              Khám phá <span className="text-orange-500">Việt Nam</span>
            </h1>
            <p className="text-slate-600 mt-2">Hành trình mơ ước của bạn bắt đầu tại đây.</p>
          </div>

       
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <div className="flex animate-infinite-scroll whitespace-nowrap py-4">
        
              {[...travelImages, ...travelImages].map((img, index) => (
                <div key={index} className="inline-block px-3">
                  <img 
                    src={img} 
                    alt="Du lịch" 
                    className="w-72 h-48 object-cover rounded-3xl shadow-lg transition-transform hover:scale-105 duration-300" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl border border-slate-100 w-full max-w-[420px] justify-self-center md:justify-self-end">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Chào mừng trở lại</h2>
          
          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 ml-2">Email</label>
              <input 
                type="email" 
                placeholder="Nhập email..."
                className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 ml-2">Mật khẩu</label>
              <input 
                type="password" 
                placeholder="Nhập mật khẩu..."
                className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all"
              />
            </div>

            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="w-4 h-4 accent-orange-500 cursor-pointer" />
                <label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer select-none">Ghi nhớ</label>
              </div>
              <a href="#" className="text-sm text-orange-600 hover:underline">Quên mật khẩu?</a>
            </div>

            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 transition-all active:scale-95 mt-2 cursor-pointer">
              Đăng nhập
            </button>

            <p className="text-center text-sm text-slate-500 mt-4">
              Bạn chưa có tài khoản?{' '}
              {/* <Link to="/DangKy" className="text-orange-600 font-bold hover:underline">*/}
               {/* Đăng ký ngay */}
             {/*</p>} </Link>*/}
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;