import { FaLaptop, FaMicrochip, FaMobileAlt, FaRobot } from "react-icons/fa";

const products = [
  {
    id: 1,
    title: "Laptop Pro X1",
    description: "Laptop cấu hình khủng, thiết kế mỏng nhẹ phù hợp cho dân văn phòng và lập trình viên.",
    icon: <FaLaptop size={40} className="text-indigo-600" />,
  },
  {
    id: 2,
    title: "Chip AI NeuralX",
    description: "Chip AI thế hệ mới giúp tăng tốc xử lý machine learning và các tác vụ trí tuệ nhân tạo.",
    icon: <FaMicrochip size={40} className="text-indigo-600" />,
  },
  {
    id: 3,
    title: "Smartphone Ultra 5G",
    description: "Điện thoại thông minh hỗ trợ 5G, camera siêu nét, pin trâu cho trải nghiệm cả ngày dài.",
    icon: <FaMobileAlt size={40} className="text-indigo-600" />,
  },
  {
    id: 4,
    title: "Robot Home Assistant",
    description: "Robot trợ lý gia đình thông minh, hỗ trợ điều khiển thiết bị và nhắc nhở công việc.",
    icon: <FaRobot size={40} className="text-indigo-600" />,
  },
];

const IntroductProductTech = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-indigo-800 mb-4">📱 Sản Phẩm Công Nghệ Nổi Bật</h1>
        <p className="text-gray-600 mb-10">
          Chúng tôi mang đến những sản phẩm công nghệ tiên tiến nhất, đáp ứng mọi nhu cầu từ học tập, làm việc đến giải trí.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <div className="mb-4 flex justify-center">{product.icon}</div>
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">{product.title}</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntroductProductTech;
