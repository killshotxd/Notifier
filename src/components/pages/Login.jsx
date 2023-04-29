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
      <button
        onClick={() => {
          handleLogin();
        }}
      >
        Login
      </button>
    </>
  );
};

export default Login;
