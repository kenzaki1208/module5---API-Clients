import { HashRouter as Router, Routes, Route } from "react-router-dom";
import UserDetail from "./pages/UserDetail.jsx";
import UserList from "./pages/UserList.jsx";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserList />} />
                <Route path="/user" element={<UserDetail />} />
                <Route path="/user/:id" element={<UserDetail />} />
            </Routes>
        </Router>
    );
}