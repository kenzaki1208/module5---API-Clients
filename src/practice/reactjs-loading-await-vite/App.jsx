import { useEffect, useState } from "react";
import axios from "axios";
import "./styles/global.css";
import "./styles/loading.css";
import "./styles/userList.css";

export default function App() {
    // State để lưu trữ danh sách users lấy từ API
    const [users, setUsers] = useState([]);
    // State để theo dõi trạng thái loading
    const [loading, setLoading] = useState(false);

    // Hàm async để lấy dữ liệu users từ API
    const getUsers = async () => {
        // Giả lập delay 3 giây để demo loading state
        await new Promise((resolve) => setTimeout(resolve, 3000));
        // Gọi API để lấy danh sách users
        // chạy api với db3.json
        return await axios.get("http://localhost:3001/users");
    };

    // useEffect hook chạy khi component được mount
    useEffect(() => {
        // Định nghĩa hàm async để fetch dữ liệu
        const fetchData = async () => {
            // Bật trạng thái loading trước khi gọi API
            setLoading(true);
            try {
                // Gọi API để lấy dữ liệu users
                const res = await getUsers();
                // Cập nhật state users với dữ liệu từ API
                setUsers(res.data);
            } catch (error) {
                // Xử lý lỗi nếu có
                console.error("Lỗi gọi API:", error);
            } finally {
                // Tắt trạng thái loading sau khi hoàn thành (thành công hoặc lỗi)
                setLoading(false);
            }
        };

        // Gọi hàm fetchData
        fetchData();
    }, []); // Dependency array rỗng - chỉ chạy 1 lần khi component mount

    // Nếu đang trong trạng thái loading, hiển thị loading UI
    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-card">
                    <div className="loading-spinner">⏳</div>
                    <p className="loading-text">Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    // Render giao diện chính khi đã tải xong dữ liệu
    return (
        <div className="main-container">
            <div className="content-card">
                <h1 className="page-title">📋 Danh sách người dùng</h1>
                <div className="users-section">
                    {/* Kiểm tra nếu không có dữ liệu users */}
                    {users.length === 0 ? (
                        <p className="empty-state">Không có dữ liệu người dùng</p>
                    ) : (
                        /* Hiển thị danh sách users nếu có dữ liệu */
                        <ul className="users-list">
                            {/* Map qua từng user để render thành list item */}
                            {users.map((user) => (
                                <li key={user.id} className="user-item">
                                    <span className="user-icon">👤</span>
                                    <span className="user-name">{user.name}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}