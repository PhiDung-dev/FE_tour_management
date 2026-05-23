import { useEffect, useState } from "react";
import { Heart, Lock, User } from "lucide-react";
import FavoriteTourPage from "../../components/protected/myInfo/FavoriteTour";
import ChangePasswordPage from "../../components/protected/myInfo/ChangePassword";
import LogoutButton from "../../components/protected/myInfo/LogoutButton";
import MyInforForm from "../../components/protected/myInfo/myInfoForm";
import { readUsers } from "../../api/userApi";
import { getAccountIdFromToken } from "../../utils/jwt";

const emptyUserInfo = {
  id: "",
  fullName: "",
  email: "",
  phoneNumber: "",
  address: "",
  accountId: "",
};

function normalizeUser(data, accountId = "") {
  const user = data?.result || data || {};

  return {
    id: user.id || user.userId || "",
    fullName: user.fullName || user.fullname || "",
    email: user.email || "",
    phoneNumber: user.phoneNumber || user.phone || "",
    address: user.address || "",
    accountId: user.accountId || user.account?.id || accountId,
  };
}

function getUsersArray(data) {
  return data?.result || data || [];
}

export default function MyInforPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUserInfo = async () => {
    const token = localStorage.getItem("token");
    const accountId = getAccountIdFromToken(token);

    if (!accountId) {
      setError("Không tìm thấy accountId trong token. Vui lòng đăng nhập lại.");
      setUserInfo(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await readUsers();
      const users = getUsersArray(data);
      const currentUser = users.find(
        (user) => String(user.accountId || user.account?.id) === String(accountId)
      );

      if (currentUser) {
        setUserInfo(normalizeUser(currentUser, accountId));
      } else {
        setUserInfo({
          ...emptyUserInfo,
          accountId,
        });
      }
    } catch (err) {
      console.error("Lỗi khi lấy thông tin user:", err);
      setError("Không thể tải thông tin cá nhân.");
      setUserInfo({
        ...emptyUserInfo,
        accountId,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleUpdatedUser = (updatedUser) => {
    setUserInfo(normalizeUser(updatedUser, userInfo?.accountId));
  };

  const tabButtonClass = (tab) =>
    `flex w-full items-center gap-3 rounded-md px-4 py-3 font-semibold transition ${
      activeTab === tab
        ? "bg-orange-50 text-orange-600"
        : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
    }`;

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-10 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="mb-6 flex justify-between rounded-lg border border-blue-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-500">
                Tài khoản
              </p>
              <h1 className="text-3xl font-bold text-slate-900">Thông tin cá nhân</h1>
              <p className="mt-2 text-slate-500">
                Quản lý họ tên, email, số điện thoại và địa chỉ của bạn.
              </p>
            </div>
          </div>
          <LogoutButton className="mt-auto" />
        </section>

        {error && (
          <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <aside className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm lg:sticky lg:top-28">
            <div className="mb-5 rounded-lg bg-blue-50 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white">
                <User size={24} />
              </div>
              <h2 className="mt-3 text-xl font-bold text-slate-900">
                {loading ? "Đang tải..." : userInfo?.fullName || "Chưa cập nhật"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">{userInfo?.email || ""}</p>
            </div>

            <div className="space-y-2">
              <button onClick={() => setActiveTab("profile")} className={tabButtonClass("profile")}>
                <User size={18} />
                Thông tin cá nhân
              </button>

              <button onClick={() => setActiveTab("favorite")} className={tabButtonClass("favorite")}>
                <Heart size={18} />
                Tour yêu thích
              </button>

              <button
                onClick={() => setActiveTab("changePassword")}
                className={tabButtonClass("changePassword")}
              >
                <Lock size={18} />
                Đổi mật khẩu
              </button>
            </div>
          </aside>

          <section className="rounded-lg border border-blue-100 bg-white p-5 shadow-sm sm:p-7">
            {activeTab === "profile" && (
              <>
                {loading && <p className="text-slate-500">Đang tải thông tin cá nhân...</p>}
                {!loading && userInfo && (
                  <MyInforForm userInfoProp={userInfo} onUpdated={handleUpdatedUser} />
                )}
              </>
            )}

            {activeTab === "favorite" && <FavoriteTourPage />}

            {activeTab === "changePassword" && <ChangePasswordPage />}
          </section>
        </div>
      </div>
    </main>
  );
}
