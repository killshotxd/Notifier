import { Routes, Route } from "react-router-dom";
import { UserAuth } from "./Auth/AuthContext";
import Header from "./components/layouts/Header";
import { PrivateRoute } from "./Routes/PrivateRoute";
import { lazy, Suspense } from "react";
import MailBox from "./components/pages/MailBox";

const Home = lazy(() => import("./components/pages/Home"));
const Login = lazy(() => import("./components/pages/Login"));
const Compose = lazy(() => import("./components/pages/Compose"));

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
      <Suspense
        fallback={
          <div
            className=" flex m-auto items-center justify-center loader"
            style={{ height: "80vh", width: "100vw" }}
          ></div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/compose"
            element={
              <PrivateRoute>
                <Compose />
              </PrivateRoute>
            }
          />
          <Route
            path="/notifyMail"
            element={
              <PrivateRoute>
                <MailBox />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
