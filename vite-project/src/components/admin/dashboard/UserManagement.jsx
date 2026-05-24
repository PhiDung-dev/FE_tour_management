import { useEffect, useMemo, useState } from "react";
import { Eye, Search } from "lucide-react";
import UserDetailModal from "../../staff/dashboard/UserDetailModel";
import { readUsers } from "../../../api/userApi";
import { readAccounts } from "../../../api/accountApi";

export default function UserManagement({
  roleFilter = "USER",
  title = "Danh sách người dùng",
}) {
  const [keyword, setKeyword] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [accountData, userData] = await Promise.all([
        readAccounts(),
        readUsers(),
      ]);

      setAccounts(accountData?.result || accountData || []);
      setUsers(userData?.result || userData || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách account/user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const normalizedUsers = useMemo(() => {
    const userByAccountId = new Map();

    users.forEach((user) => {
      const accountId = user.account?.id || user.accountId;
      if (accountId) {
        userByAccountId.set(String(accountId), user);
      }
    });

    return accounts.map((account) => {
      const user = userByAccountId.get(String(account.id));

      const rawRoles = account.roles || [];
      const roles = Array.isArray(rawRoles)
        ? rawRoles
        : rawRoles
          ? [rawRoles]
          : [];

      const normalizedRoles = roles.map((role) =>
        String(role).toUpperCase().replace("ROLE_", "")
      );

      return {
        id: user?.id || "",
        accountId: account.id || "",
        username: account.username || "",
        fullName: user?.fullName || "",
        email: user?.email || "",
        phone: user?.phoneNumber || "",
        address: user?.address || "",
        roles: normalizedRoles,
      };
    });
  }, [accounts, users]);

  const filteredUsers = useMemo(() => {
    return normalizedUsers.filter((user) => {
      const searchText =
        `${user.id} ${user.accountId} ${user.username} ${user.fullName} ${user.email} ${user.phone}`.toLowerCase();

      const matchKeyword = searchText.includes(keyword.toLowerCase());
      const matchRole = user.roles.includes(roleFilter.toUpperCase());

      return matchKeyword && matchRole;
    });
  }, [keyword, normalizedUsers, roleFilter]);

  return (
    <main className="bg-slate-50 px-4 pb-10 pt-2 sm:px-6 lg:px-8">
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
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm theo mã, username, họ tên, email hoặc số điện thoại..."
              className="h-12 w-full rounded-md border border-slate-200 bg-slate-50 pl-12 pr-4 text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </section>

        <section className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
            <p className="mt-1 text-sm text-slate-500">
              {loading
                ? "Đang tải dữ liệu..."
                : `Tìm thấy ${filteredUsers.length} kết quả phù hợp.`}
            </p>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-100">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead className="bg-blue-50 text-slate-700">
                <tr>
                  <th className="p-3">Mã account</th>
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
                    key={user.accountId}
                    className="border-t border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="p-3 font-bold text-slate-800">
                      #{user.accountId}
                    </td>
                    <td className="p-3 font-semibold text-slate-800">
                      {user.username}
                    </td>
                    <td className="p-3 text-slate-600">
                      {user.fullName || "Chưa cập nhật"}
                    </td>
                    <td className="p-3 text-slate-500">
                      {user.email || "Chưa cập nhật"}
                    </td>
                    <td className="p-3 text-slate-500">
                      {user.phone || "Chưa cập nhật"}
                    </td>
                    <td className="p-3">
                      <span className="rounded-md bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                        {user.roles.join(", ")}
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
                  Không tìm thấy dữ liệu phù hợp
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