import { Mail, MapPin, Phone, Save, User } from "lucide-react";
import InputInfo from "./InputInfo";
import { useState } from "react";

export default function MyInforForm({userInfoProp}) {
    
    const [userInfo, setUserInfo] = useState(userInfoProp);

    const handleChange = (field, value) => {
        setUserInfo((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <>
            <div className="mb-6 border-b border-slate-100 pb-5">
                <h2 className="text-2xl font-bold text-slate-900">
                Chi tiết tài khoản
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                Cập nhật thông tin để VietTravel hỗ trợ bạn tốt hơn.
                </p>
            </div>

            <form className="grid gap-5 md:grid-cols-2">

            <InputInfo
                icon={User}
                label="Họ và tên"
                value={userInfo.fullName}
                onChange={(value) => handleChange("fullName", value)}
            />

            <InputInfo
                icon={Mail}
                label="Email"
                type="email"
                value={userInfo.email}
                disabled
            />

            <InputInfo
                icon={Phone}
                label="Số điện thoại"
                value={userInfo.phone}
                onChange={(value) => handleChange("phone", value)}
            />

            <InputInfo
                icon={MapPin}
                label="Địa chỉ"
                value={userInfo.address}
                onChange={(value) => handleChange("address", value)}
            />

            <div className="mt-3 flex flex-col-reverse gap-3 md:col-span-2 sm:flex-row sm:justify-end">
            <button
                type="button"
                className="rounded-md px-5 py-3 font-semibold text-slate-600 transition hover:bg-slate-100"
            >
                Hủy bỏ
            </button>

            <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-orange-500 px-6 py-3 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 active:scale-[0.98]"
            >
                <Save size={18} />
                Lưu thay đổi
            </button>
            </div>

            </form>
        </>
    )
}