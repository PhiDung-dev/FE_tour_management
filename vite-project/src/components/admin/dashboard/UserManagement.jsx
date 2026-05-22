import React, { useMemo, useState } from "react";
import { Eye, Mail, MapPin, Phone, Search, User, Users } from "lucide-react";
import UserDetailModal from "../../staff/userManagement/UserDetailModel";
export default function UserManagement() {
  const [keyword, setKeyword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    {
      id: "U001",
      fullName: "Nguyễn Văn A",
      email: "vana@example.com",
      phone: "0123456789",
      address: "Hà Nội, Việt Nam",
      role: "USER",
      createdAt: "2026-05-10",
    },
    {
      id: "U002",
      fullName: "Trần Thị B",
      email: "thib@example.com",
      phone: "0987654321",
      address: "Đà Nẵng, Việt Nam",
      role: "USER",
      createdAt: "2026-05-15",
    },
  ];

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchText = `${user.id} ${user.fullName} ${user.email} ${user.phone}`
        .toLowerCase();

      const matchKeyword = searchText.includes(keyword.toLowerCase());
      const matchStatus =
        statusFilter === "all" || user.status === statusFilter;

      return matchKeyword && matchStatus;
    });
  }, [keyword, statusFilter]);

  return (
    <main className=" bg-slate-50 px-4 pb-10 pt-2 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <section className="mb-6 rounded-lg border border-blue-100 bg-white p-4 shadow-sm sm:p-5">
          <div className="grid gap-3 md:grid-cols-[1fr_220px]">
            <div className="relative">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Tìm theo mã user, họ tên, email hoặc số điện thoại..."
                className="h-12 w-full rounded-md border border-slate-200 bg-slate-50 pl-12 pr-4 text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              Danh sách người dùng
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Tìm thấy {filteredUsers.length} kết quả phù hợp.
            </p>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-100">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-blue-50 text-slate-700">
                <tr>
                  <th className="p-3">Mã user</th>
                  <th className="p-3">Họ tên</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Số điện thoại</th>
                  <th className="p-3">Vai trò</th>
                  <th className="p-3 text-right">Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="p-3 font-bold text-slate-800">
                      #{user.id}
                    </td>
                    <td className="p-3 font-semibold text-slate-800">
                      {user.fullName}
                    </td>
                    <td className="p-3 text-slate-500">{user.email}</td>
                    <td className="p-3 text-slate-500">{user.phone}</td>
                    <td className="p-3">
                      <span className="rounded-md bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                        {user.role}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-3 py-2 font-semibold text-white transition hover:bg-blue-700"
                      >
                        <Eye size={16} />
                        Xem
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="px-4 py-14 text-center">
                <p className="font-semibold text-slate-700">
                  Không tìm thấy user phù hợp
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Thử nhập tên, email hoặc số điện thoại khác.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </main>
  );
}