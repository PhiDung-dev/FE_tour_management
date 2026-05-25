import { Mail, MapPin, Phone, ShieldCheck, User, X } from "lucide-react";
import InfoRow from "./InfoRow";

export default function UserDetailModal({ user, onClose }) {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-lg bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Thông tin user
            </h3>
            <p className="mt-1 text-sm text-slate-500">#{user.id}</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3 p-5">
          <InfoRow icon={User} label="Họ tên" value={user.fullName} />
          <InfoRow icon={Mail} label="Email" value={user.email} />
          <InfoRow
            icon={Phone}
            label="Số điện thoại"
            value={user.phone || user.phoneNumber}
          />
          <InfoRow icon={MapPin} label="Địa chỉ" value={user.address} />
        </div>

        <div className="flex justify-end border-t border-slate-100 p-5">
          <button
            onClick={onClose}
            className="rounded-md bg-blue-500 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
