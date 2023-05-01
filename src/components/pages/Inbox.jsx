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
import TableRow from "../table/TableRow";
import Footer from "../layouts/Footer";
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

      // Sort notifications by timestamp in ascending order
      time.sort((a, b) => b.timestamp - a.timestamp);

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
      <div className="overflow-x-auto min-h-screen w-full ok">
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
                <TableRow
                  key={res.did}
                  res={res}
                  handleCheckboxChange={handleCheckboxChange}
                  deleteNotify={deleteNotify}
                  checked={checked}
                />
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
