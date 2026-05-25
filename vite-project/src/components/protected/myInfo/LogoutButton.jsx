import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function LogoutButton({className}) {

  const navigate = useNavigate();

  const handleLogout = () => {

    // XÓA TOKEN
    localStorage.removeItem("token");
    localStorage.removeItem("accountId");
    localStorage.removeItem("userId");
    // CHUYỂN VỀ LOGIN
    navigate("/login");
  };

  return (

    <button
      onClick={handleLogout}
      className={"flex items-center gap-3 rounded-md bg-red-500 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-red-600 active:scale-95 "+className}
    >

      <LogOut size={18} />

      Đăng xuất

    </button>
  );
}