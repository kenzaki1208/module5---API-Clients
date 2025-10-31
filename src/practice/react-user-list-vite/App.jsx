import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log("Lỗi khi gọi API:", err);
      });
  }, []);

  return (
    <div className="user-list-container">
      <div className="user-list-card">
        <h1 className="user-list-title">
          <span className="title-icon">📋</span>
          Danh sách người dùng
        </h1>

        <div className="user-list-content">
          {users.length > 0 ? (
            <ul className="user-list">
              {users.map((user) => (
                <li key={user.id} className="user-item">
                  <div className="user-avatar"> {/* Avatar tròn */}
                    <span className="avatar-icon">👤</span>
                  </div>
                  <div className="user-info"> {/* Thông tin bên phải avatar */}
                    <h3 className="user-name">{user.name}</h3> {/* Tên người dùng */}
                    <p className="user-birthday">Sinh năm {user.birthday}</p> {/* Năm sinh */}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="loading">
              <div className="loading-spinner"></div> {/* Vòng tròn quay */}
              <p>Đang tải danh sách người dùng...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App
