import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff, UserPlus, ArrowRight, MapPinned } from "lucide-react";
import { createAccount } from "../../api/accountApi";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!formData.username.trim()) {
      setError("Vui lòng nhập tên đăng nhập.");
      return;
    }

    if (!formData.password) {
      setError("Vui lòng nhập mật khẩu.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu nhập lại không khớp.");
      return;
    }

    try {
      setLoading(true);

      await createAccount({
        username: formData.username.trim(),
        password: formData.password
      });

      alert("Đăng ký tài khoản thành công!");
      navigate("/login");
    } catch (err) {
      console.error("Lỗi khi đăng ký:", err);
      setError(err.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-lg border border-white bg-white/70 shadow-2xl shadow-slate-200/70 backdrop-blur lg:grid-cols-[0.9fr_1.1fr]">
          <div className="hidden bg-gradient-to-br from-blue-500 to-cyan-400 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="mb-8 inline-flex items-center gap-2 rounded-md bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
                <MapPinned size={18} />
                VietTravel
              </div>

              <h1 className="text-4xl font-bold leading-tight">
                Tạo tài khoản để bắt đầu hành trình mới
              </h1>

              <p className="mt-4 leading-7 text-blue-50">
                Lưu tour yêu thích, đặt lịch nhanh hơn và quản lý chuyến đi của
                bạn ở một nơi.
              </p>
            </div>

            <div className="rounded-lg bg-white/15 p-5 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-50">
                VietTravel
              </p>
              <p className="mt-2 text-2xl font-bold">
                Khám phá Việt Nam dễ dàng hơn.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-8 text-center lg:text-left">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-blue-50 text-blue-500">
                  <UserPlus size={24} />
                </div>

                <h2 className="text-3xl font-bold text-slate-900">
                  Đăng ký tài khoản
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Điền thông tin bên dưới để bắt đầu sử dụng VietTravel.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                {error && (
                  <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                    {error}
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Tên đăng nhập
                  </label>

                  <div className="relative">
                    <User
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Nhập username"
                      className="h-12 w-full rounded-md border border-slate-200 bg-slate-50 pl-12 pr-4 text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Mật khẩu
                  </label>

                  <div className="relative">
                    <Lock
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Nhập mật khẩu"
                      className="h-12 w-full rounded-md border border-slate-200 bg-slate-50 pl-12 pr-12 text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Nhập lại mật khẩu
                  </label>

                  <div className="relative">
                    <Lock
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Nhập lại mật khẩu"
                      className="h-12 w-full rounded-md border border-slate-200 bg-slate-50 pl-12 pr-12 text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-blue-500 font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Đang đăng ký..." : "Đăng ký"}
                  <ArrowRight size={18} />
                </button>

                <p className="pt-2 text-center text-sm text-slate-500">
                  Bạn đã có tài khoản?{" "}
                  <Link
                    to="/login"
                    className="font-bold text-blue-600 hover:text-blue-700"
                  >
                    Đăng nhập ngay
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
