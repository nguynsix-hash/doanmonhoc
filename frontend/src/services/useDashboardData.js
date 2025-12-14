// src/hooks/useDashboardData.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios'; // Giả định bạn dùng Axios

// Base URL của Backend
const API_BASE_URL = 'http://localhost:8080/api/admin/dashboard';

// Custom Hook để fetch toàn bộ dữ liệu Dashboard
const useDashboardData = () => {
    // ------------------ Trạng thái dữ liệu ------------------
    const [kpis, setKpis] = useState(null);
    const [salesData, setSalesData] = useState([]);
    const [latestOrders, setLatestOrders] = useState([]);
    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // FIX: Lấy token bằng khóa 'token' đã được xác nhận từ UserServices
    const getToken = () => {
        const token = localStorage.getItem('token'); 
        return token ? `Bearer ${token}` : '';
    };

    // Hàm fetch dữ liệu Dashboard (sử dụng Promise.all để fetch song song)
    const fetchDashboardData = useCallback(async (days = 7) => {
        setLoading(true);
        setError(null);
        const token = getToken();

        if (!token) {
            setError("Authentication token not found.");
            setLoading(false);
            return;
        }

        const headers = { Authorization: token };

        try {
            // Fetch tất cả 4 endpoints song song
            const [
                kpisRes,
                salesRes,
                ordersRes,
                productsRes
            ] = await Promise.all([
                axios.get(`${API_BASE_URL}/kpis`, { headers }),
                axios.get(`${API_BASE_URL}/sales-data?days=${days}`, { headers }),
                axios.get(`${API_BASE_URL}/latest-orders`, { headers }),
                axios.get(`${API_BASE_URL}/low-stock-products`, { headers })
            ]);

            // Cập nhật trạng thái
            setKpis(kpisRes.data);
            setSalesData(salesRes.data);
            setLatestOrders(ordersRes.data);
            setLowStockProducts(productsRes.data);

        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            // Cải thiện thông báo lỗi cho 403
            if (err.response && err.response.status === 403) {
                setError("Access Denied: You do not have ADMIN permission to view the dashboard. Please log in with an administrator account.");
            } else {
                setError(err.response?.data?.message || `Request failed with status code ${err.response?.status || 'N/A'}.`);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch dữ liệu khi component mount
    useEffect(() => {
        fetchDashboardData(7);
    }, [fetchDashboardData]);

    // Trả về dữ liệu và các trạng thái
    return {
        kpis,
        salesData,
        latestOrders,
        lowStockProducts,
        loading,
        error,
        refetch: fetchDashboardData
    };
};

export default useDashboardData;