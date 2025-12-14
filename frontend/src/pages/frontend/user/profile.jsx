import { useEffect, useState } from "react";
import UserServices from "../../../services/UserServices";
import { Link } from "react-router-dom";
import { FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaKey, FaUserTag, FaEdit, FaSpinner, FaSignInAlt } from "react-icons/fa";

// Component con để hiển thị từng dòng thông tin
const DetailRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center space-x-4 border-b border-gray-100 py-3">
    <Icon className="w-5 h-5 text-orange-500 flex-shrink-0" />
    <span className="font-medium text-gray-600 w-32">{label}:</span>
    <span className="text-gray-800 font-semibold flex-1">{value || "Chưa cập nhật"}</span>
  </div>
);

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser?.id) {
      setLoading(true);
      UserServices.getById(storedUser.id)
        .then((data) => {
          if (data) {
            setUser(data);
          } else {
            setError("Không tìm thấy thông tin tài khoản.");
          }
        })
        .catch((err) => {
          console.error("Lỗi lấy thông tin user:", err);
          setError("Có lỗi xảy ra khi tải thông tin tài khoản.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("Vui lòng đăng nhập để xem thông tin cá nhân.");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <FaSpinner className="animate-spin w-8 h-8 text-orange-500 mr-3" />
        <p className="text-xl font-medium text-gray-600">Đang tải thông tin tài khoản...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Lỗi truy cập</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Link 
            to="/login" 
            className="bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center"
        >
            <FaSignInAlt className="mr-2" /> Đăng nhập ngay
        </Link>
      </div>
    );
  }

  const userRole = user.role === "admin" ? "Quản trị viên" : "Khách hàng";
  
  // Logic Avatar: Sử dụng avatar từ user, nếu không có thì null
  const userAvatarSource = user.avatar; 

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">
            👤 Hồ sơ cá nhân của tôi
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Quản lý thông tin chi tiết và tùy chọn tài khoản của bạn.
          </p>
        </header>

        <div className="bg-white p-8 rounded-xl shadow-2xl border-t-4 border-orange-600">
          
          {/* Header Card: Avatar và Tên */}
          <div className="flex flex-col md:flex-row items-center md:items-start border-b pb-6 mb-6">
            <div className="relative w-32 h-32 mb-4 md:mb-0 md:mr-6 flex-shrink-0">
              {/* LOGIC AVATAR CŨ ĐƯỢC TÍCH HỢP Ở ĐÂY */}
              {userAvatarSource ? (
                <img
                  src={userAvatarSource}
                  alt={user.fullName || user.username}
                  // Áp dụng styling hiện đại cho ảnh
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder.png"; // Fallback image
                  }}
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-lg">
                    {/* Placeholder ban đầu của bạn: "Chưa có" */}
                    <span className="text-gray-400 italic font-semibold text-sm">Chưa có</span>
                </div>
              )}
            </div>
            
            <div className="text-center md:text-left pt-2">
              <h2 className="text-3xl font-bold text-gray-900">
                {user.fullName || user.username}
              </h2>
              <p className="text-xl text-orange-600 mt-1">{userRole}</p>
              <div className="mt-4 flex justify-center md:justify-start space-x-3">
                <Link
                  to="/thong-tin/chinh-sua" 
                  className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-colors flex items-center"
                >
                  <FaEdit className="mr-2" /> Chỉnh sửa hồ sơ
                </Link>
                <Link
                  to="/thong-tin/doi-mat-khau" 
                  className="bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-300 transition-colors flex items-center"
                >
                  <FaKey className="mr-2" /> Đổi mật khẩu
                </Link>
              </div>
            </div>
          </div>

          {/* Chi tiết thông tin */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                Thông tin cơ bản
            </h3>
            
            <DetailRow icon={FaUserCircle} label="Họ tên" value={user.fullName} />
            <DetailRow icon={FaUserTag} label="Tên đăng nhập" value={user.username} />
            <DetailRow icon={FaEnvelope} label="Email" value={user.email} />
            <DetailRow icon={FaPhone} label="Điện thoại" value={user.phone} />
            <DetailRow icon={FaMapMarkerAlt} label="Địa chỉ" value={user.address} />
            
            <div className="pt-4 mt-4 border-t border-gray-200">
                <DetailRow icon={FaUserTag} label="Vai trò hệ thống" value={userRole} />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Profile;