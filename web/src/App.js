import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./Pages/AdminDashboard";
import AuthenticationPage from "./Pages/AuthenticationPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<AuthenticationPage />} />
          <Route path="/Dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
