import { useState } from "react";
import { FaLock, FaKey, FaArrowLeft, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserServices from "../../../services/UserServices"; // Giả định dùng chung UserServices

const PasswordField = ({ label, name, value, onChange }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
        <FaKey className="w-4 h-4 mr-2 text-red-500" /> {label}
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-red-500 focus:border-red-500 transition duration-150 pr-10"
          required
          minLength="6" // Giả định độ dài tối thiểu
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-600 hover:text-red-500"
          aria-label={show ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
    setMessage({ type: '', text: '' });
  };

  // Xử lý đổi mật khẩu
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    if (!userId) {
      setMessage({ type: 'error', text: 'Vui lòng đăng nhập lại.' });
      setIsSaving(false);
      return;
    }

    if (passwords.newPassword !== passwords.confirmNewPassword) {
      setMessage({ type: 'error', text: 'Mật khẩu mới và xác nhận mật khẩu không khớp.' });
      setIsSaving(false);
      return;
    }

    const payload = {
      oldPassword: passwords.oldPassword,
      newPassword: passwords.newPassword,
    };

    try {
      // Giả định UserServices có hàm changePassword
      await UserServices.changePassword(userId, payload); 

      setMessage({ type: 'success', text: '🎉 Đổi mật khẩu thành công! Vui lòng đăng nhập lại lần sau.' });
      setPasswords({ oldPassword: "", newPassword: "", confirmNewPassword: "" }); // Reset form
      // Tùy chọn: Chuyển hướng người dùng ra trang đăng nhập sau 2s
      setTimeout(() => navigate('/login'), 2000); 

    } catch (err) {
      console.error("Lỗi đổi mật khẩu:", err);
      const msg = err?.response?.data?.message || "Đổi mật khẩu thất bại. (Sai mật khẩu cũ?)";
      setMessage({ type: 'error', text: msg });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-xl shadow-2xl border-t-4 border-red-500">
          
          <button 
            onClick={() => navigate('/profile')} 
            className="text-gray-600 hover:text-red-500 flex items-center mb-6 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Quay lại hồ sơ
          </button>

          <header className="mb-6 border-b pb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              🔒 Đổi Mật khẩu
            </h1>
            <p className="text-gray-600 mt-1">
              Bảo mật tài khoản của bạn bằng cách sử dụng một mật khẩu mạnh.
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
            
            <PasswordField 
              label="Mật khẩu hiện tại"
              name="oldPassword"
              value={passwords.oldPassword}
              onChange={handleChange}
            />

            <PasswordField 
              label="Mật khẩu mới (Tối thiểu 6 ký tự)"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
            />

            <PasswordField 
              label="Xác nhận mật khẩu mới"
              name="confirmNewPassword"
              value={passwords.confirmNewPassword}
              onChange={handleChange}
            />
          
            {/* Nút Submit */}
            <button
              type="submit"
              disabled={isSaving}
              className={`flex items-center justify-center space-x-2 w-full py-3 text-lg font-bold rounded-xl shadow-lg transition-all transform ${
                isSaving
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              {isSaving ? (
                <>
                  <FaSpinner className="animate-spin w-5 h-5" />
                  <span>Đang đổi...</span>
                </>
              ) : (
                <>
                  <FaLock className="w-5 h-5" />
                  <span>Cập nhật Mật khẩu</span>
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default ChangePassword;