import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails"

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Users />} />
                <Route path="/user/add" element={<UserDetails />} />
                <Route path="/user/:userId" element={<UserDetails />} />
            </Routes>
        </Router>
    );
}