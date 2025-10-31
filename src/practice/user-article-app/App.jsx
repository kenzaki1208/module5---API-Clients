import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
    // Khởi tạo state để lưu trữ danh sách users (bao gồm cả số bài viết)
    const [users, setUsers] = useState([]);

    // useEffect chạy một lần khi component được mount
    useEffect(() => {
        // Tạo 2 request API đồng thời để lấy dữ liệu users và articles
        const getUsers = axios.get("http://localhost:3001/users");
        const getArticles = axios.get("http://localhost:3001/articles");

        // Sử dụng axios.all để gọi cả 2 API cùng lúc
        axios
            .all([getUsers, getArticles])
            .then(
                // Sử dụng axios.spread để xử lý kết quả từ 2 API
                axios.spread((res1, res2) => {
                    // Kết hợp dữ liệu users với số lượng bài viết của từng user
                    const userData = res1.data.map((user) => {
                        // Lọc ra các bài viết của user hiện tại
                        // Sử dụng == thay vì === để so sánh cả string và number
                        const userArticles = res2.data.filter(
                            (article) => article.userId == user.id
                        );
                        // Trả về object user với thêm mảng articles
                        return {
                            ...user, // Giữ nguyên các thuộc tính của user (id, name, birthday)
                            articles: userArticles // Thêm mảng bài viết
                        };
                    });
                    // Cập nhật state với dữ liệu đã xử lý
                    setUsers(userData);
                })
            )
            .catch((err) => {
                // Xử lý lỗi nếu có
                console.error("Lỗi khi gọi API:", err);
            });
    }, []); // Mảng dependency rỗng có nghĩa là useEffect chỉ chạy một lần

    // Render giao diện
    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>📋 Danh sách người dùng và số bài viết</h1>
                {/* Bảng hiển thị dữ liệu */}
                <table style={styles.table}>
                    <thead>
                    <tr style={styles.headerRow}>
                        <th style={styles.headerCell}>👤 Tên người dùng</th>
                        <th style={styles.headerCell}>🎂 Năm sinh</th>
                        <th style={styles.headerCell}>📝 Số bài viết</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Duyệt qua mảng users và tạo ra các hàng trong bảng */}
                    {users.map((user) => (
                        <tr key={user.id} style={styles.bodyRow}>
                            <td style={styles.cell}>{user.name}</td>
                            <td style={{ ...styles.cell, textAlign: "center" }}>
                                {user.birthday}
                            </td>
                            <td style={{ ...styles.cell, textAlign: "center" }}>
                                {/* Hiển thị số lượng bài viết bằng cách đếm length của mảng articles */}
                                {user.articles.length}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Định nghĩa styles cho các element trong component
const styles = {
    // Style cho container chính - full màn hình với flex để center nội dung
    container: {
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f9",
        fontFamily: "Arial, sans-serif",
        padding: "0 20px"
    },
    // Style cho card chứa nội dung chính
    card: {
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        padding: "30px",
        maxWidth: "700px",
        width: "100%"
    },
    // Style cho tiêu đề
    title: {
        marginBottom: "20px",
        textAlign: "center",
        color: "#2c3e50",
        fontSize: "1.6rem"
    },
    // Style cho bảng
    table: {
        width: "100%",
        borderCollapse: "collapse"
    },
    // Style cho hàng header
    headerRow: {
        backgroundColor: "#0070f3",
        color: "white"
    },
    // Style cho ô header
    headerCell: {
        padding: "14px",
        fontWeight: "bold",
        textAlign: "left",
        fontSize: "1rem"
    },
    // Style cho hàng dữ liệu
    bodyRow: {
        backgroundColor: "#f9f9f9",
        transition: "background-color 0.2s ease"
    },
    // Style cho ô dữ liệu
    cell: {
        padding: "12px",
        borderTop: "1px solid #ddd"
    }
};

export default App;