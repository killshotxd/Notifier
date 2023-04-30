import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import { UserAuth } from "./Auth/AuthContext";
import Login from "./components/pages/Login";
import Header from "./components/layouts/Header";
import { PrivateRoute } from "./Routes/PrivateRoute";
import Compose from "./components/pages/Compose";

const App = () => {
  const { currentUser } = UserAuth();

  return (
    <>
      {currentUser ? (
        <>
          <Header />
        </>
      ) : (
        ""
      )}

      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              {" "}
              <Home />{" "}
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/compose"
          element={
            <PrivateRoute>
              {" "}
              <Compose />{" "}
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
