import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import AdminDashboard from "./Pages/AdminDashboard";
import AuthenticationPage from "./Pages/AuthenticationPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<AuthenticationPage />} />
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/Dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
