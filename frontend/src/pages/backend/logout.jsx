import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('adminUser');
        navigate('/admin/login'); // quay về login
    }, []);

    return <p>Đang đăng xuất...</p>;
};

export default Logout;
