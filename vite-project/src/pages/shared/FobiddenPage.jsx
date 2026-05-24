import { Link } from "react-router-dom";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <section className="w-full max-w-lg rounded-lg border border-red-100 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-md bg-red-50 text-red-500">
          <ShieldAlert size={34} />
        </div>

        <p className="text-sm font-bold uppercase tracking-wide text-red-500">
          403 Forbidden
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Bạn không có quyền truy cập
        </h1>

        <p className="mt-3 text-slate-500">
          Tài khoản hiện tại không được phép truy cập trang hoặc thao tác này.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-blue-500 px-5 font-bold text-white transition hover:bg-blue-600"
        >
          <ArrowLeft size={18} />
          Về trang chủ
        </Link>
      </section>
    </main>
  );
}