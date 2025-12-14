import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaHeart, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12 shadow-inner shadow-green-900/50">
      <div className="py-16 border-t border-green-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
            {/* Cột 1: Giới Thiệu & Liên Hệ (Nổi bật) */}
            <div className="col-span-2 md:col-span-2">
              <h3 className="text-3xl font-extrabold mb-4 text-green-400">
                🏸 Shop Cầu Lông
              </h3>
              <p className="text-gray-300 text-base mb-6 leading-relaxed">
                Chuyên cung cấp vợt, giày, quần áo cầu lông chính hãng, chất lượng đảm bảo. Đam mê và chuyên nghiệp là cam kết của chúng tôi.
              </p>
              
              <div className="space-y-3 text-gray-400 text-sm">
                <div className="flex items-start gap-2">
                  <FaMapMarkerAlt className="text-green-500 mt-1 flex-shrink-0" /> 
                  <span className="hover:text-green-300 transition duration-300">
                    123 Đường Thể Thao, Quận 1, TP.HCM
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhone className="text-green-500 flex-shrink-0" /> 
                  <a href="tel:0987654321" className="hover:text-green-300 transition duration-300">
                    0987 654 321
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-green-500 flex-shrink-0" /> 
                  <a href="mailto:support@caulongshop.com" className="hover:text-green-300 transition duration-300">
                    support@caulongshop.com
                  </a>
                </div>
              </div>

              {/* Mạng xã hội */}
              <div className="mt-6 flex space-x-4 text-2xl">
                <a href="#" className="text-gray-400 hover:text-blue-600 transition duration-300" aria-label="Facebook"><FaFacebook /></a>
                <a href="#" className="text-gray-400 hover:text-pink-500 transition duration-300" aria-label="Instagram"><FaInstagram /></a>
                <a href="#" className="text-gray-400 hover:text-red-600 transition duration-300" aria-label="YouTube"><FaYoutube /></a>
              </div>
            </div>

            {/* Cột 2: Hỗ trợ */}
            <div>
              <h3 className="text-xl font-bold mb-5 uppercase tracking-wider text-green-400">Hỗ trợ</h3>
              <ul className="space-y-3 text-gray-400 text-base">
                <li><Link to="/chinh-sach-bao-hanh" className="hover:text-yellow-400 transition duration-300">Chính sách bảo hành</Link></li>
                <li><Link to="/huong-dan-mua-hang" className="hover:text-yellow-400 transition duration-300">Hướng dẫn mua hàng</Link></li>
                <li><Link to="/chinh-sach-doi-tra" className="hover:text-yellow-400 transition duration-300">Chính sách đổi trả</Link></li>
                <li><Link to="/cau-hoi-thuong-gap" className="hover:text-yellow-400 transition duration-300">Câu hỏi thường gặp (FAQ)</Link></li>
              </ul>
            </div>

            {/* Cột 3: Tài khoản */}
            <div>
              <h3 className="text-xl font-bold mb-5 uppercase tracking-wider text-green-400">Tài khoản</h3>
              <ul className="space-y-3 text-gray-400 text-base">
                <li><Link to="/tai-khoan" className="hover:text-yellow-400 transition duration-300">Thông tin tài khoản</Link></li>
                <li><Link to="/gio-hang" className="hover:text-yellow-400 transition duration-300">Giỏ hàng & Thanh toán</Link></li>
                <li><Link to="/yeu-thich" className="hover:text-yellow-400 transition duration-300">Sản phẩm yêu thích</Link></li>
                <li><Link to="/don-hang" className="hover:text-yellow-400 transition duration-300">Theo dõi đơn hàng</Link></li>
                <li><Link to="/ho-tro" className="hover:text-yellow-400 transition duration-300">Hỗ trợ khách hàng</Link></li>
              </ul>
            </div>

            {/* Cột 4: Thanh toán & Chứng nhận */}
            <div>
              <h3 className="text-xl font-bold mb-5 uppercase tracking-wider text-green-400">Thanh toán</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-700 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">VISA</span>
                <span className="bg-gray-700 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold">MasterCard</span>
                <span className="bg-gray-700 text-green-400 px-3 py-1 rounded-full text-xs font-semibold">ZaloPay</span>
                <span className="bg-gray-700 text-red-400 px-3 py-1 rounded-full text-xs font-semibold">COD</span>
              </div>
              
              <h3 className="text-xl font-bold mb-3 uppercase tracking-wider text-green-400 mt-6">Chứng nhận</h3>
              <div className="flex gap-2 text-2xl text-green-500">
                 {/* Các biểu tượng chứng nhận/bảo mật, bạn có thể thay thế bằng ảnh logo */}
                 <span>🔒</span> 
                 <span>✅</span> 
                 <span>🛡️</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phần Copyright (Chân Footer) */}
      <div className="py-4 bg-gray-900 text-center">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} **Shop Cầu Lông Chính Hãng** | Được thiết kế với <FaHeart className="inline text-red-500 mx-1 animate-pulse" /> bởi Erick
        </p>
      </div>
    </footer>
  );
}