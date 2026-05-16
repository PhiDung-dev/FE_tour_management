import React, { useState } from 'react';

const FavoriteTourPage = () => {
 
  const [favoriteTours, setFavoriteTours] = useState([
    {
      id: 1,
      title: "Hành trình di sản Hội An",
      image: "/src/assets/hoian.jpg",
      price: "1.200.000đ",
      duration: "2 ngày 1 đêm"
    },
    {
      id: 2,
      title: "Khám phá động Phong Nha",
      image: "/src/assets/phongnha.jpg",
      price: "2.500.000đ",
      duration: "3 ngày 2 đêm"
    }
  ]);

  const handleRemoveFavorite = (id) => {
    
    setFavoriteTours(favoriteTours.filter(tour => tour.id !== id));
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl min-h-[500px]">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">Tour yêu thích của tôi</h3>
      
      {favoriteTours.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {favoriteTours.map((tour) => (
            <div 
              key={tour.id} 
              className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl hover:shadow-md transition-shadow"
            >
              <img 
                src={tour.image} 
                alt={tour.title} 
                className="w-24 h-24 object-cover rounded-xl"
              />
              
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800">{tour.title}</h4>
                <p className="text-sm text-slate-500">{tour.duration}</p>
                <p className="text-orange-500 font-bold mt-1">{tour.price}</p>
              </div>

              <button 
                onClick={() => handleRemoveFavorite(tour.id)}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                title="Xóa khỏi yêu thích"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="Ref-Icon-Trash" />
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-slate-500 italic">Bạn chưa có tour yêu thích nào.</p>
        </div>
      )}
    </div>
  );
};

export default FavoriteTourPage;