import React, { useState } from "react";
import { Lock, ShieldCheck, Eye, EyeOff, Save } from "lucide-react";
import PasswordInput from "./PasswordInput";

export default function ChangePassword() {

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (field, value) => {

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {

      alert("Mật khẩu xác nhận không khớp");

      return;
    }

    console.log(formData);

    // CALL API HERE
  };

  return (

    <section className="rounded-lg border border-blue-100 bg-white p-5 shadow-sm sm:p-7">

      {/* HEADER */}
      <div className="mb-6 border-b border-slate-100 pb-5">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-orange-100 text-orange-500">
            <ShieldCheck size={24} />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-900">
              Đổi mật khẩu
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Để bảo mật tài khoản, hãy sử dụng mật khẩu mạnh.
            </p>

          </div>

        </div>

      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* CURRENT PASSWORD */}
        <PasswordInput
          label="Mật khẩu hiện tại"
          value={formData.currentPassword}
          onChange={(value) =>
            handleChange("currentPassword", value)
          }
          visible={showPassword.current}
          onToggle={() =>
            setShowPassword((prev) => ({
              ...prev,
              current: !prev.current,
            }))
          }
        />

        {/* NEW PASSWORD */}
        <PasswordInput
          label="Mật khẩu mới"
          value={formData.newPassword}
          onChange={(value) =>
            handleChange("newPassword", value)
          }
          visible={showPassword.new}
          onToggle={() =>
            setShowPassword((prev) => ({
              ...prev,
              new: !prev.new,
            }))
          }
        />

        {/* CONFIRM PASSWORD */}
        <PasswordInput
          label="Xác nhận mật khẩu mới"
          value={formData.confirmPassword}
          onChange={(value) =>
            handleChange("confirmPassword", value)
          }
          visible={showPassword.confirm}
          onToggle={() =>
            setShowPassword((prev) => ({
              ...prev,
              confirm: !prev.confirm,
            }))
          }
        />

        {/* BUTTON */}
        <div className="flex justify-end pt-3">

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md bg-orange-500 px-6 py-3 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 active:scale-[0.98]"
          >

            <Save size={18} />

            Cập nhật mật khẩu

          </button>

        </div>

      </form>

    </section>
  );
}