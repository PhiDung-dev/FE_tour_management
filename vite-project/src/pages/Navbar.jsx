import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
    
    return (
        <>
            <nav className="fixed left-0 right-0 w-full bg-white shadow-md z-50">
                <div className="flex items-center justify-between p-4 container m-auto">
                    <div className="flex items-center space-x-6">
                        <div class="flex items-center">
                        <Link to="/" class="flex items-center gap-2">
                            <FontAwesomeIcon className="text-3xl" icon={faPaperPlane} style={{color: "rgb(116, 192, 252)",}} />
                            <span class="font-bold text-3xl text-primary tracking-wide">VietTravel</span>
                        </Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-24 text-blue-500 text-xl font-medium">
                        <Link to="/" className="active:text-blue-700 hover:underline">Trang chủ</Link>
                        <Link to="/tours" className="active:text-blue-700 hover:underline">Danh sách tour</Link>
                        <Link to="/login" className="active:text-blue-700 hover:underline">Đăng nhập</Link>
                        <Link to="/myinfor" className="active:text-blue-700 hover:underline">My info</Link>
                    </div>
                </div>
               
            </nav>
        </>
    )
}