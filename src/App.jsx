import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import { AuthProvider } from "./Auth/AuthContext";
import Login from "./components/pages/Login";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
