export default function StatCard ({ icon, label, value, className }) {
    const Icon = icon;
    return (
        <>
            <div className="rounded-lg border border-blue-100 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold text-slate-500">{label}</p>
                        <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
                    </div>

                    <div className={`flex h-12 w-12 items-center justify-center rounded-md bg-slate-50 ${className}`}>
                        <Icon size={24} />
                    </div>
                </div>
            </div>
        </>
    )
}