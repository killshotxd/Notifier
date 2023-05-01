import { useEffect } from "react";
import { UserAuth } from "../../Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { currentUser, signInGoogle } = UserAuth();

  const handleLogin = async () => {
    try {
      await signInGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    } else return;
  }, [currentUser, navigate]);

  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1526554850534-7c78330d5f90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80")`,
        }}
      >
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">NOTIFIER !</h1>
            <p className="mb-5">
              Stay connected with your contacts - Notifier - Your go-to app for
              hassle-free email notifications.
            </p>
            <button
              onClick={() => {
                handleLogin();
              }}
              className="btn btn-primary"
            >
              login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
