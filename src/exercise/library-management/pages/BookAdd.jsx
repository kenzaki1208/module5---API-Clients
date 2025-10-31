import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BookAdd() {
    const [book, setBook] = useState({ title: "", quantity: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleAdd = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:3001/books", book)
            .then(() => {
                alert("Book added successfully!");
                navigate("/");
            });
    };

    return (
        <div style={{ padding: "40px" }}>
            <h1>Add a new Book</h1>
            <form onSubmit={handleAdd}>
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
                    Add
                </button>
            </form>
        </div>
    );
}