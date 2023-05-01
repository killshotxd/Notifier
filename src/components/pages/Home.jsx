import Inbox from "./Inbox";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../layouts/Footer";
const Home = () => {
  return (
    <>
      <ToastContainer />
      <Inbox />
      <Footer />
    </>
  );
};

export default Home;
