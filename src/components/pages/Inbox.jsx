import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../Auth/AuthContext";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../Firebase";
import { useEffect, useState } from "react";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Inbox = () => {
  const navigate = useNavigate();

  const { currentUser } = UserAuth();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState();
  const [checked, setChecked] = useState(null);

  const handleCheckboxChange = (e, res) => {
    setChecked(e.target.checked ? res.did : null);
  };

  const getAllNotify = async () => {
    setLoading(true);
    const { email } = currentUser;
    // Get user document reference using uid
    const userDocRef = doc(db, "users", email);

    // Get user document snapshot
    const userDocSnapshot = await getDoc(userDocRef);

    // Check if the user document exists
    if (userDocSnapshot.exists()) {
      // Get user data
      const userData = userDocSnapshot.data();

      // Get user sub-collections
      const userCollections = await getDocs(
        collection(db, "users", email, "Notify")
      );

      // Map user sub-collection documents to an array
      const userCollectionData = userCollections.docs.map((doc) => ({
        did: doc.id,
        ...doc.data(),
      }));

      // Combine user data and user sub-collection data
      const userInfo = {
        ...userData,
        Notify: userCollectionData,
      };

      let time = userInfo.Notify.map((res) => {
        const timestamp = moment
          .unix(res.receivedAt.seconds)
          .add(res.receivedAt.nanoseconds / 1e9);
        const timeAgo = timestamp.fromNow();
        return {
          ...res,
          timestamp,
          timeAgo,
        };
      });
      setNotification(time);
      setLoading(false);
      return userInfo;
    } else {
      console.log("User document does not exist.");
    }
  };

  useEffect(() => {
    getAllNotify();
  }, []);

  const deleteNotify = async (did) => {
    const docRef = doc(
      collection(db, "users", currentUser.email, "Notify"),
      did
    );
    await deleteDoc(docRef);
    toast("Notify Deleted !");
    getAllNotify();
  };

  return (
    <>
      <ToastContainer />
      <div className="overflow-x-auto w-full ok">
        {loading ? (
          <div
            className=" flex m-auto items-center justify-center loader"
            style={{ height: "100vh", width: "100vw" }}
          ></div>
        ) : (
          <table className="table w-full">
            {/* head */}
            <thead className="bg-blue-100">
              <tr className="bg-blue-100">
                <th></th>
                <th>Name</th>
                <th>Subject</th>
                <th>Priority</th>
                <th>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/compose")}
                  >
                    Compose
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {notification?.map((res) => (
                <>
                  <tr key={res.did}>
                    <th>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox"
                          onChange={(e) => handleCheckboxChange(e, res)}
                        />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={res.avatar} alt="profile" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{res.senderName}</div>
                          {/* <div className="text-sm opacity-50">United States</div> */}
                        </div>
                      </div>
                    </td>
                    <td>
                      {res.subject.slice(0, 10)}
                      <br />
                      <span className="badge badge-primary badge-sm">
                        {res.timeAgo}
                      </span>
                    </td>
                    <td>
                      {" "}
                      <span className="badge badge-red">
                        {res.important ? "Important" : "General"}
                      </span>
                    </td>
                    <th>
                      {checked === res.did ? (
                        <button
                          className="btn btn-ghost btn-xs"
                          onClick={() => deleteNotify(res.did)}
                        >
                          Delete
                        </button>
                      ) : (
                        <button className="btn btn-ghost btn-xs">View</button>
                      )}
                    </th>
                  </tr>
                </>
              ))}
            </tbody>
            {/* foot */}
            <tfoot>
              {/* <tr>
                 <th></th>
                 <th>Name</th>
                 <th>Job</th>
                 <th>Favorite Color</th>
                 <th></th>
               </tr> */}
            </tfoot>
          </table>
        )}
      </div>
    </>
  );
};

export default Inbox;
