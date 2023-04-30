import { Routes, Route } from "react-router-dom";
import { UserAuth } from "./Auth/AuthContext";
import Header from "./components/layouts/Header";
import { PrivateRoute } from "./Routes/PrivateRoute";
import { lazy, Suspense } from "react";

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

      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Suspense
                fallback={
                  <div
                    className=" flex m-auto items-center justify-center loader"
                    style={{ height: "80vh", width: "100vw" }}
                  ></div>
                }
              >
                <Home />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/compose"
          element={
            <PrivateRoute>
              <Suspense fallback={<div>Loading...</div>}>
                <Compose />
              </Suspense>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
