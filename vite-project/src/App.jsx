import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import MyInfoPage from "./pages/user/MyInforPage"
import FavoriteTourPage from "./pages/user/FavoriteTourPage"
import StaffBookingPage from "./pages/staff/StaffBookingPage"
import AdminDashboard from "./pages/admin/AdminDashboard"
import { Route, Routes, BrowserRouter } from "react-router-dom"
import Navbar from "./pages/Navbar"
import Tours from "./pages/Tours"
import TourDetail from "./pages/TourDetail"
function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="/tours" element={<Tours></Tours>}></Route>
        <Route path="/tourDetail" element={<TourDetail></TourDetail>}></Route>
        <Route path="/myinfor" element={<MyInfoPage></MyInfoPage>}></Route>
        <Route path="/myfavoriteTour" element={<FavoriteTourPage></FavoriteTourPage>}></Route>
      </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
