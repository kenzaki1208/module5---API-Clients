import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ContactList() {
    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:3001/contacts")
            .then(res => setContacts(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:3001/contacts/${id}`)
            .then(() => {
                alert("Delete thành công!");
                setContacts(contacts.filter(c => c.id !== id));
            });
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Contacts</h1>
            <button
                onClick={() => navigate("/add")}
                style={{ background: "green", color: "white", border: "none", padding: "10px", borderRadius: "5px" }}
            >
                Add Contact
            </button>
            <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((c) => (
                        <tr key={c.id}>
                            <td><img src={c.image} alt="" width="50" height="50" style={{ borderRadius: "50%" }} /></td>
                            <td>{c.name}</td>
                            <td>{c.email}</td>
                            <td>{c.phone}</td>
                            <td>
                                <button
                                    onClick={() => navigate(`/edit/${c.id}`)}
                                    style={{ background: "blue", color: "white", marginRight: "10px" }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(c.id)}
                                    style={{ background: "red", color: "white" }}
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