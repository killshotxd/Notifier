import Autosuggest from "react-autosuggest";
import { UserAuth } from "../../Auth/AuthContext";
import { useEffect, useState } from "react";
import { db } from "../../Firebase";
import { collection, getDocs } from "firebase/firestore";

const Compose = () => {
  const { currentUser } = UserAuth();
  const [usersDetails, setUsersDetails] = useState();
  const [value, setValue] = useState("");

  const [genValue, setGenValue] = useState({
    to: "",
    from: currentUser.email,
    message: "",
    subject: "",
    important: false,
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
    setGenValue((prev) => ({
      ...prev,
      to: inputValue,
    }));

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
  return (
    <>
      <div className="card  px-3 py-4 rounded-none bg-blue-100 ">
        <div className="containerWrap">
          <p className=" font-semibold ">New Message</p>
        </div>
      </div>
      <div
        style={{ flexDirection: "unset" }}
        className="card containerWrap py-4 justify-between h-96 "
      >
        <div className="flex h-full  w-full flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="emailTo">
              {" "}
              To :{" "}
            </label>
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
                placeholder: "Type here",
                className:
                  " border-b-2 outline-none focus:border-none focus-within:border-none focus:outline-none focus-within:outline-none input-primary w-full max-w-xs p-2 pl-0",
                value: value,
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
            <label className="font-semibold" htmlFor="subject ">
              {" "}
              Subject :{" "}
            </label>
            <input
              name="subject"
              type="text"
              onChange={(event) => handleInputChange(event, "subject")}
              placeholder="Type here"
              className=" border-b-2 outline-none focus:border-none focus-within:border-none focus:outline-none focus-within:outline-none input-primary w-full max-w-xs p-2 pl-0"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="form-control">
              <label
                style={{ justifyContent: "start", gap: "55%" }}
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
        </div>

        <div className="w-full h-full m-auto justify-center flex flex-col">
          <textarea
            className="textarea h-full textarea-primary"
            placeholder="Message.."
            onChange={(event) => handleInputChange(event, "message")}
          ></textarea>
        </div>
      </div>

      <div className="containerWrap">
        <button className="btn btn-primary">Send Notifier</button>
      </div>
    </>
  );
};

export default Compose;
