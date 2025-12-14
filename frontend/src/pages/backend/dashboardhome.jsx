import React from "react";
// Import hook để fetch dữ liệu dashboard
import useDashboardData from '../../services/useDashboardData'; 
// Điều chỉnh đường dẫn import cho phù hợp với cấu trúc thư mục của bạn

// *** IMPORT COMPONENT BIỂU ĐỒ MỚI ***
import SalesChart from '../../components/SalesChart'; // Thay đổi đường dẫn này nếu cần

export default function DashboardHome() {
    // 1. GỌI HOOK LẤY DỮ LIỆU
    const { kpis, salesData, latestOrders, lowStockProducts, loading, error, refetch } = useDashboardData();

    // 2. XỬ LÝ TRẠNG THÁI LOADING
    if (loading) {
        return (
            <div className="text-2xl font-bold text-center mt-10 text-blue-500">
                Đang tải dữ liệu Dashboard...
            </div>
        );
    }

    // 3. XỬ LÝ TRẠNG THÁI LỖI
    if (error) {
        return (
            <div className="text-2xl font-bold text-center mt-10 text-red-600">
                Lỗi tải dữ liệu: {error}
                <button 
                    onClick={() => refetch()} 
                    className="ml-4 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-700"
                >
                    Thử lại
                </button>
            </div>
        );
    }
    
    // Đảm bảo dữ liệu KPI đã sẵn sàng
    const revenue = kpis?.totalRevenue || 0;
    const orders = kpis?.totalOrders || 0;
    const pending = kpis?.pendingOrders || 0;
    const activeProducts = kpis?.activeProducts || 0;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">📊 Chào mừng đến trang quản trị!</h1>

            {/* PHẦN 1: THẺ SỐ LIỆU QUAN TRỌNG (KPIs) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Tổng Doanh Thu */}
                <KpiCard 
                    title="Tổng Doanh Thu" 
                    value={`${revenue.toLocaleString('vi-VN')} VNĐ`} 
                    icon="💲" 
                    color="bg-green-100 text-green-800"
                />
                
                {/* Tổng Đơn Hàng */}
                <KpiCard 
                    title="Tổng Đơn Hàng" 
                    value={orders.toLocaleString('vi-VN')} 
                    icon="🛒" 
                    color="bg-blue-100 text-blue-800"
                />

                {/* Đơn Hàng Đang Chờ */}
                <KpiCard 
                    title="Đơn Hàng Đang Chờ" 
                    value={pending.toLocaleString('vi-VN')} 
                    icon="⏳" 
                    // Lưu ý: Đã sửa lại lỗi class 'bg-yellow-1100' thành 'bg-yellow-100'
                    color="bg-yellow-100 text-yellow-800" 
                />
                
                {/* Sản Phẩm Đang Hoạt Động */}
                <KpiCard 
                    title="SP Đang Hoạt Động" 
                    value={activeProducts.toLocaleString('vi-VN')} 
                    icon="📦" 
                    color="bg-purple-100 text-purple-800"
                />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* PHẦN 2: BIỂU ĐỒ DOANH THU (Đã tích hợp SalesChart) */}
                <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-4">
                    <h3 className="text-xl font-semibold mb-3">📈 Doanh Thu 7 Ngày Gần Nhất</h3>
                    
                    {/* Hiển thị biểu đồ nếu có dữ liệu, ngược lại hiển thị thông báo */}
                    {salesData && salesData.length > 0 ? (
                        <SalesChart salesData={salesData} />
                    ) : (
                        <p className="text-gray-500 pt-10 text-center">
                            Không có dữ liệu doanh thu để hiển thị biểu đồ.
                        </p>
                    )}

                </div>

                {/* PHẦN 3: CẢNH BÁO TỒN KHO THẤP */}
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h3 className="text-xl font-semibold mb-3 text-red-600">⚠️ Cảnh Báo Tồn Kho Thấp</h3>
                    {lowStockProducts.length > 0 ? (
                        <ul className="space-y-2">
                            {lowStockProducts.map(p => (
                                <li key={p.id} className="p-2 border-l-4 border-red-500 bg-red-50">
                                    <span className="font-medium">{p.name}</span>: **{p.quantity}**
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">🎉 Không có sản phẩm nào sắp hết hàng.</p>
                    )}
                </div>
            </div>

            {/* PHẦN 4: DANH SÁCH ĐƠN HÀNG MỚI NHẤT */}
            <div className="mt-8 bg-white shadow-lg rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-3">🛒 5 Đơn Hàng Mới Nhất</h3>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mã ĐH</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Khách hàng</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tổng tiền</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {latestOrders.map(order => (
                            <tr key={order.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerName || "N/A"}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.totalAmount?.toLocaleString('vi-VN')} VNĐ</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Component phụ trợ cho Thẻ KPI
const KpiCard = ({ title, value, icon, color }) => (
    <div className={`p-4 rounded-lg shadow-md ${color}`}>
        <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{title}</p>
            <span className="text-3xl">{icon}</span>
        </div>
        <div className="mt-1">
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
);

// Hàm phụ trợ tạo badge trạng thái
const getStatusBadge = (status) => {
    switch (status) {
        case 'COMPLETED':
            return 'bg-green-100 text-green-800';
        case 'PENDING':
            return 'bg-yellow-100 text-yellow-800';
        case 'CANCELED':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};