import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ContactList from "./components/ContactList";
import ContactAdd from "./components/ContactAdd";
import ContactEdit from "./components/ContactEdit";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ContactList />} />
                <Route path="/add" element={<ContactAdd />} />
                <Route path="/edit/:id" element={<ContactEdit />} />
            </Routes>
        </Router>
    );
}

export default App;