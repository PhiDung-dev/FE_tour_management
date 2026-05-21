import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/admin/navbar/AdminNavbar";
import Footer from "../components/shared/footer/Footer";

function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default AdminLayout;