import React from 'react';
import { 
    BarChart,         // Thay thế LineChart
    Bar,              // Thay thế Line
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer 
} from 'recharts';

// Hàm định dạng tiền tệ Việt Nam Đồng
const formatCurrency = (value) => {
    // Đảm bảo giá trị là số trước khi định dạng
    if (typeof value !== 'number') return ''; 
    return `${Math.round(value).toLocaleString('vi-VN')} VNĐ`;
};

// Hàm định dạng Tooltip (hover trên biểu đồ)
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-3 bg-white border border-gray-300 shadow-lg rounded-md text-sm">
                <p className="font-bold text-gray-800 mb-1">{`Ngày: ${label}`}</p>
                {/* payload[0] là Bar duy nhất, lấy giá trị từ đó */}
                <p className="text-green-600">{`Doanh thu: ${formatCurrency(payload[0].value)}`}</p>
            </div>
        );
    }
    return null;
};

// Recharts cần key `dataKey` là chuỗi, nên chúng ta cần ánh xạ dữ liệu:
// { date: "...", totalSales: 123 } -> { name: "...", DoanhThu: 123 }
export default function SalesChart({ salesData }) {
    const formattedData = salesData.map(item => ({
        name: item.date, // Dùng ngày làm tên trục X
        DoanhThu: item.totalSales, // Dùng totalSales làm giá trị biểu đồ cột
    }));
    
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart // <--- Đã thay đổi thành BarChart
                    data={formattedData}
                    margin={{
                        top: 10, right: 30, left: 0, bottom: 0, // Điều chỉnh margin cho BarChart
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} /> {/* Chỉ hiện grid ngang */}
                    {/* Trục X hiển thị ngày (name) */}
                    <XAxis 
                        dataKey="name" 
                        stroke="#6b7280" 
                        fontSize={12} 
                        tickLine={false} // Bỏ gạch chân trên label
                        axisLine={false} // Bỏ đường trục
                    /> 
                    {/* Trục Y hiển thị giá trị doanh số, dùng hàm định dạng */}
                    <YAxis 
                        tickFormatter={val => `${(val / 1000000).toFixed(1)}M`} // Định dạng đơn vị triệu
                        stroke="#6b7280"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} /> {/* Thêm cursor nền nhẹ */}
                    {/* Đường biểu diễn đã được thay thế bằng Bar */}
                    <Bar 
                        dataKey="DoanhThu" // <--- Đã thay đổi thành Bar và dataKey tương ứng
                        fill="#10B981"    // Màu xanh lá cây cho cột
                        barSize={30}      // Kích thước của cột
                        radius={[5, 5, 0, 0]} // Bo tròn góc trên của cột
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}