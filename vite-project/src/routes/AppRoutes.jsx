import { Routes, Route } from 'react-router-dom'

import ProtectedRoute from './ProtectedRoute'

/* PUBLIC */
import HomePage from '../pages/shared/HomePage'
import ToursPage from '../pages/shared/ToursPage'
import LogInPage from '../pages/auth/LoginPage'
import SignUpPage from '../pages/auth/SignUpPage'

/* USER */
import MyInforPage from '../pages/user/MyInforPage'
import UserLayout from '../layouts/UserLayout'

/* ADMIN */
import DashboardPage from '../pages/admin/DashboardPage'
import AdminLayout from '../layouts/AdminLayout'

/* STAFF */
import StaffBookingPage from '../pages/staff/StaffBookingPage'
import StaffLayout from '../layouts/StaffLayout'
import TourDetailPage from '../pages/shared/TourDetailPage'

import MainLayout from '../layouts/MainLayout'
import FavoriteTourPage from '../pages/user/FavoriteTourPage'

function AppRoutes() {

    return (
        <Routes>

            {/* PUBLIC */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/tours" element={<ToursPage />} />
                <Route path="/login" element={<LogInPage />}/>
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/tourDetail' element={<TourDetailPage />}/>
            </Route>

            {/* USER */}
            <Route element={<ProtectedRoute roles={['USER']} />}>

                <Route element={<UserLayout />}>

                    <Route
                        path="/myInfo"
                        element={<MyInforPage />}
                    />

                    <Route 
                        path='/favoriteTour'
                        element={<FavoriteTourPage />}
                    />

                </Route>

            </Route>

            {/* ADMIN */}
            <Route element={<ProtectedRoute roles={['ADMIN']} />}>

                <Route element={<AdminLayout />}>

                    <Route
                        path="/admin/dashboard"
                        element={<DashboardPage />}
                    />

                    <Route 
                        path='/myInfor'
                        element={<MyInforPage />}
                    />

                </Route>

            </Route>

            {/* STAFF */}
            <Route element={<ProtectedRoute roles={['STAFF']} />}>

                <Route element={<StaffLayout />}>

                    <Route
                        path="/staff/bookings"
                        element={<StaffBookingPage />}
                    />

                    <Route 
                        path='/myInfor'
                        element={<MyInforPage />}
                    />

                </Route>

            </Route>

        </Routes>
    )
}

export default AppRoutes