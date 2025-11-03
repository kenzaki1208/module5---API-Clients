import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function UserDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: "" });
    const [articles, setArticles] = useState([]);
    const [articleTitle, setArticleTitle] = useState("");
    const [editArticle, setEditArticle] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3001/users/${id}`).then((res) => setUser(res.data));
            axios
                .get(`http://localhost:3001/articles?user_id=${id}`)
                .then((res) => setArticles(res.data));
        }
    }, [id]);

    const handleAddOrUpdateUser = async () => {
        if (id) {
            await axios.put(`http://localhost:3001/users/${id}`, user);
            alert("User updated successfully");
        } else {
            await axios.post("http://localhost:3001/users", user);
            alert("User created successfully");
        }
    };

    const handleAddArticle = async () => {
        const newArticle = { title: articleTitle, user_id: parseInt(id) };
        await axios.post("http://localhost:3001/articles", newArticle);
        setArticleTitle("");
        axios
            .get(`http://localhost:3001/articles?user_id=${id}`)
            .then((res) => setArticles(res.data));
        alert("Article added successfully");
    };

    const handleDeleteArticle = async (articleId) => {
        await axios.delete(`http://localhost:3001/articles/${articleId}`);
        setArticles(articles.filter((a) => a.id !== articleId));
        alert("Deleted successfully");
    };

    const handleUpdateArticle = async () => {
        await axios.put(`http://localhost:3001/articles/${editArticle.id}`, {
            ...editArticle,
            title: articleTitle,
        });
        setEditArticle(null);
        setArticleTitle("");
        axios
            .get(`http://localhost:3001/articles?user_id=${id}`)
            .then((res) => setArticles(res.data));
        alert("Updated successfully");
    };

    return (
        <div style={{ padding: "30px" }}>
            <a href="/index/indexE4.html" style={{ color: "blue" }}>Back to Home</a>
            <h2>User Detail</h2>

            <input
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                placeholder="Name"
            />
            <button onClick={handleAddOrUpdateUser} style={{ background: "green", color: "white" }}>
                {id ? "Update" : "Add"}
            </button>

            {id && (
                <>
                    <h3>Article</h3>
                    <input
                        value={articleTitle}
                        onChange={(e) => setArticleTitle(e.target.value)}
                        placeholder="Article title"
                    />
                    {editArticle ? (
                        <>
                            <button onClick={handleUpdateArticle} style={{ background: "green", color: "white" }}>Update</button>
                            <button onClick={() => setEditArticle(null)} style={{ background: "orange", color: "white" }}>Cancel</button>
                        </>
                    ) : (
                        <button onClick={handleAddArticle} style={{ background: "green", color: "white" }}>Add</button>
                    )}

                    <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
                        <thead>
                            <tr>
                                <th>Articles</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map((a) => (
                                <tr key={a.id}>
                                    <td>{a.title}</td>
                                    <td>
                                        <button
                                            style={{ background: "blue", color: "white", marginRight: "5px" }}
                                            onClick={() => {
                                                setEditArticle(a);
                                                setArticleTitle(a.title);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            style={{ background: "red", color: "white" }}
                                            onClick={() => handleDeleteArticle(a.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}