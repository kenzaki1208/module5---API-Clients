import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    // Gọi API GET khi component mount
    useEffect(() => {
        axios
            .get("https://jsonplaceholder.typicode.com/todos?_limit=5")
            .then((res) => setTodos(res.data))
            .catch((err) => console.error("Lỗi khi lấy danh sách:", err));
    }, []);

    // Xử lý khi bấm Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newTodo.trim()) {
            alert("Vui lòng nhập nội dung công việc!");
            return;
        }

        axios
            .post("https://jsonplaceholder.typicode.com/todos", {
                title: newTodo,
                completed: false,
            })
            .then((res) => {
                alert("Thêm thành công! Status: " + res.status);
                setTodos([...todos, res.data]); // cập nhật danh sách tạm thời
                setNewTodo(""); // reset input
            })
            .catch((err) => {
                alert("Có lỗi xảy ra khi thêm todo!");
                console.error(err);
            });
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Todo List</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Nhập công việc..."
                    style={{ padding: "8px", width: "250px" }}
                />
                <button type="submit" style={{ marginLeft: "10px", padding: "8px" }}>
                    Submit
                </button>
            </form>

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
        </div>
    );
}