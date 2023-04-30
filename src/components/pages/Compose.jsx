const Compose = () => {
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
            <label htmlFor="emailTo"> To : </label>
            <input
              name="emailTo"
              type="email"
              placeholder="Type here"
              className=" border-b-2 outline-none focus:border-none focus-within:border-none focus:outline-none focus-within:outline-none input-primary w-full max-w-xs p-2 pl-0"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="subject"> Subject : </label>
            <input
              name="subject"
              type="text"
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
                <span className="label-text">Important</span>
                <input type="checkbox" className="checkbox" />
              </label>
            </div>
          </div>
        </div>

        <div className="w-full h-full m-auto justify-center flex flex-col">
          <textarea
            className="textarea h-full textarea-primary"
            placeholder="Message.."
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
