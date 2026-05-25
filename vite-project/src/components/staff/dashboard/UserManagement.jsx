import { useEffect, useMemo, useState } from "react";
import { Eye, Search } from "lucide-react";

import UserDetailModal from "./UserDetailModel";
import { readUsers } from "../../../api/userApi";

function getResult(data) {
  return data?.result || data || [];
}

function normalizeRoles(roles) {
  const roleList = Array.isArray(roles) ? roles : roles ? [roles] : [];

  return roleList.map((role) => String(role).toUpperCase().replace("ROLE_", ""));
}

export default function UserManagement() {
  const [keyword, setKeyword] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const data = await readUsers();

      setUsers(getResult(data));
    } catch (error) {
      console.error("Lỗi khi lấy users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const normalizedUsers = useMemo(() => {
    return users.map((user) => ({
      id: user.id || "",
      accountId: user.account?.id || "",
      username: user.account?.username || "",
      fullName: user.fullName || "",
      address: user.address || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      roles: normalizeRoles(user.account?.roles),
    }));
  }, [users]);

  const filteredUsers = useMemo(() => {
    const searchValue = keyword.trim().toLowerCase();

    return normalizedUsers.filter((user) => {
      const searchText = [
        user.id,
        user.accountId,
        user.username,
        user.fullName,
        user.email,
        user.phoneNumber,
        user.roles.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return searchText.includes(searchValue);
    });
  }, [keyword, normalizedUsers]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-10 pt-2 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="mb-6 rounded-lg border border-blue-100 bg-white p-4 shadow-sm sm:p-5">
          <div className="relative">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Tìm theo mã user, username, họ tên, email hoặc số điện thoại..."
              className="h-12 w-full rounded-md border border-slate-200 bg-slate-50 pl-12 pr-4 text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </section>

        <section className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              Danh sách người dùng
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {loading
                ? "Đang tải dữ liệu..."
                : `Tìm thấy ${filteredUsers.length} kết quả phù hợp.`}
            </p>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-100">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="bg-blue-50 text-slate-700">
                <tr>
                  <th className="p-3">Mã user</th>
                  <th className="p-3">Username</th>
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
                    key={user.id || user.accountId}
                    className="border-t border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="p-3 font-bold text-slate-800">
                      #{user.id || "N/A"}
                    </td>

                    <td className="p-3 font-semibold text-slate-700">
                      {user.username || "Chưa cập nhật"}
                    </td>

                    <td className="p-3 font-semibold text-slate-800">
                      {user.fullName || "Chưa cập nhật"}
                    </td>

                    <td className="p-3 text-slate-500">
                      {user.email || "Chưa cập nhật"}
                    </td>

                    <td className="p-3 text-slate-500">
                      {user.phoneNumber || "Chưa cập nhật"}
                    </td>

                    <td className="p-3">
                      <span className="rounded-md bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                        {user.roles.join(", ") || "Chưa cập nhật"}
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

            {!loading && filteredUsers.length === 0 && (
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
