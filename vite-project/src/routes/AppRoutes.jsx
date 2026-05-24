import { Routes, Route } from 'react-router-dom'

import ProtectedRoute from './ProtectedRoute'

/* PUBLIC */
import HomePage from '../pages/shared/HomePage'
import ToursPage from '../pages/shared/ToursPage'
import LogInPage from '../pages/auth/LoginPage'
import SignUpPage from '../pages/auth/SignUpPage'
import TourDetailPage from '../pages/shared/TourDetailPage'
import MainLayout from '../layouts/MainLayout'
import StaffDashboardPage from '../pages/staff/StaffDashboardPage'
import ForbiddenPage from '../pages/shared/FobiddenPage'

import ChangePasswordPage from '../components/protected/myInfo/ChangePassword'

/* USER */
import MyInforPage from '../pages/protected/MyInforPage'
import UserLayout from '../layouts/UserLayout'
import FavoriteTourPage from '../components/protected/myInfo/FavoriteTour'
import BookingPage from '../pages/user/BookingPage'

/* ADMIN */
import DashboardPage from '../pages/admin/DashboardPage'
import AdminLayout from '../layouts/AdminLayout'

/* STAFF */
import StaffLayout from '../layouts/StaffLayout'


function AppRoutes() {

    return (
        <Routes>

            {/* PUBLIC */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/tours" element={<ToursPage />} />
                <Route path="/login" element={<LogInPage />}/>
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/tourDetail/:id' element={<TourDetailPage />}/>
                <Route path='/favoriteTour' element={<FavoriteTourPage />}/>
                <Route path='/changePassword' element={<ChangePasswordPage />} />
                <Route path="/403" element={<ForbiddenPage />} />
            </Route>

            {/* USER */}
            <Route element={<ProtectedRoute roles={['USER']} />}>

                <Route element={<UserLayout />}>

                    <Route
                        path="/myInfor"
                        element={<MyInforPage />}
                    />

                    <Route 
                        path='/favoriteTour'
                        element={<FavoriteTourPage />}
                    />

                    <Route 
                        path='/booking' 
                        element={<BookingPage />}
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
                        path='/admin/myInfor'
                        element={<MyInforPage />}
                    />

                </Route>

            </Route>

            {/* STAFF */}
            <Route element={<ProtectedRoute roles={['STAFF']} />}>

                <Route element={<StaffLayout />}>

                    <Route
                        path='/staff/dashboard'
                        element={<StaffDashboardPage />}
                    />
                    <Route 
                        path='/staff/myInfor'
                        element={<MyInforPage />}
                    />

                </Route>

            </Route>

        </Routes>
    )
}

export default AppRoutes