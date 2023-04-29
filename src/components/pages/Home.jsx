import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2
        onClick={() => {
          navigate("/login");
        }}
      >
        Goto
      </h2>
    </>
  );
};

export default Home;
