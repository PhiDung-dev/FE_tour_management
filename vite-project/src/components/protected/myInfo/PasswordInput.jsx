export default function PasswordInput({ label, value, onChange, visible, onToggle }) {

  return (

    <>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">

        <Lock
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="h-12 w-full rounded-md border border-slate-200 bg-slate-50 pl-11 pr-12 text-slate-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
          placeholder="Nhập mật khẩu..."
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
        >

          {visible
            ? <EyeOff size={19} />
            : <Eye size={19} />
          }

        </button>

      </div>
    </>
  );
}