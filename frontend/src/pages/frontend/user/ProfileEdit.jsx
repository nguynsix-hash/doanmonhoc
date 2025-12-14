import { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSave, FaSpinner, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserServices from "../../../services/UserServices"; // Giả định dùng chung UserServices

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    email: "", // Hiển thị nhưng không cho chỉnh sửa
  });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  // 1. Tải dữ liệu hiện tại của user
  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const data = await UserServices.getById(userId);
        if (data) {
          setFormData({
            fullName: data.fullName || '',
            phone: data.phone || '',
            address: data.address || '',
            email: data.email || '', 
          });
        }
      } catch (err) {
        console.error("Lỗi tải dữ liệu:", err);
        setMessage({ type: 'error', text: 'Không thể tải thông tin cá nhân hiện tại.' });
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userId, navigate]);

  // 2. Xử lý thay đổi input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage({ type: '', text: '' }); // Xóa thông báo khi người dùng bắt đầu nhập
  };

  // 3. Xử lý lưu thay đổi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    // Payload chỉ gửi các trường cần cập nhật
    const payload = {
      fullName: formData.fullName,
      phone: formData.phone,
      address: formData.address,
      // Không gửi email/username/password
    };

    try {
      // Giả định UserServices có hàm updateProfile
      const res = await UserServices.updateProfile(userId, payload); 
      
      // Giả định API trả về user mới, cập nhật lại localStorage
      localStorage.setItem("user", JSON.stringify(res)); 

      setMessage({ type: 'success', text: '🎉 Cập nhật hồ sơ thành công!' });
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
      const msg = err?.response?.data?.message || "Cập nhật thất bại, vui lòng thử lại.";
      setMessage({ type: 'error', text: msg });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <FaSpinner className="animate-spin w-8 h-8 text-orange-500 mr-3" />
        <p className="text-xl font-medium text-gray-600">Đang tải form...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-xl shadow-2xl border-t-4 border-blue-500">
          
          <button 
            onClick={() => navigate('/profile')} 
            className="text-gray-600 hover:text-blue-500 flex items-center mb-6 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Quay lại hồ sơ
          </button>

          <header className="mb-6 border-b pb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              🛠️ Chỉnh sửa Hồ sơ
            </h1>
            <p className="text-gray-600 mt-1">
              Vui lòng nhập thông tin mới bạn muốn cập nhật.
            </p>
          </header>

          {/* Alert Messages */}
          {message.type === 'success' && (
            <div className="bg-green-100 text-green-800 p-4 mb-4 rounded-lg font-medium border border-green-200">
              {message.text}
            </div>
          )}
          {message.type === 'error' && (
            <div className="bg-red-100 text-red-800 p-4 mb-4 rounded-lg font-medium border border-red-200">
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Trường Email (Disabled) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                <FaEnvelope className="w-4 h-4 mr-2 text-gray-500" /> Email (Không thể thay đổi)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-500"
              />
            </div>

            {/* Trường Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                <FaUser className="w-4 h-4 mr-2 text-orange-500" /> Họ và Tên
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                required
              />
            </div>

            {/* Trường Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                <FaPhone className="w-4 h-4 mr-2 text-orange-500" /> Số điện thoại
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                required
              />
            </div>

            {/* Trường Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                <FaMapMarkerAlt className="w-4 h-4 mr-2 text-orange-500" /> Địa chỉ
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                required
              ></textarea>
            </div>
          
            {/* Nút Submit */}
            <button
              type="submit"
              disabled={isSaving}
              className={`flex items-center justify-center space-x-2 w-full py-3 text-lg font-bold rounded-xl shadow-lg transition-all transform ${
                isSaving
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {isSaving ? (
                <>
                  <FaSpinner className="animate-spin w-5 h-5" />
                  <span>Đang lưu...</span>
                </>
              ) : (
                <>
                  <FaSave className="w-5 h-5" />
                  <span>Lưu Thay Đổi</span>
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;