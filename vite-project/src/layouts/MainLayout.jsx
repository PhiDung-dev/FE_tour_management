import { Outlet } from "react-router-dom";
import { getRoleFromToken } from "../utils/jwt";
import AdminNavbar from "../components/admin/navbar/AdminNavbar";
import StaffNavbar from "../components/staff/navbar/StaffNavbar";
import UserNavbar from "../components/user/navbar/UserNavbar";
import PublicNavbar from "../components/shared/navbar/PublicNavbar";

export default function MainLayout() {

    const token = localStorage.getItem('token');

    const role = token
        ? getRoleFromToken(token)
        : null;

    return (
        <>
            {role?.includes('ADMIN') && <AdminNavbar />}

            {role?.includes('STAFF') && <StaffNavbar />}

            {role?.includes('USER') && <UserNavbar />}

            {!role && <PublicNavbar />}

            <Outlet />
        </>
    )
}