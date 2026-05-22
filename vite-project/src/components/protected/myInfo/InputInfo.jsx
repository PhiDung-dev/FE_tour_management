export default function InputInfo ({ icon, label, value, onChange, type = "text", disabled = false }) {

    const Icon = icon;

    return (
        <>
            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                {label}
                </label>

                <div className="relative">
                <Icon
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                    type={type}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => onChange?.(e.target.value)}
                    className={`h-12 w-full rounded-md border pl-12 pr-4 outline-none transition ${
                    disabled
                        ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-500"
                        : "border-slate-200 bg-slate-50 text-slate-800 focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
                    }`}
                />
                </div>
            </div>
        </>
    )
}