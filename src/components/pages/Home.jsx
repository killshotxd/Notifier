import Inbox from "./Inbox";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  return (
    <>
      <ToastContainer />
      <Inbox />
    </>
  );
};

export default Home;
