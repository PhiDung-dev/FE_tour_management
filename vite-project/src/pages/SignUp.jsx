function SignUp() {
    return (
      <div>
        <div >
             <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl border border-slate-100 w-full max-w-[420px] justify-self-center md:justify-self-center ">
                <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Đăng ký để bắt đầu</h2>
          
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
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 ml-2">Email</label>
              <input 
                type="email" 
                placeholder="Nhập email...@..."
                className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 ml-2">Nhập lại mật khẩu</label>
              <input 
                type="password" 
                placeholder="Nhập lại mật khẩu..."
                className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all"
              />
            </div>

            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                
              </div>
            </div>

            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 transition-all active:scale-95 mt-2 cursor-pointer">
              Đăng ký
            </button>

            <p className="text-center text-sm text-slate-500 mt-4">
              Bạn đã có tài khoản?{' '}
              {/* <Link to="/DangKy" className="text-orange-600 font-bold hover:underline">*/}
               {/* Đăng ký ngay */}
             {/*</p>} </Link>*/}
            </p>
            </form>
            </div>
        </div>
     </div>
    )
}   
export default SignUp;