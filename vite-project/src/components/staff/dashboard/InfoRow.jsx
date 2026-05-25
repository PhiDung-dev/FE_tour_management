export default function InfoRow ({ icon: Icon, label, value }) {
  return (
    <>
      <div className="flex items-start gap-3 rounded-md bg-slate-50 p-4">
        {Icon && <Icon size={18} className="mt-0.5 text-blue-500" />}
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
            {label}
          </p>
          <p className="mt-1 font-semibold text-slate-800">{value || "Chưa cập nhật"}</p>
        </div>
      </div>
    </>
  )
}
