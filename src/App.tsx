import { BrowserRouter, Routes, Route } from "react-router-dom";
import Protected from "./components/protected";
import Header from "./components/header";
import Login from "./components/login";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/header" element={<Protected><Header /></Protected>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;