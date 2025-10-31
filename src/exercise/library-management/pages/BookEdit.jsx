import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function BookEdit() {
    const [book, setBook] = useState({ title: "", quantity: "" });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`https://my-json-server.typicode.com/codegym-vn/mock-api-books/books/${id}`)
            .then((res) => setBook(res.data));
    }, [id]);

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:3001/books/${id}`, book)
            .then(() => {
                alert("Book updated successfully!");
                navigate("/");
            });
    };

    return (
        <div style={{ padding: "40px" }}>
            <h1>Edit</h1>
            <form onSubmit={handleSave}>
                <div>
                    <label>Title</label><br />
                    <input name="title" value={book.title} onChange={handleChange} />
                </div>
                <div>
                    <label>Quantity</label><br />
                    <input name="quantity" value={book.quantity} onChange={handleChange} />
                </div>
                <button
                    style={{
                        background: "green",
                        color: "white",
                        padding: "10px 15px",
                        border: "none",
                        borderRadius: "5px",
                        marginTop: "10px",
                    }}
                >
                    Save
                </button>
            </form>
        </div>
    );
}