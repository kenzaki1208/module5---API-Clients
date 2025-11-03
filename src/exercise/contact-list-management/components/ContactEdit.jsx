import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function ContactEdit() {
    const { id } = useParams();
    const [contact, setContact] = useState({ name: "", email: "", phone: "", image: "" });
    const [selectedFile, setSelectedFile] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:3001/contacts/${id}`)
            .then((res) => setContact(res.data));
    }, [id]);

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

    const handleSave = () => {
        axios
            .put(`http://localhost:3001/contacts/${id}`, contact)
            .then(() => {
                alert("Cập nhật contact thành công!");
                navigate("/");
            });
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Edit Contact</h1>

            <img src={contact.image} alt="" width="80" height="80" style={{ borderRadius: "50%" }} />
            <input type="file" onChange={handleUpload} />
            <button onClick={handleSubmission}>Change Image</button>

            <div>
                <input name="name" value={contact.name} onChange={handleChange} placeholder="Name" />
            </div>
            <div>
                <input name="email" value={contact.email} onChange={handleChange} placeholder="Email" />
            </div>
            <div>
                <input name="phone" value={contact.phone} onChange={handleChange} placeholder="Phone" />
            </div>

            <button onClick={handleSave} style={{ background: "green", color: "white", padding: "10px" }}>
                Save
            </button>
        </div>
    );
}