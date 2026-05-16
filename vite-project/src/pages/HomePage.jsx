function HomePage(){
    return(
        <>
        
         <div>
            <section id="view-home" className="page-view min-h-[calc(100vh-140px)] block">
            <div id="homeHeroBanner" className="relative bg-cover bg-center h-[500px]" style={{ backgroundImage: "url('https://images.unsplash.com/...')" }}>
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
                    <div id="heroTextContainer">
                        <h1 id="homeHeroTitle" className="text-4xl md:text-5xl font-bold text-white mb-4 shadow-sm">Khám Phá Vẻ Đẹp Việt Nam</h1>
                        <p id="homeHeroSubtitle" className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto">Đặt tour du lịch dễ dàng, an toàn và nhận những ưu đãi tốt nhất ngay hôm nay.</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-xl w-full max-w-4xl flex flex-col md:flex-row gap-4 animate-fadeIn">
                        <div className="flex-1 flex items-center border border-gray-200 rounded-lg px-3 py-2">
                            <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                            <input type="text" id="homeSearchKeyword" placeholder="Địa điểm (Location)..." className="w-full outline-none text-sm bg-transparent"/>
                        </div>
                        <div className="flex-1 flex items-center border border-gray-200 rounded-lg px-3 py-2">
                            <i className="far fa-calendar-alt text-primary mr-2"></i>
                            <input type="date" className="w-full outline-none text-sm text-gray-600 bg-transparent"/>
                        </div>
                        <button onClick={() => (window.location.hash = '#tours')} className="bg-accent hover:bg-orange-600 text-black font-bold py-2 px-6 rounded-lg transition whitespace-nowrap shadow-md cursor-pointer">
                            <i className="fas fa-search mr-1"></i> Tìm Kiếm
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-textMain mb-2">Tour Nổi Bật Nhất</h2>
                        <p className="text-gray-500">Dựa trên xếp hạng (Ratings) cao nhất</p>
                    </div>
                    <a href="#tours" className="text-primary font-medium hover:underline hidden md:block transition-colors">Xem tất cả <i className="fas fa-arrow-right text-xs"></i></a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="homeFeaturedTours"></div>
            </div>
        </section>

        </div>
        
        </>
       
    )
}
export default HomePage;