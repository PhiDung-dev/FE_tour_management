import { Navigate, Outlet } from 'react-router-dom'
import { getRoleFromToken } from '../utils/jwt'

function ProtectedRoute({ roles }) {

    const token = localStorage.getItem('token')

    // chưa login
    if (!token) {
        return <Navigate to="/login" replace />
    }

    const role = getRoleFromToken(token)

    // sai role
    if (roles && !roles.includes(role)) {
        return <Navigate to="/403" replace />
    }

    return <Outlet />
}

export default ProtectedRoute