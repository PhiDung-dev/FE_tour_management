import { Outlet } from "react-router-dom";
import UserNavbar from "../components/user/navbar/UserNavbar";
import Footer from "../components/shared/footer/Footer";

function UserLayout() {
  return (
    <>
      <UserNavbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default UserLayout;