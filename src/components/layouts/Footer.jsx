import { GoMarkGithub } from "react-icons/go";
import { BsLinkedin, BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        {/* <div className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div> */}
        <div>
          <div className="grid grid-flow-col gap-4">
            <a
              className=" hover:color-blue-600"
              href="https://github.com/killshotxd"
            >
              <GoMarkGithub size={30} />
            </a>

            <a href="https://www.linkedin.com/in/mohd-hassan-11707a223/">
              <BsLinkedin size={30} />
            </a>

            <a href="https://www.instagram.com/ihassanansari">
              <BsInstagram size={30} />
            </a>
          </div>
        </div>
        <div>
          <p>Copyright © 2023 - All right reserved by Mohd Hassan</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
