import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/users").then((res) => setUsers(res.data));
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3001/users/${id}`);
        await axios
            .get(`http://localhost:3001/articles?user_id=${id}`)
            .then((res) =>
                res.data.forEach(async (a) => {
                    await axios.delete(`http://localhost:3001/articles/${a.id}`);
                })
            );
        alert("Deleted successfully");
        setUsers(users.filter((u) => u.id !== id));
    };

    return (
        <div style={{ padding: "30px" }}>
            <h2>Users</h2>
            <button
                style={{ background: "green", color: "white", marginBottom: "10px" }}
                onClick={() => navigate("/user")}
            >
                Add User
            </button>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td>{u.name}</td>
                            <td>
                                <button
                                    style={{ background: "blue", color: "white", marginRight: "5px" }}
                                    onClick={() => navigate(`/user/${u.id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    style={{ background: "red", color: "white" }}
                                    onClick={() => handleDelete(u.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}