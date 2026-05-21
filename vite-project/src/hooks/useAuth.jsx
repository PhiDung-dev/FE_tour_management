import { getRoleFromToken } from '../utils/jwt'

function useAuth() {

    const token = localStorage.getItem('token')

    const role = getRoleFromToken(token)

    return {
        token,
        role,
        isAuthenticated: !!token
    }
}

export default useAuth