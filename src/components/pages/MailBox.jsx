import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineReply } from "react-icons/md";
import Footer from "../layouts/Footer";

const MailBox = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data;

  return (
    <>
      <div className="min-h-screen containerWrap">
        <div className="py-4 px-4">
          <p className="flex items-center gap-4">
            Inbox <IoIosArrowForward />{" "}
            <span className="font-bold">{data.senderName}</span>
          </p>
        </div>

        <div className="py-4 px-4">
          {data.important ? (
            <div className="badge badge-md">Important</div>
          ) : (
            <div className="badge badge-md">Normal</div>
          )}
        </div>

        <div className="hero">
          <div className="hero-content flex-col">
            <div className="font-bold flex items-center gap-4">
              Message:{" "}
              <div className="avatar">
                <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={data.avatar} />
                </div>
              </div>
              <span className="text-sm ">{data.timeAgo}</span>
            </div>

            <div className="bg-base-200 p-4 w-96 h-auto">
              <p>{data.message}</p>
            </div>
            <div>
              <button
                onClick={() => {
                  navigate("/compose", { state: data.from });
                }}
                className="btn btn-ghost flex items-center gap-2"
              >
                Reply <MdOutlineReply />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MailBox;
