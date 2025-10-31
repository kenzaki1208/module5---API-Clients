import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BookList() {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:3001/books")
            .then((res) => setBooks(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:3001/books/${id}`)
            .then(() => {
                alert("Delete successfully!");
                setBooks(books.filter((book) => book.id !== id));
            });
    };

    return (
        <div style={{ padding: "40px" }}>
            <h1>Library</h1>
            <button
                onClick={() => navigate("/add")}
                style={{
                    background: "green",
                    color: "white",
                    padding: "10px 15px",
                    border: "none",
                    borderRadius: "5px",
                    marginBottom: "20px",
                }}
            >
                Add a new Book
            </button>

            <table width="100%" border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.quantity}</td>
                            <td>
                                <button
                                    style={{ background: "blue", color: "white", marginRight: "10px" }}
                                    onClick={() => navigate(`/edit/${book.id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    style={{ background: "red", color: "white" }}
                                    onClick={() => handleDelete(book.id)}
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