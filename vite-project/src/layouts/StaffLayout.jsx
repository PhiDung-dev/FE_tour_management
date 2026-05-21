import { Outlet } from "react-router-dom";
import StaffNavbar from "../components/staff/navbar/StaffNavbar";
import Footer from "../components/shared/footer/Footer";
function StaffLayout() {
  return (
    <>
      <StaffNavbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default StaffLayout;