import { Outlet } from "react-router-dom";
import Footer from "../components/shared/footer/Footer";
import PublicNavbar from "../components/shared/navbar/PublicNavbar";

function PublicLayout() {
  return (
    <>
      <PublicNavbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default PublicLayout;