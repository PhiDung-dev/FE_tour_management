import { useEffect, useState } from "react";
import { Mail, MapPin, Phone, Save, User } from "lucide-react";

import InputInfo from "./InputInfo";
import { createUser, updateUser } from "../../../api/userApi";

function normalizeUser(data, fallbackAccountId = "") {
  const user = data?.result || data || {};

  return {
    id: user.id || user.userId || "",
    fullName: user.fullName || user.fullname || "",
    email: user.email || "",
    phoneNumber: user.phoneNumber || user.phone || "",
    address: user.address || "",
    accountId:
      user.accountId ||
      user.account?.id ||
      fallbackAccountId,
  };
}

export default function MyInforForm({
  userInfoProp,
  onUpdated,
}) {
  const [userInfo, setUserInfo] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // load dữ liệu user
  useEffect(() => {
    const accountId =
      localStorage.getItem("accountId") || "";

    const data = {
      ...userInfoProp,
      accountId,
    };

    setUserInfo(data);

    // nếu đã có user => lưu userId
    if (data?.id) {
      localStorage.setItem("userId", data.id);
    } else {
      // chưa có user => xoá userId
      localStorage.removeItem("userId");
    }
  }, [userInfoProp]);

  const handleChange = (field, value) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    setUserInfo(userInfoProp || {});
    setError("");
  };

  const validateForm = () => {
    if (!userInfo.accountId) {
      return "Không tìm thấy accountId. Vui lòng đăng nhập lại.";
    }

    if (!userInfo.fullName?.trim()) {
      return "Vui lòng nhập họ và tên.";
    }

    if (!userInfo.email?.trim()) {
      return "Vui lòng nhập email.";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    const validationMessage = validateForm();

    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    try {
      setSaving(true);

      const payload = {
        fullName: userInfo.fullName.trim(),
        email: userInfo.email.trim(),
        phoneNumber: userInfo.phoneNumber || "",
        address: userInfo.address || "",
        accountId: userInfo.accountId,
      };

      console.log("PAYLOAD:", payload);

      // có user => update
      // chưa có user => create
      const response = userInfo.id
        ? await updateUser(userInfo.id, payload)
        : await createUser(payload);

      console.log("USER RESPONSE:", response);

      const savedUser = normalizeUser(
        response,
        userInfo.accountId
      );

      console.log("SAVED USER:", savedUser);

      setUserInfo(savedUser);

      // chỉ lưu khi backend trả về id thật
      if (savedUser.id) {
        localStorage.setItem(
          "userId",
          savedUser.id
        );

        console.log(
          "Đã lưu userId:",
          savedUser.id
        );
      }

      onUpdated?.(savedUser);

      alert(
        userInfo.id
          ? "Cập nhật thông tin thành công!"
          : "Tạo thông tin cá nhân thành công!"
      );
    } catch (err) {
      console.error(
        "Lỗi khi lưu thông tin user:",
        err
      );

      console.log(
        "ERROR RESPONSE:",
        err.response?.data
      );

      setError(
        err.response?.data?.message ||
          "Lưu thông tin thất bại."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="mb-6 border-b border-slate-100 pb-5">
        <h2 className="text-2xl font-bold text-slate-900">
          Chi tiết tài khoản
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {userInfo.id
            ? "Cập nhật thông tin để VietTravel hỗ trợ bạn tốt hơn."
            : "Bạn chưa có thông tin cá nhân. Điền thông tin bên dưới để tạo hồ sơ."}
        </p>
      </div>

      <form
        className="grid gap-5 md:grid-cols-2"
        onSubmit={handleSubmit}
      >
        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 md:col-span-2">
            {error}
          </div>
        )}

        <InputInfo
          icon={User}
          label="Họ và tên"
          value={userInfo.fullName || ""}
          onChange={(value) =>
            handleChange("fullName", value)
          }
        />

        <InputInfo
          icon={Mail}
          label="Email"
          type="email"
          value={userInfo.email || ""}
          onChange={(value) =>
            handleChange("email", value)
          }
        />

        <InputInfo
          icon={Phone}
          label="Số điện thoại"
          value={userInfo.phoneNumber || ""}
          onChange={(value) =>
            handleChange("phoneNumber", value)
          }
        />

        <InputInfo
          icon={MapPin}
          label="Địa chỉ"
          value={userInfo.address || ""}
          onChange={(value) =>
            handleChange("address", value)
          }
        />

        <div className="mt-3 flex flex-col-reverse gap-3 md:col-span-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-md px-5 py-3 font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            Hủy bỏ
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-orange-500 px-6 py-3 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Save size={18} />

            {saving
              ? "Đang lưu..."
              : userInfo.id
              ? "Lưu thay đổi"
              : "Tạo thông tin"}
          </button>
        </div>
      </form>
    </>
  );
}