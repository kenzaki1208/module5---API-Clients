import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ContactAdd() {
    const [contact, setContact] = useState({ name: "", email: "", phone: "", image: "" });
    const [selectedFile, setSelectedFile] = useState();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleUpload = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmission = async () => {
        const fd = new FormData();
        fd.append("file", selectedFile);
        const res = await axios.post("https://v2.convertapi.com/upload", fd);
        setContact({ ...contact, image: res.data.Url });
    };

    const handleAdd = () => {
        axios
            .post("http://localhost:3001/contacts", contact)
            .then(() => {
                alert("Thêm contact thành công!");
                navigate("/");
            });
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Add Contact</h1>

            <input type="file" onChange={handleUpload} />
            <button onClick={handleSubmission}>Add Image</button>
            {contact.image && <img src={contact.image} alt="" width="80" height="80" style={{ borderRadius: "50%" }} />}

            <div>
                <input name="name" placeholder="Name" value={contact.name} onChange={handleChange} />
            </div>
            <div>
                <input name="email" placeholder="Email" value={contact.email} onChange={handleChange} />
            </div>
            <div>
                <input name="phone" placeholder="Phone" value={contact.phone} onChange={handleChange} />
            </div>

            <button onClick={handleAdd} style={{ background: "green", color: "white", padding: "10px" }}>
                Add
            </button>
        </div>
    );
}