import { jwtDecode } from 'jwt-decode'

export const getRoleFromToken = (token) => {

    if (!token) return null

    try {

        const decoded = jwtDecode(token)

        return decoded.scope

    // eslint-disable-next-line no-unused-vars
    } catch (error) {

        return null
    }
    
}
export const getAccountIdFromToken = (token) => {

    if (!token) return null

    try {

        const decoded = jwtDecode(token)

        return decoded.accountId

    // eslint-disable-next-line no-unused-vars
    } catch (error) {

        return null
    }
    
}

