import Autosuggest from "react-autosuggest";
import { UserAuth } from "../../Auth/AuthContext";
import { useEffect, useRef, useState } from "react";
import { db } from "../../Firebase";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Reaptcha from "reaptcha";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../layouts/Footer";
const Compose = () => {
  const { state } = useLocation();

  const { currentUser } = UserAuth();
  const [usersDetails, setUsersDetails] = useState();
  const [value, setValue] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
  const captchaRef = useRef(null);
  const navigate = useNavigate();
  const [genValue, setGenValue] = useState({
    to: state || "",
    from: currentUser.email,
    message: "",
    avatar: currentUser.photoURL,
    subject: "",
    important: false,
    receivedAt: serverTimestamp(),
    senderName: currentUser.displayName,
  });
  console.log(genValue);
  const [suggestions, setSuggestions] = useState([]);

  const getAllUsers = async () => {
    const q = collection(db, "users");
    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(users);

    setUsersDetails(users);

    return users;
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const handleInputChange = (event, property) => {
    let value = "";
    if (event.target.type === "checkbox") {
      value = event.target.checked;
    } else {
      value = event.target.value;
    }
    setGenValue((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();

    const inputLength = inputValue.length;
    const users = usersDetails.map((user) => user.email);

    return inputLength === 0
      ? []
      : users.filter(
          (user) =>
            user.toLowerCase().slice(0, inputLength) === inputValue &&
            user !== currentUser.email
        );
  };

  const onSuggestionSelected = (_, { suggestion }) => {
    setGenValue((prev) => ({
      ...prev,
      to: suggestion,
    }));
  };

  const verify = () => {
    captchaRef.current.getResponse().then((res) => {
      setCaptchaToken(res);
    });
  };

  const handleSend = async () => {
    if (genValue.message == "" || genValue.subject == "") {
      toast("Please enter valid details !");
      return;
    } else if (captchaToken == null) {
      toast("Please verify Captcha !");
      return;
    }

    const q = collection(db, "users", genValue.to, "Notify");

    await addDoc(q, genValue);
    toast("Successfully send Notify");
    setTimeout(() => {
      navigate("/");
    }, 800);
  };

  return (
    <>
      <ToastContainer />
      <div
        className="card  px-3 py-6 rounded-none "
        style={{ background: "#f2f2f2" }}
      >
        <div className="containerWrap px-4">
          <p className="font-sm font-semibold ">New Notify</p>
        </div>
      </div>
      <div
        style={{ flexDirection: "unset" }}
        className="card containerWrap col700 py-4 px-4 justify-between h-96 "
      >
        <div className="flex h-full  w-full flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={({ value }) => {
                setSuggestions(getSuggestions(value));
              }}
              onSuggestionsClearRequested={() => {
                setSuggestions([]);
              }}
              getSuggestionValue={(suggestion) => suggestion}
              renderSuggestion={(suggestion) => (
                <div className="text-sm">{suggestion}</div>
              )}
              inputProps={{
                placeholder: "To...",
                className:
                  " border-b-2 outline-none focus:border-none focus-within:border-none focus:outline-none focus-within:outline-none input-primary w-full max-w-xs p-2 pl-0",
                value: state || value,
                onChange: (event, { newValue }) => {
                  setValue(newValue);
                },
              }}
              onSuggestionSelected={onSuggestionSelected}
            />
            {/* <input
              name="emailTo"
              type="email"
              placeholder="Type here"
              className=" border-b-2 outline-none focus:border-none focus-within:border-none focus:outline-none focus-within:outline-none input-primary w-full max-w-xs p-2 pl-0"
            /> */}
          </div>

          <div className="flex flex-col gap-2">
            <input
              name="subject"
              type="text"
              onChange={(event) => handleInputChange(event, "subject")}
              placeholder="Subject..."
              className=" border-b-2 outline-none focus:border-none focus-within:border-none focus:outline-none focus-within:outline-none input-primary w-full max-w-xs p-2 pl-0"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="form-control">
              <label
                style={{ justifyContent: "start", gap: "50%" }}
                className="label cursor-pointer"
              >
                <span className="label-text font-semibold">Important</span>
                <input
                  onChange={(event) => handleInputChange(event, "important")}
                  type="checkbox"
                  className="checkbox"
                  checked={genValue.important}
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Reaptcha
              sitekey={import.meta.env.VITE_APP_SITE_KEY}
              ref={captchaRef}
              onVerify={verify}
            />
          </div>
        </div>

        <div className="w-full text700 h-full m-auto justify-center flex flex-col">
          <textarea
            className="textarea h-full textarea-primary"
            placeholder="Message.."
            onChange={(event) => handleInputChange(event, "message")}
          ></textarea>
        </div>
      </div>

      <div className="containerWrap btn700 px-4 justify-end m-auto pb-4 flex">
        <button onClick={() => handleSend()} className="btn btn-primary">
          Send Notifier
        </button>
      </div>

      <Footer />
    </>
  );
};

export default Compose;
