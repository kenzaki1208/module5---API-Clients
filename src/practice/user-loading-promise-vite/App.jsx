import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/global.css";
import "./styles/loading.css";
import "./styles/userList.css";

export default function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    // Gọi API thông qua Promise + setTimeout (delay 3s)
    const getUsers = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                axios
                    .get("http://localhost:3001/users")
                    .then((res) => resolve(res))
                    .catch((err) => reject(err));
            }, 3000); // delay 3s
        });
    };

    useEffect(() => {
        setLoading(true);
        getUsers()
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.error("Lỗi khi lấy dữ liệu:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Loading
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

    // UI chính
    return (
        <div className="main-container">
            <div className="content-card">
                <h1 className="page-title">📋 Danh sách người dùng</h1>

                <div className="users-section">
                    {users.length === 0 ? (
                        <p className="empty-state">Không có dữ liệu người dùng</p>
                    ) : (
                        <ul className="users-list">
                            {users.map((user, index) => (
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