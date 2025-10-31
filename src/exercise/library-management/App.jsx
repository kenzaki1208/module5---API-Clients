import { HashRouter as Router, Routes, Route } from "react-router-dom";
import BookList from "./pages/BookList";
import BookAdd from "./pages/BookAdd";
import BookEdit from "./pages/BookEdit";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<BookList />} />
                <Route path="/add" element={<BookAdd />} />
                <Route path="/edit/:id" element={<BookEdit />} />
            </Routes>
        </Router>
    );
}

export default App;
