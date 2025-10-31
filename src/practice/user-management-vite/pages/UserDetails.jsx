import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserDetails.css";

// Component UserDetails dùng để thêm mới hoặc chỉnh sửa thông tin người dùng
export default function UserDetails() {
    // Lấy userId từ URL params (nếu có)
    const { userId } = useParams();

    // Hook để điều hướng giữa các trang
    const navigate = useNavigate();

    // Kiểm tra xem đây là chế độ tạo mới hay chỉnh sửa
    // Nếu không có userId thì là tạo mới
    const isCreate = !userId;

    // State để lưu thông tin user
    const [user, setUser] = useState({
        id: "",
        name: "",
        birthday: ""
    });

    // useEffect chạy khi component mount hoặc userId thay đổi
    useEffect(() => {
        // Nếu có userId (chế độ chỉnh sửa), gọi API để lấy thông tin user
        if (userId) {
            axios
                .get(`http://localhost:3001/users/${userId}`)
                .then((res) => setUser(res.data)) // Cập nhật state với dữ liệu từ API
                .catch((err) => console.error("Error loading user:", err)); // Xử lý lỗi nếu có
        }
    }, [userId]); // Dependency array - chỉ chạy lại khi userId thay đổi

    // Hàm xử lý khi người dùng nhập liệu vào form
    const handleChange = (e) => {
        const { name, value } = e.target; // Lấy name và value từ input
        setUser((prev) => ({
            ...prev,        // Giữ nguyên các field khác
            [name]: value   // Cập nhật field đang thay đổi
        }));
    };

    // Hàm xử lý khi submit form
    const handleSubmit = (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form

        // Tạo request tùy thuộc vào chế độ (tạo mới hay cập nhật)
        const request = isCreate
            ? axios.post("http://localhost:3001/users", user)           // POST để tạo mới
            : axios.put(`http://localhost:3001/users/${userId}`, user); // PUT để cập nhật

        // Thực hiện request
        request
            .then((res) => {
                // Hiển thị thông báo thành công
                alert(`${isCreate ? "Tạo mới" : "Cập nhật"} người dùng thành công!`);
                navigate("/"); // Điều hướng về trang chủ
            })
            .catch((err) => console.error("Error submitting form:", err)); // Xử lý lỗi
    };

    // Render giao diện
    return (
        <div className="user-details-container">
            <div className="user-details-card">
                {/* Tiêu đề động tùy thuộc vào chế độ */}
                <h1 className="user-details-title">
                    {isCreate ? "➕ Thêm mới người dùng" : "✏️ Chỉnh sửa người dùng"}
                </h1>

                {/* Form nhập liệu */}
                <form onSubmit={handleSubmit}>
                    {/* Field ID */}
                    <div className="user-details-form-group">
                        <label className="user-details-label">ID:</label>
                        <input
                            name="id"
                            value={user.id}
                            onChange={handleChange}
                            disabled={!isCreate}
                            className="user-details-input"
                        />
                    </div>

                    {/* Field Tên */}
                    <div className="user-details-form-group">
                        <label className="user-details-label">Tên:</label>
                        <input
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            className="user-details-input"
                        />
                    </div>

                    {/* Field Ngày sinh */}
                    <div className="user-details-form-group">
                        <label className="user-details-label">Ngày sinh:</label>
                        <input
                            type="date"
                            name="birthday"
                            value={user.birthday}
                            onChange={handleChange}
                            className="user-details-input"
                        />
                    </div>

                    {/* Container chứa các nút */}
                    <div className="user-details-button-container">
                        {/* Nút quay lại */}
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="user-details-btn user-details-btn-secondary"
                        >
                            🔙 Quay lại
                        </button>

                        {/* Nút submit - text động tùy thuộc vào chế độ */}
                        <button
                            type="submit"
                            className="user-details-btn user-details-btn-primary"
                        >
                            ✅ {isCreate ? "Tạo mới" : "Cập nhật"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}