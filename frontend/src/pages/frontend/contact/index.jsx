import { useState } from "react";
import ContactServices from "../../../services/ContactServices";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane, FaSpinner } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
    message: ""
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess("");
    setError("");

    // Simple validation (can be enhanced with a library like Formik/Yup)
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setError("Vui lòng điền đầy đủ thông tin bắt buộc.");
      setIsLoading(false);
      return;
    }
    
    try {
      await ContactServices.createContact(formData);
      setSuccess("🎉 Cảm ơn bạn! Yêu cầu liên hệ của bạn đã được gửi thành công. Chúng tôi sẽ phản hồi sớm nhất có thể.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        title: "",
        message: ""
      });
    } catch (err) {
      console.error("Lỗi gửi liên hệ:", err);
      const msg = err?.response?.data?.message || "Có lỗi xảy ra, vui lòng kiểm tra kết nối và thử lại.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const InfoCard = ({ icon: Icon, title, content }) => (
    <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-md border-l-4 border-orange-500">
      <Icon className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
      <div>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Gửi yêu cầu Liên hệ
          </h1>
          <p className="text-xl text-gray-600">
            Chúng tôi luôn sẵn lòng lắng nghe ý kiến và hỗ trợ bạn.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Cột 1: Thông tin liên hệ chi tiết (Sidebar) */}
          <aside className="lg:col-span-1 space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Thông tin chúng tôi</h2>
            
            <InfoCard 
              icon={FaMapMarkerAlt} 
              title="Địa chỉ" 
              content="123 Đường ABC, Phường Bến Thành, Quận 1, TP.HCM, Việt Nam" 
            />
            <InfoCard 
              icon={FaPhone} 
              title="Điện thoại" 
              content="(+84) 909 123 456" 
            />
            <InfoCard 
              icon={FaEnvelope} 
              title="Email" 
              content="info@example.com" 
            />
            <InfoCard 
              icon={FaClock} 
              title="Giờ làm việc" 
              content="Thứ Hai - Thứ Sáu: 8:00 - 18:00" 
            />
            
            {/* Google Map */}
            <div className="mt-8 pt-4 border-t border-gray-200">
                <h2 className="text-xl font-semibold mb-3 text-gray-800">Vị trí của chúng tôi</h2>
                <div className="rounded-xl overflow-hidden shadow-xl border border-gray-200">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4996489379897!2d106.6999464!3d10.7735392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f36f958f2fd%3A0xf6d601d51608d0e7!2sBen%20Thanh%20Market!5e0!3m2!1sen!2sde!4v1700000000000!5m2!1sen!2sde" // Thay bằng embed code của địa chỉ thật
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
          </aside>

          {/* Cột 2: Form liên hệ */}
          <main className="lg:col-span-2 bg-white p-8 lg:p-10 rounded-xl shadow-2xl border-t-4 border-orange-600 h-fit">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Gửi tin nhắn cho chúng tôi
            </h2>
            
            {/* Alert Messages */}
            {success && <div className="bg-green-100 text-green-800 p-4 mb-4 rounded-lg font-medium border border-green-200">{success}</div>}
            {error && <div className="bg-red-100 text-red-800 p-4 mb-4 rounded-lg font-medium border border-red-200">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="👤 Họ tên (Bắt buộc)"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500 transition duration-150"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="📧 Email (Bắt buộc)"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500 transition duration-150"
                  required
                />
              </div>

              {/* Row 2: Phone and Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="tel"
                  name="phone"
                  placeholder="📱 Số điện thoại (Bắt buộc)"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500 transition duration-150"
                  required
                />
                <input
                  type="text"
                  name="title"
                  placeholder="📝 Tiêu đề / Chủ đề (Tùy chọn)"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500 transition duration-150"
                />
              </div>
          
              {/* Row 3: Message */}
              <textarea
                name="message"
                placeholder="💬 Nội dung tin nhắn / Chi tiết yêu cầu (Bắt buộc)"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500 transition duration-150"
                rows="6"
                required
              ></textarea>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`flex items-center justify-center space-x-2 w-full py-3 text-lg font-bold rounded-xl shadow-lg transition-all transform ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-600 text-white hover:bg-orange-700 hover:scale-[1.01]"
                }`}
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin w-5 h-5" />
                    <span>Đang gửi...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="w-5 h-5" />
                    <span>Gửi Yêu cầu Liên hệ</span>
                  </>
                )}
              </button>
            </form>
          </main>

        </div>
      </div>
    </div>
  );
};

export default Contact;