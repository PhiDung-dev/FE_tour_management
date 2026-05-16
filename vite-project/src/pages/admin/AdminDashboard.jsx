import React, { useState, useEffect } from 'react';
import { createTour, deleteTour, updateTour, fetchTours } from '../../api/TourApi';
import { 
  LayoutDashboard, 
  MapPinned, 
  Users, 
  UserCog, 
  LogOut, 
  Menu,
  X, 
  Torus
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('tours');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  
  const menuItems = [
    { id: 'tours', label: 'Quản lý tour', icon: <MapPinned size={20} /> },
    { id: 'users', label: 'Quản lý user', icon: <Users size={20} /> },
    { id: 'staff', label: 'Quản lý nhân viên', icon: <UserCog size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-slate-800 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-4 flex items-center justify-between border-b border-slate-700">
          {isSidebarOpen && <span className="font-bold text-xl uppercase">Admin Panel</span>}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-slate-700 rounded">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className="flex-1 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center p-4 transition-colors ${
                activeTab === item.id ? 'bg-blue-600' : 'hover:bg-slate-700'
              }`}
            >
              {item.icon}
              {isSidebarOpen && <span className="ml-4">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button className="flex items-center text-red-400 hover:text-red-300">
            <LogOut size={20} />
            {isSidebarOpen && <span className="ml-4">Đăng xuất</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {menuItems.find(i => i.id === activeTab)?.label}
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Xin chào, Quản trị viên</span>
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">Adm</div>
          </div>
        </header>

        <div className="p-6">
          <div className="bg-white rounded-lg shadow p-6 min-h-[400px]">
            {activeTab === 'tours' && <TourManagement />}
            {activeTab === 'users' && <UserManagement title="Khách hàng" role="User" />}
            {activeTab === 'staff' && <UserManagement title="Nhân viên" role="Staff" />}
          </div>
        </div>
      </main>
    </div>
  );
};



const TourManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [tours, setTours] = useState([]);
  const [editingTourId, setEditingTourId] = useState(null);
  const [newTour, setNewTour] = useState({
    id: '',
    title: '',
    price: '',
    description: '',
    images: []
  });

  const fetchToursData = async () => {
    try {
        const data = await fetchTours(); 
        if (data && data.result) {
            setTours(data.result);
        } else {
            setTours(data); 
        }
    } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
    }
    };
    useEffect(() => {
      const loadTours = async () => {
        await fetchToursData();
      };
      loadTours();
}, []);


const handleEditClick = (tour) => {
  setNewTour({
    id: tour.id,
    title: tour.title,
    price: tour.price,
    description: tour.description,
    images: tour.images
  });
  setEditingTourId(tour.id); 
  setShowForm(true); 
};
  const handleSaveTour = async () => {
  try {
    let result;
    if (editingTourId) {
      result = await updateTour(editingTourId, newTour);
      if (result) alert("Cập nhật tour thành công!");
    } else {
      result = await createTour(newTour);
      if (result) alert("Tạo tour thành công!");
    }

    if (result) {
      setShowForm(false);
      setEditingTourId(null);
      setNewTour({ title: '', price: '', description: '', images: Array.isArray(newTour.images) ? newTour.images : [newTour.images] });
       fetchToursData(); 
    }
  } catch (error) {
    console.error("Lỗi khi lưu tour:", error);
  }
};
  const handleDeleteTour = async (id) => {
  if (window.confirm("Bạn có chắc chắn muốn xoá tour này không?")) {
    try {
      const result = await deleteTour(id);
      if (result) {
       
        setTours(tours.filter(tour => tour.id !== id));
        
        alert("Xoá tour thành công!");
        await fetchToursData(); 
      }
    } catch (error) {
      console.error("Lỗi khi xoá tour:", error);
    }
  }
};


  return (
    <div className="relative">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-medium">Danh sách Tour du lịch</h3>
        
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + Thêm Tour mới
        </button>
      </div>

     
      {showForm && (
        <div className="fixed inset-0 bg-white bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[400px]">
            <h3 className="text-xl font-bold mb-4 border-b pb-2">Nhập Thông Tin Tour</h3>
            

            <div className="space-y-4">
                 <div>
                <label className="block text-sm font-medium mb-1">Mã Tour</label>
                <input 
                  type="text" className="w-full border p-2 rounded"
                  value={newTour.id}
                  onChange={(e) => setNewTour({...newTour, id: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tên Tour</label>
                <input 
                  type="text" className="w-full border p-2 rounded"
                  value={newTour.title}
                  onChange={(e) => setNewTour({...newTour, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Giá Tour</label>
                <input 
                  type="number" className="w-full border p-2 rounded"
                  value={newTour.price}
                  onChange={(e) => setNewTour({...newTour, price: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mô tả</label>
                <textarea 
                  className="w-full border p-2 rounded"
                  value={newTour.description}
                  onChange={(e) => setNewTour({...newTour, description: e.target.value})}
                />
              </div>
               <div>
                <label className="block text-sm font-medium mb-1">Hình ảnh</label>
                <input 
                  type="text" className="w-full border p-2 rounded"
                  value={newTour.images[0]}
                  onChange={(e) => setNewTour({...newTour, images: [e.target.value]})}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button 
                onClick={() => setShowForm(false)} 
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Hủy
              </button>
              <button 
                onClick={handleSaveTour}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Lưu Tour
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="w-full text-left border-collapse mt-4">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="p-3">ID</th>
            <th className="p-3">Tên Tour</th>
            <th className="p-3">Giá</th>
            <th className="p-3">Hình ảnh</th>
            <th className="p-3">Mô tả</th>
            <th className="p-3">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((tour) => (
            <tr key={tour.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{tour.id}</td>
              <td className="p-3">{tour.title}</td>
              <td className="p-3">{tour.price}đ</td>
              <td className="p-3">
                <img src={tour.imageUrl} alt={tour.title} className="w-16 h-16 object-cover" />
              </td>
              <td className="p-3">{tour.description}</td>
              <td className="p-3">
                <button 
                    onClick={() => handleEditClick(tour)}
                className="text-blue-600 mr-2">Sửa</button>
                <button
                  onClick={() => handleDeleteTour(tour.id)}
                  className="text-red-600"
                >
                  Xóa
                </button>
            </td>
          </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};


const UserManagement = ({ title, role }) => (
  <div>
    <div className="flex justify-between mb-4">
      <h3 className="text-lg font-medium">Danh sách {title}</h3>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Thêm {role}</button>
    </div>
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-gray-50 border-b">
            <th className="p-3">ID</th>
          <th className="p-3">Họ tên</th>
          <th className="p-3">Email</th>
          <th className="p-3">Số điện thoại</th>
          <th className="p-3">Địa chỉ</th>
          <th className="p-3">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b hover:bg-gray-50">
          <td className="p-3">#U01</td>
          <td className="p-3">Nguyễn Văn A</td>
          <td className="p-3">vana@example.com</td>
          <td className="p-3">0123456789</td>
            <td className="p-3">123 Đường ABC, Hà Nội</td>
          <td className="p-3">
            
            <button className="text-red-600">Khóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);


export default AdminDashboard;