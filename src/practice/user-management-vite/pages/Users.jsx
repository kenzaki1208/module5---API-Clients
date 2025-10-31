import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Users.css";

export default function Users() {
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:3001/users")
            .then((res) => setUsers(res.data))
            .catch((err) => console.error("Error fetching users:", err));
    }, []);

    return (
        <div className="users-container">
            <div className="users-card">
                {/* Tiêu đề trang */}
                <h1 className="users-title">📋 Danh sách người dùng</h1>

                {/* Container chứa danh sách users */}
                <div className="users-list">
                    {/* Kiểm tra xem có users không */}
                    {users.length > 0 ? (
                        users.map((user) => (
                            <div
                                key={user.id}
                                className="users-item"
                                onClick={() => navigate(`/user/${user.id}`)}
                            >
                                {/* Thông tin user */}
                                <div className="users-item-info">
                                    <div className="users-item-name">👤 {user.name}</div>
                                    <div className="users-item-birthday">
                                        {/* Format ngày sinh theo định dạng Việt Nam */}
                                        Sinh nhật: {new Date(user.birthday).toLocaleDateString("vi-VN")}
                                    </div>
                                </div>

                                {/* Nút action */}
                                <div className="users-item-action">
                                    Xem chi tiết →
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="users-empty">
                            Chưa có người dùng nào 🤷‍♂️
                        </div>
                    )}
                </div>

                {/* Nút thêm người dùng mới */}
                <button
                    onClick={() => navigate("/user/add")}
                    className="users-create-btn"
                >
                    ➕ Thêm người dùng mới
                </button>
            </div>
        </div>
    );
}