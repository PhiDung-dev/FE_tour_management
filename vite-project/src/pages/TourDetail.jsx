import { faBolt, faCircleInfo, faLocationDot, faShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TourDetail({title, location, images, description, price}) {
    
    return (
        <>
            <div className="pt-10 pb-15">
                <h2 className="text-5xl font-medium mb-10">{title} title</h2>
                <p className="text-blue-500 mb-10"><FontAwesomeIcon icon={faLocationDot} style={{color: "rgb(116, 192, 252)",}}/>{location} location</p>
                <div class="w-full h-[500px] mb-10 rounded-2xl overflow-hidden shadow-md relative group">
                    <img src="https://images.unsplash.com/photo-1557409518-691ebcd96038" alt={images} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
                </div>
                <div className="flex">
                    <div className="w-[70%]">
                        <h3 className="text-2xl font-medium mb-5"><FontAwesomeIcon icon={faCircleInfo} style={{color: "rgb(116, 192, 252)",}} /> Mô tả chi tiết</h3>
                        <p>{description} desc</p>
                    </div>
                    <div class="bg-white border border-gray-100 rounded-2xl shadow-xl p-6 sticky top-24 flex-1">
                        <div class="text-3xl font-extrabold text-orange-500 mb-6 pb-4 border-b border-gray-100">{price} 2.900.000 ₫ <span class="text-sm text-gray-500 font-normal">/ khách</span></div>
                        <label class="block text-sm font-bold text-gray-800 mb-2">Chọn Lịch Trình (Schedule):</label>
                        <select class="w-full border border-gray-300 rounded-xl p-3.5 mb-6 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium bg-gray-50 transition-all cursor-pointer">
                            <option value="">Đang cập nhật lịch trình</option>
                        </select>
                        <button class="w-full font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 opacity-50 hover:transform-none hover:shadow-lg">
                            <FontAwesomeIcon icon={faBolt} style={{color: "rgb(116, 192, 252)",}} /> Bắt đầu đặt chỗ
                        </button>
                        <p class="text-center text-xs text-gray-400 mt-4"><FontAwesomeIcon icon={faShield} style={{color: "rgb(116, 192, 252)",}}/> Thanh toán an toàn và bảo mật</p>
                    </div>
                </div>
            </div>
        </>
    )
}