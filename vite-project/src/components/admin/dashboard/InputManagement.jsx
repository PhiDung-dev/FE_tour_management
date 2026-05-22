export default function InputManagement ({ label, value, onChange, type = "text" }) {
    return (
        <>
            <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">{label}</label>
                <input
                    type={type}
                    className="w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </>
    )
}